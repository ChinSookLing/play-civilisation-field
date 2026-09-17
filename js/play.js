/* Play desk — optional human enhancement. Board + match already exist in HTML. */
(function () {
  const COLS = "ABCDEFGHJKLMNOPQRST";
  const PAD = 28;
  const CELL = 22;
  const VIEW = 452;
  const readout = document.getElementById("coord-readout");
  const goban = document.getElementById("goban");
  const hint = "Hover a point for coordinates · A–T skip I, 19 at top";

  function pointFromEvent(svg, event) {
    const rect = svg.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * VIEW;
    const y = ((event.clientY - rect.top) / rect.height) * VIEW;
    const gx = Math.round((x - PAD) / CELL);
    const gy = Math.round((y - PAD) / CELL);
    if (gx < 0 || gx > 18 || gy < 0 || gy > 18) return null;
    return COLS[gx] + String(19 - gy);
  }

  if (goban && readout) {
    goban.addEventListener("mousemove", function (event) {
      const coord = pointFromEvent(goban, event);
      readout.textContent = coord || hint;
    });
    goban.addEventListener("mouseleave", function () {
      readout.textContent = hint;
    });
  }

  fetch("/data/game.json", { cache: "no-store" })
    .then(function (res) {
      if (!res.ok) throw new Error("game.json " + res.status);
      return res.json();
    })
    .then(function (game) {
      const plaque = document.getElementById("turn-plaque");
      if (plaque) {
        plaque.textContent =
          (game.toPlay === "black" ? "Black" : "White") +
          " to play · move " +
          game.moveCount;
      }
      if (!goban || !game.position) return;
      if (goban.querySelector("circle[data-stone]")) return;
      (game.position.stones || []).forEach(function (stone) {
        const x = typeof stone.x === "number" ? stone.x : COLS.indexOf(stone.coord[0]);
        const y = typeof stone.y === "number" ? stone.y : 19 - parseInt(stone.coord.slice(1), 10);
        const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        c.setAttribute("cx", String(PAD + x * CELL));
        c.setAttribute("cy", String(PAD + y * CELL));
        c.setAttribute("r", "9.4");
        c.setAttribute("data-stone", stone.coord);
        if (stone.color === "black") {
          c.setAttribute("fill", "#1a1816");
          c.setAttribute("stroke", "#0b0a09");
        } else {
          c.setAttribute("fill", "#f4efe6");
          c.setAttribute("stroke", "#c9c0b2");
        }
        goban.appendChild(c);
      });
    })
    .catch(function () {
      /* file:// or offline: HTML snapshot is enough */
    });
})();

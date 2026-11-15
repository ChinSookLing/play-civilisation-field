import vm from "node:vm";
import gameHtml from "./psyche-001-game.html?raw";

type Capture = {
  packetFor: (seed: string) => string;
  version: string;
};

let capture: Capture | null = null;

function engine(): Capture {
  if (capture) return capture;
  const start = gameHtml.indexOf("// 0 = English");
  const end = gameHtml.indexOf("</script>", start);
  if (start < 0 || end < 0) throw new Error("Polar night script was not found.");
  const script = gameHtml.slice(start, end);
  const sandbox: { POLAR_NIGHT_CAPTURE?: (api: Capture) => void; api?: Capture } = {};
  sandbox.POLAR_NIGHT_CAPTURE = (api) => {
    sandbox.api = api;
  };
  vm.createContext(sandbox);
  vm.runInContext(script, sandbox, { timeout: 1000 });
  if (!sandbox.api) throw new Error("Polar night script did not start.");
  capture = sandbox.api;
  return capture;
}

export function polarNightVersion(): string {
  return engine().version;
}

/** Turn 1 of Hermes's v0.5.1 night, the same packet the page would show. */
export function turnOnePacket(seed: string): string {
  const packet = engine().packetFor(seed);
  if (!packet.endsWith(`END-PACKET ${engine().version}`)) {
    throw new Error("Turn 1 packet did not end with END-PACKET.");
  }
  return packet;
}

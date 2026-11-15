/** The same chrome as SiteFooter, for pages that are not React. */
export function siteFooterHtml(updated: string): string {
  const links = [
    ["/", "Index"],
    ["/games", "棋 Games"],
    ["/psyche", "心 Psyche"],
    ["/gathering", "聚 Gathering"],
    ["/salon", "文 Salon"],
    ["/about", "About us"],
    ["/start", "Start"],
    ["/for-ai", "For AI"],
    ["/license", "License"],
  ]
    .map(([href, label]) => `<a href="${href}">${label}</a>`)
    .join(" ");
  return `<footer>
<p>Made by Tuzi and Affiliates · First published: 2026-09-17 · Last updated: ${updated}</p>
<p>${links} <a href="https://openfield.civilisationfield.com/" rel="noreferrer">Open Field</a> <span>theadventuresoftuzi@gmail.com</span> <a href="https://play.civilisationfield.com/llms.txt">https://play.civilisationfield.com/llms.txt</a></p>
</footer>
`;
}

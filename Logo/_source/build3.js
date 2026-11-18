// Builds Next Vision Technologies logo files (text converted to vector paths).
const fs = require("fs");
const path = require("path");
const opentype = require("opentype.js");
const { Resvg } = require("@resvg/resvg-js");

const OUT = process.argv[2];
const FONT_DIR = path.join(__dirname, "node_modules/@fontsource/montserrat/files");
const F = w => opentype.loadSync(path.join(FONT_DIR, `montserrat-latin-${w}-normal.woff`));
const F800 = F(800), F500 = F(500), F600 = F(600);

const C = {
  // Final palette (sunset): deep purple ink, violet, magenta, pink, orange
  navy: "#1F0A4D", navy2: "#4C1D95", blue: "#C026D3", blue2: "#6D28D9", cyan: "#FF9A3C",
  pink: "#F0437A", coral: "#F25C54", red: "#FF4D4D",
  white: "#FFFFFF", softWhite: "#E4D7FF", darkBg: "#12062E",
};

// ---------- text ----------
function run(font, text, size, tracking = 0) {
  const s = size / font.unitsPerEm, glyphs = font.stringToGlyphs(text), items = [];
  let x = 0;
  glyphs.forEach((g, i) => {
    items.push({ g, x, ch: text[i] });
    x += g.advanceWidth * s;
    if (i < glyphs.length - 1) x += font.getKerningValue(g, glyphs[i + 1]) * s + tracking;
  });
  const last = glyphs[glyphs.length - 1];
  const width = x - (last.advanceWidth - (last.xMax || last.advanceWidth)) * s; // trim last RSB
  const first = glyphs[0];
  const lsb = (first.xMin || 0) * s;
  return { items, width: width - lsb, lsb, size, font };
}
function trackedToWidth(font, text, size, target) {
  const base = run(font, text, size, 0);
  return run(font, text, size, (target - base.width) / (text.length - 1));
}
function paths(r, x, y) {
  return r.items.map(it => ({ ch: it.ch, d: it.g.getPath(x - r.lsb + it.x, y, r.size).toPathData(2) }));
}
const cap = size => size * 0.70;

// ---------- marks (viewBox 0 0 128 120) ----------
function ascend(theme, mono, id) {
  const dark = theme === "dark";
  const ink = dark ? C.white : C.navy;
  const g = (n, x1, y1, x2, y2, a, b) =>
    `<linearGradient id="${id}${n}" gradientUnits="userSpaceOnUse" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
  const f = (n, solid) => (mono ? ink : `url(#${id}${n})`);
  const defs = mono ? "" : `<defs>
${g("L", 8, 104, 56, 40, dark ? C.softWhite : "#2A0E6B", dark ? C.white : "#5B21B6")}
${g("M", 47, 40, 71, 104, dark ? "#F27BF0" : "#D21FD0", dark ? "#9B5CFF" : "#6D28D9")}
<linearGradient id="${id}A" gradientUnits="userSpaceOnUse" x1="66" y1="104" x2="112" y2="14"><stop offset="0" stop-color="#9D2BE0"/><stop offset=".5" stop-color="${C.pink}"/><stop offset="1" stop-color="${C.cyan}"/></linearGradient>
<linearGradient id="${id}P" gradientUnits="userSpaceOnUse" x1="52" y1="66" x2="92" y2="8"><stop offset="0" stop-color="#8B2BE2"/><stop offset=".5" stop-color="${C.pink}"/><stop offset="1" stop-color="${C.cyan}"/></linearGradient>
</defs>`;
  const px = [[67, 58, 7], [63, 45, 6], [75, 45, 7], [70, 32, 6], [83, 34, 5], [59, 30, 4.5], [77, 21, 4.5], [64, 18, 3.5], [52, 22, 3], [90, 8, 3.5]];
  return `${defs}
<path d="M38 40H56L80 104H62Z" fill="${f("M")}"/>
<path d="M8 104H26L56 40H38Z" fill="${f("L")}"/>
<path d="M62 104H80L110.34 37.42 118.35 41.07 112 14 87.41 26.97 95.42 30.62Z" fill="${f("A")}"/>
${px.map(([x, y, s], i) => `<rect x="${x}" y="${y}" width="${s}" height="${s}" rx="${(s * 0.18).toFixed(2)}" fill="${f("P")}"${mono ? "" : ` opacity="${(1 - i * 0.05).toFixed(2)}"`}/>`).join("\n")}`;
}

function orbit(theme, mono, id) {
  const dark = theme === "dark";
  const ink = dark ? C.white : C.navy;
  const f = n => (mono ? ink : `url(#${id}${n})`);
  const T = `translate(60 66) rotate(-24)`;
  const crescent = `M-56 0A56 24 0 0 0 56 0A56 15 0 0 1-56 0Z`;
  const defs = `<defs>
${mono ? "" : `<linearGradient id="${id}S" gradientUnits="userSpaceOnUse" x1="-56" y1="0" x2="56" y2="0"><stop offset="0" stop-color="${C.cyan}"/><stop offset=".55" stop-color="${C.blue}"/><stop offset="1" stop-color="${C.blue2}"/></linearGradient>
<linearGradient id="${id}N" gradientUnits="userSpaceOnUse" x1="22" y1="30" x2="98" y2="96"><stop offset="0" stop-color="${dark ? C.white : C.navy2}"/><stop offset=".45" stop-color="${dark ? C.white : C.navy}"/><stop offset="1" stop-color="${dark ? C.softWhite : C.navy}"/></linearGradient>
<linearGradient id="${id}P" gradientUnits="userSpaceOnUse" x1="86" y1="30" x2="124" y2="4"><stop offset="0" stop-color="${C.blue}"/><stop offset="1" stop-color="${C.cyan}"/></linearGradient>`}
<mask id="${id}k" maskUnits="userSpaceOnUse" x="0" y="0" width="128" height="120"><rect width="128" height="120" fill="#fff"/><path d="${crescent}" transform="${T}" fill="#000" stroke="#000" stroke-width="7" stroke-linejoin="round"/></mask>
</defs>`;
  const px = [[99, 13, 9], [111, 5, 6], [112, 20, 5], [89, 7, 4.5], [121, 15, 3.5]];
  return `${defs}
<path d="M56 0A56 20 0 0 0-52.6-6.84" transform="${T}" fill="none" stroke="${f("S")}" stroke-width="2.6" stroke-linecap="round"${mono ? "" : ` opacity=".75"`}/>
<path d="M22 96V30H44L78 72V30H98V96H76L42 54V96Z" fill="${f("N")}" stroke="${f("N")}" stroke-width="3" stroke-linejoin="round" mask="url(#${id}k)"/>
<path d="${crescent}" transform="${T}" fill="${f("S")}"/>
${px.map(([x, y, s]) => `<rect x="${x}" y="${y}" width="${s}" height="${s}" rx="${(s * 0.18).toFixed(2)}" fill="${f("P")}"/>`).join("\n")}`;
}

const MARKS = { ascend, orbit };
const MARK_W = 128, MARK_H = 120;

// ---------- lockups ----------
function wordmark(theme, mono, id, x, y, opts = {}) {
  const ink = theme === "dark" ? C.white : C.navy;
  const accent = mono ? ink : `url(#${id}X)`;
  const nv = run(F800, "NEXT VISION", 44, 0.6);
  const tech = trackedToWidth(F500, "TECHNOLOGIES", 18.5, nv.width);
  const nvBase = y + cap(44);
  const techBase = nvBase + 14 + cap(18.5);
  const xX = x + nv.items[2].x;
  let svg = mono ? "" : `<defs><linearGradient id="${id}X" gradientUnits="userSpaceOnUse" x1="${xX}" y1="${nvBase}" x2="${xX + 30}" y2="${nvBase - 30}"><stop offset="0" stop-color="${C.red}"/><stop offset="1" stop-color="${C.cyan}"/></linearGradient>
<linearGradient id="${id}T" gradientUnits="userSpaceOnUse" x1="${x}" y1="0" x2="${x + nv.width}" y2="0"><stop offset="0" stop-color="${C.blue}"/><stop offset=".55" stop-color="${C.pink}"/><stop offset="1" stop-color="${C.coral}"/></linearGradient></defs>`;
  const nvP = paths(nv, x, nvBase);
  svg += `<path d="${nvP.filter((p, i) => i !== 2).map(p => p.d).join("")}" fill="${ink}"/>`;
  svg += `<path d="${nvP[2].d}" fill="${accent}"/>`;
  svg += `<path d="${paths(tech, x, techBase).map(p => p.d).join("")}" fill="${mono ? ink : `url(#${id}T)`}"/>`;
  let height = techBase - y;
  if (opts.tagline) {
    const words = ["A.I", "SAAS", "WEBSITE", "MARKETING"].map(w => run(F600, w, 12, 1.1));
    const total = words.reduce((a, w) => a + w.width, 0);
    const gap = (nv.width - total) / (words.length - 1);
    const tBase = techBase + 17 + cap(12);
    let cx = x, d = "", dots = "";
    words.forEach((w, i) => {
      d += paths(w, cx, tBase).map(p => p.d).join("");
      cx += w.width;
      if (i < words.length - 1) {
        dots += `<circle cx="${(cx + gap / 2).toFixed(2)}" cy="${(tBase - cap(12) / 2).toFixed(2)}" r="2.1" fill="${mono ? ink : C.coral}"/>`;
        cx += gap;
      }
    });
    svg += `<path d="${d}" fill="${ink}"/>${dots}`;
    height = tBase - y;
  }
  return { svg, width: nv.width, height };
}

function wrap(inner, w, h, pad = 24) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-pad} ${-pad} ${(w + pad * 2).toFixed(2)} ${(h + pad * 2).toFixed(2)}" width="${(w + pad * 2).toFixed(0)}" height="${(h + pad * 2).toFixed(0)}">\n<title>Next Vision Technologies</title>\n${inner}\n</svg>\n`;
}

function horizontal(markName, theme, mono, tagline) {
  const id = `${markName[0]}h${theme[0]}${mono ? "m" : ""}${tagline ? "t" : ""}`;
  const probe = wordmark(theme, mono, id, 0, 0, { tagline });
  const markH = tagline ? 104 : 92, s = markH / MARK_H, markW = MARK_W * s;
  const textX = markW + 44;
  const H = Math.max(markH, probe.height);
  const ty = (H - probe.height) / 2, my = (H - markH) / 2;
  const ink = theme === "dark" ? C.white : C.navy;
  const wm = wordmark(theme, mono, id, textX, ty, { tagline });
  const inner = `<g transform="translate(0 ${my.toFixed(2)}) scale(${s.toFixed(4)})">${MARKS[markName](theme, mono, id + "m")}</g>
<rect x="${(markW + 21).toFixed(2)}" y="${(H * 0.12).toFixed(2)}" width="1.6" height="${(H * 0.76).toFixed(2)}" fill="${mono ? ink : "#D9A6C8"}" opacity="${mono ? 0.3 : 1}"/>
${wm.svg}`;
  return wrap(inner, textX + wm.width, H);
}

function stacked(markName, theme, mono, tagline) {
  const id = `${markName[0]}s${theme[0]}${mono ? "m" : ""}${tagline ? "t" : ""}`;
  const probe = wordmark(theme, mono, id, 0, 0, { tagline });
  const s = 1.15, markW = MARK_W * s, markH = MARK_H * s;
  const W = Math.max(markW, probe.width);
  const wm = wordmark(theme, mono, id, (W - probe.width) / 2, markH + 26, { tagline });
  const inner = `<g transform="translate(${((W - markW) / 2).toFixed(2)} 0) scale(${s})">${MARKS[markName](theme, mono, id + "m")}</g>\n${wm.svg}`;
  return wrap(inner, W, markH + 26 + wm.height, 32);
}

function icon(markName, theme, mono) {
  const id = `${markName[0]}i${theme[0]}${mono ? "m" : ""}`;
  return wrap(MARKS[markName](theme, mono, id), MARK_W, MARK_H, 8);
}

function appIcon(markName) {
  const id = `${markName[0]}app`;
  const s = 6.2, mw = MARK_W * s, mh = MARK_H * s;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
<title>Next Vision Technologies</title>
<defs><linearGradient id="${id}bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2A0E6B"/><stop offset="1" stop-color="#12062E"/></linearGradient>
<radialGradient id="${id}gl" cx=".78" cy=".2" r=".6"><stop offset="0" stop-color="${C.pink}" stop-opacity=".25"/><stop offset="1" stop-color="${C.pink}" stop-opacity="0"/></radialGradient></defs>
<rect width="1024" height="1024" rx="228" fill="url(#${id}bg)"/><rect width="1024" height="1024" rx="228" fill="url(#${id}gl)"/>
<g transform="translate(${((1024 - mw) / 2).toFixed(1)} ${((1024 - mh) / 2 + 8).toFixed(1)}) scale(${s})">${MARKS[markName]("dark", false, id + "m")}</g>
</svg>\n`;
}

// ---------- write ----------
function save(rel, svg, pngWidths = []) {
  const file = path.join(OUT, rel + ".svg");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, svg);
  for (const w of pngWidths) {
    const png = new Resvg(svg, { fitTo: { mode: "width", value: w } }).render().asPng();
    const pf = path.join(OUT, rel.replace("/svg/", "/png/") + (pngWidths.length > 1 ? `-${w}` : "") + ".png");
    fs.mkdirSync(path.dirname(pf), { recursive: true });
    fs.writeFileSync(pf, png);
  }
}

const NAMES = { ascend: "00-Final" };
for (const m of ["ascend"]) {
  const dir = NAMES[m];
  for (const theme of ["light", "dark"]) {
    const t = theme === "light" ? "on-light" : "on-dark";
    save(`${dir}/svg/horizontal-${t}`, horizontal(m, theme, false, false), [2400]);
    save(`${dir}/svg/horizontal-tagline-${t}`, horizontal(m, theme, false, true), [2400]);
    save(`${dir}/svg/stacked-${t}`, stacked(m, theme, false, true), [1600]);
    save(`${dir}/svg/icon-${t}`, icon(m, theme, false), [1024]);
    save(`${dir}/svg/mono-horizontal-${theme === "light" ? "navy" : "white"}`, horizontal(m, theme, true, false), [2400]);
    save(`${dir}/svg/mono-icon-${theme === "light" ? "navy" : "white"}`, icon(m, theme, true), [1024]);
  }
  save(`${dir}/svg/app-icon`, appIcon(m), [1024, 512, 192, 32]);
}
console.log("done");

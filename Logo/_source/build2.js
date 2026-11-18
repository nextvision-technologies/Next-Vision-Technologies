// Round 3: twelve new Next Vision logo directions. Text converted to vector paths.
const fs = require("fs");
const path = require("path");
const opentype = require("opentype.js");
const { Resvg } = require("@resvg/resvg-js");
const OUT = process.argv[2];

const fontCache = {};
function font(fam, w) {
  const k = fam + w;
  if (!fontCache[k]) fontCache[k] = opentype.loadSync(path.join(__dirname, `node_modules/@fontsource/${fam}/files/${fam}-latin-${w}-normal.woff`));
  return fontCache[k];
}
const capOf = (f, size) => ((f.tables.os2 && f.tables.os2.sCapHeight) || f.unitsPerEm * 0.7) / f.unitsPerEm * size;
const xOf = (f, size) => ((f.tables.os2 && f.tables.os2.sxHeight) || f.unitsPerEm * 0.52) / f.unitsPerEm * size;

function run(f, text, size, tracking = 0) {
  const s = size / f.unitsPerEm, glyphs = f.stringToGlyphs(text), items = [];
  let x = 0;
  glyphs.forEach((g, i) => {
    items.push({ g, x, ch: text[i] });
    x += g.advanceWidth * s;
    if (i < glyphs.length - 1) x += f.getKerningValue(g, glyphs[i + 1]) * s + tracking;
  });
  const last = glyphs[glyphs.length - 1], first = glyphs[0];
  const width = x - (last.advanceWidth - (last.xMax ?? last.advanceWidth)) * s - (first.xMin || 0) * s;
  return { items, width, lsb: (first.xMin || 0) * s, size };
}
const tracked = (f, text, size, target) => run(f, text, size, (target - run(f, text, size).width) / (text.length - 1));
const pathsOf = (r, x, y) => r.items.map(it => it.g.getPath(x - r.lsb + it.x, y, r.size).toPathData(2));

// glyphs centred in a box, used inside marks
function glyphCentered(f, text, size, cx, cy, tracking = 0) {
  const r = run(f, text, size, tracking);
  const p = new opentype.Path();
  r.items.forEach(it => { p.extend(it.g.getPath(it.x - r.lsb, 0, size)); });
  const bb = p.getBoundingBox();
  const dx = cx - (bb.x1 + bb.x2) / 2, dy = cy - (bb.y1 + bb.y2) / 2;
  return r.items.map(it => it.g.getPath(it.x - r.lsb + dx, dy, size).toPathData(2)).join("");
}

const lg = (id, x1, y1, x2, y2, stops) =>
  `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stops.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a != null ? ` stop-opacity="${a}"` : ""}/>`).join("")}</linearGradient>`;
const spark = (cx, cy, r) => `M${cx} ${cy - r}Q${cx} ${cy} ${cx + r} ${cy}Q${cx} ${cy} ${cx} ${cy + r}Q${cx} ${cy} ${cx - r} ${cy}Q${cx} ${cy} ${cx} ${cy - r}Z`;

// ---------- concepts: mark(ctx) returns inner SVG for a 128 x 120 box ----------
// ctx: { ink, a, b, g (gradient url or ink in mono), id, dark, mono }
const concepts = [
  {
    dir: "03-Circuit", name: "Circuit", ink: "#062B3A", a: "#00C896", b: "#0EA5E9",
    idea: "The N drawn as a circuit trace with connection pads. Clean and engineering-led; teal and green set it apart from the usual blue tech logos.",
    title: ["space-grotesk", 700], sub: ["space-grotesk", 500], layout: "divider",
    mark: c => `<path d="M30 62H13M98 58H115" stroke="${c.ink}" stroke-width="4" stroke-linecap="round"/>
<circle cx="10" cy="62" r="5" fill="none" stroke="${c.ink}" stroke-width="3.5"/><circle cx="118" cy="58" r="5" fill="none" stroke="${c.ink}" stroke-width="3.5"/>
<path d="M30 96V30L98 90V24" fill="none" stroke="${c.g}" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="30" cy="96" r="3" fill="${c.dark ? "#062B3A" : "#fff"}"/><circle cx="98" cy="24" r="3" fill="${c.dark ? "#062B3A" : "#fff"}"/>`,
  },
  {
    dir: "04-Vision-Eye", name: "Vision Eye", ink: "#1E1033", a: "#7C3AED", b: "#EC4899",
    idea: "An eye with a forward arrow for a pupil: vision and \"next\" in one symbol. Violet and pink give it a creative-agency feel suited to marketing.",
    title: ["poppins", 700], sub: ["poppins", 500], layout: "plain",
    mark: c => `<g transform="translate(3.2 -0.8) scale(1.9)"><path d="M4 32C13 17 22 12 32 12s19 5 28 20c-9 15-18 20-28 20S13 47 4 32Z" fill="none" stroke="${c.ink}" stroke-width="4.2" stroke-linejoin="round"/></g>
<circle cx="64" cy="60" r="25" fill="${c.g}"/>
<path d="M58 47.5l12.5 12.5L58 72.5" fill="none" stroke="#fff" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  },
  {
    dir: "05-Hex-Chip", name: "Hex Chip", ink: "#1B1F2A", a: "#FF7A1A", b: "#FFB347",
    idea: "A processor chip in a hexagon with the N at its core. Orange on charcoal is bold and rare in this industry, so it is easy to remember.",
    title: ["orbitron", 700], sub: ["space-grotesk", 500], layout: "stacked",
    mark: c => `<path d="M108 60 86 98.1H42L20 60 42 21.9H86Z" fill="none" stroke="${c.g}" stroke-width="7" stroke-linejoin="round"/>
<path d="M53 21.9V11M64 21.9V8M75 21.9V11M53 98.1V109M64 98.1V112M75 98.1V109" stroke="${c.ink}" stroke-width="4" stroke-linecap="round"/>
<path d="${glyphCentered(font("orbitron", 800), "N", 50, 64, 60)}" fill="${c.ink}"/>`,
  },
  {
    dir: "06-NV-Block", name: "NV Block", ink: "#0B2540", a: "#00C2B8", b: "#2563EB",
    idea: "A solid tile with NV cut out of it, like an app icon. Works at every size and drops straight into social media profile pictures.",
    title: ["montserrat", 800], sub: ["montserrat", 500], layout: "plain",
    mark: c => `<defs><mask id="${c.id}k" maskUnits="userSpaceOnUse" x="0" y="0" width="128" height="120"><rect width="128" height="120" fill="#fff"/>
<path d="${glyphCentered(font("montserrat", 800), "NV", 52, 64, 62, -1)}" fill="#000"/>
<rect x="92" y="18" width="7" height="7" rx="1.5" fill="#000"/><rect x="102" y="12" width="5" height="5" rx="1" fill="#000"/></mask></defs>
<rect x="8" y="4" width="112" height="112" rx="30" fill="${c.g}" mask="url(#${c.id}k)"/>`,
  },
  {
    dir: "07-Neural-Node", name: "Neural Node", ink: "#1A1240", a: "#D946EF", b: "#6366F1",
    idea: "The N as a small neural network: four nodes joined by connections. The most direct AI signal of the set.",
    title: ["sora", 700], sub: ["sora", 500], layout: "divider",
    mark: c => `<path d="M28 96V26L100 94V24M100 24 117 9" fill="none" stroke="${c.g}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M28 26 100 24M28 96 100 94" stroke="${c.ink}" stroke-width="2" stroke-dasharray="3 6" stroke-linecap="round" opacity=".45"/>
<circle cx="28" cy="96" r="10" fill="${c.ink}"/><circle cx="100" cy="24" r="10" fill="${c.ink}"/>
<circle cx="28" cy="26" r="10" fill="${c.g}"/><circle cx="100" cy="94" r="10" fill="${c.g}"/>
<circle cx="64" cy="60" r="6.5" fill="${c.ink}"/><circle cx="117" cy="9" r="5" fill="${c.g}"/>`,
  },
  {
    dir: "08-Target-Click", name: "Target Click", ink: "#14213D", a: "#FF5A5F", b: "#FF9F43",
    idea: "A cursor clicking on a target: websites and marketing that hit the goal. Warm coral reads as energetic and friendly.",
    title: ["poppins", 700], sub: ["poppins", 500], layout: "stacked",
    mark: c => `<defs><mask id="${c.id}k" maskUnits="userSpaceOnUse" x="0" y="0" width="128" height="120"><rect width="128" height="120" fill="#fff"/>
<path d="M64 56V112L77 99 87 119 98 114 88 94H106Z" fill="#000" stroke="#000" stroke-width="10" stroke-linejoin="round"/></mask></defs>
<g mask="url(#${c.id}k)"><circle cx="58" cy="54" r="43" fill="none" stroke="${c.ink}" stroke-width="6"/>
<circle cx="58" cy="54" r="27" fill="none" stroke="${c.g}" stroke-width="7"/><circle cx="58" cy="54" r="10" fill="${c.g}"/></g>
<path d="M64 56V112L77 99 87 119 98 114 88 94H106Z" fill="${c.ink}" stroke="${c.ink}" stroke-width="3" stroke-linejoin="round"/>`,
  },
  {
    dir: "09-Code-Eye", name: "Code Eye", ink: "#111827", a: "#F59E0B", b: "#F97316",
    idea: "Code brackets around an eye: a developer studio with vision. Amber on near-black looks confident and stands out on dark websites.",
    title: ["space-grotesk", 700], sub: ["space-grotesk", 500], layout: "plain",
    mark: c => `<path d="M40 30 13 60 40 90M88 30 115 60 88 90" fill="none" stroke="${c.ink}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="64" cy="60" r="17" fill="${c.g}"/><circle cx="69.5" cy="54.5" r="5.5" fill="${c.dark ? "#111827" : "#fff"}"/>`,
  },
  {
    dir: "10-Cloud-Up", name: "Cloud Up", ink: "#0F1E3D", a: "#0EA5E9", b: "#6366F1",
    idea: "A cloud with an upload arrow: SaaS and cloud products that keep growing. Friendly and very clear, even at small sizes.",
    title: ["sora", 700], sub: ["sora", 500], layout: "divider",
    mark: c => `<defs><mask id="${c.id}k" maskUnits="userSpaceOnUse" x="0" y="0" width="128" height="120"><rect width="128" height="120" fill="#fff"/>
<path d="M66 86V56M53 69 66 56 79 69" fill="none" stroke="#000" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></mask></defs>
<g mask="url(#${c.id}k)" fill="${c.g}"><circle cx="38" cy="70" r="26"/><circle cx="66" cy="50" r="33"/><circle cx="96" cy="72" r="24"/><rect x="38" y="70" width="58" height="26"/></g>`,
  },
  {
    dir: "11-Bit-N", name: "Bit N", ink: "#0B2027", a: "#06B6D4", b: "#22C55E",
    idea: "An N built from pixels, like an early computer screen. Playful and digital; cyan to green feels fresh and modern.",
    title: ["orbitron", 700], sub: ["space-grotesk", 500], layout: "plain",
    mark: c => {
      const rows = ["#....#", "##...#", "#.#..#", "#..#.#", "#...##", "#....#"];
      const cs = 17, gap = 2.5, ox = 6.75, oy = 2.75;
      let s = "";
      rows.forEach((r, y) => [...r].forEach((ch, x) => {
        if (ch !== "#") return;
        const diag = x === y && x > 0 && x < 5;
        s += `<rect x="${ox + x * (cs + gap)}" y="${oy + y * (cs + gap)}" width="${cs}" height="${cs}" rx="3.5" fill="${diag ? c.ink : c.g}"/>`;
      }));
      return s;
    },
  },
  {
    dir: "12-Shield-Spark", name: "Shield Spark", ink: "#0B1533", a: "#C9971C", b: "#F5D46B",
    idea: "A shield holding an AI spark: trusted, secure AI. Gold on navy is the most premium look of the set, good for corporate clients.",
    title: ["montserrat", 700], sub: ["montserrat", 500], layout: "stacked", titleTrack: 3,
    mark: c => `<path d="M64 6 108 22V56C108 86 89 104 64 114 39 104 20 86 20 56V22Z" fill="${c.dark || c.mono ? "none" : c.ink}" stroke="${c.g}" stroke-width="5" stroke-linejoin="round"/>
<path d="${spark(62, 62, 27)}" fill="${c.g}"/><path d="${spark(86, 38, 9)}" fill="${c.g}"/>`,
  },
  {
    dir: "13-nv-Wordmark", name: "nv. Wordmark", ink: "#0F172A", a: "#3B82F6", b: "#06B6D4",
    idea: "A lowercase wordmark with a coloured dot, in the style of modern SaaS brands. No separate symbol; the short form \"nv.\" is the icon.",
    title: ["poppins", 800], sub: ["poppins", 500], layout: "wordmark",
    mark: c => `<path d="${glyphCentered(font("poppins", 800), "nv", 76, 56, 60, -2)}" fill="${c.ink}"/><circle cx="110" cy="80" r="9" fill="${c.g}"/>`,
  },
  {
    dir: "14-Spark-N", name: "Spark N", ink: "#2B1638", a: "#FF6B4A", b: "#FFB020",
    idea: "A bold N with an AI sparkle at its corner, the symbol people now link with AI tools. Simple, warm and modern.",
    title: ["sora", 800], sub: ["sora", 500], layout: "plain",
    mark: c => `<defs><mask id="${c.id}k" maskUnits="userSpaceOnUse" x="0" y="0" width="128" height="120"><rect width="128" height="120" fill="#fff"/>
<path d="${spark(100, 26, 24)}" fill="#000" stroke="#000" stroke-width="9" stroke-linejoin="round"/></mask></defs>
<path d="${glyphCentered(font("sora", 800), "N", 118, 56, 64)}" fill="${c.ink}" mask="url(#${c.id}k)"/>
<path d="${spark(100, 26, 24)}" fill="${c.g}"/>`,
  },
];

// ---------- rendering ----------
function ctx(cn, theme, mono, id) {
  const dark = theme === "dark";
  const ink = dark ? "#FFFFFF" : cn.ink;
  return { ink, a: cn.a, b: cn.b, dark, mono, id, g: mono ? ink : `url(#${id}g)` };
}
function markSVG(cn, theme, mono, id) {
  const c = ctx(cn, theme, mono, id);
  const defs = mono ? "" : `<defs>${lg(id + "g", 10, 110, 118, 10, [[0, cn.a], [1, cn.b]])}</defs>`;
  return defs + cn.mark(c);
}

function wordmark(cn, theme, mono, id, x, y, tagline) {
  const c = ctx(cn, theme, mono, id);
  const tf = font(...cn.title), sf = font(...cn.sub);
  const isWord = cn.layout === "wordmark";
  const text = isWord ? "nextvision" : "NEXT VISION";
  const size = isWord ? 58 : 42;
  const r = run(tf, text, size, cn.titleTrack ?? (isWord ? -1.5 : 0.5));
  const top = isWord ? tf.tables.os2.sTypoAscender / tf.unitsPerEm * size * 0.86 : capOf(tf, size);
  const base = y + top;
  let svg = `<path d="${pathsOf(r, x, base).join("")}" fill="${c.ink}"/>`;
  let width = r.width;
  if (isWord) {
    svg += `<circle cx="${(x + r.width + 9).toFixed(2)}" cy="${(base - 5.5).toFixed(2)}" r="6.5" fill="${mono ? c.ink : cn.a}"/>`;
    width += 16;
  }
  const subSize = isWord ? 14 : 16;
  const sub = tracked(sf, "TECHNOLOGIES", subSize, width);
  const subBase = base + (isWord ? 14 : 14) + capOf(sf, subSize);
  svg += `<path d="${pathsOf(sub, x, subBase).join("")}" fill="${c.ink}" opacity=".78"/>`;
  let bottom = subBase;
  if (tagline) {
    const words = ["A.I", "SAAS", "WEBSITE", "MARKETING"].map(w => run(sf, w, 11.5, 1));
    const gap = (width - words.reduce((s, w) => s + w.width, 0)) / 3;
    const tb = subBase + 16 + capOf(sf, 11.5);
    let cx = x, d = "", dots = "";
    words.forEach((w, i) => {
      d += pathsOf(w, cx, tb).join(""); cx += w.width;
      if (i < 3) { dots += `<circle cx="${(cx + gap / 2).toFixed(2)}" cy="${(tb - capOf(sf, 11.5) / 2).toFixed(2)}" r="2" fill="${mono ? c.ink : cn.a}"/>`; cx += gap; }
    });
    svg += `<path d="${d}" fill="${c.ink}" opacity=".7"/>${dots}`;
    bottom = tb;
  }
  return { svg, width, height: bottom - y };
}

const wrap = (inner, w, h, pad) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-pad} ${-pad} ${(w + 2 * pad).toFixed(2)} ${(h + 2 * pad).toFixed(2)}" width="${Math.round(w + 2 * pad)}" height="${Math.round(h + 2 * pad)}">
<title>Next Vision Technologies</title>
${inner}
</svg>
`;

function lockup(cn, theme, mono) {
  const id = cn.dir.slice(0, 2) + theme[0] + (mono ? "m" : "");
  if (cn.layout === "wordmark") {
    const wm = wordmark(cn, theme, mono, id, 0, 0, false);
    return wrap(wm.svg, wm.width, wm.height, 24);
  }
  if (cn.layout === "stacked") {
    const probe = wordmark(cn, theme, mono, id, 0, 0, true);
    const s = 1.1, mw = 128 * s, mh = 120 * s, W = Math.max(mw, probe.width);
    const wm = wordmark(cn, theme, mono, id, (W - probe.width) / 2, mh + 26, true);
    return wrap(`<g transform="translate(${((W - mw) / 2).toFixed(2)} 0) scale(${s})">${markSVG(cn, theme, mono, id + "m")}</g>\n${wm.svg}`, W, mh + 26 + wm.height, 32);
  }
  const probe = wordmark(cn, theme, mono, id, 0, 0, false);
  const mh = 90, s = mh / 120, mw = 128 * s;
  const divider = cn.layout === "divider";
  const tx = mw + (divider ? 44 : 26);
  const H = Math.max(mh, probe.height), ty = (H - probe.height) / 2;
  const wm = wordmark(cn, theme, mono, id, tx, ty, false);
  const ink = theme === "dark" ? "#FFFFFF" : cn.ink;
  return wrap(`<g transform="translate(0 ${((H - mh) / 2).toFixed(2)}) scale(${s})">${markSVG(cn, theme, mono, id + "m")}</g>
${divider ? `<rect x="${(mw + 21).toFixed(2)}" y="${(H * 0.12).toFixed(2)}" width="1.6" height="${(H * 0.76).toFixed(2)}" fill="${ink}" opacity=".22"/>` : ""}
${wm.svg}`, tx + wm.width, H, 24);
}

function icon(cn, theme) { return wrap(markSVG(cn, theme, false, cn.dir.slice(0, 2) + "i" + theme[0]), 128, 120, 8); }

function appIcon(cn) {
  const id = cn.dir.slice(0, 2) + "app";
  const s = 5.9, mw = 128 * s, mh = 120 * s;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
<title>Next Vision Technologies</title>
<defs>${lg(id + "bg", 0, 0, 1024, 1024, [[0, cn.ink], [1, "#05070D"]])}
<radialGradient id="${id}gl" cx=".8" cy=".18" r=".65"><stop offset="0" stop-color="${cn.b}" stop-opacity=".22"/><stop offset="1" stop-color="${cn.b}" stop-opacity="0"/></radialGradient></defs>
<rect width="1024" height="1024" rx="228" fill="url(#${id}bg)"/><rect width="1024" height="1024" rx="228" fill="url(#${id}gl)"/>
<g transform="translate(${((1024 - mw) / 2).toFixed(1)} ${((1024 - mh) / 2).toFixed(1)}) scale(${s})">${markSVG(cn, "dark", false, id + "m")}</g>
</svg>
`;
}

function save(dir, name, svg, widths) {
  const d = path.join(OUT, dir);
  fs.mkdirSync(path.join(d, "svg"), { recursive: true });
  fs.mkdirSync(path.join(d, "png"), { recursive: true });
  fs.writeFileSync(path.join(d, "svg", name + ".svg"), svg);
  for (const w of widths) {
    const png = new Resvg(svg, { fitTo: { mode: "width", value: w } }).render().asPng();
    fs.writeFileSync(path.join(d, "png", name + (widths.length > 1 ? `-${w}` : "") + ".png"), png);
  }
}

const meta = [];
for (const cn of concepts) {
  save(cn.dir, "logo-on-light", lockup(cn, "light", false), [2400]);
  save(cn.dir, "logo-on-dark", lockup(cn, "dark", false), [2400]);
  save(cn.dir, "mono-navy", lockup(cn, "light", true), [2400]);
  save(cn.dir, "mono-white", lockup(cn, "dark", true), [2400]);
  save(cn.dir, "icon-on-light", icon(cn, "light"), [1024]);
  save(cn.dir, "icon-on-dark", icon(cn, "dark"), [1024]);
  save(cn.dir, "app-icon", appIcon(cn), [1024, 512, 192, 32]);
  meta.push({ dir: cn.dir, name: cn.name, idea: cn.idea, ink: cn.ink, a: cn.a, b: cn.b, font: cn.title[0], layout: cn.layout });
}
fs.writeFileSync(path.join(__dirname, "round3.json"), JSON.stringify(meta, null, 1));
console.log("done", concepts.length);

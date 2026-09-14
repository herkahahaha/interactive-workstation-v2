/* ================================================================
   helpers
================================================================ */
const INK = "#33302B";
const $ = (s) => document.querySelector(s);
function fatLine(x1, y1, x2, y2, color, w) {
  return (
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${INK}" stroke-width="${w + 4.5}" stroke-linecap="round"/>` +
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`
  );
}
/* tiny ui sounds */
let AC = null;
function pop(f = 560, dur = 0.09, vol = 0.06) {
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    if (AC.state === "suspended") AC.resume();
    const o = AC.createOscillator(),
      g = AC.createGain();
    o.type = "triangle";
    o.frequency.value = f;
    g.gain.setValueAtTime(vol, AC.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, AC.currentTime + dur);
    o.connect(g);
    g.connect(AC.destination);
    o.start();
    o.stop(AC.currentTime + dur + 0.02);
  } catch (e) {}
}
function chord() {
  pop(523, 0.12, 0.05);
  setTimeout(() => pop(659, 0.12, 0.05), 100);
  setTimeout(() => pop(784, 0.18, 0.05), 200);
}

/* ================================================================
   SVG drawers (local coords, reused for room + card icons + receipt)
================================================================ */
function deskOak() {
  const w = "#C98A4B",
    d = "#8C5A2B";
  return `<rect x="18" y="16" width="15" height="199" fill="${d}" stroke="${INK}" stroke-width="5"/>
  <rect x="257" y="16" width="15" height="199" fill="${d}" stroke="${INK}" stroke-width="5"/>
  <rect x="24" y="152" width="242" height="9" fill="${d}" stroke="${INK}" stroke-width="4"/>
  <rect x="186" y="30" width="88" height="62" rx="6" fill="${w}" stroke="${INK}" stroke-width="5"/>
  <line x1="191" y1="61" x2="269" y2="61" stroke="${INK}" stroke-width="4"/>
  <circle cx="230" cy="45" r="4.5" fill="${INK}"/><circle cx="230" cy="77" r="4.5" fill="${INK}"/>
  <rect x="0" y="0" width="290" height="16" rx="7" fill="${w}" stroke="${INK}" stroke-width="5"/>`;
}
function deskStanding() {
  const leg = "#5F6B76",
    foot = "#93A0AB";
  return `<rect x="52" y="14" width="13" height="188" fill="${leg}" stroke="${INK}" stroke-width="4.5"/>
  <rect x="225" y="14" width="13" height="188" fill="${leg}" stroke="${INK}" stroke-width="4.5"/>
  <rect x="12" y="200" width="93" height="12" rx="6" fill="${foot}" stroke="${INK}" stroke-width="4.5"/>
  <rect x="185" y="200" width="93" height="12" rx="6" fill="${foot}" stroke="${INK}" stroke-width="4.5"/>
  <rect x="65" y="96" width="160" height="9" rx="4" fill="${foot}" stroke="${INK}" stroke-width="4"/>
  <circle cx="220" cy="50" r="9" fill="#FFD166" stroke="${INK}" stroke-width="4"/>
  <line x1="58" y1="120" x2="66" y2="120" stroke="${INK}" stroke-width="3"/>
  <line x1="58" y1="150" x2="66" y2="150" stroke="${INK}" stroke-width="3"/>
  <rect x="0" y="0" width="290" height="14" rx="7" fill="#EDE7DF" stroke="${INK}" stroke-width="5"/>`;
}
function deskGamer() {
  const b = "#2A2E35",
    r = "#E0442E";
  return `<defs><linearGradient id="rgbg" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#FF5E5B"/><stop offset=".35" stop-color="#FFD166"/>
    <stop offset=".7" stop-color="#06D6A0"/><stop offset="1" stop-color="#6FB1FF"/></linearGradient></defs>
  <polygon points="26,16 8,204 26,204 44,16" fill="${b}" stroke="${INK}" stroke-width="4.5"/>
  <polygon points="264,16 282,204 264,204 246,16" fill="${b}" stroke="${INK}" stroke-width="4.5"/>
  <rect x="14" y="196" width="44" height="11" rx="5" fill="${r}" stroke="${INK}" stroke-width="4"/>
  <rect x="232" y="196" width="44" height="11" rx="5" fill="${r}" stroke="${INK}" stroke-width="4"/>
  <rect x="0" y="0" width="290" height="17" rx="6" fill="${b}" stroke="${INK}" stroke-width="5"/>
  <rect x="8" y="17" width="274" height="7" rx="3.5" fill="url(#rgbg)"/>
  <rect x="268" y="34" width="26" height="9" rx="4" fill="${r}" stroke="${INK}" stroke-width="4"/>`;
}
function chairErgo() {
  const c = "#6B7B8C",
    d = "#46525F";
  return `<rect x="16" y="0" width="16" height="26" rx="7" fill="${d}" stroke="${INK}" stroke-width="4.5"/>
  <rect x="9" y="22" width="26" height="100" rx="12" fill="${c}" stroke="${INK}" stroke-width="5"/>
  <line x1="15" y1="52" x2="29" y2="52" stroke="${INK}" stroke-width="3.5"/>
  <line x1="15" y1="64" x2="29" y2="64" stroke="${INK}" stroke-width="3.5"/>
  <rect x="5" y="120" width="105" height="20" rx="9" fill="${c}" stroke="${INK}" stroke-width="5"/>
  <rect x="44" y="96" width="10" height="26" fill="${d}" stroke="${INK}" stroke-width="4"/>
  <rect x="34" y="88" width="34" height="10" rx="5" fill="${d}" stroke="${INK}" stroke-width="4"/>
  <rect x="50" y="140" width="14" height="26" fill="${d}" stroke="${INK}" stroke-width="4.5"/>
  ${fatLine(57, 164, 20, 195, d, 8)}${fatLine(57, 164, 57, 197, d, 8)}${fatLine(57, 164, 94, 195, d, 8)}
  <circle cx="20" cy="196" r="8" fill="${INK}"/><circle cx="57" cy="198" r="8" fill="${INK}"/><circle cx="94" cy="196" r="8" fill="${INK}"/>`;
}
function chairGaming() {
  const b = "#23262C",
    r = "#E0442E";
  return `<rect x="12" y="0" width="17" height="22" rx="8" fill="${r}" stroke="${INK}" stroke-width="4.5"/>
  <rect x="5" y="18" width="31" height="104" rx="14" fill="${b}" stroke="${INK}" stroke-width="5"/>
  <rect x="11" y="34" width="6" height="76" rx="3" fill="${r}"/>
  <rect x="24" y="34" width="6" height="76" rx="3" fill="${r}"/>
  <rect x="1" y="122" width="107" height="20" rx="10" fill="${b}" stroke="${INK}" stroke-width="5"/>
  <rect x="84" y="126" width="18" height="12" rx="6" fill="${r}"/>
  <rect x="44" y="98" width="10" height="26" fill="${b}" stroke="${INK}" stroke-width="4"/>
  <rect x="32" y="90" width="36" height="10" rx="5" fill="${r}" stroke="${INK}" stroke-width="4"/>
  <rect x="49" y="142" width="14" height="24" fill="${b}" stroke="${INK}" stroke-width="4.5"/>
  ${fatLine(56, 164, 20, 195, "#23262C", 8)}${fatLine(56, 164, 56, 197, "#23262C", 8)}${fatLine(56, 164, 92, 195, "#23262C", 8)}
  <circle cx="20" cy="196" r="8" fill="${INK}"/><circle cx="56" cy="198" r="8" fill="${INK}"/><circle cx="92" cy="196" r="8" fill="${INK}"/>`;
}
function chairWood() {
  const w = "#C98A4B",
    d = "#8C5A2B";
  return `${fatLine(14, 127, 6, 202, d, 7)}${fatLine(52, 127, 52, 202, d, 7)}${fatLine(90, 127, 98, 202, d, 7)}${fatLine(10, 166, 94, 166, d, 4)}
  <rect x="12" y="10" width="13" height="103" fill="${d}" stroke="${INK}" stroke-width="4.5"/>
  <rect x="0" y="0" width="40" height="11" rx="5" fill="${w}" stroke="${INK}" stroke-width="4.5"/>
  <rect x="0" y="112" width="104" height="15" rx="6" fill="${w}" stroke="${INK}" stroke-width="5"/>`;
}
function monitor(withKb = true) {
  let keys = "";
  for (let x = 40; x <= 100; x += 12)
    keys += `<line x1="${x}" y1="121" x2="${x}" y2="129" stroke="${INK}" stroke-width="2.2"/>`;
  let s = `<rect x="66" y="70" width="15" height="36" fill="#4A5058" stroke="${INK}" stroke-width="4"/>
  <rect x="22" y="102" width="104" height="12" rx="6" fill="#4A5058" stroke="${INK}" stroke-width="4.5"/>
  <rect x="0" y="0" width="150" height="74" rx="9" fill="#2A2E35" stroke="${INK}" stroke-width="5"/>
  <rect class="scr" x="9" y="9" width="132" height="56" rx="4" fill="#CDEFF7"/>
  <g stroke-linecap="round">
    <line x1="20" y1="22" x2="48" y2="22" stroke="#E0442E" stroke-width="6"/>
    <line x1="56" y1="22" x2="76" y2="22" stroke="#1B9AAA" stroke-width="6"/>
    <line x1="20" y1="36" x2="86" y2="36" stroke="#1B9AAA" stroke-width="6"/>
    <line x1="96" y1="36" x2="122" y2="36" stroke="#E0442E" stroke-width="6"/>
    <line x1="20" y1="50" x2="64" y2="50" stroke="#F4A259" stroke-width="6"/>
    <line x1="72" y1="50" x2="100" y2="50" stroke="#1B9AAA" stroke-width="6"/>
  </g>
  <circle cx="139" cy="68" r="3" fill="#7CFFB2"/>`;
  if (withKb)
    s += `<rect x="26" y="118" width="94" height="15" rx="5" fill="#EDE7DF" stroke="${INK}" stroke-width="4.5"/>
  ${keys}
  <ellipse cx="139" cy="127" rx="10" ry="7.5" fill="#EDE7DF" stroke="${INK}" stroke-width="4.5"/>`;
  return s;
}
function lampDraw() {
  const t = "#1FA793";
  return `<path class="lampbeam" d="M62 50 L98 46 L132 148 L56 148 Z" fill="#FFE9A8"/>
  <ellipse cx="25" cy="138" rx="25" ry="9" fill="${t}" stroke="${INK}" stroke-width="5"/>
  ${fatLine(23, 131, 42, 54, "#4A5058", 7)}
  <circle cx="42" cy="54" r="6.5" fill="${INK}"/>
  ${fatLine(42, 54, 72, 28, "#4A5058", 7)}
  <path d="M52 36 L96 14 L102 46 L60 50 Z" fill="${t}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
  <circle cx="80" cy="36" r="6" fill="#FFE28A" stroke="${INK}" stroke-width="3.5"/>`;
}
function pcTower() {
  let vents = "";
  for (let i = 0; i < 5; i++)
    vents += `<line x1="12" y1="${16 + i * 7}" x2="60" y2="${16 + i * 7}" stroke="#596066" stroke-width="3"/>`;
  return `<rect x="0" y="0" width="72" height="150" rx="9" fill="#2A2E35" stroke="${INK}" stroke-width="5"/>
  <rect x="10" y="10" width="52" height="37" rx="5" fill="#39404A" stroke="${INK}" stroke-width="3.5"/>
  ${vents}
  <circle cx="36" cy="68" r="15" fill="#39404A" stroke="${INK}" stroke-width="3.5"/>
  <path d="M36 68 L36 56 M36 68 L46 75 M36 68 L26 75" stroke="#8FD8C8" stroke-width="3.5" stroke-linecap="round"/>
  <circle cx="36" cy="68" r="3.5" fill="#FFD166"/>
  <rect x="10" y="92" width="52" height="46" rx="5" fill="#1E242C" stroke="${INK}" stroke-width="3.5"/>
  <circle cx="22" cy="112" r="4" fill="#06D6A0"/><circle cx="36" cy="112" r="4" fill="#FFD166"/><circle cx="50" cy="112" r="4" fill="#E0442E"/>
  <circle cx="22" cy="126" r="3" fill="#6FB1FF"/><circle cx="36" cy="126" r="3" fill="#8FD8C8"/>`;
}
function plantBig() {
  const g1 = "#2E8B57",
    g2 = "#3E9B5F",
    g3 = "#57B26E";
  return `${fatLine(55, 126, 55, 64, "#256B43", 5)}${fatLine(55, 126, 28, 84, "#256B43", 5)}${fatLine(55, 126, 82, 84, "#256B43", 5)}
  <ellipse cx="55" cy="56" rx="16" ry="30" fill="${g1}" stroke="${INK}" stroke-width="4.5"/>
  <ellipse cx="28" cy="80" rx="13" ry="27" fill="${g2}" stroke="${INK}" stroke-width="4.5" transform="rotate(-24 28 80)"/>
  <ellipse cx="82" cy="80" rx="13" ry="27" fill="${g3}" stroke="${INK}" stroke-width="4.5" transform="rotate(24 82 80)"/>
  <ellipse cx="55" cy="94" rx="11" ry="22" fill="${g2}" stroke="${INK}" stroke-width="4.5"/>
  <path d="M27 130 L83 130 L76 182 L34 182 Z" fill="#E07B54" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
  <rect x="22" y="119" width="66" height="13" rx="5" fill="#C96A48" stroke="${INK}" stroke-width="5"/>`;
}
function plantSmall() {
  return `<ellipse cx="28" cy="18" rx="7" ry="13" fill="#3E9B5F" stroke="${INK}" stroke-width="3.5"/>
  <ellipse cx="17" cy="22" rx="6" ry="10" fill="#2E8B57" stroke="${INK}" stroke-width="3.5" transform="rotate(-22 17 22)"/>
  <ellipse cx="39" cy="22" rx="6" ry="10" fill="#57B26E" stroke="${INK}" stroke-width="3.5" transform="rotate(22 39 22)"/>
  <path d="M13 34 L43 34 L38 48 L18 48 Z" fill="#C96A48" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
}
function rug() {
  return `<ellipse cx="125" cy="46" rx="122" ry="38" fill="#F28DA0" stroke="${INK}" stroke-width="5"/>
  <ellipse cx="125" cy="46" rx="94" ry="26" fill="none" stroke="#FFF3E2" stroke-width="5" stroke-dasharray="15 11"/>
  <ellipse cx="125" cy="46" rx="52" ry="13" fill="#F7B2C0"/>`;
}
function coffeeStation() {
  const w = "#C98A4B",
    d = "#8C5A2B",
    red = "#E8604C";
  return `<g class="steam">
    <path d="M30 62 q6 -8 0 -15 q-6 -7 2 -13" fill="none" stroke="#9FB4BE" stroke-width="5" stroke-linecap="round"/>
    <path d="M42 66 q6 -8 0 -15 q-6 -7 2 -13" fill="none" stroke="#9FB4BE" stroke-width="5" stroke-linecap="round"/>
  </g>
  ${fatLine(16, 101, 16, 186, d, 8)}${fatLine(146, 101, 146, 186, d, 8)}
  <rect x="0" y="88" width="162" height="13" rx="5" fill="${w}" stroke="${INK}" stroke-width="5"/>
  <rect x="10" y="152" width="142" height="9" rx="4" fill="${w}" stroke="${INK}" stroke-width="4"/>
  <rect x="96" y="30" width="54" height="58" rx="7" fill="${red}" stroke="${INK}" stroke-width="5"/>
  <rect x="104" y="18" width="20" height="16" rx="4" fill="#5B3A30" stroke="${INK}" stroke-width="4"/>
  <rect x="106" y="58" width="30" height="24" rx="4" fill="#CDEFF7" stroke="${INK}" stroke-width="3.5"/>
  <line x1="106" y1="70" x2="136" y2="70" stroke="${INK}" stroke-width="3"/>
  <rect x="22" y="70" width="24" height="18" rx="4" fill="#FFF8EC" stroke="${INK}" stroke-width="4.5"/>
  <path d="M46 74 q11 5 0 12" fill="none" stroke="${INK}" stroke-width="4"/>`;
}
function bike() {
  const t = "#1B9AAA";
  const wheel = (cx) => {
    let sp = "";
    for (let a = 0; a < 6; a++) {
      const rad = (a * Math.PI) / 3 + 0.35;
      sp += `<line x1="${cx}" y1="132" x2="${(cx + 26 * Math.cos(rad)).toFixed(1)}" y2="${(132 + 26 * Math.sin(rad)).toFixed(1)}" stroke="#9AA6AD" stroke-width="3.5"/>`;
    }
    return `<circle cx="${cx}" cy="132" r="34" fill="#FBF7F0" stroke="${INK}" stroke-width="10"/>${sp}<circle cx="${cx}" cy="132" r="34" fill="none" stroke="${INK}" stroke-width="3"/><circle cx="${cx}" cy="132" r="6" fill="${INK}"/>`;
  };
  return `${wheel(42)}${wheel(150)}
  <path d="M42 132 L84 74 L128 74 L150 132" fill="none" stroke="${INK}" stroke-width="14" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="M42 132 L84 74 L128 74 L150 132" fill="none" stroke="${t}" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="M84 74 L90 132 L150 132" fill="none" stroke="${INK}" stroke-width="13" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="M84 74 L90 132 L150 132" fill="none" stroke="${t}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="M128 74 L136 42" fill="none" stroke="${INK}" stroke-width="12" stroke-linecap="round"/>
  <path d="M128 74 L136 42" fill="none" stroke="#39404A" stroke-width="7" stroke-linecap="round"/>
  <path d="M136 42 L112 38" fill="none" stroke="${INK}" stroke-width="11" stroke-linecap="round"/>
  <path d="M136 42 L112 38" fill="none" stroke="#39404A" stroke-width="6" stroke-linecap="round"/>
  <path d="M84 74 L76 48" fill="none" stroke="${INK}" stroke-width="12" stroke-linecap="round"/>
  <path d="M84 74 L76 48" fill="none" stroke="#39404A" stroke-width="7" stroke-linecap="round"/>
  <rect x="54" y="40" width="42" height="11" rx="5" fill="#39404A" stroke="${INK}" stroke-width="4.5"/>
  <circle cx="90" cy="126" r="9" fill="#39404A" stroke="${INK}" stroke-width="4.5"/>
  <line x1="90" y1="126" x2="103" y2="112" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
  <line x1="96" y1="136" x2="112" y2="164" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`;
}
function beanbag() {
  return `<path d="M75 10 C128 10 146 52 138 82 C130 106 100 112 75 112 C50 112 20 106 12 82 C4 52 22 10 75 10 Z" fill="#E9B44C" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
  <path d="M75 12 C90 52 88 80 75 110" fill="none" stroke="#C99334" stroke-width="5"/>
  <ellipse cx="48" cy="36" rx="13" ry="7" fill="#F5D06F" transform="rotate(-28 48 36)"/>`;
}
function floorLamp() {
  const t = "#1FA793";
  return `<path class="lampbeam" d="M8 64 L52 64 L74 220 L-14 220 Z" fill="#FFE9A8"/>
  <ellipse cx="30" cy="221" rx="25" ry="9" fill="#39404A" stroke="${INK}" stroke-width="5"/>
  ${fatLine(30, 214, 30, 62, "#39404A", 7)}
  <path d="M3 62 L57 62 L45 12 L15 12 Z" fill="${t}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`;
}
function toolChest() {
  const red = "#E8604C",
    cr = "#F2E9DC";
  return `<rect x="0" y="0" width="135" height="104" rx="9" fill="${red}" stroke="${INK}" stroke-width="5"/>
  <rect x="10" y="11" width="115" height="23" rx="5" fill="${cr}" stroke="${INK}" stroke-width="4"/>
  <rect x="10" y="41" width="115" height="23" rx="5" fill="${cr}" stroke="${INK}" stroke-width="4"/>
  <rect x="10" y="71" width="115" height="23" rx="5" fill="${cr}" stroke="${INK}" stroke-width="4"/>
  <rect x="52" y="20" width="31" height="6" rx="3" fill="${INK}"/>
  <rect x="52" y="50" width="31" height="6" rx="3" fill="${INK}"/>
  <rect x="52" y="80" width="31" height="6" rx="3" fill="${INK}"/>`;
}
function tire() {
  let sp = "";
  [0, 60, 120, 180, 240, 300].forEach((a) => {
    const r = (Math.PI * a) / 180;
    sp += `<line x1="48" y1="48" x2="${(48 + 13 * Math.cos(r)).toFixed(1)}" y2="${(48 + 13 * Math.sin(r)).toFixed(1)}" stroke="${INK}" stroke-width="4"/>`;
  });
  return `<circle cx="48" cy="48" r="43" fill="#313639" stroke="${INK}" stroke-width="6"/>
  <circle cx="48" cy="48" r="30" fill="none" stroke="#596066" stroke-width="7" stroke-dasharray="10 9"/>
  <circle cx="48" cy="48" r="15" fill="#C9CDD2" stroke="${INK}" stroke-width="5"/>
  ${sp}<circle cx="48" cy="48" r="4" fill="${INK}"/>`;
}
function helmetSVG(x, y) {
  return `<g>
  <line x1="${x}" y1="${y - 10}" x2="${x}" y2="${y + 2}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
  <path d="M${x - 32} ${y + 34} Q${x - 32} ${y + 4} ${x} ${y + 4} Q${x + 32} ${y + 4} ${x + 32} ${y + 34} Z" fill="#FFD166" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
  <line x1="${x - 32}" y1="${y + 34}" x2="${x + 32}" y2="${y + 34}" stroke="${INK}" stroke-width="5"/>
  <path d="M${x - 14} ${y + 34} L${x - 14} ${y + 48}" stroke="${INK}" stroke-width="4"/>
  <path d="M${x + 14} ${y + 34} L${x + 14} ${y + 48}" stroke="${INK}" stroke-width="4"/>
  <path d="M${x - 20} ${y + 12} q10 -8 20 -2" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
  <path d="M${x + 2} ${y + 10} q10 -6 18 0" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/></g>`;
}

/* ================================================================
   catalog + state
================================================================ */
const CATALOG = {
  desk: {
    oak: {
      name: "Oak Classic",
      price: 12,
      blurb: "Warm wood, drawer for snacks",
      vb: "-6 -6 306 227",
      draw: deskOak,
    },
    standing: {
      name: "Stand-Up Pro",
      price: 19,
      blurb: "Crank it up, stretch those legs",
      vb: "-6 -6 306 227",
      draw: deskStanding,
    },
    gamer: {
      name: "Battlestation",
      price: 16,
      blurb: "RGB strip included, obviously",
      vb: "-6 -6 306 227",
      draw: deskGamer,
    },
  },
  chair: {
    ergo: {
      name: "Ergo Cloud",
      price: 15,
      blurb: "Lumbar support = happy spine",
      vb: "-6 -6 122 218",
      draw: chairErgo,
    },
    gaming: {
      name: "Racing Red",
      price: 18,
      blurb: "Bucket seat, goes vroom",
      vb: "-6 -6 122 218",
      draw: chairGaming,
    },
    wood: {
      name: "Wooden Stool",
      price: 5,
      blurb: "Rustic. Humbling. Cheap.",
      vb: "-6 -6 122 218",
      draw: chairWood,
    },
  },
  acc: {
    monitor: {
      name: "Monitor",
      price: 8,
      max: 2,
      needsDesk: true,
      blurb: "More pixels, more power",
      vb: "-6 -6 162 152",
      draw: () => monitor(false),
      pills: ["+ Add Monitor!", "+ Add Another!", "Maxed out ✓"],
    },
    lamp: {
      name: "Desk Lamp",
      price: 4,
      max: 1,
      needsDesk: true,
      blurb: "Banish the shadows",
      vb: "-6 -6 118 156",
      draw: lampDraw,
      pills: ["+ Add a Lamp!", "✓ Tap to remove"],
    },
    plant: {
      name: "Plant Friend",
      price: 3,
      max: 2,
      blurb: "Photosynthesis buddy",
      vb: "-2 -6 112 195",
      draw: plantBig,
      pills: ["+ Place a Plant!", "+ One more!", "Maxed out ✓"],
    },
    rug: {
      name: "Cozy Rug",
      price: 6,
      max: 1,
      blurb: "Ties the whole room together",
      vb: "0 -2 250 94",
      draw: rug,
      pills: ["+ Throw a Rug!", "✓ Tap to remove"],
    },
    pc: {
      name: "PC Tower",
      price: 10,
      max: 1,
      needsDesk: true,
      blurb: "RGB fans go brrr",
      vb: "-6 -6 84 162",
      draw: pcTower,
      pills: ["+ Add a PC!", "✓ Tap to remove"],
    },
  },
  zone: {
    coffee: {
      name: "Coffee Station",
      price: 14,
      blurb: "Espresso machine + mug",
      vb: "-6 -6 174 200",
      draw: coffeeStation,
    },
    outdoor: {
      name: "Outdoor Gear",
      price: 11,
      blurb: "Commuter bike + helmet hook",
      vb: "-6 -6 204 184",
      draw: bike,
    },
    relax: {
      name: "Relax Zone",
      price: 13,
      blurb: "Bean bag + warm floor lamp",
      vb: "-6 -6 162 124",
      draw: beanbag,
    },
    garage: {
      name: "Garage Space",
      price: 12,
      blurb: "Tool chest + spare tire",
      vb: "-6 -6 147 116",
      draw: toolChest,
    },
  },
};

const state = {
  desk: null,
  chair: null,
  acc: { monitor: 0, lamp: 0, plant: 0, rug: 0, pc: 0 },
  zones: { coffee: false, outdoor: false, relax: false, garage: false },
  night: false,
  rented: false,
};
let lastTotal = 0;

function save() {
  try {
    localStorage.setItem("ws-setup", JSON.stringify(state));
  } catch (e) {}
}
function load() {
  try {
    const s = JSON.parse(localStorage.getItem("ws-setup"));
    if (s && typeof s === "object") {
      state.desk = s.desk in CATALOG.desk ? s.desk : null;
      state.chair = s.chair in CATALOG.chair ? s.chair : null;
      for (const k in state.acc)
        if (typeof s.acc?.[k] === "number")
          state.acc[k] = Math.min(CATALOG.acc[k].max, Math.max(0, s.acc[k]));
      for (const k in state.zones)
        if (typeof s.zones?.[k] === "boolean") state.zones[k] = s.zones[k];
      state.night = !!s.night;
      state.rented = !!s.rented;
    }
  } catch (e) {}
}

/* ================================================================
   room rendering
================================================================ */
function roomBG() {
  let planks = "";
  [430, 486, 542, 598].forEach(
    (y) =>
      (planks += `<line x1="0" y1="${y}" x2="1040" y2="${y}" stroke="#D3AA72" stroke-width="5"/>`),
  );
  [
    [150, 372, 430],
    [520, 372, 430],
    [860, 372, 430],
    [300, 430, 486],
    [700, 430, 486],
    [150, 486, 542],
    [520, 486, 542],
    [900, 486, 542],
    [300, 542, 598],
    [700, 542, 598],
  ].forEach(
    ([x, y1, y2]) =>
      (planks += `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="#D3AA72" stroke-width="5"/>`),
  );

  return `
  <rect class="wall" x="-2" y="-2" width="1044" height="374" fill="#F6E7CE"/>
  <rect class="floor" x="-2" y="372" width="1044" height="250" fill="#E5C08B"/>
  <g class="plank-g">${planks}</g>
  <rect class="base" x="0" y="358" width="1040" height="14" fill="#EBD9BC"/>

  <!-- window -->
  <g>
    <g class="skyday">
      <rect x="72" y="64" width="160" height="152" fill="#A9DDF2"/>
      <path d="M72 216 Q150 186 232 200 L232 216 Z" fill="#8CC98C"/>
      <circle cx="122" cy="104" r="23" fill="#FFD166" stroke="${INK}" stroke-width="5"/>
      <g stroke="#FFD166" stroke-width="5" stroke-linecap="round">
        <line x1="122" y1="66" x2="122" y2="72"/><line x1="122" y1="136" x2="122" y2="142"/>
        <line x1="84" y1="104" x2="90" y2="104"/><line x1="154" y1="104" x2="160" y2="104"/>
        <line x1="95" y1="77" x2="99" y2="81"/><line x1="145" y1="127" x2="149" y2="131"/>
        <line x1="149" y1="77" x2="145" y2="81"/><line x1="99" y1="127" x2="95" y2="131"/>
      </g>
      <g fill="#FFFFFF" stroke="${INK}" stroke-width="4">
        <ellipse cx="185" cy="86" rx="17" ry="10"/><ellipse cx="200" cy="91" rx="12" ry="8"/>
      </g>
    </g>
    <g class="skynight">
      <rect x="72" y="64" width="160" height="152" fill="#28304E"/>
      <circle cx="180" cy="92" r="19" fill="#F6EDDB"/>
      <circle cx="174" cy="88" r="4" fill="#E4D7BD"/><circle cx="186" cy="98" r="3" fill="#E4D7BD"/>
      <g fill="#FFF8EC" class="stars">
        <circle cx="100" cy="84" r="2.6"/><circle cx="128" cy="120" r="2.2"/><circle cx="150" cy="78" r="2"/>
        <circle cx="96" cy="150" r="2.4"/><circle cx="140" cy="170" r="2"/><circle cx="205" cy="140" r="2.4"/><circle cx="170" cy="180" r="2"/>
      </g>
      <path d="M72 216 Q150 190 232 202 L232 216 Z" fill="#2E4A3F"/>
    </g>
    <line x1="152" y1="64" x2="152" y2="216" stroke="${INK}" stroke-width="7"/>
    <line x1="72" y1="140" x2="232" y2="140" stroke="${INK}" stroke-width="7"/>
    <rect x="64" y="56" width="176" height="168" rx="10" fill="none" stroke="${INK}" stroke-width="9"/>
    <rect x="50" y="222" width="204" height="13" rx="6" fill="#FFF8EC" stroke="${INK}" stroke-width="5"/>
  </g>

  <!-- poster -->
  <g>
    <rect x="286" y="84" width="88" height="112" rx="7" fill="#FFF8EC" stroke="${INK}" stroke-width="5"/>
    <rect x="296" y="94" width="68" height="58" fill="#A9DDF2"/>
    <circle cx="342" cy="118" r="13" fill="#E8604C"/>
    <path d="M296 152 L320 122 L340 152 Z" fill="#7A5C44"/>
    <path d="M330 152 L348 130 L364 152 Z" fill="#5C4433"/>
    <rect x="296" y="152" width="68" height="10" fill="#8CC98C"/>
    <text x="330" y="184" text-anchor="middle" font-family="'Baloo 2',cursive" font-weight="800" font-size="15" fill="${INK}">DREAM BIG</text>
  </g>

  <!-- clock -->
  <g>
    <circle cx="560" cy="106" r="23" fill="#FFF8EC" stroke="${INK}" stroke-width="5"/>
    <line x1="560" y1="106" x2="560" y2="92" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
    <line x1="560" y1="106" x2="570" y2="110" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
    <circle cx="560" cy="106" r="3" fill="${INK}"/>
  </g>`;
}

function roomShadows() {
  const e = (cx, cy, rx, ry) =>
    `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="rgba(72,52,20,0.14)"/>`;
  let s = "";
  if (state.zones.coffee) s += e(131, 512, 82, 12);
  if (state.acc.plant) s += e(760, 521, 52, 10);
  if (state.zones.outdoor) s += e(938, 543, 86, 11);
  if (state.desk) s += e(547, 520, 150, 13);
  if (state.chair) s += e(306, 536, 62, 11);
  if (state.zones.relax) s += e(520, 566, 140, 12);
  if (state.zones.garage) s += e(715, 566, 72, 11);
  return s;
}

const RENDER = {
  "rg-rug": () =>
    state.acc.rug
      ? `<g transform="translate(250,480) scale(1.6)">${rug()}</g>`
      : "",
  "rg-coffee": () =>
    state.zones.coffee
      ? `<g transform="translate(50,320)">${coffeeStation()}</g>`
      : "",
  "rg-plant": () =>
    state.acc.plant >= 1
      ? `<g transform="translate(705,336)">${plantBig()}</g>`
      : "",
  "rg-plant2": () =>
    state.acc.plant >= 2
      ? `<g transform="translate(112,174)">${plantSmall()}</g>`
      : "",
  "rg-bike": () =>
    state.zones.outdoor
      ? `<g transform="translate(842,372)">${bike()}</g>${helmetSVG(938, 196)}`
      : "",
  "rg-desk": () =>
    state.desk
      ? `<g transform="translate(402,302)">${CATALOG.desk[state.desk].draw()}</g>`
      : "",
  "rg-pc": () =>
    state.desk && state.acc.pc
      ? `<g transform="translate(446,370)">${pcTower()}</g>`
      : "",
  "rg-mon2": () =>
    state.desk && state.acc.monitor >= 2
      ? `<g transform="translate(556,198) scale(0.86)">${monitor(false)}</g>`
      : "",
  "rg-mon1": () =>
    state.desk && state.acc.monitor >= 1
      ? `<g transform="translate(462,188)">${monitor(true)}</g>`
      : "",
  "rg-lamp": () =>
    state.desk && state.acc.lamp
      ? `<g transform="translate(414,154)">${lampDraw()}</g>`
      : "",
  "rg-chair": () =>
    state.chair
      ? `<g transform="translate(252,328)">${CATALOG.chair[state.chair].draw()}</g>`
      : "",
  "rg-relax": () =>
    state.zones.relax
      ? `<g transform="translate(450,450)">${beanbag()}</g><g transform="translate(386,332)">${floorLamp()}</g>`
      : "",
  "rg-garage": () =>
    state.zones.garage
      ? `<g transform="translate(648,458)">${toolChest()}</g><g transform="translate(786,464) rotate(-12 48 48)">${tire()}</g>`
      : "",
  "rg-shadow": () => roomShadows(),
};

const REMOVABLE = {
  "rg-mon1": "monitor",
  "rg-mon2": "monitor",
  "rg-lamp": "lamp",
  "rg-pc": "pc",
  "rg-plant": "plant",
  "rg-plant2": "plant",
  "rg-rug": "rug",
  "rg-coffee": "coffee",
  "rg-bike": "outdoor",
  "rg-relax": "relax",
  "rg-garage": "garage",
};

function renderRoom() {
  for (const id in RENDER) {
    const el = document.getElementById(id);
    const html = RENDER[id]();
    el.innerHTML = html;
    el.style.display = html ? "" : "none";
    if (REMOVABLE[id]) {
      if (html) {
        el.setAttribute("data-remove", REMOVABLE[id]);
        el.setAttribute("title", "Click to remove");
      } else {
        el.removeAttribute("data-remove");
        el.removeAttribute("title");
      }
    }
  }
  renderHint();
}

function renderHint() {
  const el = $("#rg-hint");
  let t = null,
    cx = 545,
    y = 150,
    w = 340;
  if (!state.desk && !state.chair) {
    t = "Pick a desk & a chair to get started!";
  } else if (state.desk && !state.chair) {
    t = "Nice desk! Now grab a chair 🪑";
    cx = 390;
    y = 215;
    w = 270;
  } else if (!state.desk && state.chair) {
    t = "Cool chair — it needs a desk!";
    cx = 520;
    y = 150;
    w = 280;
  }
  if (!t) {
    el.innerHTML = "";
    el.style.display = "none";
    return;
  }
  el.style.display = "";
  const h = 52,
    x = cx - w / 2;
  el.innerHTML = `<g class="bob">
    <path d="M${cx - 14} ${y + h} L${cx} ${y + h + 26} L${cx + 14} ${y + h} Z" fill="#FFF8EC" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="#FFF8EC" stroke="${INK}" stroke-width="4"/>
    <text x="${cx}" y="${y + h / 2 + 7}" text-anchor="middle" font-family="'Baloo 2',cursive" font-weight="700" font-size="19" fill="${INK}">${t}</text>
  </g>`;
}

/* ================================================================
   cards + UI
================================================================ */
function pickCard(kind, key, def) {
  return `<button data-${kind}="${key}" class="relative card-brutal p-3 text-left w-full transition-transform hover:-translate-y-1 active:translate-y-0 cursor-pointer">
    <span class="pick-badge hidden">✓</span>
    <div class="ic-box"><svg viewBox="${def.vb}">${def.draw()}</svg></div>
    <div class="c-name">${def.name}</div>
    <div class="c-blurb">${def.blurb}</div>
    <div class="c-price mt-1">$${def.price}<span class="unit">/mo</span></div>
  </button>`;
}
function accCard(key, def) {
  return `<div class="relative acc-card card-brutal p-3" data-acc="${key}">
    <button data-minus="${key}" class="minus-btn hidden" aria-label="Remove one">−</button>
    <button data-add="${key}" class="w-full text-left cursor-pointer">
      <div class="ic-box"><svg viewBox="${def.vb}">${def.draw()}</svg></div>
      <div class="flex items-center justify-between gap-2">
        <div class="c-name">${def.name}</div><div class="dots"></div>
      </div>
      <div class="c-blurb">${def.blurb}</div>
      <div class="c-price mt-1">$${def.price}<span class="unit">/mo</span></div>
      <div class="mt-2"><span class="acc-pill">${def.pills[0]}</span></div>
    </button>
  </div>`;
}
function zoneCard(key, def) {
  return `<button data-zone="${key}" class="relative acc-card card-brutal p-3 text-left w-full transition-transform hover:-translate-y-1 cursor-pointer">
    <div class="ic-box tall"><svg viewBox="${def.vb}">${def.draw()}</svg></div>
    <div class="c-name">${def.name}</div>
    <div class="c-blurb">$${def.price}/mo · ${def.blurb}</div>
    <div class="mt-2"><span class="acc-pill">+ Add it!</span></div>
  </button>`;
}
function buildCards() {
  const dw = $("#desk-cards"),
    cw = $("#chair-cards"),
    aw = $("#acc-cards"),
    zw = $("#zone-cards");
  for (const [k, d] of Object.entries(CATALOG.desk))
    dw.insertAdjacentHTML("beforeend", pickCard("desk", k, d));
  for (const [k, d] of Object.entries(CATALOG.chair))
    cw.insertAdjacentHTML("beforeend", pickCard("chair", k, d));
  for (const [k, d] of Object.entries(CATALOG.acc))
    aw.insertAdjacentHTML("beforeend", accCard(k, d));
  for (const [k, d] of Object.entries(CATALOG.zone))
    zw.insertAdjacentHTML("beforeend", zoneCard(k, d));
}

function calc() {
  let total = 0,
    count = 0;
  if (state.desk) {
    total += CATALOG.desk[state.desk].price;
    count++;
  }
  if (state.chair) {
    total += CATALOG.chair[state.chair].price;
    count++;
  }
  for (const k in state.acc) {
    total += state.acc[k] * CATALOG.acc[k].price;
    count += state.acc[k];
  }
  for (const k in state.zones) {
    if (state.zones[k]) {
      total += CATALOG.zone[k].price;
      count++;
    }
  }
  return { total, count };
}

function renderUI() {
  document.querySelectorAll("[data-desk]").forEach((b) => {
    const on = state.desk === b.getAttribute("data-desk");
    b.classList.toggle("picked", on);
    b.querySelector(".pick-badge").classList.toggle("hidden", !on);
  });
  document.querySelectorAll("[data-chair]").forEach((b) => {
    const on = state.chair === b.getAttribute("data-chair");
    b.classList.toggle("picked", on);
    b.querySelector(".pick-badge").classList.toggle("hidden", !on);
  });
  document.querySelectorAll(".acc-card").forEach((card) => {
    const k = card.dataset.acc || card.dataset.zone;
    const isZone = !!card.dataset.zone;
    const def = isZone ? CATALOG.zone[k] : CATALOG.acc[k];
    const c = isZone ? (state.zones[k] ? 1 : 0) : state.acc[k];
    const pill = card.querySelector(".acc-pill");
    let label,
      cls = "acc-pill";
    if (isZone) {
      label = c ? "✓ Tap to remove" : "+ Add it!";
      if (c) cls += " pill-on";
    } else if (def.max > 1) {
      label = def.pills[Math.min(c, def.pills.length - 1)];
      if (c === def.max) cls += " pill-max";
      else if (c > 0) cls += " pill-on";
    } else {
      label = def.pills[c ? 1 : 0];
      if (c) cls += " pill-on";
    }
    pill.textContent = label;
    pill.className = cls;
    card.classList.toggle("on", c > 0);
    const minus = card.querySelector("[data-minus]");
    if (minus) minus.classList.toggle("hidden", c === 0);
    const dots = card.querySelector(".dots");
    if (dots && !isZone && def.max > 1)
      dots.textContent = "●".repeat(c) + "○".repeat(def.max - c);
  });

  const { total, count } = calc();
  const ready = !!(state.desk && state.chair);
  $("#totalPill").innerHTML = `$${total}<span class="text-base">/mo</span>`;
  $("#totalChip").textContent = `$${total}/mo`;
  $("#totalBar").innerHTML = `$${total}<span class="text-sm">/mo</span>`;
  $("#totalMobile").textContent = `$${total}/mo`;
  $("#itemCount").textContent =
    `${count} item${count === 1 ? "" : "s"} in the room`;
  $("#ctaNote").textContent = ready
    ? "Looks rent-worthy. Ship it? 🚚"
    : "Pick a desk & chair to unlock renting";
  $("#stamp").classList.toggle("hidden", !state.rented);
  if (total !== lastTotal) {
    document.querySelectorAll(".bumpable").forEach((el) => {
      el.classList.remove("bump");
      void el.offsetWidth;
      el.classList.add("bump");
    });
    lastTotal = total;
  }
}

function updateAll() {
  renderRoom();
  renderUI();
  save();
}

/* ================================================================
   toast / confetti / modal
================================================================ */
let toastTimer = null;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.remove("hidden");
  t.style.animation = "none";
  void t.offsetWidth;
  t.style.animation = "";
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.add("hidden"), 2100);
}
function confetti(n = 80) {
  const cols = [
    "#FFD166",
    "#E8604C",
    "#1FA793",
    "#F28DA0",
    "#5AA9FF",
    "#E9B44C",
  ];
  for (let i = 0; i < n; i++) {
    const d = document.createElement("i");
    d.className = "confetti";
    d.style.left = Math.random() * 100 + "vw";
    d.style.background = cols[i % cols.length];
    d.style.setProperty("--dx", Math.random() * 140 - 70 + "px");
    d.style.setProperty("--rot", Math.random() * 720 - 360 + "deg");
    d.style.animationDuration = 2.2 + Math.random() * 1.6 + "s";
    d.style.animationDelay = Math.random() * 0.4 + "s";
    if (Math.random() > 0.6) d.style.borderRadius = "50%";
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 4600);
  }
}
function openModal() {
  $("#modal").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  $("#modal").classList.remove("open");
  document.body.style.overflow = "";
}

function openCheckout() {
  $("#orderNo").textContent = "WS-" + (1000 + Math.floor(Math.random() * 9000));
  const { total, count } = calc();
  const cat = (t) => `<div class="rp-cat">${t}</div>`;
  const row = (def, name, qty, price) => `
    <div class="rp-row">
      <div class="rp-ic"><svg viewBox="${def.vb}">${def.draw()}</svg></div>
      <div class="rp-name">${name}${qty > 1 ? ` <span class="text-teal2">×${qty}</span>` : ""}</div>
      <div class="rp-price">$${price}<span style="font-size:10px;opacity:.5">/mo</span></div>
    </div>`;
  let rows = "";
  if (state.desk) {
    const d = CATALOG.desk[state.desk];
    rows += cat("Desk") + row(d, d.name, 1, d.price);
  }
  if (state.chair) {
    const d = CATALOG.chair[state.chair];
    rows += cat("Chair") + row(d, d.name, 1, d.price);
  }
  const accs = Object.entries(state.acc).filter(([, c]) => c > 0);
  if (accs.length) {
    rows += cat("Accessories");
    accs.forEach(([k, c]) => {
      const d = CATALOG.acc[k];
      rows += row(d, d.name, c, c * d.price);
    });
  }
  const zn = Object.entries(state.zones).filter(([, v]) => v);
  if (zn.length) {
    rows += cat("Bonus zones");
    zn.forEach(([k]) => {
      const d = CATALOG.zone[k];
      rows += row(d, d.name, 1, d.price);
    });
  }
  if (!rows)
    rows = `<div class="py-8 text-center font-bold opacity-60">Empty room, empty receipt — go grab some goodies! 🛋️</div>`;

  rows += `
  <div class="mt-4 bg-[#FFE9B0] border-[3px] border-ink rounded-2xl p-3.5 flex justify-between items-center">
    <span class="font-extrabold">Total rent</span>
    <span class="font-baloo text-2xl font-extrabold">$${total}/mo</span>
  </div>
  <p class="text-[10.5px] font-bold opacity-60 mt-1.5">${count} item${count === 1 ? "" : "s"} · swap anytime · coffee stains billed separately ☕</p>
  <div class="flex gap-3 mt-4">
    <button id="keepShopping" class="b-btn">Keep tweaking</button>
    <button id="confirmRent" class="b-btn teal">Rent it! 🚚</button>
  </div>`;
  $("#modalBody").innerHTML = rows;
  openModal();
}

function showSuccess() {
  const { total } = calc();
  state.rented = true;
  renderUI();
  save();
  $("#modalBody").innerHTML = `
  <div class="text-center py-3">
    <div class="popin mx-auto w-20 h-20 rounded-full bg-teal2 border-4 border-ink shadow-brutal grid place-items-center text-4xl text-white font-bold">✓</div>
    <h4 class="font-baloo text-2xl font-extrabold mt-3">Boom! Your setup is booked 🎉</h4>
    <p class="font-bold opacity-70 mt-1 text-sm">The truck rolls out Friday. Assembly included — coffee not.</p>
    <div class="mt-4 bg-white border-[3px] border-ink rounded-2xl shadow-brutal-sm p-4 flex justify-between items-center">
      <span class="font-bold">Total rent</span>
      <span class="font-baloo text-2xl font-extrabold">$${total}/mo</span>
    </div>
    <div class="flex gap-3 mt-5">
      <button id="resetAll" class="b-btn">Start fresh</button>
      <button id="keepIt" class="b-btn" style="background:#FFD166">Back to my setup</button>
    </div>
  </div>`;
  confetti(90);
  chord();
}

function doRent() {
  if (!state.desk || !state.chair) {
    toast("Pick a desk and a chair first! 🪵🪑");
    const b = $("#rentBtn");
    b.classList.remove("shake");
    void b.offsetWidth;
    b.classList.add("shake");
    return;
  }
  openCheckout();
}
function resetSetup() {
  state.desk = null;
  state.chair = null;
  for (const k in state.acc) state.acc[k] = 0;
  for (const k in state.zones) state.zones[k] = false;
  state.rented = false;
  updateAll();
  toast("Fresh empty room — go wild! 🧹");
  pop(300);
}
function toggleNight() {
  state.night = !state.night;
  $("#room").classList.toggle("night", state.night);
  $("#nightBtn").textContent = state.night ? "☀️" : "🌙";
  pop(state.night ? 250 : 520);
  save();
}

/* ================================================================
   events
================================================================ */
document.addEventListener("click", (e) => {
  const el = e.target.closest(
    "[data-desk],[data-chair],[data-add],[data-minus],[data-zone],#rentBtn,#rentBtnM,#nightBtn,#resetBtn,#modalClose,#modalBackdrop,#keepShopping,#confirmRent,#resetAll,#keepIt",
  );
  if (!el) return;
  if (el.id === "rentBtn" || el.id === "rentBtnM") {
    doRent();
    return;
  }
  if (el.id === "nightBtn") {
    toggleNight();
    return;
  }
  if (el.id === "resetBtn") {
    resetSetup();
    return;
  }
  if (
    el.id === "modalClose" ||
    el.id === "modalBackdrop" ||
    el.id === "keepShopping" ||
    el.id === "keepIt"
  ) {
    closeModal();
    return;
  }
  if (el.id === "confirmRent") {
    showSuccess();
    return;
  }
  if (el.id === "resetAll") {
    resetSetup();
    closeModal();
    return;
  }

  const dsk = el.getAttribute("data-desk");
  if (dsk !== null) {
    if (state.desk === dsk) {
      state.desk = null;
      const lost = ["monitor", "lamp", "pc"].filter((a) => state.acc[a] > 0);
      lost.forEach((a) => (state.acc[a] = 0));
      toast(
        lost.length
          ? "Desk gone — desk-top stuff went with it 🕳️"
          : "Desk removed",
      );
      pop(300);
    } else {
      state.desk = dsk;
      pop(620);
    }
    updateAll();
    return;
  }
  const chr = el.getAttribute("data-chair");
  if (chr !== null) {
    if (state.chair === chr) {
      state.chair = null;
      toast("Chair removed — standing desk it is 🧍");
      pop(300);
    } else {
      state.chair = chr;
      pop(700);
    }
    updateAll();
    return;
  }
  const add = el.getAttribute("data-add");
  if (add !== null) {
    const def = CATALOG.acc[add];
    if (def.needsDesk && !state.desk) {
      toast("Grab a desk first — this needs a desktop! 🪵");
      return;
    }
    if (def.max > 1) {
      if (state.acc[add] >= def.max) {
        toast("Maxed out — the room only fits so many! 😅");
        return;
      }
      state.acc[add]++;
      pop(640);
    } else {
      state.acc[add] = state.acc[add] ? 0 : 1;
      pop(state.acc[add] ? 640 : 340);
    }
    updateAll();
    return;
  }
  const minus = el.getAttribute("data-minus");
  if (minus !== null) {
    state.acc[minus] = Math.max(0, state.acc[minus] - 1);
    pop(340);
    updateAll();
    return;
  }
  const zn = el.getAttribute("data-zone");
  if (zn !== null) {
    state.zones[zn] = !state.zones[zn];
    pop(state.zones[zn] ? 600 : 330);
    updateAll();
    return;
  }
});

/* click items inside the room preview to remove them */
$("#room").addEventListener("click", (e) => {
  const g = e.target.closest("[data-remove]");
  if (!g) return;
  const k = g.getAttribute("data-remove");
  if (k in CATALOG.acc) {
    state.acc[k] = Math.max(0, state.acc[k] - 1);
    pop(360);
  } else {
    state.zones[k] = false;
    pop(320);
  }
  updateAll();
});

/* ================================================================
   init
================================================================ */
load();
$("#rg-bg").innerHTML = roomBG();
buildCards();
if (state.night) {
  $("#room").classList.add("night");
  $("#nightBtn").textContent = "☀️";
}
updateAll();

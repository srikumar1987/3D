/* 3D / Field Guide — data + interactions (no dependencies) */
(() => {
  "use strict";

  const C = {
    orange: "#FF6B1A", pink: "#FF3D7F", violet: "#B26BFF", cyan: "#22D3EE",
    blue: "#7C9CFF", green: "#3DDC97", amber: "#FFC145", red: "#FF5C5C", slate: "#8A94AD",
  };

  /* ------------------------------------------------------------------ data */
  const BUDGET = [
    { k: "FDM printers", v: 4.35, c: C.orange },
    { k: "Design PCs & IT", v: 3.85, c: C.cyan },
    { k: "Resin printers", v: 1.6, c: C.pink },
    { k: "3D scanner", v: 1.4, c: C.violet },
    { k: "Fit-out & furniture", v: 1.6, c: C.blue },
    { k: "Starting materials", v: 1.4, c: C.green },
    { k: "Premises & registration", v: 1.4, c: C.amber },
    { k: "Software (year 1)", v: 1.3, c: "#5EEAD4" },
    { k: "Power & safety", v: 0.9, c: "#F472B6" },
    { k: "Post-processing & QC", v: 0.75, c: "#A3E635" },
    { k: "Contingency", v: 1.45, c: C.slate },
  ];

  const EQUIP = {
    "FDM printers": [
      { q: "1 ×", n: "Bambu Lab X1 Carbon Combo", d: "Engineering materials (CF-nylon, ASA, PC), multi-colour, best precision. Or current H2-series.", p: 1.7, c: C.orange },
      { q: "2 ×", n: "Bambu Lab P1S Combo", d: "Production workhorses — PLA, PETG, ABS, multi-colour. Or P2S successor.", p: 1.9, c: C.orange },
      { q: "1 ×", n: "Creality K1 Max", d: "300 mm³ — large parts, enclosures, cosplay, architecture.", p: 0.75, c: C.orange },
    ],
    "Resin": [
      { q: "2 ×", n: "Elegoo Saturn 4 Ultra 16K", d: "Miniatures, product models, dental & jewellery masters.", p: 0.96, c: C.pink },
      { q: "1 ×", n: "Elegoo Mars 5 Ultra", d: "Small, high-detail jobs and test prints.", p: 0.22, c: C.pink },
      { q: "2 ×", n: "Wash & cure stations", d: "Mercury Plus / Anycubic W&C 3 Plus.", p: 0.42, c: C.pink },
    ],
    "Scanner": [
      { q: "1 ×", n: "Revopoint MetroX (Advanced)", d: "Blue laser + structured light, ~0.02–0.04 mm. Reverse engineering & spares.", p: 1.35, c: C.violet },
      { q: "—", n: "Spray, markers, turntable", d: "Scanning consumables.", p: 0.05, c: C.violet },
    ],
    "Computing": [
      { q: "1 ×", n: "Workstation A", d: "Ryzen 9 9900X, 64 GB, RTX 5070 Ti / 4070 Super 16 GB, 2 TB, 27\" 4K. Scan + CAD + render.", p: 1.75, c: C.cyan },
      { q: "1 ×", n: "Workstation B", d: "Ryzen 7 9700X, 32 GB, RTX 5060 Ti 16 GB, 1 TB, 27\" QHD. CAD + slicing.", p: 1.15, c: C.cyan },
      { q: "1 ×", n: "Ops mini PC + monitor", d: "Print queue, billing, client meetings.", p: 0.35, c: C.cyan },
      { q: "1 ×", n: "Synology DS224+ (2 × 4 TB)", d: "Project and scan backup.", p: 0.4, c: C.cyan },
      { q: "1 ×", n: "SpaceMouse + networking", d: "3Dconnexion, Wi-Fi 6 router, switch, cabling.", p: 0.2, c: C.cyan },
    ],
    "Software": [
      { q: "2 seats", n: "Autodesk Fusion", d: "Parametric CAD, CAM, simulation — commercial licence.", p: 1.1, c: "#5EEAD4" },
      { q: "1 ×", n: "Lychee / Chitubox Pro", d: "Resin slicing & supports.", p: 0.1, c: "#5EEAD4" },
      { q: "1 ×", n: "Zoho Books / Office", d: "Billing, GST, quotes. Bambu Studio, Orca, Blender, FreeCAD are free.", p: 0.1, c: "#5EEAD4" },
    ],
    "Power & fit-out": [
      { q: "1 ×", n: "5 kVA inverter/UPS", d: "With batteries — BESCOM cuts kill 20-hour prints.", p: 0.7, c: "#F472B6" },
      { q: "—", n: "Surge, fire safety, first aid", d: "Stabiliser, CO₂ + ABC extinguishers, smoke detectors.", p: 0.2, c: "#F472B6" },
      { q: "—", n: "Electrical & resin room", d: "16A circuits, RCCB, earthing; glass partition; exhaust + carbon filter.", p: 0.8, c: C.blue },
      { q: "1 ×", n: "1.5T inverter split AC", d: "Resin likes 22–28 °C.", p: 0.45, c: C.blue },
      { q: "—", n: "Benches, racks, furniture", d: "Steel benches, printer racks, desks, client table.", p: 0.35, c: C.blue },
    ],
    "Post & materials": [
      { q: "—", n: "Finishing kit", d: "Spray booth + airbrush, ultrasonic cleaner, Dremel, PPE, hand tools.", p: 0.38, c: "#A3E635" },
      { q: "—", n: "Climate & QC", d: "Dehumidifier, 2 filament dryers, Mitutoyo caliper + micrometer.", p: 0.37, c: "#A3E635" },
      { q: "~60 kg", n: "Filament", d: "PLA, PETG, ABS, ASA, TPU, some PA-CF / PETG-CF.", p: 0.8, c: C.green },
      { q: "~12 L", n: "Resin + IPA + spares", d: "Standard, ABS-like, tough, castable; 30 L IPA; nozzles, plates, FEP.", p: 0.6, c: C.green },
    ],
  };

  const FLOOR = [
    { a: "rec", n: "Reception", d: "Client meetings", s: 80, c: C.amber },
    { a: "des", n: "Design studio", d: "2 workstations + scanner", s: 120, c: C.cyan },
    { a: "fdm", n: "FDM print farm", d: "Racks · ventilated · 4 printers", s: 180, c: C.orange },
    { a: "res", n: "Resin room", d: "Enclosed · AC · exhaust", s: 90, c: C.pink },
    { a: "post", n: "Post-processing", d: "Sanding · paint booth · QC", s: 80, c: C.violet },
    { a: "store", n: "Store + packing", d: "Dehumidified materials", s: 50, c: C.green },
  ];

  const TEAM = [
    { i: "F", n: "Founder", d: "Ops & sales head — you", p: "—", c: C.orange },
    { i: "DE", n: "Design engineer", d: "B.E. Mech · CAD, scanning, RE", p: "₹35–45k", c: C.cyan },
    { i: "PT", n: "Print technician", d: "Diploma / ITI · farm & maintenance", p: "₹20–25k", c: C.violet },
    { i: "FT", n: "Finishing technician", d: "Hands-on · part-time at first", p: "₹18–22k", c: C.pink },
    { i: "CA", n: "Accountant", d: "Outsourced", p: "₹5–8k", c: C.green },
  ];

  const JOURNEY = [
    { n: "Idea", d: "Client brief or product", c: C.cyan },
    { n: "Scan", d: "Revopoint MetroX", c: C.violet },
    { n: "Design", d: "Fusion · Blender · AI", c: C.blue },
    { n: "Slice", d: "Bambu Studio · Lychee", c: C.amber },
    { n: "Print", d: "FDM farm · resin room", c: C.orange },
    { n: "Finish & sell", d: "Sand, paint, QC, ship", c: C.green },
  ];

  const MATERIALS = [
    { n: "PLA / PETG", unit: "g", cost: 1.25, charge: 2.5, kind: "fdm" },
    { n: "ABS / ASA", unit: "g", cost: 1.5, charge: 3, kind: "fdm" },
    { n: "TPU (flexible)", unit: "g", cost: 2.5, charge: 5, kind: "fdm" },
    { n: "PA-CF / PETG-CF", unit: "g", cost: 4, charge: 8, kind: "fdm" },
    { n: "Standard resin", unit: "ml", cost: 3, charge: 6, kind: "resin" },
    { n: "ABS-like / tough resin", unit: "ml", cost: 4.5, charge: 9, kind: "resin" },
    { n: "Castable resin", unit: "ml", cost: 20, charge: 40, kind: "resin" },
  ];
  const MACHINES = [
    { n: "P1S / K1 Max · ₹60/h", rate: 60, cost: 13, kind: "fdm" },
    { n: "X1C engineering · ₹90/h", rate: 90, cost: 20, kind: "fdm" },
    { n: "Resin (Saturn) · ₹80/h", rate: 80, cost: 11, kind: "resin" },
  ];
  const RATES = [
    ["FDM machine time", "₹60 / h"], ["FDM engineering", "₹90 / h"], ["Resin machine time", "₹80 / h"],
    ["Technician", "₹400 / h"], ["Finishing", "₹500 / h"], ["CAD design", "₹1,000–1,500 / h"],
    ["3D scan (object)", "₹3,000–8,000"], ["Reverse engineering", "₹8,000–30,000"], ["Rush 24 h", "+40%"],
    ["Volume", "−10% @25 · −20% @100"],
  ];

  const WASTE = [
    { n: "Bambu Lab H2C", t: "Up to 7 swappable nozzles", w: 12, c: C.green, why: "Bambu's tests: ~47–58% of the X1C's purge waste on multi-colour prints." },
    { n: "Bambu Lab H2D", t: "2 independent nozzles", w: 22, c: C.green, why: "Model + support on separate nozzles — PLA + PVA prints that waste 20–40 g on an X1C waste almost nothing." },
    { n: "Resin printers", t: "Saturn 4 Ultra", w: 30, c: "#7CD992", why: "Only supports and failures; leftover resin goes back in the bottle." },
    { n: "Single-nozzle FDM · 1 colour", t: "P1S / X1C", w: 36, c: "#7CD992", why: "Mostly supports and failed prints." },
    { n: "Single-nozzle FDM + AMS · many colours", t: "P1S / X1C + AMS", w: 92, c: C.red, why: "1–2 g+ per colour change; can exceed the model's own weight." },
  ];
  const WASTE_TIPS = ["Fill plates to share one purge tower", "Tree supports", "Flush into infill / objects", "Limit colours per design", "Dry your filament"];

  const OUT = {
    high: { t: "HIGH", c: C.green }, b2b: { t: "HIGH · B2B", c: C.green }, mh: { t: "MED-HIGH", c: C.amber },
    med: { t: "MEDIUM", c: C.amber }, low: { t: "LOW", c: C.red }, niche: { t: "NICHE", c: C.violet }, avoid: { t: "AVOID", c: C.red },
  };
  const PRODUCTS = [
    { n: "Personalised gifts", d: "Name lamps, lithophanes, keychains", m: "PLA matte / silk", mc: "FDM", cost: "₹10–80", price: "₹199–1,499", o: "high", tier: 1, i: "♥" },
    { n: "Corporate gifting", d: "Desk organisers, pen stands, logo items", m: "PLA / PETG", mc: "FDM", cost: "₹40–150", price: "₹399–1,500 bulk", o: "high", tier: 1, i: "◆" },
    { n: "Fashion earrings & bangles", d: "Lightweight jewellery for Instagram / Meesho", m: "PLA silk, PETG · resin for detail", mc: "FDM / Resin", cost: "₹5–30", price: "₹199–799", o: "high", tier: 1, i: "○" },
    { n: "Rings & jewellery masters", d: "Fashion rings · castable masters for jewellers", m: "Tough / castable resin", mc: "Resin", cost: "₹10–60", price: "₹199–599 · B2B", o: "b2b", tier: 1, i: "◎" },
    { n: "Original toys", d: "Flexi animals, fidgets, articulated dragons", m: "PLA multi-colour", mc: "FDM", cost: "₹20–150", price: "₹199–999", o: "high", tier: 2, i: "✦" },
    { n: "Figurines & miniatures", d: "Painted minis, custom mini-me", m: "ABS-like resin", mc: "Resin", cost: "₹30–200", price: "₹500–3,000", o: "mh", tier: 2, i: "♜" },
    { n: "Home décor", d: "Planters, lamps, wall art", m: "PLA · PETG outdoors", mc: "FDM", cost: "₹50–300", price: "₹299–2,000", o: "mh", tier: 2, i: "❖" },
    { n: "Car accessories", d: "Mounts, organisers, clips", m: "ASA / PETG (PLA warps)", mc: "FDM", cost: "₹30–200", price: "₹299–1,500", o: "med", tier: 2, i: "▲" },
    { n: "Phone cases", d: "Commoditised unless deeply personalised", m: "TPU 95A · PETG/PC hard", mc: "FDM", cost: "₹20–50", price: "Amazon ₹99–299", o: "low", tier: 3, i: "▭" },
    { n: "Slippers & sandals", d: "Soft TPU, custom-fit premium", m: "TPU 85A / foaming TPU", mc: "FDM", cost: "₹1,200–3,000+", price: "Needs ₹2,500–4,000", o: "niche", tier: 3, i: "◗" },
    { n: "Superhero toys", d: "Licensed IP — takedown & legal risk", m: "—", mc: "—", cost: "—", price: "Don't", o: "avoid", tier: 3, i: "✕" },
  ];
  const QUAD = [
    ["Corporate gifting", 0.82, 0.78, C.green, "l"], ["Personalised gifts", 0.88, 0.7, C.green, "l"], ["Jewellery masters", 0.55, 0.85, C.green, "r"],
    ["Fashion earrings", 0.8, 0.55, C.green, "r"], ["Original toys", 0.7, 0.6, C.amber, "l"], ["Miniatures", 0.48, 0.72, C.amber, "l"],
    ["Home décor", 0.62, 0.48, C.amber, "r"], ["Car accessories", 0.42, 0.42, C.amber, "r"], ["Slippers", 0.22, 0.62, C.violet, "r"], ["Phone cases", 0.72, 0.15, C.red, "r"],
  ];

  const SLIP_RECIPE = [["Sole walls", "2"], ["Sole infill", "20% gyroid"], ["Bottom", "Fuzzy skin (grip)"], ["Upper", "No walls · open infill"], ["Drying", "55 °C · 4 h+"], ["Feeding", "Direct, not via AMS"], ["Speed", "20–30 mm/s"]];
  const SLIP_ECON = [["Filament", "500–900 g"], ["Print time", "15–30 h"], ["Throughput", "~1 pair / printer / day"], ["Material cost", "₹1,200–3,000"], ["Must charge", "₹2,500–4,000"], ["EVA slipper", "₹150–400"]];

  const SUPPLIERS = [
    { n: "WOL3D", loc: "Mumbai · 11+ centres", cat: ["printers", "filament", "resin"], tags: ["Bambu", "Creality", "Elegoo", "AMC"], d: "Official Bambu distributor; exclusive Creality distributor; Elegoo partner. Training & AMC.", ct: "+91 99695 55777 · growth@wol3d.com" },
    { n: "Robu.in", loc: "Pune · online", cat: ["printers", "filament"], tags: ["Bambu", "Creality", "eSUN", "spares"], d: "Authorised Bambu distributor — printers, AMS units, genuine spares.", ct: "robu.in" },
    { n: "Protomont Technologies", loc: "Pan-India", cat: ["scanner", "resin", "printers", "filament"], tags: ["Revopoint", "Elegoo", "resin"], d: "Authorised Revopoint distributor; Elegoo printers and resin.", ct: "+91 93248 98118 · info@protomont.com" },
    { n: "Voxelstudio", loc: "Greater Noida", cat: ["printers", "resin"], tags: ["Elegoo", "resin"], d: "Elegoo distributor — 1-yr printer + 3-month LCD warranty.", ct: "+91 80913 91371 · sales@voxelstudio.co.in" },
    { n: "Numakers", loc: "Surat · manufacturer", cat: ["filament"], tags: ["PLA", "PLA+", "PETG", "bulk"], d: "Indian manufacturer, 100% virgin material; bulk & purchase orders.", ct: "+91 95587 37223 · sales@numakers.com" },
    { n: "Vektor3D", loc: "Mumbai · IndiaMART", cat: ["filament"], tags: ["PLA ₹1,300", "PETG ₹1,200", "TPU ₹2,500"], d: "Made-in-India filament incl. nylon (~₹2,000/kg).", ct: "indiamart.com/vektorthreedsystems" },
    { n: "Rever Industries · FibReel", loc: "Nashik", cat: ["filament"], tags: ["ASA", "HTPLA", "exotic"], d: "Full filament range incl. specialty grades.", ct: "3dprintingfilament.in · 080-37103756" },
    { n: "3dprintzkart", loc: "JP Nagar, Bengaluru", blr: true, cat: ["filament"], tags: ["PLA ~₹1,208/kg", "local"], d: "Local PLA manufacturer — convenient for top-ups.", ct: "dial4trade listing" },
    { n: "Ultra Nanotech", loc: "Hoodi, Bengaluru", blr: true, cat: ["filament"], tags: ["PLA+", "PVA", "PC"], d: "Specialty filaments incl. dissolvable PVA.", ct: "ultrananotec.com" },
    { n: "Francis Klein", loc: "Peenya, Bengaluru", blr: true, cat: ["filament"], tags: ["industrial", "high-temp", "metal-filled"], d: "Industrial-grade and high-temperature filaments.", ct: "franciskleinadditive.com" },
    { n: "Corengg Technologies", loc: "South India", cat: ["printers"], tags: ["Formlabs", "Form 4", "Fuse 1+"], d: "Authorised Formlabs dealer for phase-2 SLA / SLS.", ct: "corengg.com" },
    { n: "Phillips Machine Tools", loc: "Navi Mumbai · national", cat: ["printers"], tags: ["Formlabs"], d: "National Formlabs partner. Formlabs India: india@formlabs.com", ct: "phillipscorp.com/india" },
    { n: "MicroGenesis", loc: "Bengaluru", blr: true, cat: ["software"], tags: ["Autodesk", "Fusion"], d: "Autodesk partner — Fusion with GST invoice. Also Sniper Systems, Wroffy.", ct: "+91 98440 55124 · connect@mgenindia.com" },
    { n: "SP Road market", loc: "Bengaluru", blr: true, cat: ["hardware"], tags: ["workstations", "NAS"], d: "Custom PC builds & Synology dealers. Online: MDComputers, PrimeABGB.", ct: "Walk-in" },
    { n: "IndustryBuying / Moglix", loc: "Online B2B", cat: ["hardware"], tags: ["PPE", "tools", "dehumidifier"], d: "Tools, PPE, spray booths with GST invoices.", ct: "industrybuying.com · moglix.com" },
  ];
  const SUP_CATS = [["all", "All"], ["printers", "Printers"], ["filament", "Filament"], ["resin", "Resin"], ["scanner", "Scanners"], ["software", "Software"], ["hardware", "Hardware"], ["blr", "In Bengaluru"]];

  const PRICES = [
    ["PLA / PLA+", 700, 1600, C.green], ["PLA silk / matte", 1000, 1800, "#7CD992"], ["PETG", 900, 1800, C.cyan],
    ["ABS / ASA", 900, 1900, C.blue], ["TPU 95A", 1200, 2500, C.violet], ["TPU 85A–90A", 2500, 4000, C.pink],
    ["CF composites", 3500, 5000, C.orange], ["Resin (per litre)", 2500, 5000, C.amber],
  ];

  const CHOOSER = [
    { k: "Gifts, décor, corporate, toys", s: "General business", r: "Bambu Lab P1S / P2S Combo", p: "~₹0.95L", pts: ["Reliable and easy to learn", "Multi-colour with AMS", "Handles TPU when fed directly"] },
    { k: "Lots of colours, low waste, slippers", s: "Multi-material", r: "Bambu Lab H2D", p: "~₹2.5–3L", pts: ["Two independent nozzles — near-zero purge for 2 materials", "350 × 320 × 325 mm volume", "Heated chamber for ABS, PA-CF, PC"] },
    { k: "Rings, jewellery, figurines", s: "Fine detail", r: "Elegoo Saturn 4 Ultra 16K + wash & cure", p: "~₹0.7L", pts: ["16K detail on a budget", "Castable resin for jewellery masters", "Minimal material waste"] },
    { k: "Not sure yet", s: "Best starter combo", r: "1 × P1S/P2S Combo + 1 × Saturn 4 Ultra", p: "~₹1.5–1.7L", pts: ["Covers ~90% of the products in this guide", "FDM for volume, resin for detail", "Upgrade to H2D when multi-colour orders grow"] },
  ];

  const STACK = [
    { l: "Tc", n: "Tinkercad", d: "Learn the basics — week 1", cost: "Free · browser", c: C.cyan },
    { l: "F", n: "Autodesk Fusion", d: "Functional parts, organisers, cases", cost: "Free personal · ~₹55k/yr", c: C.orange, pick: true },
    { l: "B", n: "Blender", d: "Toys, figurines, sculpting", cost: "Free", c: C.amber, pick: true },
    { l: "On", n: "Onshape / FreeCAD", d: "Alternative parametric CAD", cost: "Free tiers", c: C.blue },
    { l: "N", n: "Nomad Sculpt", d: "Sculpt on iPad", cost: "~₹1,500 one-time", c: C.pink },
    { l: "Rh", n: "Rhino + RhinoGold", d: "Professional jewellery", cost: "Industry standard · $$$", c: C.violet },
    { l: "BS", n: "Bambu Studio / Orca", d: "FDM slicing", cost: "Free", c: C.green },
    { l: "Ly", n: "Lychee / Chitubox", d: "Resin slicing & supports", cost: "Free / Pro", c: "#5EEAD4" },
  ];
  const PIPE = [
    { n: "Customer photo", d: "WhatsApp / web", c: C.cyan }, { n: "AI model", d: "Meshy", c: C.violet }, { n: "Clean-up", d: "Blender", c: C.blue },
    { n: "Print", d: "Resin / multi-colour PLA", c: C.orange }, { n: "Paint & pack", d: "Gift-ready", c: C.pink }, { n: "₹1,500–5,000", d: "Weddings · awards", c: C.green },
  ];
  const AI = [
    { n: "Text / photo → 3D", ex: "Meshy · Tripo · Hunyuan3D", g: "Figurines, toys, décor, mini-me from a photo", b: "Millimetre-accurate fits (cases, slippers, brackets)" },
    { n: "AI-written design code", ex: "ChatGPT / Claude → OpenSCAD", g: "Parametric organisers, name plates, boxes, trays", b: "Organic shapes" },
    { n: "AI inside CAD", ex: "Fusion generative design · Zoo Text-to-CAD", g: "Lightweight engineering parts", b: "Beginners" },
  ];
  const TIMELINE = [
    { w: "MONTH 6–9", n: "Formlabs Form 4", d: "₹5–7L · certified dental & industrial resins" },
    { w: "MONTH 6–9", n: "QuickSurface", d: "₹1.5L/yr · scan-to-CAD reverse engineering" },
    { w: "MONTH 9–12", n: "Bambu Lab H2D", d: "~₹2.5–3L · low-waste multi-material" },
    { w: "MONTH 12–18", n: "Industrial scanner", d: "₹10L+ · EinScan HX class for metrology" },
    { w: "MONTH 18+", n: "SLS printer", d: "₹35–45L · Formlabs Fuse 1+ class, nylon parts" },
  ];

  /* --------------------------------------------------------------- helpers */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const h = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content; };
  const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
  const lakh = (n) => (n < 0 ? "−" : "") + "₹" + Math.abs(n).toFixed(2) + "L";
  const fillRange = (el) => el.style.setProperty("--p", ((el.value - el.min) / (el.max - el.min)) * 100 + "%");

  /* --------------------------------------------------------------- journey */
  $("#journey").append(h(JOURNEY.map((j) => `<li><i class="dot" style="background:${j.c};box-shadow:0 0 10px ${j.c}"></i><b>${j.n}</b><span>${j.d}</span></li>`).join("")));

  /* ---------------------------------------------------------------- donut */
  const total = BUDGET.reduce((a, b) => a + b.v, 0);
  let acc = 0;
  const segs = BUDGET.map((b) => { const s = { ...b, from: acc / total, to: (acc + b.v) / total }; acc += b.v; return s; });
  const donut = $("#donut");
  donut.style.setProperty("--stops", segs.map((s) => `${s.c} ${(s.from * 100).toFixed(2)}% ${(s.to * 100 - 0.4).toFixed(2)}%, transparent ${(s.to * 100 - 0.4).toFixed(2)}% ${(s.to * 100).toFixed(2)}%`).join(","));
  $("#legend").append(h(segs.map((s, i) => `<li data-i="${i}" style="--c:${s.c}"><i></i><span>${s.k}</span><b>₹${s.v.toFixed(2)}L</b></li>`).join("")));
  const setCenter = (i) => {
    $$("#legend li").forEach((li) => li.classList.toggle("is-hot", +li.dataset.i === i));
    if (i == null) { $("#donutValue").textContent = `₹${total.toFixed(1)}L`; $("#donutLabel").textContent = "Total budget"; return; }
    $("#donutValue").textContent = `₹${segs[i].v.toFixed(2)}L`;
    $("#donutLabel").textContent = `${segs[i].k} · ${Math.round((segs[i].v / total) * 100)}%`;
  };
  $$("#legend li").forEach((li) => { li.addEventListener("mouseenter", () => setCenter(+li.dataset.i)); li.addEventListener("mouseleave", () => setCenter(null)); });
  donut.addEventListener("mousemove", (e) => {
    const r = donut.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
    const dist = Math.hypot(x, y) / (r.width / 2);
    if (dist < 0.58 || dist > 1) return setCenter(null);
    const ang = ((Math.atan2(y, x) * 180) / Math.PI + 90 + 360) % 360 / 360;
    setCenter(segs.findIndex((s) => ang >= s.from && ang < s.to));
  });
  donut.addEventListener("mouseleave", () => setCenter(null));

  /* ------------------------------------------------------------ equipment */
  const tabs = $("#equipTabs"), grid = $("#equipGrid");
  const showEquip = (k) => {
    $$(".tab", tabs).forEach((t) => t.setAttribute("aria-selected", t.dataset.k === k));
    const items = EQUIP[k];
    const sum = items.reduce((a, b) => a + b.p, 0);
    grid.replaceChildren(h(items.map((e, i) => `
      <article class="card" style="--c:${e.c};--accent:${e.c};animation-delay:${i * 60}ms">
        <span class="card__qty">${e.q}</span>
        <h4>${e.n}</h4>
        <p>${e.d}</p>
        <div class="card__price"><b>₹${e.p.toFixed(2)}L</b><span>${Math.round((e.p / sum) * 100)}% of category</span></div>
      </article>`).join("")));
  };
  tabs.append(h(Object.keys(EQUIP).map((k) => `<button class="tab" role="tab" data-k="${k}">${k}</button>`).join("")));
  tabs.addEventListener("click", (e) => { const b = e.target.closest(".tab"); if (b) showEquip(b.dataset.k); });
  showEquip(Object.keys(EQUIP)[0]);

  $("#floor").append(h(FLOOR.map((z) => `<div class="zone" style="grid-area:${z.a};--c:${z.c}"><div><b>${z.n}</b><br/><span>${z.d}</span></div><em>${z.s} sq ft</em></div>`).join("")));
  $("#team").append(h(TEAM.map((m) => `<div class="member"><div class="avatar" style="--c:${m.c}">${m.i}</div><div><b>${m.n}</b><span>${m.d}</span></div><strong>${m.p}</strong></div>`).join("")));

  /* ----------------------------------------------------------- calculator */
  const cM = $("#cMaterial"), cMa = $("#cMachine");
  cM.innerHTML = MATERIALS.map((m, i) => `<option value="${i}">${m.n} · ₹${m.charge}/${m.unit}</option>`).join("");
  cMa.innerHTML = MACHINES.map((m, i) => `<option value="${i}">${m.n}</option>`).join("");
  const ids = ["cQty", "cHours", "cLabour", "cUnits", "cRush", "cLabourType"];
  const quoteNo = String(Math.floor(Math.random() * 9000) + 1000);
  $("#rId").textContent = "#3D-" + quoteNo;

  const calc = () => {
    const mat = MATERIALS[cM.value];
    // keep machine consistent with material family
    if (MACHINES[cMa.value].kind !== mat.kind) cMa.value = MACHINES.findIndex((m) => m.kind === mat.kind);
    const mac = MACHINES[cMa.value];
    const qty = +$("#cQty").value, hrs = +$("#cHours").value, lab = +$("#cLabour").value;
    const labRate = +$("#cLabourType").value, units = Math.max(1, +$("#cUnits").value || 1), rush = $("#cRush").checked;

    $("#oQty").textContent = `${qty} ${mat.unit}`;
    $("#oHours").textContent = `${hrs} h`;
    $("#oLabour").textContent = `${lab} h`;
    ["cQty", "cHours", "cLabour"].forEach((id) => fillRange($("#" + id)));

    const lMat = qty * mat.charge, lMac = hrs * mac.rate, lLab = lab * labRate;
    const sub = lMat + lMac + lLab, buf = sub * 0.1;
    let unit = (sub + buf) * (rush ? 1.4 : 1);
    const disc = units >= 100 ? 0.2 : units >= 25 ? 0.1 : 0;
    let ex = unit * units * (1 - disc);
    const minApplied = ex < 500;
    ex = Math.max(500, ex);
    const gst = ex * 0.18, tot = ex + gst;
    const cost = (qty * mat.cost + hrs * mac.cost + lLab) * units;
    const margin = (ex - cost) / ex;

    const lines = [
      [`Material · ${qty} ${mat.unit} × ₹${mat.charge}`, lMat],
      [`Machine · ${hrs} h × ₹${mac.rate}`, lMac],
      [`Labour · ${lab} h × ₹${labRate}`, lLab],
      ["Failure buffer · 10%", buf],
    ];
    if (rush) lines.push(["Rush · +40%", (sub + buf) * 0.4]);
    if (units > 1) lines.push([`× ${units} units${disc ? ` · −${disc * 100}% volume` : ""}`, null]);
    if (minApplied) lines.push(["Minimum order applied", null]);
    lines.push(["Subtotal (ex-GST)", ex, true], ["GST · 18%", gst]);
    $("#rLines").replaceChildren(h(lines.map(([k, v, s]) => `<li class="${s ? "is-sub" : ""}"><span>${k}</span><span>${v == null ? "" : inr(v)}</span></li>`).join("")));
    $("#rTotal").textContent = inr(tot);
    $("#rUnit").textContent = inr(tot / units);
    $("#rCost").textContent = inr(cost);
    $("#rMargin").textContent = Math.round(margin * 100) + "%";

    const health = $("#rHealth");
    if (mat.kind === "fdm") {
      const perHr = ex / units / Math.max(hrs, 0.5);
      const cls = perHr >= 130 ? "good" : perHr >= 100 ? "warn" : "bad";
      const msg = { good: "Healthy — above the ₹130/h FDM benchmark.", warn: "Borderline — aim for ₹130–180 per machine-hour.", bad: "Too cheap — raise the price or decline." }[cls];
      health.className = "health health--" + cls;
      health.textContent = `Earning ${inr(perHr)} per machine-hour. ${msg}`;
    } else {
      const cls = margin >= 0.5 ? "good" : margin >= 0.35 ? "warn" : "bad";
      health.className = "health health--" + cls;
      health.textContent = `Gross margin ${Math.round(margin * 100)}% — ${cls === "good" ? "healthy for resin." : cls === "warn" ? "borderline; check plate sharing." : "too low; raise the price."}`;
    }
  };
  cMa.addEventListener("input", () => {
    const kind = MACHINES[cMa.value].kind;
    if (MATERIALS[cM.value].kind !== kind) cM.value = MATERIALS.findIndex((m) => m.kind === kind);
  });
  [cM, cMa, ...ids.map((id) => $("#" + id))].forEach((el) => el.addEventListener("input", calc));
  calc();

  $("#ratecard").append(h(RATES.map(([k, v]) => `<div class="rate"><span>${k}</span><b>${v}</b></div>`).join("")));

  /* ------------------------------------------------------------ break-even */
  const CAPACITY = 5.3, MONTHS = 12;
  const RAMP = [0.8, 1.3, 1.8, 2.2, 2.6, 3.0, 3.4, 3.8, 4.1, 4.4, 4.6, 4.8];
  const svgNS = "http://www.w3.org/2000/svg";
  const beChart = $("#beChart");
  const drawBE = () => {
    const fixed = +$("#bFixed").value, margin = +$("#bMargin").value / 100, g = +$("#bGrowth").value / 100;
    ["bFixed", "bMargin", "bGrowth"].forEach((id) => fillRange($("#" + id)));
    $("#oFixed").textContent = `₹${fixed.toFixed(2)}L`;
    $("#oMargin").textContent = `${Math.round(margin * 100)}%`;
    $("#oGrowth").textContent = `${Math.round(g * 100)}%`;

    const be = fixed / margin;
    const rev = [], cum = [];
    let c = 0, dip = 0, pos = null;
    for (let m = 0; m < MONTHS; m++) {
      const r = Math.min(CAPACITY, 0.8 + (RAMP[m] - 0.8) * g);
      c += r * margin - fixed;
      rev.push(r); cum.push(c);
      dip = Math.min(dip, c);
      if (pos === null && c > 0 && m > 0) pos = m + 1;
    }
    $("#kBe").textContent = `₹${be.toFixed(2)}L`;
    $("#kCap").textContent = `${Math.round((be / CAPACITY) * 100)}%`;
    $("#kDip").textContent = lakh(dip).replace(/(\.\d)\d/, "$1");
    $("#kPos").textContent = pos ? `Month ${pos}` : `> ${MONTHS} months`;

    const W = 640, H = 360, L = 52, R = 16, T = 20, B = 40;
    const maxY = Math.max(CAPACITY * 0.8, ...rev, be) + 0.4, minY = Math.min(-0.5, ...cum) - 0.3;
    const y = (v) => T + ((maxY - v) / (maxY - minY)) * (H - T - B);
    const bw = (W - L - R) / MONTHS;
    const x = (i) => L + bw * i + bw / 2;
    let s = `<defs><linearGradient id="bar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.orange}"/><stop offset="1" stop-color="${C.pink}" stop-opacity="0.55"/></linearGradient>
      <linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.green}" stop-opacity="0.35"/><stop offset="1" stop-color="${C.green}" stop-opacity="0"/></linearGradient></defs>`;
    for (let v = Math.ceil(minY); v <= maxY; v++) {
      s += `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" stroke="rgba(255,255,255,${v === 0 ? 0.35 : 0.06})" ${v === 0 ? "" : 'stroke-dasharray="2 4"'}/>`;
      s += `<text x="${L - 10}" y="${y(v) + 4}" text-anchor="end" fill="#6B7590" font-size="11" font-family="JetBrains Mono, monospace">${v}L</text>`;
    }
    rev.forEach((r, i) => {
      const top = y(r), h0 = y(0) - top;
      s += `<rect x="${x(i) - bw * 0.3}" y="${top}" width="${bw * 0.6}" height="${h0}" rx="5" fill="url(#bar)" opacity="${r >= be ? 1 : 0.55}"><animate attributeName="height" from="0" to="${h0}" dur="0.6s" fill="freeze"/><animate attributeName="y" from="${y(0)}" to="${top}" dur="0.6s" fill="freeze"/></rect>`;
      s += `<text x="${x(i)}" y="${H - 16}" text-anchor="middle" fill="#A7B0C5" font-size="11" font-family="JetBrains Mono, monospace">M${i + 1}</text>`;
    });
    s += `<line x1="${L}" x2="${W - R}" y1="${y(be)}" y2="${y(be)}" stroke="${C.cyan}" stroke-width="2" stroke-dasharray="6 5"/>`;
    s += `<text x="${W - R}" y="${y(be) - 8}" text-anchor="end" fill="${C.cyan}" font-size="12" font-weight="600" font-family="Inter, sans-serif">Break-even ₹${be.toFixed(2)}L</text>`;
    const pts = cum.map((v, i) => `${x(i)},${y(v)}`);
    s += `<path d="M${x(0)},${y(0)} L${pts.join(" L")} L${x(MONTHS - 1)},${y(0)} Z" fill="url(#area)"/>`;
    s += `<polyline points="${pts.join(" ")}" fill="none" stroke="${C.green}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`;
    cum.forEach((v, i) => {
      s += `<circle cx="${x(i)}" cy="${y(v)}" r="4.5" fill="${v < 0 ? C.red : C.green}" stroke="#0B0D12" stroke-width="2"><title>M${i + 1}: revenue ₹${rev[i].toFixed(2)}L · cumulative ${lakh(v)}</title></circle>`;
    });
    beChart.innerHTML = s;
  };
  ["bFixed", "bMargin", "bGrowth"].forEach((id) => $("#" + id).addEventListener("input", drawBE));
  drawBE();

  /* ----------------------------------------------------------------- waste */
  $("#wasteList").append(h(WASTE.map((w, i) => `
    <div class="wrow"><span class="wrow__rank">0${i + 1}</span>
      <div><b>${w.n}</b><small>${w.t}</small></div>
      <div class="meter" style="--c:${w.c}"><i data-w="${w.w}"></i></div>
      <p>${w.why}</p></div>`).join("")));
  $("#wasteTips").append(h(WASTE_TIPS.map((t) => `<span class="tip">${t}</span>`).join("")));

  /* ---------------------------------------------------------------- market */
  const tierChips = $("#tierChips"), prodGrid = $("#products");
  const TIERS = [["all", "All products"], ["1", "Tier 1 · focus"], ["2", "Tier 2 · add-ons"], ["3", "Tier 3 · niche / risky"]];
  tierChips.append(h(TIERS.map(([k, v], i) => `<button class="chip ${i ? "" : "is-on"}" data-k="${k}">${v}</button>`).join("")));
  const showProducts = (k) => {
    $$(".chip", tierChips).forEach((c) => c.classList.toggle("is-on", c.dataset.k === k));
    const list = PRODUCTS.filter((p) => k === "all" || String(p.tier) === k);
    prodGrid.replaceChildren(h(list.map((p, i) => {
      const o = OUT[p.o];
      return `<div class="flip" tabindex="0" style="--c:${o.c};animation:card-in .5s ${i * 50}ms both cubic-bezier(.2,.8,.2,1)">
        <div class="flip__inner">
          <div class="flip__face">
            <span class="badge">${o.t}</span>
            <div><div class="flip__icon">${p.i}</div><h4>${p.n}</h4><p class="desc">${p.d}</p></div>
          </div>
          <div class="flip__face flip__back">
            <h4>${p.n}</h4>
            <ul class="kv">
              <li><span>Material</span><b>${p.m}</b></li>
              <li><span>Machine</span><b>${p.mc}</b></li>
              <li><span>Cost / piece</span><b>${p.cost}</b></li>
              <li><span>Sells for</span><b>${p.price}</b></li>
            </ul>
          </div>
        </div></div>`;
    }).join("")));
    $$(".flip", prodGrid).forEach((f) => f.addEventListener("click", () => f.classList.toggle("is-flipped")));
  };
  tierChips.addEventListener("click", (e) => { const b = e.target.closest(".chip"); if (b) showProducts(b.dataset.k); });
  showProducts("all");

  (() => {
    const W = 520, H = 420, P = 44;
    const qx = (v) => P + v * (W - 2 * P), qy = (v) => H - P - v * (H - 2 * P);
    let s = `<rect x="${W / 2}" y="${P}" width="${W / 2 - P}" height="${H / 2 - P}" fill="${C.green}" opacity="0.07"/>`;
    s += `<line x1="${W / 2}" x2="${W / 2}" y1="${P}" y2="${H - P}" stroke="rgba(255,255,255,.12)"/><line x1="${P}" x2="${W - P}" y1="${H / 2}" y2="${H / 2}" stroke="rgba(255,255,255,.12)"/>`;
    s += `<rect x="${P}" y="${P}" width="${W - 2 * P}" height="${H - 2 * P}" fill="none" stroke="rgba(255,255,255,.1)" rx="8"/>`;
    const lbl = (x0, y0, t, c, a = "start") => `<text x="${x0}" y="${y0}" text-anchor="${a}" fill="${c}" font-size="11" font-weight="600" letter-spacing="2" font-family="JetBrains Mono, monospace">${t}</text>`;
    s += lbl(W - P - 10, P + 20, "FOCUS", C.green, "end") + lbl(P + 10, P + 20, "PREMIUM NICHE", C.violet) + lbl(P + 10, H - P - 12, "AVOID", C.red) + lbl(W - P - 10, H - P - 12, "VOLUME PLAY", C.amber, "end");
    s += `<text x="${W / 2}" y="${H - 12}" text-anchor="middle" fill="#6B7590" font-size="12" font-family="Inter, sans-serif">Demand →</text>`;
    s += `<text x="16" y="${H / 2}" text-anchor="middle" fill="#6B7590" font-size="12" font-family="Inter, sans-serif" transform="rotate(-90 16 ${H / 2})">Margin →</text>`;
    QUAD.forEach(([n, dx, my, c, side]) => {
      const X = qx(dx), Y = qy(my), right = side === "r";
      s += `<g><circle class="pt" cx="${X}" cy="${Y}" r="7" fill="${c}" style="filter:drop-shadow(0 0 6px ${c})"/><text x="${X + (right ? 12 : -12)}" y="${Y + 4}" text-anchor="${right ? "start" : "end"}" fill="#C9D1E3" font-size="12" font-family="Inter, sans-serif">${n}</text></g>`;
    });
    $("#quad").innerHTML = s;
  })();

  /* -------------------------------------------------------------- slippers */
  const kv = (arr) => arr.map(([k, v]) => `<li><span>${k}</span><b>${v}</b></li>`).join("");
  $("#slipRecipe").innerHTML = kv(SLIP_RECIPE);
  $("#slipEcon").innerHTML = kv(SLIP_ECON);

  /* ------------------------------------------------------------- suppliers */
  const supChips = $("#supChips"), supGrid = $("#supGrid"), supSearch = $("#supSearch");
  let supCat = "all";
  supChips.append(h(SUP_CATS.map(([k, v], i) => `<button class="chip ${i ? "" : "is-on"}" data-k="${k}">${v}</button>`).join("")));
  const showSup = () => {
    const q = supSearch.value.trim().toLowerCase();
    $$(".chip", supChips).forEach((c) => c.classList.toggle("is-on", c.dataset.k === supCat));
    const list = SUPPLIERS.filter((s) =>
      (supCat === "all" || (supCat === "blr" ? s.blr : s.cat.includes(supCat))) &&
      (!q || [s.n, s.loc, s.d, s.ct, ...s.tags, ...s.cat].join(" ").toLowerCase().includes(q)));
    supGrid.replaceChildren(list.length ? h(list.map((s, i) => `
      <article class="sup" style="animation-delay:${i * 40}ms">
        <div class="sup__top"><h4>${s.n}</h4></div>
        <span class="sup__loc ${s.blr ? "is-blr" : ""}">● ${s.loc}</span>
        <p>${s.d}</p>
        <div class="tags">${s.tags.map((t) => `<span>${t}</span>`).join("")}</div>
        <div class="sup__contact">${s.ct}</div>
      </article>`).join("")) : h(`<div class="empty">No suppliers match “${q}”.</div>`));
  };
  supChips.addEventListener("click", (e) => { const b = e.target.closest(".chip"); if (b) { supCat = b.dataset.k; showSup(); } });
  supSearch.addEventListener("input", showSup);
  showSup();

  const PMAX = 5200;
  $("#priceBars").append(h(PRICES.map(([n, lo, hi, c], i) => `
    <div class="prow"><span>${n}</span>
      <div class="ptrack"><i style="left:${(lo / PMAX) * 100}%;width:${((hi - lo) / PMAX) * 100}%;--c:${c};animation-delay:${i * 80}ms"></i></div>
      <b>₹${lo.toLocaleString("en-IN")}–${hi.toLocaleString("en-IN")}</b></div>`).join("")));

  /* --------------------------------------------------------------- chooser */
  const opts = $("#chooserOpts"), res = $("#chooserResult");
  opts.append(h(CHOOSER.map((c, i) => `<button class="opt" role="tab" data-i="${i}">${c.k}<small>${c.s}</small></button>`).join("")));
  const choose = (i) => {
    $$(".opt", opts).forEach((o) => o.setAttribute("aria-selected", +o.dataset.i === i));
    const c = CHOOSER[i];
    res.innerHTML = `<div class="fade-in"><p class="eyebrow">Recommended</p><h3>${c.r}</h3><span class="price">${c.p}</span><ul>${c.pts.map((p) => `<li>${p}</li>`).join("")}</ul></div>`;
  };
  opts.addEventListener("click", (e) => { const b = e.target.closest(".opt"); if (b) choose(+b.dataset.i); });
  choose(3);

  /* ------------------------------------------------------------- software */
  $("#stack").append(h(STACK.map((t) => `<div class="tool" style="--c:${t.c}">${t.pick ? '<span class="pick">TOP PICK</span>' : ""}<div class="tool__logo">${t.l}</div><h4>${t.n}</h4><p>${t.d}</p><div class="cost">${t.cost}</div></div>`).join("")));
  $("#pipe").append(h(PIPE.map((p) => `<li style="--c:${p.c}"><b>${p.n}</b><span>${p.d}</span></li>`).join("")));
  $("#aiGrid").append(h(AI.map((a) => `<div class="ai"><h4>${a.n}</h4><div class="ex">${a.ex}</div><p class="good">${a.g}</p><p class="bad">${a.b}</p></div>`).join("")));
  $("#timeline").append(h(TIMELINE.map((t) => `<li><span class="when">${t.w}</span><b>${t.n}</b><span>${t.d}</span></li>`).join("")));

  /* ------------------------------------------------------- scroll effects */
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const countUp = (el) => {
    const end = +el.dataset.count, dec = +(el.dataset.decimals || 0), pre = el.dataset.prefix || "", suf = el.dataset.suffix || "";
    if (reduce) return;
    const t0 = performance.now(), dur = 1400;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + (end * e).toFixed(dec) + suf;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (!en.isIntersecting) return;
    en.target.classList.add("is-in");
    $$("[data-count]", en.target).forEach(countUp);
    $$(".meter i", en.target).forEach((m) => (m.style.width = m.dataset.w + "%"));
    io.unobserve(en.target);
  }), { threshold: 0.12 });
  $$(".reveal").forEach((el) => io.observe(el));

  const nav = $("#nav"), bar = $("#progressBar"), label = $("#progressLabel");
  const links = $$(".nav__links a");
  const sections = links.map((a) => $(a.getAttribute("href")));
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = Math.min(100, Math.max(0, (scrollY / max) * 100));
    bar.style.width = p + "%";
    label.textContent = p >= 99.5 ? "Print complete ✓" : `Printing… layer ${Math.round(p * 4.2)} · ${Math.round(p)}%`;
    nav.classList.toggle("is-scrolled", scrollY > 10);
    let cur = -1;
    sections.forEach((s, i) => { if (s && s.getBoundingClientRect().top < innerHeight * 0.35) cur = i; });
    links.forEach((a, i) => a.classList.toggle("is-active", i === cur));
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const toggle = $("#navToggle"), navLinks = $("#navLinks");
  toggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
  });
  links.forEach((a) => a.addEventListener("click", () => { navLinks.classList.remove("is-open"); toggle.setAttribute("aria-expanded", false); }));
})();

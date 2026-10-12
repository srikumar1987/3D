/* 3D / Field Guide — Industry section (data + interactions, no dependencies) */
(() => {
  "use strict";

  const C = {
    orange: "#FF6B1A", pink: "#FF3D7F", violet: "#B26BFF", cyan: "#22D3EE",
    blue: "#7C9CFF", green: "#3DDC97", amber: "#FFC145", red: "#FF5C5C", slate: "#8A94AD", teal: "#5EEAD4",
  };
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const h = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content; };
  const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
  const fillRange = (el) => el.style.setProperty("--p", ((el.value - el.min) / (el.max - el.min)) * 100 + "%");

  /* ========================================================= VALUE CHAIN */
  const CHAIN = [
    { n: "Raw polymers", s: "Pellets & photopolymers", c: C.slate,
      what: "PLA is made from plant sugars (corn, sugarcane); ABS, PETG, nylon and PC come from petrochemicals; resins are specialty photopolymer chemistry.",
      global: "NatureWorks and TotalEnergies Corbion (PLA), large petrochemical and specialty-chemical companies.",
      india: "Mostly imported pellets; Indian compounders blend colours and additives.",
      money: "Commodity volumes — thin margins, scale wins." },
    { n: "Material makers", s: "Filament & resin brands", c: C.green,
      what: "Extrude pellets into 1.75 mm filament with tight tolerance, or formulate resins. Quality = diameter consistency, moisture control, colour accuracy.",
      global: "Bambu Lab, Polymaker, eSUN, SUNLU, Elegoo, Prusament, Siraya Tech.",
      india: "Numakers (Surat), FibReel / Rever (Nashik), Vektor3D (Mumbai), 3dprintzkart & Ultra Nanotech (Bengaluru).",
      money: "Extrusion plus branding — premium brands charge 1.5–2× generic for consistency." },
    { n: "Printer makers", s: "Hardware & software", c: C.orange,
      what: "Design printers, firmware, slicers and cloud tools. Consumer brands win on speed and ease; industrial brands on certified, repeatable parts.",
      global: "Consumer: Bambu Lab, Creality, Elegoo, Anycubic, Prusa. Professional: Formlabs, UltiMaker. Industrial: Stratasys, 3D Systems, EOS, HP.",
      india: "Divide By Zero (Mumbai), Fracktal Works (Bengaluru), Make3D — mainly industrial FDM and education.",
      money: "Hardware margin plus recurring consumables, spares, software and service." },
    { n: "Distributors", s: "Import, stock, warranty", c: C.violet,
      what: "Import in bulk, hold stock, handle customs, warranty, spares and training. Usually authorised per brand and region.",
      global: "Regional master distributors in every country.",
      india: "WOL3D (Bambu, Creality, Elegoo), Protomont (Revopoint, Elegoo, Polymaker), Phillips & Corengg (Formlabs).",
      money: "Trading margin plus AMC, training and service — indicative 10–25% gross." },
    { n: "Resellers", s: "Shops & marketplaces", c: C.blue,
      what: "Sell to end users online and offline; compete on stock, delivery speed, bundles and support.",
      global: "Brand stores, Amazon, specialist e-shops.",
      india: "Robu.in, KSP Electronics, 3Ding, 3D Protofarm, Ideal3D, Mechblock, Amazon.in, Flipkart.",
      money: "Thin margins — volume, accessories and filament keep them alive." },
    { n: "Service bureaus", s: "Print-on-demand & makers", c: C.pink,
      what: "Own printers and sell printed parts, design, scanning and finishing. This is where most small businesses start.",
      global: "Protolabs, Shapeways-style platforms, Xometry networks.",
      india: "Imaginarium (Mumbai), Think3D (Hyderabad), Makenica, and hundreds of local print shops — maybe you.",
      money: "Machine time + design + finishing — ~40–60% gross margin on prints (see the pricing calculator)." },
    { n: "Customers", s: "Who pays for parts", c: C.cyan,
      what: "Pay for speed, customisation and low volumes that moulding can't serve economically.",
      global: "Aerospace, medical, dental, automotive, consumer products, education.",
      india: "Hardware startups, MSMEs (jigs & fixtures), engineering colleges, jewellers, dental labs, architects, gifting & consumers.",
      money: "Value = time saved vs tooling, or a product that couldn't exist otherwise." },
  ];
  const rail = $("#chainRail"), panel = $("#chainPanel");
  rail.append(h(CHAIN.map((s, i) => `<li><button role="tab" data-i="${i}" style="--c:${s.c}"><em>${i + 1}</em><b>${s.n}</b><span>${s.s}</span></button></li>`).join("")));
  const showChain = (i) => {
    $$("button", rail).forEach((b) => b.setAttribute("aria-selected", +b.dataset.i === i));
    const s = CHAIN[i];
    panel.style.setProperty("--c", s.c);
    panel.innerHTML = `<div class="fade-in">
      <p class="eyebrow" style="color:${s.c}">Stage ${i + 1} of ${CHAIN.length}</p><h3>${s.n}</h3><p class="chain__what">${s.what}</p>
      <dl class="chain__dl">
        <div><dt>Global players</dt><dd>${s.global}</dd></div>
        <div><dt>In India</dt><dd>${s.india}</dd></div>
        <div class="is-money"><dt>How they make money</dt><dd>${s.money}</dd></div>
      </dl></div>`;
  };
  rail.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) showChain(+b.dataset.i); });
  showChain(5);

  const HISTORY = [
    ["1984–86", "Stereolithography (SLA)", "Chuck Hull invents SLA and founds 3D Systems.", C.cyan],
    ["1987–89", "SLS and FDM", "Carl Deckard develops laser sintering; Scott Crump patents FDM and co-founds Stratasys.", C.orange],
    ["1989", "EOS founded", "Germany becomes the home of industrial laser sintering.", C.violet],
    ["2005", "RepRap", "An open-source project to build a printer that prints its own parts.", C.green],
    ["2009", "FDM patents expire", "A wave of low-cost desktop printers follows.", C.amber],
    ["2012", "Desktop SLA", "Formlabs' Form 1 Kickstarter brings resin printing to desks.", C.pink],
    ["2016", "HP Multi Jet Fusion", "Production-grade nylon parts at scale.", C.blue],
    ["2022", "India strategy + Bambu X1", "MeitY's National Strategy on Additive Manufacturing; Bambu Lab's X1 resets consumer speed.", C.green],
    ["2025–26", "Multi-nozzle era", "H2D and H2C cut purge waste; the X1 Carbon retires in March 2026.", C.orange],
  ];
  $("#history").append(h(HISTORY.map(([y, t, d, c]) => `<li style="--c:${c}"><span>${y}</span><b>${t}</b><p>${d}</p></li>`).join("")));

  const PLAYERS = [
    ["Stratasys", "USA / Israel", "Industrial", "FDM inventor; PolyJet multi-material", C.orange],
    ["3D Systems", "USA", "Industrial", "SLA inventor; SLS and metal", C.cyan],
    ["EOS", "Germany", "Industrial", "Laser sintering — polymer and metal", C.violet],
    ["HP", "USA", "Industrial", "Multi Jet Fusion nylon production", C.blue],
    ["Formlabs", "USA", "Professional", "Desktop SLA (Form 4) and SLS (Fuse)", C.pink],
    ["UltiMaker", "Netherlands / USA", "Professional", "Ultimaker + MakerBot, merged 2022", C.teal],
    ["Prusa Research", "Czechia", "Prosumer", "Open-source FDM — MK4, CORE One", C.amber],
    ["Bambu Lab", "China", "Consumer–pro", "Fast CoreXY, AMS multi-colour", C.green],
    ["Creality", "China", "Consumer", "Mass-market Ender and K-series", C.orange],
    ["Elegoo · Anycubic", "China", "Consumer", "Budget resin and FDM", C.violet],
    ["Divide By Zero · Fracktal · Make3D", "India", "Industrial", "Made-in-India FDM, education, service", C.cyan],
  ];
  $("#players").append(h(PLAYERS.map(([n, o, s, k, c]) => `<div class="player" style="--c:${c}"><div><b>${n}</b><span>${o}</span></div><em>${s}</em><p>${k}</p></div>`).join("")));

  /* =================================================== MODELS & CAREERS */
  const MODELS = [
    { n: "Service bureau", d: "Print parts on demand for many clients — prototypes, small batches, scanning.", cost: "₹10–25L", pro: "Steady B2B work, repeat clients", con: "Many small jobs, needs sales effort", c: C.orange },
    { n: "Print farm & D2C products", d: "Design and sell your own products — gifts, décor, toys — online and via Instagram.", cost: "₹3–15L", pro: "Scales with printers, own brand", con: "Marketing, copycats, design IP", c: C.pink },
    { n: "B2B engineering", d: "Jigs, fixtures, end-use parts for MSMEs and startups.", cost: "₹10–30L", pro: "High value, sticky contracts", con: "Needs engineering skill and better machines", c: C.blue },
    { n: "Education & training", d: "School labs, college workshops, courses and certifications.", cost: "₹2–10L", pro: "Recurring, grant-friendly", con: "Seasonal, long sales cycles", c: C.green },
    { n: "Reselling & distribution", d: "Sell printers, filament and spares — needs brand authorisation.", cost: "₹10L+ working capital", pro: "Volume, recurring consumables", con: "Thin margins, inventory risk", c: C.violet },
    { n: "Design & digital files", d: "Freelance CAD, sell STL files on MakerWorld, Printables, Cults.", cost: "₹1–3L", pro: "No inventory, work from anywhere", con: "Low prices, lots of competition", c: C.cyan },
  ];
  $("#models").append(h(MODELS.map((m) => `
    <article class="model" style="--c:${m.c}">
      <header><h4>${m.n}</h4><span>Start ~${m.cost}</span></header>
      <p>${m.d}</p>
      <ul><li class="pro">${m.pro}</li><li class="con">${m.con}</li></ul>
    </article>`).join("")));

  const CAREERS = [
    ["Print technician / operator", "ITI / diploma", "₹15–25k / month", C.amber],
    ["CAD / design engineer", "B.E. Mechanical", "₹3–6 LPA", C.cyan],
    ["3D artist / sculptor", "Blender, ZBrush portfolio", "₹3–8 LPA", C.pink],
    ["Scanning & reverse-engineering specialist", "Mech + metrology", "₹4–8 LPA", C.violet],
    ["Application / sales engineer", "At distributors & OEMs", "₹5–12 LPA", C.blue],
    ["Additive manufacturing engineer", "Industrial / metal AM", "₹5–12 LPA", C.orange],
    ["Founder / print-shop owner", "All of the above", "Variable", C.green],
  ];
  $("#careers").append(h(CAREERS.map(([n, q, p, c]) => `<div class="career" style="--c:${c}"><b>${n}</b><span>${q}</span><em>${p}</em></div>`).join("")));

  /* ====================================================== PRINTER PRICES */
  const PRINTERS = [
    { b: "Bambu Lab", m: "A1 Mini", o: "China", t: "FDM", p: 21499, v: "180 × 180 × 180", e: "Open", best: "First printer, students", w: "WOL3D · Robu · KSP" },
    { b: "Bambu Lab", m: "A1", o: "China", t: "FDM", p: 31999, v: "256 × 256 × 256", e: "Open", best: "Best-value beginner", w: "WOL3D · Robu · KSP" },
    { b: "Bambu Lab", m: "A1 Mini Combo", o: "China", t: "FDM", p: 38499, v: "180 × 180 × 180", e: "Open", best: "Multi-colour on a budget", w: "WOL3D · Robu · KSP" },
    { b: "Bambu Lab", m: "A1 Combo", o: "China", t: "FDM", p: 48999, v: "256 × 256 × 256", e: "Open", best: "Multi-colour beginner", w: "WOL3D · Robu · KSP" },
    { b: "Bambu Lab", m: "A2L", o: "China", t: "FDM", p: 48999, v: "Large format", e: "Open", best: "Big parts on a budget", w: "KSP · resellers" },
    { b: "Bambu Lab", m: "P1S", o: "China", t: "FDM", p: 52499, v: "256 × 256 × 256", e: "Enclosed", best: "ABS / ASA capable", w: "WOL3D · Robu · KSP" },
    { b: "Bambu Lab", m: "P1S Combo", o: "China", t: "FDM", p: 69999, v: "256 × 256 × 256", e: "Enclosed", best: "Small-business workhorse", w: "WOL3D · Robu · KSP" },
    { b: "Bambu Lab", m: "P2S", o: "China", t: "FDM", p: 71999, v: "256 × 256 × 256", e: "Enclosed", best: "Newer, faster P1S", w: "WOL3D · Robu · KSP" },
    { b: "Bambu Lab", m: "P2S Combo", o: "China", t: "FDM", p: 102999, v: "256 × 256 × 256", e: "Enclosed", best: "Production multi-colour", w: "WOL3D · Robu · KSP" },
    { b: "Bambu Lab", m: "H2S", o: "China", t: "FDM", p: 154999, v: "Large (~350 mm class)", e: "Heated chamber", best: "Engineering materials", w: "WOL3D · Robu · KSP" },
    { b: "Bambu Lab", m: "H2D", o: "China", t: "FDM", p: 219999, v: "350 × 320 × 325", e: "Heated chamber", best: "Dual nozzle, laser option", w: "WOL3D · Robu · KSP" },
    { b: "Bambu Lab", m: "H2C Combo", o: "China", t: "FDM", p: 309999, v: "Large (~350 mm class)", e: "Heated chamber", best: "Lowest-waste multi-colour", w: "WOL3D · Robu · KSP" },
    { b: "Creality", m: "K1 Max", o: "China", t: "FDM", p: 71999, v: "300 × 300 × 300", e: "Enclosed", best: "Large prints", w: "WOL3D · Robu" },
    { b: "Prusa", m: "CORE One+ (kit)", o: "Czechia", t: "FDM", p: 135000, v: "250 × 220 × 270", e: "Enclosed", best: "Build it yourself, learn", w: "Technoventor · Robu" },
    { b: "Prusa", m: "CORE One (assembled)", o: "Czechia", t: "FDM", p: 169999, ptxt: "₹1,69,999 – 2,09,999", v: "250 × 220 × 270", e: "Enclosed", best: "Open-source, repairable", w: "3D Bazaar · resellers" },
    { b: "Elegoo", m: "Saturn 4 Ultra 16K", o: "China", t: "Resin", p: 59999, ptxt: "₹59,999 – 61,499", v: "Mid-size MSLA", e: "Enclosed", best: "Miniatures, jewellery", w: "3Ding · 3D Protofarm · WOL3D" },
    { b: "Formlabs", m: "Form 4", o: "USA", t: "Resin", p: 737499, ptxt: "~₹6.25L + GST", v: "200 × 125 × 210", e: "Enclosed", best: "Dental, industrial SLA", w: "Corengg · Phillips · Jetayu" },
    { b: "Divide By Zero", m: "Industrial FDM range", o: "India", t: "Industrial", p: null, ptxt: "On request", v: "Large format", e: "Varies", best: "Made-in-India, long runs", w: "divbyz.com" },
    { b: "Fracktal Works", m: "Industrial FDM range", o: "India (Bengaluru)", t: "Industrial", p: null, ptxt: "On request", v: "Varies", e: "Varies", best: "Local support in Bangalore", w: "fracktal.in" },
    { b: "Make3D", m: "FDM & resin range", o: "India", t: "Industrial", p: null, ptxt: "On request", v: "Varies", e: "Varies", best: "Industrial & education", w: "make3d.in" },
  ];
  const TYPE_C = { FDM: C.orange, Resin: C.cyan, Industrial: C.violet };
  let prType = "all";
  const picked = new Set();
  const prFilter = $("#prFilter"), prTable = $("#prTable"), prSort = $("#prSort"), prCompare = $("#prCompare");
  prFilter.append(h([["all", "All"], ["FDM", "FDM"], ["Resin", "Resin"], ["Industrial", "Industrial · India"], ["budget", "Under ₹50k"]].map(([k, v], i) => `<button class="chip ${i ? "" : "is-on"}" data-k="${k}">${v}</button>`).join("")));
  const maxP = Math.max(...PRINTERS.filter((p) => p.p).map((p) => p.p));
  const priceText = (p) => p.ptxt || inr(p.p);
  const renderPrinters = () => {
    $$(".chip", prFilter).forEach((c) => c.classList.toggle("is-on", c.dataset.k === prType));
    let list = PRINTERS.map((p, i) => ({ ...p, i })).filter((p) => prType === "all" || (prType === "budget" ? p.p && p.p < 50000 : p.t === prType));
    const s = prSort.value;
    list.sort((a, b) => s === "brand" ? (a.b + a.m).localeCompare(b.b + b.m) : ((a.p ?? Infinity) - (b.p ?? Infinity)) * (s === "desc" ? -1 : 1));
    if (s === "desc") list = [...list.filter((p) => p.p), ...list.filter((p) => !p.p)];
    prTable.innerHTML = `
      <div class="prow2 prow2--head"><span></span><span>Printer</span><span>Type</span><span>Price (India)</span><span class="hide-sm">Build (mm)</span><span class="hide-sm">Best for</span></div>
      ${list.map((p) => `
        <label class="prow2 ${picked.has(p.i) ? "is-picked" : ""}" style="--c:${TYPE_C[p.t]}">
          <span><input type="checkbox" data-i="${p.i}" ${picked.has(p.i) ? "checked" : ""}/><span class="box"></span></span>
          <span class="prow2__name"><b>${p.b} ${p.m}</b><small>${p.o} · ${p.e}</small></span>
          <span><em class="tbadge">${p.t}</em></span>
          <span class="prow2__price"><b>${priceText(p)}</b>${p.p ? `<i style="width:${Math.max(4, Math.sqrt(p.p / maxP) * 100)}%"></i>` : ""}</span>
          <span class="hide-sm">${p.v}</span>
          <span class="hide-sm muted">${p.best}</span>
        </label>`).join("")}`;
  };
  const renderCompare = () => {
    if (!picked.size) { prCompare.innerHTML = `<p class="muted small">Tick printers above to compare them here.</p>`; return; }
    const ps = [...picked].map((i) => PRINTERS[i]);
    const rows = [["Type", (p) => p.t], ["Price (India)", priceText], ["Build volume (mm)", (p) => p.v], ["Enclosure", (p) => p.e], ["Made in", (p) => p.o], ["Best for", (p) => p.best], ["Where to buy", (p) => p.w]];
    prCompare.innerHTML = `<div class="cmp fade-in" style="--n:${ps.length}">
      <div class="cmp__row cmp__row--head"><span></span>${ps.map((p) => `<b>${p.b}<br/>${p.m}</b>`).join("")}</div>
      ${rows.map(([k, f]) => `<div class="cmp__row"><span>${k}</span>${ps.map((p) => `<div>${f(p)}</div>`).join("")}</div>`).join("")}
      <button class="linkbtn" data-clear>Clear comparison</button></div>`;
  };
  prFilter.addEventListener("click", (e) => { const b = e.target.closest(".chip"); if (b) { prType = b.dataset.k; renderPrinters(); } });
  prSort.addEventListener("input", renderPrinters);
  prTable.addEventListener("change", (e) => {
    const i = +e.target.dataset.i;
    if (e.target.checked) { if (picked.size >= 3) { e.target.checked = false; return; } picked.add(i); } else picked.delete(i);
    renderPrinters(); renderCompare();
  });
  prCompare.addEventListener("click", (e) => { if (e.target.closest("[data-clear]")) { picked.clear(); renderPrinters(); renderCompare(); } });
  renderPrinters(); renderCompare();

  /* ===================================================== FILAMENT BRANDS */
  const TIERS = {
    premium: { n: "Premium", p: "₹1,300–2,500 / kg", d: "Most consistent; best through the AMS", c: C.violet },
    mid: { n: "Mid · Chinese brands", p: "₹1,000–1,400 / kg", d: "Best value for production", c: C.cyan },
    india: { n: "Indian-made", p: "₹700–1,300 / kg", d: "Cheapest; test before bulk", c: C.green },
    specialty: { n: "Specialty", p: "₹3,000–16,000 / kg", d: "Footwear, industrial, exotic", c: C.amber },
  };
  const BRANDS = [
    { n: "Bambu Lab", o: "China", t: "premium", p: "PLA/PETG ~₹1,300–2,500 · PETG-CF ₹4,799 · TPU 90A ₹3,299", w: "WOL3D, Robu.in", note: "RFID spools, seamless AMS profiles" },
    { n: "Polymaker", o: "China", t: "premium", p: "PolyLite PETG ₹1,299", w: "Protomont, Amazon.in", note: "Very consistent; wide engineering range" },
    { n: "Prusament", o: "Czechia", t: "premium", p: "Import pricing", w: "Prusa resellers", note: "Tight tolerance, published batch data" },
    { n: "eSUN", o: "China", t: "mid", p: "PLA+ ₹1,300–1,349", w: "Voxelstudio, Ideal3D, Amazon.in", note: "Reliable production workhorse" },
    { n: "SUNLU", o: "China", t: "mid", p: "~₹1,000–1,800 (silk at the top)", w: "Mechblock, Amazon.in", note: "Bundles and 3 kg spools" },
    { n: "Elegoo", o: "China", t: "mid", p: "~₹1,000–1,500", w: "WOL3D, Amazon.in", note: "Good-value PLA/PETG plus resins" },
    { n: "Numakers", o: "India · Surat", t: "india", p: "Value tier", w: "india.numakers.com · +91 95587 37223", note: "100% virgin material; bulk and POs" },
    { n: "FibReel (Rever Industries)", o: "India · Nashik", t: "india", p: "Value tier", w: "3dprintingfilament.in", note: "Includes ASA and HTPLA" },
    { n: "Vektor3D", o: "India · Mumbai", t: "india", p: "PLA ₹1,300 · PETG ₹1,200 · TPU ₹2,500 · Nylon ₹2,000", w: "IndiaMART", note: "Made-in-India range incl. nylon" },
    { n: "3dprintzkart", o: "India · Bengaluru", t: "india", p: "PLA ~₹1,208", w: "dial4trade listing", note: "Local top-ups in Bangalore" },
    { n: "Ultra Nanotech", o: "India · Bengaluru", t: "india", p: "Call for price", w: "ultrananotec.com", note: "PLA+, PVA, PC" },
    { n: "Siraya Tech", o: "USA brand", t: "specialty", p: "Roamr TPU Air 80A ~₹12,717 / 800 g", w: "Amazon.in (import)", note: "Foaming TPU for footwear; resins" },
    { n: "Francis Klein", o: "India · Bengaluru", t: "specialty", p: "Quote", w: "franciskleinadditive.com", note: "Industrial and high-temp filaments" },
  ];
  $("#tierStrip").append(h(Object.entries(TIERS).map(([k, t]) => `<div class="tier" style="--c:${t.c}"><span>${t.n}</span><b>${t.p}</b><p>${t.d}</p></div>`).join("")));
  const fbFilter = $("#fbFilter"), fbGrid = $("#fbGrid");
  let fbT = "all";
  fbFilter.append(h([["all", "All brands"], ...Object.entries(TIERS).map(([k, t]) => [k, t.n])].map(([k, v], i) => `<button class="chip ${i ? "" : "is-on"}" data-k="${k}">${v}</button>`).join("")));
  const renderBrands = () => {
    $$(".chip", fbFilter).forEach((c) => c.classList.toggle("is-on", c.dataset.k === fbT));
    fbGrid.replaceChildren(h(BRANDS.filter((b) => fbT === "all" || b.t === fbT).map((b, i) => `
      <article class="fbrand" style="--c:${TIERS[b.t].c};animation-delay:${i * 35}ms">
        <div class="fbrand__top"><h4>${b.n}</h4><span class="badge">${TIERS[b.t].n}</span></div>
        <span class="fbrand__o">${b.o}</span>
        <p class="fbrand__p">${b.p}</p>
        <p class="muted small">${b.note}</p>
        <div class="sup__contact">${b.w}</div>
      </article>`).join("")));
  };
  fbFilter.addEventListener("click", (e) => { const b = e.target.closest(".chip"); if (b) { fbT = b.dataset.k; renderBrands(); } });
  renderBrands();
  $("#fbTips").append(h(["Compare price per kg, not per spool", "Buy 10–20 kg and ask for 10–15% off", "Watch Amazon sales — PLA+ swung ₹889–1,399 in six weeks", "3 kg spools for your top colours", "Test one spool before any bulk order"].map((t) => `<span class="tip">${t}</span>`).join("")));

  /* ============================================================= VENDORS */
  const VENDORS = [
    { b: "Bambu Lab", c: C.green, ch: ["WOL3D — official distributor, 11+ experience centres", "Robu.in — authorised", "KSP Electronics", "Ideal3D", "Hydrotech 3D (Chennai)"], link: "bambulab.com/en-in/where-to-buy" },
    { b: "Creality", c: C.orange, ch: ["WOL3D — exclusive distributor", "Robu.in"] },
    { b: "Elegoo", c: C.pink, ch: ["WOL3D", "Protomont Technologies", "Voxelstudio", "3Ding", "3D Protofarm", "Scribbl3D"] },
    { b: "Prusa Research", c: C.amber, ch: ["3D Bazaar (Gurugram)", "Technoventor (Nagpur)", "Robu.in (kits)"] },
    { b: "Formlabs", c: C.cyan, ch: ["Corengg Technologies (South India)", "Phillips Machine Tools", "Jetayu Gadgets"], link: "india@formlabs.com" },
    { b: "Revopoint (scanners)", c: C.violet, ch: ["Protomont Technologies — authorised", "3D Bazaar", "RA Global Tech"] },
    { b: "Indian printer makers", c: C.blue, ch: ["Divide By Zero — divbyz.com", "Fracktal Works — fracktal.in", "Make3D — make3d.in"], link: "Sold direct" },
    { b: "Autodesk Fusion", c: C.teal, ch: ["MicroGenesis (Bengaluru)", "Sniper Systems", "Wroffy", "Autodesk India store"] },
  ];
  $("#vendors").append(h(VENDORS.map((v) => `
    <article class="vendor" style="--c:${v.c}">
      <h4>${v.b}</h4>
      <ul>${v.ch.map((x) => `<li>${x}</li>`).join("")}</ul>
      ${v.link ? `<div class="sup__contact">${v.link}</div>` : ""}
    </article>`).join("")));

  /* ==================================================== IMPORT CALCULATOR */
  const MODES = {
    air: { fr: 300, clr: 10000, kg: 100 },
    sea: { fr: 45, clr: 15000, kg: 500 },
    parcel: { fr: 350, clr: 300, kg: 5 },
  };
  let mode = "air";
  const ids = ["iUsd", "iFx", "iKg", "iFr", "iClr", "iLocal"];
  const v = (id) => +$("#" + id).value;
  const setMode = (m) => {
    mode = m;
    $$(".seg button").forEach((b) => b.classList.toggle("is-on", b.dataset.m === m));
    $("#iFr").value = MODES[m].fr; $("#iClr").value = MODES[m].clr; $("#iKg").value = MODES[m].kg;
    calcImport();
  };
  const calcImport = () => {
    ids.forEach((id) => fillRange($("#" + id)));
    const usd = v("iUsd"), fx = v("iFx"), kg = v("iKg"), fr = v("iFr"), clr = v("iClr"), local = v("iLocal");
    $("#oUsd").textContent = `$${usd.toFixed(1)} / kg`;
    $("#oFx").textContent = `₹${fx} / $`;
    $("#oKg").textContent = `${kg.toLocaleString("en-IN")} kg`;
    $("#oFr").textContent = `₹${fr} / kg`;
    $("#oClr").textContent = inr(clr);
    $("#oLocal").textContent = `${inr(local)} / kg`;

    const product = usd * fx, cif = product + fr;
    let lines, landed, compare, igst = 0, beKg = null;
    if (mode === "parcel") {
      const duty = cif * 0.77;
      landed = cif + duty + clr / kg;
      compare = local * 1.18;
      lines = [["Product", product], ["Courier freight", fr], ["Personal-import duty ~77% (not claimable)", duty], ["Courier handling", clr / kg]];
    } else {
      const duty = cif * 0.121;
      landed = cif + duty + clr / kg;
      igst = (cif + duty) * 0.18;
      compare = local;
      lines = [["Product", product], [mode === "sea" ? "Sea freight" : "Air freight", fr], ["Duty 10% + cess 1% + SWS 1.1%", duty], ["Clearing agent & port", clr / kg]];
      const gap = local - cif - duty;
      beKg = gap > 0 ? Math.ceil(clr / gap) : null;
    }
    const diff = (landed - compare) / compare;
    const cheaper = diff < 0;
    const maxBar = Math.max(landed, compare);
    $("#impOut").innerHTML = `
      <div class="imp__big ${cheaper ? "is-good" : "is-bad"}">
        <span>Landed cost ${mode === "parcel" ? "(you can't claim GST)" : "(ex-GST)"}</span>
        <b>${inr(landed)}<small> / kg</small></b>
        <em>${cheaper ? "Cheaper" : "Costlier"} than buying in India by ${Math.abs(Math.round(diff * 100))}%</em>
      </div>
      <div class="imp__bars">
        <div><span>Import</span><div class="ibar"><i style="width:${(landed / maxBar) * 100}%;background:${cheaper ? C.green : C.red}"></i></div><b>${inr(landed)}</b></div>
        <div><span>India${mode === "parcel" ? " (incl. GST)" : ""}</span><div class="ibar"><i style="width:${(compare / maxBar) * 100}%;background:${C.cyan}"></i></div><b>${inr(compare)}</b></div>
      </div>
      <ul class="kv">${lines.map(([k, n]) => `<li><span>${k}</span><b>${inr(n)} / kg</b></li>`).join("")}</ul>
      <div class="imp__meta">
        <div><span>Total outlay</span><b>${inr(landed * kg + igst * kg)}</b></div>
        <div><span>${mode === "parcel" ? "GST credit" : "IGST paid (claimable)"}</span><b>${mode === "parcel" ? "None" : inr(igst * kg)}</b></div>
        <div><span>Cheaper above</span><b>${mode === "parcel" ? "Never" : beKg ? beKg.toLocaleString("en-IN") + " kg" : "Never"}</b></div>
      </div>
      <p class="muted small">Estimates for learning — real quotes vary with HS sub-code, freight minimums, exchange rate and MOQ. Commercial imports need an IEC code and GST registration.</p>`;
  };
  $(".seg").addEventListener("click", (e) => { const b = e.target.closest("button[data-m]"); if (b) setMode(b.dataset.m); });
  ids.forEach((id) => $("#" + id).addEventListener("input", calcImport));
  calcImport();

  /* ============================================================== SUBNAV */
  const links = $$("#indSubnav a");
  const targets = links.map((a) => $(a.getAttribute("href")));
  const zone = $("#indZone"), subnav = $("#indSubnav");
  const onScroll = () => {
    const r = zone.getBoundingClientRect();
    subnav.classList.toggle("is-visible", r.top < 80 && r.bottom > 200);
    let cur = 0;
    targets.forEach((s, i) => { if (s.getBoundingClientRect().top < innerHeight * 0.4) cur = i; });
    links.forEach((a, i) => a.classList.toggle("is-active", i === cur));
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

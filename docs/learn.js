/* 3D / Field Guide — Learn section (data + interactions, no dependencies) */
(() => {
  "use strict";

  const C = {
    orange: "#FF6B1A", pink: "#FF3D7F", violet: "#B26BFF", cyan: "#22D3EE",
    blue: "#7C9CFF", green: "#3DDC97", amber: "#FFC145", red: "#FF5C5C", slate: "#8A94AD", teal: "#5EEAD4",
  };
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const h = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content; };
  const store = {
    get: (k) => { try { return JSON.parse(localStorage.getItem(k)) || []; } catch { return []; } },
    set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } },
  };

  /* ================================================================ BASICS */
  const VERSUS = [
    ["Fine detail", 3, 5], ["Strength", 4, 2], ["Build size", 5, 2],
    ["Low running cost", 5, 2], ["Easy & clean to run", 5, 2], ["Speed on big parts", 4, 2],
  ];
  $("#versus").append(h(VERSUS.map(([k, f, r]) => `
    <div class="vrow"><span>${k}</span>
      <div class="vbars">
        <div class="vbar vbar--fdm"><i style="--w:${f * 20}%"></i><b>${f}</b></div>
        <div class="vbar vbar--resin"><i style="--w:${r * 20}%"></i><b>${r}</b></div>
      </div></div>`).join("")));

  const ANATOMY = [
    { k: "walls", n: "Walls / perimeters", d: "Outer shells. More walls = stronger part — more than adding infill.", c: C.orange },
    { k: "infill", n: "Infill", d: "The inside pattern (e.g. 15% gyroid). Saves material and time.", c: C.cyan },
    { k: "top", n: "Top layers", d: "Solid skin that closes the part. 4–6 layers for a clean surface.", c: C.violet },
    { k: "bottom", n: "Bottom layers", d: "Solid base touching the plate. 3–4 layers.", c: C.blue },
    { k: "support", n: "Supports", d: "Temporary scaffolding under overhangs beyond ~45°; snapped off after.", c: C.amber },
    { k: "brim", n: "Brim", d: "A thin skirt joined to the first layer to stop corners lifting.", c: C.green },
    { k: "layer", n: "Layer height", d: "Thickness of each layer — 0.1–0.3 mm. Thinner looks better, prints slower.", c: C.pink },
  ];
  (() => {
    const svg = $("#anatomy");
    const lines = (x1, y1, x2, y2, gap, color, op = 0.6) => {
      let s = "";
      for (let y = y1; y <= y2; y += gap) s += `<line x1="${x1}" x2="${x2}" y1="${y}" y2="${y}" stroke="${color}" stroke-opacity="${op}" stroke-width="2"/>`;
      return s;
    };
    let infill = "";
    for (let i = -120; i < 200; i += 18) {
      infill += `<line x1="${180 + i}" y1="170" x2="${180 + i + 60}" y2="230" stroke="${C.cyan}" stroke-width="2" stroke-opacity="0.8"/>`;
      infill += `<line x1="${180 + i + 60}" y1="170" x2="${180 + i}" y2="230" stroke="${C.cyan}" stroke-width="2" stroke-opacity="0.8"/>`;
    }
    let sup = "";
    for (let x = 384; x <= 470; x += 10) sup += `<line x1="${x}" x2="${x}" y1="152" y2="258" stroke="${C.amber}" stroke-width="2" stroke-dasharray="4 3"/>`;
    svg.innerHTML = `
      <defs><clipPath id="anInner"><rect x="180" y="170" width="160" height="60"/></clipPath></defs>
      <rect x="40" y="260" width="560" height="12" rx="6" fill="#2A3147"/>
      <text x="48" y="292" fill="#6B7590" font-size="12" font-family="JetBrains Mono, monospace">BUILD PLATE</text>
      <g class="an" data-k="brim"><rect x="112" y="252" width="44" height="8" rx="2" fill="${C.green}"/><rect x="344" y="252" width="40" height="8" rx="2" fill="${C.green}"/></g>
      <g class="an" data-k="bottom"><rect x="160" y="232" width="200" height="20" fill="${C.blue}" fill-opacity="0.25"/>${lines(164, 236, 356, 250, 6, C.blue, 0.9)}</g>
      <g class="an" data-k="infill"><rect x="180" y="170" width="160" height="60" fill="${C.cyan}" fill-opacity="0.06"/><g clip-path="url(#anInner)">${infill}</g></g>
      <g class="an" data-k="top"><rect x="160" y="128" width="320" height="22" fill="${C.violet}" fill-opacity="0.25"/>${lines(164, 132, 476, 148, 6, C.violet, 0.9)}</g>
      <g class="an" data-k="walls"><path d="M160 252 V128 H480 V150 H360 V252" fill="none" stroke="${C.orange}" stroke-width="8" stroke-linejoin="round"/><path d="M172 252 V140 H468" fill="none" stroke="${C.orange}" stroke-width="3" stroke-opacity="0.7"/><path d="M348 252 V162 H468" fill="none" stroke="${C.orange}" stroke-width="3" stroke-opacity="0.7"/></g>
      <g class="an" data-k="support"><rect x="378" y="152" width="98" height="106" fill="${C.amber}" fill-opacity="0.06"/>${sup}</g>
      <g class="an" data-k="layer"><path d="M500 128 h14 M500 150 h14 M507 128 v22" stroke="${C.pink}" stroke-width="2"/><text x="520" y="144" fill="${C.pink}" font-size="12" font-family="JetBrains Mono, monospace">0.2 mm × n</text></g>
      <g font-family="Inter, sans-serif" font-size="12" fill="#C9D1E3">
        <text x="96" y="112">walls</text><path d="M118 116 L158 140" stroke="#6B7590"/>
        <text x="250" y="110">top layers</text><path d="M270 114 L270 130" stroke="#6B7590"/>
        <text x="232" y="204" fill="#fff" font-weight="600">infill</text>
        <text x="400" y="300">supports</text><path d="M424 288 L424 262" stroke="#6B7590"/>
        <text x="60" y="244">brim</text><path d="M86 246 L112 254" stroke="#6B7590"/>
      </g>`;
    $("#anatomyList").append(h(ANATOMY.map((a) => `<li data-k="${a.k}" style="--c:${a.c}" tabindex="0"><i></i><div><b>${a.n}</b><span>${a.d}</span></div></li>`).join("")));
    const focus = (k) => {
      svg.classList.toggle("is-focus", !!k);
      $$(".an", svg).forEach((g) => g.classList.toggle("is-on", g.dataset.k === k));
      $$("#anatomyList li").forEach((li) => li.classList.toggle("is-on", li.dataset.k === k));
    };
    $$("#anatomyList li").forEach((li) => {
      ["mouseenter", "focus"].forEach((e) => li.addEventListener(e, () => focus(li.dataset.k)));
      ["mouseleave", "blur"].forEach((e) => li.addEventListener(e, () => focus(null)));
    });
    $$(".an", svg).forEach((g) => { g.addEventListener("mouseenter", () => focus(g.dataset.k)); g.addEventListener("mouseleave", () => focus(null)); });
  })();

  /* ============================================================= MATERIALS */
  const FILAMENTS = [
    { id: "pla", n: "PLA", s: "The beginner's default", r: [5, 3, 1, 1, 1], t: "190–220 / 50–60 °C", heat: "~55 °C", use: "Gifts, décor, toys, prototypes", warn: "Softens in a hot car or direct sun", tags: ["beginner", "decor"], c: C.green },
    { id: "plap", n: "PLA+ / Silk / Matte", s: "Pretty finishes", r: [5, 3, 1, 1, 2], t: "200–230 / 55–60 °C", heat: "~55 °C", use: "Fashion jewellery, lamps, display pieces", warn: "Silk PLA is weaker between layers", tags: ["beginner", "decor"], c: "#7CD992" },
    { id: "petg", n: "PETG", s: "Tough everyday plastic", r: [4, 4, 3, 2, 2], t: "230–250 / 70–85 °C", heat: "~75 °C", use: "Functional parts, planters, brackets", warn: "Strings; bonds too hard to smooth PEI — use glue stick", tags: ["beginner", "strong"], c: C.cyan },
    { id: "abs", n: "ABS", s: "Heat & impact resistant", r: [2, 4, 4, 2, 2], t: "240–260 / 90–110 °C", heat: "~95 °C", use: "Enclosures, car-interior parts", warn: "Warps; needs an enclosure; fumes — ventilate", tags: ["strong", "heat"], c: C.blue },
    { id: "asa", n: "ASA", s: "ABS that survives the sun", r: [2, 4, 4, 2, 3], t: "240–260 / 90–110 °C", heat: "~95 °C", use: "Outdoor fittings, car exteriors, signage", warn: "Enclosure and ventilation needed", tags: ["outdoor", "heat", "strong"], c: C.amber },
    { id: "tpu", n: "TPU", s: "Rubbery & flexible", r: [2, 3, 2, 5, 3], t: "210–235 / 30–60 °C", heat: "~60–80 °C", use: "Phone cases, slippers, gaskets, grips", warn: "Print slowly; direct drive; absorbs moisture", tags: ["flexible"], c: C.violet },
    { id: "pa", n: "Nylon (PA)", s: "Wear-resistant engineering", r: [1, 5, 4, 3, 4], t: "250–280 / 70–90 °C", heat: "~80–150 °C", use: "Gears, hinges, wear parts", warn: "Soaks up moisture fast — dry before every print", tags: ["strong", "heat"], c: C.pink },
    { id: "pc", n: "Polycarbonate (PC)", s: "The heavyweight", r: [1, 5, 5, 2, 4], t: "260–300 / 100–120 °C", heat: "~110 °C+", use: "High-heat engineering parts", warn: "Needs a hot, enclosed chamber", tags: ["strong", "heat"], c: C.red },
    { id: "cf", n: "CF composites", s: "PETG-CF, PA-CF — stiff & light", r: [3, 5, 3, 1, 5], t: "Base material + hardened nozzle", heat: "Depends on base", use: "Jigs, fixtures, drone & robot parts", warn: "Destroys brass nozzles — use hardened steel", tags: ["strong"], c: C.orange },
    { id: "pva", n: "PVA / HIPS", s: "Dissolvable supports", r: [2, 1, 1, 1, 4], t: "Varies by brand", heat: "—", use: "Supports that dissolve (PVA: water, HIPS: limonene)", warn: "PVA absorbs moisture extremely fast", tags: ["support"], c: C.teal },
    { id: "spec", n: "Specialty fills", s: "Wood, marble, glow, metal", r: [4, 2, 1, 1, 3], t: "Like PLA", heat: "~55 °C", use: "Décor and novelty finishes", warn: "Glow & metal fills are abrasive — hardened nozzle", tags: ["decor"], c: C.slate },
  ];
  const RATING_KEYS = ["Ease", "Strength", "Heat", "Flex", "Cost"];
  const FIL_FILTERS = [["all", "All"], ["beginner", "Beginner-friendly"], ["outdoor", "Outdoor / UV"], ["heat", "Heat resistant"], ["strong", "Strong"], ["flexible", "Flexible"], ["decor", "Décor & looks"], ["support", "Supports"]];
  const filGrid = $("#filGrid"), filChips = $("#filChips");
  filChips.append(h(FIL_FILTERS.map(([k, v], i) => `<button class="chip ${i ? "" : "is-on"}" data-k="${k}">${v}</button>`).join("")));
  const showFil = (k) => {
    $$(".chip", filChips).forEach((c) => c.classList.toggle("is-on", c.dataset.k === k));
    const list = FILAMENTS.filter((f) => k === "all" || f.tags.includes(k));
    filGrid.replaceChildren(h(list.map((f, i) => `
      <article class="filcard" id="fil-${f.id}" style="--c:${f.c};animation-delay:${i * 40}ms">
        <header><h4>${f.n}</h4><span>${f.s}</span></header>
        <ul class="rbars">${f.r.map((v, j) => `<li><span>${RATING_KEYS[j]}</span><div class="rbar">${[1, 2, 3, 4, 5].map((n) => `<i class="${n <= v ? "on" : ""}"></i>`).join("")}</div></li>`).join("")}</ul>
        <dl>
          <div><dt>Nozzle / bed</dt><dd>${f.t}</dd></div>
          <div><dt>Softens at</dt><dd>${f.heat}</dd></div>
          <div><dt>Use for</dt><dd>${f.use}</dd></div>
        </dl>
        <p class="filcard__warn">${f.warn}</p>
      </article>`).join("")));
  };
  filChips.addEventListener("click", (e) => { const b = e.target.closest(".chip"); if (b) showFil(b.dataset.k); });
  showFil("all");

  const RESINS = [
    { n: "Standard", d: "Display models, prototypes", c: C.cyan },
    { n: "ABS-like / tough", d: "Functional prototypes, snap fits", c: C.blue },
    { n: "Water-washable", d: "Less mess — no IPA needed", c: C.teal },
    { n: "Flexible", d: "Soft-touch parts, seals", c: C.violet },
    { n: "Castable", d: "Jewellery masters that burn out cleanly in a kiln", c: C.amber },
    { n: "Dental / biocompatible", d: "Certified medical use only", c: C.pink },
    { n: "High-temp", d: "Moulds, tooling, hot-air parts", c: C.red },
  ];
  $("#resinList").append(h(RESINS.map((r) => `<div class="resin" style="--c:${r.c}"><i></i><div><b>${r.n}</b><span>${r.d}</span></div></div>`).join("")));

  /* "Which material?" quiz */
  const MQ = [
    { q: "Where will the part live?", o: [["indoor", "Indoors"], ["outdoor", "Outdoors / sunlight"], ["hot", "Hot place (car, near motor)"]] },
    { q: "Does it need to bend or squish?", o: [["no", "No, rigid"], ["yes", "Yes, flexible"]] },
    { q: "What matters most?", o: [["looks", "Looks & low cost"], ["strength", "Strength"], ["detail", "Tiny details"]] },
    { q: "Budget per kg / litre?", o: [["low", "Lowest"], ["mid", "Moderate"], ["high", "Premium is fine"]] },
  ];
  const recommend = (a) => {
    if (a[1] === "yes") return a[2] === "detail" ? ["Flexible resin", "Fine flexible details are easier in resin.", null] : ["TPU (85A–95A)", "Flexible, tough and grippy. Use 85A for comfort, 95A for durability.", "tpu"];
    if (a[2] === "detail") return a[3] === "high" ? ["Castable or ABS-like resin", "Resin gives the finest detail; castable for jewellery, ABS-like for toughness.", null] : ["Standard resin", "Smooth, crisp detail for models and miniatures.", null];
    if (a[0] === "hot" || a[0] === "outdoor") return a[3] === "low" ? ["PETG", "Handles ~75 °C and light outdoor use on a budget.", "petg"] : ["ASA", "UV-stable and heat-resistant (~95 °C) — ideal outdoors and in cars.", "asa"];
    if (a[2] === "strength") return a[3] === "high" ? ["PA-CF / Nylon", "Engineering-grade stiffness and wear resistance.", "cf"] : ["PETG", "Tough, affordable and easy to print.", "petg"];
    return a[3] === "low" ? ["PLA", "Easiest, cheapest, best colours.", "pla"] : ["PLA+ / Silk / Matte", "PLA with premium finishes for gifts and décor.", "plap"];
  };
  const quiz = $("#matQuiz");
  const answers = [];
  const renderQuiz = () => {
    const step = answers.length;
    if (step < MQ.length) {
      const q = MQ[step];
      quiz.innerHTML = `<div class="fade-in">
        <div class="quiz__dots">${MQ.map((_, i) => `<i class="${i < step ? "done" : i === step ? "now" : ""}"></i>`).join("")}</div>
        <p class="quiz__n">Question ${step + 1} of ${MQ.length}</p>
        <h4>${q.q}</h4>
        <div class="quiz__opts">${q.o.map(([k, v]) => `<button class="opt" data-k="${k}">${v}</button>`).join("")}</div>
        ${step ? '<button class="linkbtn" data-back>← Back</button>' : ""}</div>`;
      return;
    }
    const [name, why, id] = recommend(answers);
    quiz.innerHTML = `<div class="fade-in quiz__result">
      <p class="eyebrow">Your material</p><h4>${name}</h4><p class="muted">${why}</p>
      <div class="quiz__actions">${id ? `<button class="btn btn--primary btn--sm" data-goto="${id}">See the card</button>` : ""}<button class="btn btn--ghost btn--sm" data-restart>Start again</button></div></div>`;
  };
  quiz.addEventListener("click", (e) => {
    const t = e.target.closest("button");
    if (!t) return;
    if (t.dataset.k) answers.push(t.dataset.k);
    else if ("back" in t.dataset) answers.pop();
    else if ("restart" in t.dataset) answers.length = 0;
    else if (t.dataset.goto) {
      showFil("all");
      const card = $("#fil-" + t.dataset.goto);
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      card.classList.remove("is-flash"); void card.offsetWidth; card.classList.add("is-flash");
      return;
    }
    renderQuiz();
  });
  renderQuiz();

  /* ============================================================== GLOSSARY */
  const GLOSS = [
    ["AMS", "FDM", "Bambu's Automatic Material System — swaps up to 4 spools for multi-colour prints."],
    ["Bed levelling", "FDM", "Making sure the nozzle is the same distance from the plate everywhere. Most modern printers do it automatically."],
    ["Bowden extruder", "FDM", "The motor pushing filament sits on the frame, feeding through a long tube. Lighter head, worse with soft TPU."],
    ["Brim", "FDM", "A thin skirt attached to the first layer to stop corners lifting."],
    ["Build plate", "General", "The surface prints are built on — often textured or smooth PEI on a magnetic steel sheet."],
    ["CoreXY", "FDM", "A fast motion system where two motors move the head together — used by Bambu and the K1 Max."],
    ["Curing", "Resin", "Extra UV exposure after washing that fully hardens a resin print."],
    ["Direct drive", "FDM", "The extruder motor sits right on the print head — essential for soft flexible filaments."],
    ["Elephant's foot", "FDM", "The first few layers bulge outwards because the nozzle is too close or the bed too hot."],
    ["Enclosure", "FDM", "A closed chamber keeping warm air in — needed for ABS, ASA, nylon and PC."],
    ["Exposure time", "Resin", "How long the UV screen lights each layer. Bottom layers get longer exposure to stick to the plate."],
    ["FEP / ACF film", "Resin", "The clear non-stick film at the bottom of the resin vat. A consumable — replace when scratched or cloudy."],
    ["First layer", "General", "The most important layer. If it doesn't stick evenly, the whole print fails."],
    ["Flow rate", "FDM", "How much plastic the printer pushes. Calibrated per filament for accurate walls."],
    ["G-code", "Software", "The line-by-line instructions (move here, heat to this, extrude this much) the printer follows."],
    ["Hardened nozzle", "FDM", "Steel or ruby-tipped nozzle that survives abrasive filaments like carbon fibre and glow-in-the-dark."],
    ["Hotend", "FDM", "The heated assembly that melts filament — heater, thermistor, heat-break and nozzle."],
    ["Hygroscopic", "Material", "Absorbs moisture from air. Nylon, TPU, PVA and PETG must be dried and stored sealed."],
    ["Infill", "FDM", "The internal pattern inside a part — e.g. 15% gyroid. Saves material and time."],
    ["IPA", "Resin", "Isopropyl alcohol (99%) used to wash uncured resin off prints. Flammable — store sealed."],
    ["Layer height", "General", "Thickness of each layer, typically 0.1–0.3 mm. Thinner = smoother but slower."],
    ["MSLA", "Resin", "Masked SLA — an LCD screen masks UV light to cure a whole layer at once. What Elegoo and Anycubic use."],
    ["Nozzle", "FDM", "The tip plastic comes out of. 0.4 mm is standard; 0.2 for detail, 0.6–0.8 for speed."],
    ["Overhang", "General", "Any part of a model that juts out over empty space. Beyond ~45° it usually needs supports."],
    ["PEI", "FDM", "Polyetherimide — the most common build surface. Textured PEI hides marks; smooth PEI gives glossy bottoms."],
    ["Purge", "FDM", "Filament wasted flushing the nozzle during colour changes. Collected as a purge tower or poop."],
    ["Retraction", "FDM", "Pulling filament back slightly during travel moves to stop oozing and stringing."],
    ["Shore hardness", "Material", "Softness scale for flexibles (e.g. 95A, 85A). Lower number = softer."],
    ["Slicer", "Software", "Software that turns a 3D model into G-code — Bambu Studio, OrcaSlicer, Lychee, Chitubox."],
    ["STL / 3MF", "Software", "3D model file formats. 3MF also stores colours, plates and print settings."],
    ["Stringing", "FDM", "Fine hairs between parts of a print — usually wet filament, too much heat or low retraction."],
    ["Supports", "General", "Temporary structures holding up overhangs. Tree supports use less material and remove cleaner."],
    ["Walls / perimeters", "FDM", "The outer shells of a part. More walls add more strength than more infill."],
    ["Warping", "FDM", "Corners peeling up as plastic shrinks while cooling — common with ABS and ASA."],
    ["Z-seam", "FDM", "The visible line where each layer starts and ends. Slicers can hide it in a corner."],
  ];
  const GCATS = [["all", "All"], ["General", "General"], ["FDM", "FDM"], ["Resin", "Resin"], ["Material", "Material"], ["Software", "Software"]];
  const CAT_C = { General: C.cyan, FDM: C.orange, Resin: C.violet, Material: C.green, Software: C.amber };
  const gGrid = $("#glossGrid"), gChips = $("#glossChips"), gSearch = $("#glossSearch"), gAZ = $("#glossAZ");
  let gCat = "all";
  gChips.append(h(GCATS.map(([k, v], i) => `<button class="chip ${i ? "" : "is-on"}" data-k="${k}">${v}</button>`).join("")));
  const letters = [...new Set(GLOSS.map(([t]) => t[0].toUpperCase()))];
  gAZ.append(h("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((l) => `<button ${letters.includes(l) ? `data-l="${l}"` : "disabled"}>${l}</button>`).join("")));
  const showGloss = () => {
    const q = gSearch.value.trim().toLowerCase();
    $$(".chip", gChips).forEach((c) => c.classList.toggle("is-on", c.dataset.k === gCat));
    const list = GLOSS.filter(([t, c, d]) => (gCat === "all" || c === gCat) && (!q || (t + " " + d).toLowerCase().includes(q)));
    gGrid.replaceChildren(list.length ? h(list.map(([t, c, d]) => `
      <div class="term" data-l="${t[0].toUpperCase()}" style="--c:${CAT_C[c]}"><div class="term__top"><b>${t}</b><span>${c}</span></div><p>${d}</p></div>`).join(""))
      : h(`<div class="empty">No terms match “${q}”.</div>`));
  };
  gChips.addEventListener("click", (e) => { const b = e.target.closest(".chip"); if (b) { gCat = b.dataset.k; showGloss(); } });
  gSearch.addEventListener("input", showGloss);
  gAZ.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-l]");
    if (!b) return;
    gCat = "all"; gSearch.value = ""; showGloss();
    const el = $(`.term[data-l="${b.dataset.l}"]`, gGrid);
    if (el) { el.scrollIntoView({ behavior: "smooth", block: "center" }); el.classList.remove("is-flash"); void el.offsetWidth; el.classList.add("is-flash"); }
  });
  showGloss();

  /* =============================================================== PROCESS */
  const STEPS = [
    { n: "Idea", s: "Brief & requirements", c: C.cyan, tips: ["Ask: what does it do, where does it live, how many, by when?", "Get real measurements — or scan the object.", "Decide FDM vs resin early (strength vs detail)."] },
    { n: "Design", s: "Tinkercad · Fusion · Blender", c: C.blue, tips: ["Design for printing: avoid overhangs > 45°, add fillets.", "Minimum wall ~1.2 mm for FDM, ~1 mm for resin.", "Add 0.2–0.3 mm clearance for parts that fit together."] },
    { n: "Export", s: "STL or 3MF", c: C.violet, tips: ["Export in millimetres — wrong units are a classic mistake.", "Use 3MF to keep colours and multiple parts.", "Check the mesh is watertight (Bambu Studio can auto-repair)."] },
    { n: "Slice", s: "Bambu Studio · Orca · Lychee", c: C.amber, tips: ["Pick the right filament profile first.", "Orient for strength: layers are weakest when pulled apart.", "Strength? Add walls before infill. Looks? Thinner layers."] },
    { n: "Print", s: "Watch the first layer", c: C.orange, tips: ["Clean the plate; load dry filament.", "Watch the first layer go down — stop early if it's wrong.", "Use the camera / app to check long prints."] },
    { n: "Post-process", s: "Supports · sanding · paint", c: C.pink, tips: ["Remove supports with flush cutters and a deburring tool.", "Sand 220 → 400 → 800 grit; prime before painting.", "Resin: wash in IPA (2 baths), dry, then UV cure."] },
    { n: "QC & deliver", s: "Measure, photograph, pack", c: C.green, tips: ["Check critical dimensions with calipers.", "Photograph every job for your portfolio.", "Log material, time and settings — your future quoting data."] },
  ];
  const rail = $("#stepRail"), panel = $("#stepPanel");
  rail.append(h(STEPS.map((s, i) => `<li><button role="tab" data-i="${i}" style="--c:${s.c}"><em>${String(i + 1).padStart(2, "0")}</em><b>${s.n}</b><span>${s.s}</span></button></li>`).join("")));
  const showStep = (i) => {
    $$("button", rail).forEach((b) => b.setAttribute("aria-selected", +b.dataset.i === i));
    const s = STEPS[i];
    panel.style.setProperty("--c", s.c);
    panel.innerHTML = `<div class="fade-in"><p class="eyebrow" style="color:${s.c}">Step ${i + 1} of ${STEPS.length}</p><h3>${s.n}</h3><ul>${s.tips.map((t) => `<li>${t}</li>`).join("")}</ul>
      <div class="steps__nav">${i ? `<button class="linkbtn" data-go="${i - 1}">← ${STEPS[i - 1].n}</button>` : "<span></span>"}${i < STEPS.length - 1 ? `<button class="linkbtn" data-go="${i + 1}">${STEPS[i + 1].n} →</button>` : ""}</div></div>`;
  };
  rail.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) showStep(+b.dataset.i); });
  panel.addEventListener("click", (e) => { const b = e.target.closest("[data-go]"); if (b) showStep(+b.dataset.go); });
  showStep(0);

  /* =========================================================== TROUBLESHOOT */
  const ICON = {
    warp: `<path d="M10 44 Q10 30 22 30 H58 Q70 30 70 44" fill="none" stroke="currentColor" stroke-width="4"/><path d="M6 50 H74" stroke="#3B4563" stroke-width="4"/>`,
    stick: `<rect x="16" y="22" width="48" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="4" transform="rotate(-8 40 30)"/><path d="M6 50 H74" stroke="#3B4563" stroke-width="4"/>`,
    string: `<rect x="8" y="16" width="14" height="34" rx="2" fill="currentColor"/><rect x="58" y="16" width="14" height="34" rx="2" fill="currentColor"/><path d="M22 24 Q40 34 58 22 M22 32 Q40 42 58 30 M22 40 Q40 46 58 38" fill="none" stroke="currentColor" stroke-width="1.5"/>`,
    shift: `<rect x="18" y="34" width="40" height="16" fill="currentColor"/><rect x="28" y="18" width="40" height="16" fill="currentColor" opacity="0.6"/>`,
    under: `<path d="M8 20 H72 M8 30 H30 M40 30 H72 M8 40 H20 M28 40 H50 M58 40 H72" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>`,
    foot: `<path d="M24 14 V40 Q24 46 16 48 H64 Q56 46 56 40 V14 Z" fill="none" stroke="currentColor" stroke-width="4"/>`,
    resinoff: `<rect x="10" y="8" width="60" height="8" rx="2" fill="#3B4563"/><path d="M28 34 h24 v10 h-24 z" fill="currentColor"/><path d="M8 50 H72" stroke="currentColor" stroke-width="3" stroke-dasharray="4 3"/>`,
    crack: `<rect x="18" y="10" width="44" height="40" rx="4" fill="none" stroke="currentColor" stroke-width="4"/><path d="M40 10 L34 24 L44 30 L36 50" fill="none" stroke="currentColor" stroke-width="3"/>`,
  };
  const FIXES = [
    { i: "warp", n: "Warping", see: "Corners peel up off the plate.", why: "Plastic shrinks as it cools; drafts; dirty plate.", fix: "Clean plate · add a brim · use the enclosure · raise bed temp · avoid fans/AC drafts.", c: C.orange },
    { i: "stick", n: "First layer won't stick", see: "Print drags around or detaches early.", why: "Oily plate, wrong Z-offset, first layer too fast.", fix: "Wash plate with dish soap · re-run calibration · slow first layer · glue stick for PETG.", c: C.amber },
    { i: "string", n: "Stringing", see: "Cobweb hairs between parts.", why: "Wet filament, nozzle too hot, low retraction.", fix: "Dry filament · drop 5–10 °C · tune retraction · heat gun for quick clean-up.", c: C.violet },
    { i: "shift", n: "Layer shift", see: "Layers suddenly offset sideways.", why: "Head hit a curled edge, loose belts, too much acceleration.", fix: "Check belt tension · fix curling (cooling) · lower speed/acceleration.", c: C.red },
    { i: "under", n: "Under-extrusion", see: "Gaps, thin walls, spongy top.", why: "Partial clog, tangled/wet spool, wrong flow.", fix: "Clean nozzle / cold pull · check spool path · run flow calibration.", c: C.cyan },
    { i: "foot", n: "Elephant's foot", see: "Bottom layers bulge outward.", why: "Nozzle too close; bed too hot.", fix: "Raise Z-offset slightly · lower bed temp · enable elephant-foot compensation.", c: C.blue },
    { i: "resinoff", n: "Resin print on the FEP", see: "Part stuck to the vat, not the plate.", why: "Low bottom exposure, unlevel plate, cold resin.", fix: "Level plate · increase bottom exposure · warm resin to ~25 °C.", c: C.pink },
    { i: "crack", n: "Resin cracks / splits", see: "Layers separate or hollow parts crack.", why: "Weak supports, big suction, over-curing.", fix: "Tilt 30–45° · thicker supports · hollow + drain holes · don't over-cure.", c: C.green },
  ];
  $("#fixGrid").append(h(FIXES.map((f, i) => `
    <article class="fixcard" style="--c:${f.c};animation-delay:${i * 40}ms">
      <div class="fixcard__icon"><svg viewBox="0 0 80 60" aria-hidden="true">${ICON[f.i]}</svg></div>
      <h4>${f.n}</h4>
      <dl><div><dt>You see</dt><dd>${f.see}</dd></div><div><dt>Why</dt><dd>${f.why}</dd></div><div class="fixcard__fix"><dt>Fix</dt><dd>${f.fix}</dd></div></dl>
    </article>`).join("")));

  /* ========================================================= DOS & DON'TS */
  const RULES = {
    Quality: {
      do: ["Dry hygroscopic filament (TPU, nylon, PETG) and store with desiccant", "Watch the first layer — most failures start there", "Clean the plate with dish soap or IPA", "Add walls, not infill, for strength", "Run a test print before any batch"],
      dont: ["Print PETG on smooth PEI without glue stick", "Feed soft TPU through the AMS or long PTFE tubes", "Skip calibration on a new filament brand", "Use brass nozzles with carbon-fibre or glow filament"],
    },
    Safety: {
      do: ["Wear nitrile gloves, goggles and a respirator for resin", "Ventilate the resin room and ABS/ASA prints", "Fit smoke detectors and keep a CO₂ / ABC extinguisher", "Run printers on a UPS with surge protection"],
      dont: ["Pour resin or IPA down the drain", "Touch uncured resin with bare hands — allergies can be lifelong", "Leave printers unattended without detectors or a camera", "Print ABS/ASA in a closed, unventilated room"],
    },
    Business: {
      do: ["Keep a print log — material, time, settings, result", "Quote ≥ ₹130 per FDM machine-hour all-in", "Photograph every job for your portfolio", "Add a 10% failure buffer to time and cost"],
      dont: ["Use PLA for car or outdoor parts", "Promise same-day delivery on long prints", "Compete on price with mass-produced items (phone cases)", "Buy unbranded spools in bulk without testing one first"],
    },
    Legal: {
      do: ["Check each downloaded model's licence before selling", "Issue GST invoices and keep supplier invoices for warranty", "Sell original designs or properly licensed ones", "Get written approval of designs from B2B clients"],
      dont: ["Sell Marvel, DC, Disney or Chhota Bheem copies", "Claim medical, food-safe or child-safe without certified materials", "Copy a client's patented part for someone else", "Use free AI-tool outputs commercially without checking terms"],
    },
  };
  const rTabs = $("#ruleTabs"), rGrid = $("#ruleGrid");
  rTabs.append(h(Object.keys(RULES).map((k) => `<button class="tab" role="tab" data-k="${k}">${k}</button>`).join("")));
  const showRules = (k) => {
    $$(".tab", rTabs).forEach((t) => t.setAttribute("aria-selected", t.dataset.k === k));
    const r = RULES[k];
    rGrid.replaceChildren(h(`
      <div class="rulecol rulecol--do"><h4>Do</h4><ul>${r.do.map((x, i) => `<li style="animation-delay:${i * 50}ms">${x}</li>`).join("")}</ul></div>
      <div class="rulecol rulecol--dont"><h4>Don't</h4><ul>${r.dont.map((x, i) => `<li style="animation-delay:${i * 50}ms">${x}</li>`).join("")}</ul></div>`));
  };
  rTabs.addEventListener("click", (e) => { const b = e.target.closest(".tab"); if (b) showRules(b.dataset.k); });
  showRules("Quality");

  /* safety checklist */
  const SAFETY = [
    "Nitrile gloves whenever touching uncured resin", "Safety glasses for resin work and support removal", "Respirator with organic-vapour cartridges in the resin room",
    "Exhaust / ventilation running during resin & ABS/ASA prints", "Smoke detector above the print farm", "CO₂ / ABC extinguisher within reach",
    "UPS + surge protection on all printers", "IPA stored sealed, away from heat and flames", "Resin waste cured in sunlight before disposal",
    "Camera or app monitoring for long prints", "First-aid kit; wash resin off skin with soap & water (not IPA)",
  ];
  const SK = "fg-safety";
  const sList = $("#safetyList"), ring = $("#safetyRing");
  sList.append(h(SAFETY.map((s, i) => `<li><label><input type="checkbox" data-i="${i}"/><span class="box"></span><span>${s}</span></label></li>`).join("")));
  const syncSafety = () => {
    const done = store.get(SK);
    $$("input", sList).forEach((cb) => (cb.checked = done.includes(+cb.dataset.i)));
    const p = Math.round((done.length / SAFETY.length) * 100);
    ring.style.setProperty("--p", p);
    ring.querySelector("b").textContent = p + "%";
  };
  sList.addEventListener("change", (e) => {
    const done = new Set(store.get(SK));
    const i = +e.target.dataset.i;
    e.target.checked ? done.add(i) : done.delete(i);
    store.set(SK, [...done]);
    syncSafety();
  });
  syncSafety();

  /* ========================================================== 30-DAY PATH */
  const WEEKS = [
    { n: "Week 1", t: "Foundations", c: C.cyan, tasks: ["Read FDM vs resin and the anatomy diagram", "Make 3 simple models in Tinkercad", "Print a calibration cube in PLA", "Learn slicer basics: layer height, walls, infill, supports"] },
    { n: "Week 2", t: "Design & materials", c: C.orange, tasks: ["Fusion basics: sketch, extrude, fillet", "Print one part in PLA and PETG — compare", "Design a desk organiser from real measurements", "Set up filament drying & sealed storage"] },
    { n: "Week 3", t: "Resin & finishing", c: C.violet, tasks: ["Set up resin safety: gloves, mask, ventilation", "Print, wash and cure a miniature", "Sand, prime and paint a PLA print", "Fix two failed prints using the troubleshooting gallery"] },
    { n: "Week 4", t: "Selling", c: C.green, tasks: ["Price 5 items with the quote calculator", "Photograph a 10-piece portfolio", "List 5 products on Instagram / Meesho", "Pitch 3 local businesses for corporate gifts"] },
  ];
  const PK = "fg-path";
  const weeksEl = $("#weeks");
  const totalTasks = WEEKS.reduce((a, w) => a + w.tasks.length, 0);
  weeksEl.append(h(WEEKS.map((w, wi) => `
    <article class="week" style="--c:${w.c}">
      <header><span>${w.n}</span><h4>${w.t}</h4><em data-w="${wi}">0/${w.tasks.length}</em></header>
      <ul>${w.tasks.map((t, ti) => `<li><label><input type="checkbox" data-id="${wi}-${ti}"/><span class="box"></span><span>${t}</span></label></li>`).join("")}</ul>
    </article>`).join("")));
  const syncPath = () => {
    const done = store.get(PK);
    $$("input", weeksEl).forEach((cb) => (cb.checked = done.includes(cb.dataset.id)));
    WEEKS.forEach((w, wi) => { $(`em[data-w="${wi}"]`, weeksEl).textContent = `${done.filter((d) => d.startsWith(wi + "-")).length}/${w.tasks.length}`; });
    $("#pathFill").style.width = (done.length / totalTasks) * 100 + "%";
    $("#pathLabel").textContent = done.length === totalTasks ? "Path complete — go sell!" : `${done.length} / ${totalTasks} tasks`;
  };
  weeksEl.addEventListener("change", (e) => {
    const done = new Set(store.get(PK));
    e.target.checked ? done.add(e.target.dataset.id) : done.delete(e.target.dataset.id);
    store.set(PK, [...done]);
    syncPath();
  });
  syncPath();

  /* ================================================================ TEST */
  const TEST = [
    { q: "Which technology melts plastic filament through a hot nozzle?", o: ["Resin (MSLA)", "FDM", "SLS"], a: 1, e: "FDM extrudes melted filament layer by layer.", l: "#learn" },
    { q: "Best filament for a part that lives in a hot car?", o: ["PLA", "Silk PLA", "ASA"], a: 2, e: "ASA resists ~95 °C and UV. PLA softens around 55 °C.", l: "#learn-materials" },
    { q: "You need a ring master for silver casting. Use…", o: ["Castable resin", "TPU", "PETG"], a: 0, e: "Castable resin burns out cleanly in a casting kiln.", l: "#learn-materials" },
    { q: "What does a slicer do?", o: ["Cuts finished prints apart", "Turns a 3D model into G-code", "Levels the bed"], a: 1, e: "Slicers convert STL/3MF into printer instructions.", l: "#learn-glossary" },
    { q: "Most effective way to make an FDM part stronger?", o: ["More infill", "More walls", "Thinner layers"], a: 1, e: "Walls carry most of the load — add them before infill.", l: "#learn" },
    { q: "Which filament wears out a brass nozzle?", o: ["PLA", "Carbon-fibre filled", "PETG"], a: 1, e: "CF, glow and metal fills are abrasive — use hardened steel.", l: "#learn-materials" },
    { q: "How do you dispose of resin-contaminated IPA?", o: ["Down the drain", "Cure in sunlight, dispose as solid waste", "Burn it"], a: 1, e: "Let UV cure the resin, filter, and dispose of solids. Never the drain.", l: "#learn-rules" },
    { q: "A lower Shore hardness number (e.g. 85A vs 95A) means…", o: ["Softer", "Harder", "Stronger"], a: 0, e: "Lower Shore A = softer and more flexible.", l: "#learn-glossary" },
    { q: "Stringing is most often caused by…", o: ["Wet filament or too much heat", "A cold bed", "Too many walls"], a: 0, e: "Dry the spool, lower temp 5–10 °C, tune retraction.", l: "#learn-fix" },
    { q: "Selling unlicensed Spider-Man figurines is…", o: ["Fine if 3D printed", "Fine under ₹500", "IP infringement — avoid"], a: 2, e: "Licensed characters are protected. Sell originals instead.", l: "#learn-rules" },
  ];
  const testEl = $("#test");
  const picks = new Array(TEST.length).fill(null);
  const renderTest = () => {
    const answered = picks.filter((p) => p !== null).length;
    const score = picks.reduce((a, p, i) => a + (p === TEST[i].a ? 1 : 0), 0);
    const done = answered === TEST.length;
    testEl.innerHTML = `
      <div class="test__bar"><div style="width:${(answered / TEST.length) * 100}%"></div></div>
      <div class="test__grid">${TEST.map((t, i) => {
        const p = picks[i];
        return `<div class="tq ${p === null ? "" : p === t.a ? "is-right" : "is-wrong"}">
          <p class="tq__n">Q${i + 1}</p><h4>${t.q}</h4>
          <div class="tq__opts">${t.o.map((o, j) => `<button data-q="${i}" data-o="${j}" ${p !== null ? "disabled" : ""} class="${p === null ? "" : j === t.a ? "right" : j === p ? "wrong" : ""}">${o}</button>`).join("")}</div>
          ${p === null ? "" : `<p class="tq__e">${p === t.a ? "Correct. " : "Not quite. "}${t.e} <a href="${t.l}">Review →</a></p>`}
        </div>`;
      }).join("")}</div>
      <div class="test__foot">
        <div><b>${score}</b> / ${TEST.length} correct · ${answered} answered</div>
        ${done ? `<p class="test__verdict">${score >= 9 ? "Expert level — you're ready to run a print shop." : score >= 6 ? "Solid basics — review the ones you missed." : "Good start — revisit the Learn sections and try again."}</p>` : ""}
        <button class="btn btn--ghost btn--sm" data-reset>Reset test</button>
      </div>`;
  };
  testEl.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    if ("reset" in b.dataset) picks.fill(null);
    else if (b.dataset.q) picks[+b.dataset.q] = +b.dataset.o;
    else return;
    renderTest();
  });
  renderTest();

  /* ============================================================== SUBNAV */
  const subLinks = $$("#subnav a");
  const subTargets = subLinks.map((a) => $(a.getAttribute("href")));
  const zone = $("#learnZone"), subnav = $("#subnav");
  const onScroll = () => {
    const r = zone.getBoundingClientRect();
    subnav.classList.toggle("is-visible", r.top < 80 && r.bottom > 200);
    let cur = 0;
    subTargets.forEach((s, i) => { if (s.getBoundingClientRect().top < innerHeight * 0.4) cur = i; });
    subLinks.forEach((a, i) => a.classList.toggle("is-active", i === cur));
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

<p align="center">
  <img src="assets/hero.svg" alt="3D Printing — From Idea to Industry" width="100%"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Learn-Free_&_open-22D3EE?style=for-the-badge&labelColor=0B0D12" alt="Free"/>
  <img src="https://img.shields.io/badge/India_3DP_CAGR-~22%25-FF6B1A?style=for-the-badge&labelColor=0B0D12" alt="CAGR"/>
  <img src="https://img.shields.io/badge/Prices-Oct_2026-B26BFF?style=for-the-badge&labelColor=0B0D12" alt="Prices"/>
  <img src="https://img.shields.io/badge/Worked_example-₹20L_workshop-3DDC97?style=for-the-badge&labelColor=0B0D12" alt="Worked example"/>
</p>

<p align="center">
  <b>Learn the 3D printing industry — layer by layer.</b><br/>
  How the technology works, materials, who makes and sells what, what things cost in India,<br/>
  and the business behind it — with a ₹20L Bangalore workshop as a worked example.
</p>

<p align="center">
  <a href="https://srikumar1987.github.io/3D/"><b>Open the interactive site →</b></a>
  &nbsp;·&nbsp;
  <a href="guide/00-learn-basics.md">Learn the basics</a>
  &nbsp;·&nbsp;
  <a href="guide/09-industry.md">Industry & prices</a>
  &nbsp;·&nbsp;
  <a href="#chapters">Chapters</a>
  &nbsp;·&nbsp;
  <a href="#at-a-glance">At a glance</a>
</p>

<p align="center"><img src="assets/divider.svg" width="100%"/></p>

## How to use this guide

```mermaid
flowchart LR
    L["00 · Learn<br/><sub>FDM, resin, materials,<br/>glossary, fixes</sub>"] --> I["09 · Industry<br/><sub>vendors, prices,<br/>imports, careers</sub>"]
    I --> B["01–04 · Business<br/><sub>workshop, pricing,<br/>break-even, suppliers</sub>"]
    B --> M["05–08 · Market & tools<br/><sub>what sells, printers,<br/>software, AI</sub>"]
    style L fill:#22D3EE,stroke:#22D3EE,color:#000
    style I fill:#B26BFF,stroke:#B26BFF,color:#fff
    style B fill:#FF6B1A,stroke:#FF6B1A,color:#fff
    style M fill:#3DDC97,stroke:#3DDC97,color:#000
```

## The journey of a print

```mermaid
flowchart LR
    I([Idea]) --> D[Design<br/><sub>Fusion · Blender · AI</sub>]
    S0[Scan<br/><sub>MetroX</sub>] --> D
    D --> SL[Slice<br/><sub>Bambu Studio · Lychee</sub>]
    SL --> P{Print}
    P -->|FDM| F[P1S · H2S · K1 Max]
    P -->|Resin| R[Saturn 4 Ultra]
    F --> PP[Post-process<br/><sub>sand · paint · QC</sub>]
    R --> PP
    PP --> SELL([Sell<br/><sub>B2B · Gifts · D2C</sub>])
    style I fill:#22D3EE,stroke:#22D3EE,color:#000
    style P fill:#FF6B1A,stroke:#FF6B1A,color:#fff
    style SELL fill:#3DDC97,stroke:#3DDC97,color:#000
```

<a id="chapters"></a>

## Chapters

<table>
  <tr>
    <td><a href="guide/00-learn-basics.md"><img src="assets/cards/00.svg" alt="00 Learn the basics" width="100%"/></a></td>
    <td><a href="guide/09-industry.md"><img src="assets/cards/09.svg" alt="09 Industry and prices" width="100%"/></a></td>
  </tr>
  <tr>
    <td><a href="guide/01-workshop-setup.md"><img src="assets/cards/01.svg" alt="01 Workshop setup" width="100%"/></a></td>
    <td><a href="guide/02-pricing-model.md"><img src="assets/cards/02.svg" alt="02 Pricing model" width="100%"/></a></td>
  </tr>
  <tr>
    <td><a href="guide/03-break-even.md"><img src="assets/cards/03.svg" alt="03 Break-even" width="100%"/></a></td>
    <td><a href="guide/04-suppliers.md"><img src="assets/cards/04.svg" alt="04 Suppliers" width="100%"/></a></td>
  </tr>
  <tr>
    <td><a href="guide/05-filaments-and-products.md"><img src="assets/cards/05.svg" alt="05 Filaments and market" width="100%"/></a></td>
    <td><a href="guide/06-slippers.md"><img src="assets/cards/06.svg" alt="06 Slippers" width="100%"/></a></td>
  </tr>
  <tr>
    <td><a href="guide/07-printers-and-waste.md"><img src="assets/cards/07.svg" alt="07 Printers and waste" width="100%"/></a></td>
    <td><a href="guide/08-software-and-ai.md"><img src="assets/cards/08.svg" alt="08 Software and AI" width="100%"/></a></td>
  </tr>
</table>

<p align="center"><img src="assets/divider.svg" width="100%"/></p>

<a id="at-a-glance"></a>

## At a glance

### Printer prices in India (Oct 2026, incl. GST)

| Printer | Type | Price | Good for |
|---|---|--:|---|
| Bambu Lab A1 Mini | FDM | ₹21,499 | First printer, students |
| Bambu Lab A1 | FDM | ₹31,999 | Best-value beginner |
| Bambu Lab P1S Combo | FDM, enclosed, multi-colour | ₹69,999 | Small-business workhorse |
| Bambu Lab P2S Combo | FDM, enclosed, multi-colour | ₹1,02,999 | Newer P1S replacement |
| Bambu Lab H2S | FDM, heated chamber | ₹1,54,999 | Engineering materials |
| Bambu Lab H2D | FDM, dual nozzle | from ₹2,19,999 | Multi-material, low waste |
| Creality K1 Max | FDM, 300 mm | ₹71,999 | Large parts |
| Elegoo Saturn 4 Ultra 16K | Resin | ₹59,999–61,499 | Miniatures, jewellery |
| Prusa CORE One | FDM, enclosed | ₹1.70–2.10L | Open-source, repairable |
| Formlabs Form 4 | Professional resin | ~₹6.25L + GST | Dental, industrial |

More in **[09 · Industry](guide/09-industry.md)** — vendors, filament brands, import costs, careers.

<table>
<tr>
<td width="50%" valign="top">

### Worked example — where ₹20L goes

```mermaid
pie
    "FDM printers" : 3.67
    "PCs & IT" : 3.85
    "Resin + scanner" : 3.24
    "Fit-out + power" : 2.50
    "Materials + tools" : 2.15
    "Software" : 1.30
    "Premises" : 1.40
    "Contingency" : 1.89
```

</td>
<td width="50%" valign="top">

### Key numbers

| Metric | Value |
|---|--:|
| Machines | **4 FDM · 3 resin · 1 scanner** |
| Space | **~600 sq ft** |
| Team | **3 + founder** |
| Monthly burn | **~₹1.6L** |
| Cash break-even | **~₹2.3L / month** |
| Capacity | **~₹5.3L / month** |
| Cash-positive (cumulative) | **~Month 8** |
| Full payback | **20–24 months** |

</td>
</tr>
</table>

### Is importing filament from China worth it?

| | Personal parcel | Commercial import (100 kg, air) | Commercial import (500 kg+, sea) |
|---|---|---|---|
| Duty | ~77% (not claimable) | ~12.1% + 18% IGST (claimable) | ~12.1% + 18% IGST (claimable) |
| Landed PLA (est.) | — | ~₹1,270–1,420 / kg | ~₹940–970 / kg |
| vs buying in India | Much worse | **Worse** | **About equal**, with more risk |

> Buy Chinese brands (eSUN, SUNLU, Elegoo, Polymaker) from Indian distributors, plus Indian makers (Numakers, FibReel, Vektor3D) for value PLA. Try the **import calculator** on the site.

<details>
<summary><b>Quote formula (click to expand)</b></summary>

```
Price = (Material × rate) + (Print hours × machine rate) + (Labour hours × labour rate)
      + Design/scan fee
      × 1.10 failure buffer × rush multiplier
      → minimum ₹500, then add 18% GST
```

| FDM std | FDM eng | Resin | Technician | Finishing | CAD | Rush |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| ₹60/h | ₹90/h | ₹80/h | ₹400/h | ₹500/h | ₹1,000–1,500/h | +40% |

</details>

<details>
<summary><b>Best starter kit (click to expand)</b></summary>

| Item | Why | ~Cost |
|---|---|--:|
| Bambu Lab P1S Combo | Reliable, multi-colour, TPU-capable | ₹69,999 |
| Elegoo Saturn 4 Ultra 16K + wash/cure | Jewellery, figurines, fine detail | ~₹80,000 |
| Tinkercad → Fusion + Blender | Learn → function → art | Free to start |

</details>

<p align="center"><img src="assets/divider.svg" width="100%"/></p>

## Worked example — 90-day launch

```mermaid
gantt
    title From empty room to first revenue
    dateFormat  YYYY-MM-DD
    axisFormat  %d %b
    section Setup
    GST, Udyam, bank            :a1, 2026-11-01, 10d
    Lease & fit-out             :a2, 2026-11-05, 21d
    Equipment purchase & install:a3, after a1, 14d
    section Team
    Hire design engineer        :b1, 2026-11-10, 20d
    Hire print technician       :b2, 2026-11-15, 15d
    section Go to market
    Portfolio prints & photos   :c1, after a3, 10d
    Website, IndiaMART, Insta   :c2, after a3, 14d
    Test 10–15 consumer SKUs    :c3, after c1, 30d
    B2B outreach (startups, MSMEs, colleges) :c4, after c1, 45d
    First retainer clients      :milestone, after c4, 0d
```

## Repository map

```
3D/
├── README.md                 ← you are here
├── guide/                    ← 00 Learn · 01–08 business & market · 09 Industry
├── docs/                     ← interactive website (GitHub Pages)
│   ├── index.html
│   ├── styles.css
│   ├── learn.js              ← Learn section (explorer, glossary, quizzes)
│   ├── industry.js           ← Industry section (directories, import calculator)
│   └── app.js                ← workshop, pricing, break-even, market
├── assets/                   ← hero, divider, chapter cards (SVG)
└── tools/gen_cards.py        ← regenerates chapter cards
```

> [!NOTE]
> Prices are indicative (India, Oct 2026, incl. GST unless stated) from public reseller listings and change often. Market tiers, margins and salary ranges are estimates for learning — verify before making decisions. Supplier contacts come from public websites; confirm on written quotes.

<p align="center">
  <img src="assets/divider.svg" width="100%"/><br/>
  <sub>Built layer by layer · Bengaluru</sub>
</p>

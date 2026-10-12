<p align="center">
  <img src="assets/hero.svg" alt="3D Printing — From Idea to Industry" width="100%"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Budget-₹20_Lakh-FF6B1A?style=for-the-badge&labelColor=0B0D12" alt="Budget"/>
  <img src="https://img.shields.io/badge/India_3DP_CAGR-~22%25-22D3EE?style=for-the-badge&labelColor=0B0D12" alt="CAGR"/>
  <img src="https://img.shields.io/badge/Base-Bengaluru-B26BFF?style=for-the-badge&labelColor=0B0D12" alt="Bengaluru"/>
  <img src="https://img.shields.io/badge/Break--even-~Month_8-3DDC97?style=for-the-badge&labelColor=0B0D12" alt="Break-even"/>
</p>

<p align="center">
  <b>A visual field guide to the 3D printing industry</b> — what to buy, what to charge,<br/>
  what sells, who to buy from, and how AI fits in. Written for a Bangalore-based workshop.
</p>

<p align="center">
  <a href="https://srikumar1987.github.io/3D/"><b>Open the interactive site →</b></a>
  &nbsp;·&nbsp;
  <a href="#chapters">Chapters</a>
  &nbsp;·&nbsp;
  <a href="#at-a-glance">At a glance</a>
  &nbsp;·&nbsp;
  <a href="#90-day-launch">90-day launch</a>
</p>

<p align="center"><img src="assets/divider.svg" width="100%"/></p>

## The journey

```mermaid
flowchart LR
    I([Idea]) --> D[Design<br/><sub>Fusion · Blender · AI</sub>]
    S0[Scan<br/><sub>MetroX</sub>] --> D
    D --> SL[Slice<br/><sub>Bambu Studio · Lychee</sub>]
    SL --> P{Print}
    P -->|FDM| F[P1S · X1C · K1 Max]
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

<table>
<tr>
<td width="50%" valign="top">

### Where the ₹20L goes

```mermaid
pie
    "FDM printers" : 4.35
    "PCs & IT" : 3.85
    "Fit-out + power" : 2.50
    "Resin + scanner" : 3.00
    "Materials + tools" : 2.15
    "Software" : 1.30
    "Premises" : 1.40
    "Contingency" : 1.45
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

### What will sell (next 2 years)

| | Tier 1 — focus | Tier 2 — add-ons | Tier 3 — niche / risky |
|---|---|---|---|
| **Products** | Corporate gifting · personalised gifts · B2B prototyping & jigs · jewellery masters · fashion earrings | Original toys · painted miniatures · home décor · cosplay · festival items | Slippers · phone cases · licensed characters |
| **Material** | PLA · PETG · castable resin | PLA multi-colour · ABS-like resin | TPU 85A · TPU 95A |

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
| Bambu Lab P1S / P2S Combo | Reliable, multi-colour, TPU-capable | ₹0.95L |
| Elegoo Saturn 4 Ultra 16K + wash/cure | Jewellery, figurines, fine detail | ₹0.7L |
| Tinkercad → Fusion + Blender | Learn → function → art | Free to start |
| Meshy (AI) | Photo → figurine | Paid plan for commercial use |

</details>

<p align="center"><img src="assets/divider.svg" width="100%"/></p>

<a id="90-day-launch"></a>

## 90-day launch

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
├── guide/                    ← 8 deep-dive chapters
├── docs/                     ← interactive website (GitHub Pages)
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── assets/                   ← hero, divider, chapter cards (SVG)
└── tools/gen_cards.py        ← regenerates chapter cards
```

> [!NOTE]
> Prices are indicative (India, Oct 2026, incl. GST) and change often. Market tiers are professional judgement — validate with test listings before scaling. Supplier contacts come from public websites; confirm on written quotes.

<p align="center">
  <img src="assets/divider.svg" width="100%"/><br/>
  <sub>Built layer by layer · Bengaluru</sub>
</p>

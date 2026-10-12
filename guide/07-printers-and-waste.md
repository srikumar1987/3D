<p align="center"><img src="../assets/divider.svg" width="100%"/></p>

# 07 · Printers, Waste & Where to Start

> Purge on colour changes is the biggest source of filament waste. Pick the machine that matches how colourful your products are.

[← Slippers](06-slippers.md) · [Index](../README.md) · [Next: Software & AI →](08-software-and-ai.md)

---

## Where waste comes from

```mermaid
flowchart LR
    W((Filament<br/>waste)) --- A[Colour-change purge<br/><b>biggest</b>]
    W --- B[Supports & brims]
    W --- C[Failed prints]
    W --- D[Spool leftovers]
    style W fill:#FF6B1A,stroke:#FF6B1A,color:#fff
    style A fill:#FF5C5C,stroke:#FF5C5C,color:#fff
```

## Waste ranking

| Rank | Printer type | Waste | Why |
|:-:|---|---|---|
| 1 | **Bambu Lab H2C** — up to 7 swappable nozzles | ![](https://img.shields.io/badge/-LOWEST-3DDC97?style=flat-square) | Bambu's tests: **~47–58% of the X1C's purge waste** |
| 2 | **Bambu Lab H2D** — 2 independent nozzles | ![](https://img.shields.io/badge/-VERY_LOW-3DDC97?style=flat-square) | Model + support on separate nozzles → no purge; PLA + PVA prints that waste 20–40 g on an X1C waste almost nothing |
| 3 | **Resin printers** (Saturn 4 Ultra) | ![](https://img.shields.io/badge/-LOW-7CD992?style=flat-square) | Only supports & failures; leftover resin goes back in the bottle |
| 4 | Single-nozzle FDM (P1S / X1C) — **one colour** | ![](https://img.shields.io/badge/-LOW-7CD992?style=flat-square) | Mostly supports & failures |
| 5 | Single-nozzle FDM + **AMS, many colours** | ![](https://img.shields.io/badge/-HIGH-FF5C5C?style=flat-square) | 1–2 g+ per colour change; can exceed the model's own weight |

### Cut waste on any printer

- Fill each plate with several items so they **share one purge tower**
- Use **tree supports**
- Bambu Studio: enable **flush into infill** and **flush into objects**
- **Limit colours** per design
- **Dry filament** — wet filament = failed prints

> [!TIP]
> Mostly multi-colour products (toys, keychains, décor)? The **H2D / H2C** pays for itself in saved filament. Mostly single-colour? A **P1S / P2S** is perfect.

---

## Which printer to start with?

| Your focus | Start with | Why |
|---|---|---|
| General business — gifts, décor, corporate, toys | **Bambu Lab P1S / P2S Combo** | Reliable, easy, multi-colour, handles TPU when fed directly |
| Heavy multi-colour, low waste, slippers | **Bambu Lab H2D** | Big volume, dual nozzle, heated chamber |
| Rings, jewellery, figurines | **Elegoo Saturn 4 Ultra 16K** + wash & cure | Fine detail on a budget |
| **Best starter combo** | **1 × P1S/P2S Combo + 1 × Saturn 4 Ultra** | Covers ~90% of products for **~₹1.5–1.7L** |

```mermaid
flowchart TD
    Q{What will you<br/>mostly sell?} -->|Gifts, décor, corporate| P[P1S / P2S Combo]
    Q -->|Many colours / slippers| H[H2D]
    Q -->|Jewellery, figurines| R[Saturn 4 Ultra 16K]
    Q -->|Not sure yet| C[P1S + Saturn 4 Ultra<br/>~₹1.5–1.7L]
    style C fill:#FF6B1A,stroke:#FF6B1A,color:#fff
```

[← Slippers](06-slippers.md) · [Index](../README.md) · [Next: Software & AI →](08-software-and-ai.md)

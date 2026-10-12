"""Generate the chapter card SVGs used in README.md.  Run: python tools/gen_cards.py"""
from html import escape
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "assets" / "cards"
FONT = "'Space Grotesk','Segoe UI',Inter,Arial,sans-serif"

ICONS = {
    "cube": '<path d="M0 -34 L30 -17 L30 17 L0 34 L-30 17 L-30 -17 Z" fill="none" stroke="{c}" stroke-width="3"/>'
            '<path d="M-30 -17 L0 0 L30 -17 M0 0 V34" fill="none" stroke="{c}" stroke-width="3"/>',
    "rupee": '<circle r="34" fill="none" stroke="{c}" stroke-width="3"/>'
             f'<text y="16" text-anchor="middle" font-family="{FONT}" font-size="44" font-weight="700" fill="{{c}}">₹</text>',
    "chart": '<path d="M-34 30 H34 M-34 30 V-34" stroke="{c}" stroke-width="3" fill="none"/>'
             '<path d="M-26 20 L-10 8 L4 14 L28 -24" stroke="{c}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
             '<circle cx="28" cy="-24" r="5" fill="{c}"/>',
    "nodes": '<circle cx="0" cy="0" r="9" fill="{c}"/><circle cx="-28" cy="-20" r="6" fill="none" stroke="{c}" stroke-width="3"/>'
             '<circle cx="28" cy="-20" r="6" fill="none" stroke="{c}" stroke-width="3"/><circle cx="0" cy="32" r="6" fill="none" stroke="{c}" stroke-width="3"/>'
             '<path d="M-6 -5 L-23 -17 M6 -5 L23 -17 M0 9 V26" stroke="{c}" stroke-width="3"/>',
    "spool": '<circle r="34" fill="none" stroke="{c}" stroke-width="3"/><circle r="22" fill="none" stroke="{c}" stroke-width="2" stroke-dasharray="3 3"/>'
             '<circle r="8" fill="{c}"/>',
    "foot": '<ellipse cx="-4" cy="6" rx="18" ry="28" fill="none" stroke="{c}" stroke-width="3"/>'
            '<circle cx="-14" cy="-30" r="4" fill="{c}"/><circle cx="-4" cy="-34" r="4" fill="{c}"/><circle cx="6" cy="-32" r="4" fill="{c}"/>'
            '<circle cx="14" cy="-27" r="3.5" fill="{c}"/><circle cx="20" cy="-20" r="3" fill="{c}"/>',
    "nozzle": '<rect x="-22" y="-34" width="44" height="30" rx="6" fill="none" stroke="{c}" stroke-width="3"/>'
              '<path d="M-10 -4 H10 L4 12 H-4 Z" fill="{c}"/><path d="M-30 30 H30" stroke="{c}" stroke-width="3"/>'
              '<path d="M-22 24 H22" stroke="{c}" stroke-width="3" opacity="0.6"/>',
    "globe": '<circle r="34" fill="none" stroke="{c}" stroke-width="3"/><ellipse rx="14" ry="34" fill="none" stroke="{c}" stroke-width="2.5"/>'
             '<path d="M-34 0 H34 M-29 -17 H29 M-29 17 H29" stroke="{c}" stroke-width="2"/>',
    "book": '<path d="M0 -26 C-12 -34 -26 -34 -36 -28 V30 C-26 24 -12 24 0 32 C12 24 26 24 36 30 V-28 C26 -34 12 -34 0 -26 Z" fill="none" stroke="{c}" stroke-width="3" stroke-linejoin="round"/>'
            '<path d="M0 -26 V32" stroke="{c}" stroke-width="3"/><path d="M-26 -14 H-10 M-26 -2 H-10 M10 -14 H26 M10 -2 H26" stroke="{c}" stroke-width="2.5" stroke-linecap="round"/>',
    "spark": '<path d="M0 -36 C4 -10 10 -4 36 0 C10 4 4 10 0 36 C-4 10 -10 4 -36 0 C-10 -4 -4 -10 0 -36 Z" fill="{c}"/>'
             '<circle cx="26" cy="-26" r="4" fill="{c}"/>',
}

CARDS = [
    ("00", "Learn the Basics", "New to 3D? Start here", "FDM · filaments · glossary · fixes", "book", "#22D3EE", "#B26BFF"),
    ("01", "Workshop Setup", "The ₹20L blueprint", "Printers · PCs · space · team", "cube", "#FF6B1A", "#FF3D7F"),
    ("02", "Pricing Model", "Quote like a pro", "₹130–180 per FDM hour", "rupee", "#FFC145", "#FF6B1A"),
    ("03", "Break-even", "When money comes back", "~₹2.3L/month · month 8", "chart", "#3DDC97", "#22D3EE"),
    ("04", "Suppliers", "Who to buy from", "Contacts · price ranges", "nodes", "#22D3EE", "#7C9CFF"),
    ("05", "Filaments & Market", "What sells next 2 years", "Material → product → demand", "spool", "#FF3D7F", "#B26BFF"),
    ("06", "Slippers", "Soft TPU footwear", "Feasible · premium niche", "foot", "#B26BFF", "#7C9CFF"),
    ("07", "Printers & Waste", "Least waste · best start", "H2C · H2D · P1S · Saturn", "nozzle", "#7C9CFF", "#22D3EE"),
    ("09", "Industry & Prices", "Vendors · imports · careers", "Who makes, sells, and earns", "globe", "#B26BFF", "#22D3EE"),
    ("08", "Software & AI", "Design without limits", "Fusion · Blender · Meshy", "spark", "#3DDC97", "#FFC145"),
]


def card(num, title, sub, stat, icon, c1, c2):
    pill_w = len(stat) * 8.2 + 28
    title, sub, stat = escape(title), escape(sub), escape(stat)
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="420" height="230" viewBox="0 0 420 230" role="img" aria-label="{num} {title}">
  <defs>
    <linearGradient id="a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{c1}"/><stop offset="1" stop-color="{c2}"/></linearGradient>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#121624"/><stop offset="1" stop-color="#0B0D12"/></linearGradient>
    <pattern id="l" width="420" height="6" patternUnits="userSpaceOnUse"><rect width="420" height="1" fill="#fff" fill-opacity="0.025"/></pattern>
    <radialGradient id="g" cx="0.85" cy="0.2" r="0.6"><stop offset="0" stop-color="{c1}" stop-opacity="0.28"/><stop offset="1" stop-color="{c1}" stop-opacity="0"/></radialGradient>
    <clipPath id="r"><rect width="420" height="230" rx="20"/></clipPath>
  </defs>
  <g clip-path="url(#r)">
    <rect width="420" height="230" fill="url(#bg)"/>
    <rect width="420" height="230" fill="url(#l)"/>
    <rect width="420" height="230" fill="url(#g)"/>
    <text x="400" y="215" text-anchor="end" font-family="{FONT}" font-size="150" font-weight="800" fill="url(#a)" fill-opacity="0.09">{num}</text>
    <rect x="0" y="0" width="420" height="4" fill="url(#a)"/>
  </g>
  <rect x="0.5" y="0.5" width="419" height="229" rx="20" fill="none" stroke="#ffffff" stroke-opacity="0.08"/>
  <g transform="translate(350 62) scale(0.8)">{ICONS[icon].format(c="url(#a)")}</g>
  <text x="28" y="48" font-family="{FONT}" font-size="14" font-weight="600" letter-spacing="3" fill="{c1}">CHAPTER {num}</text>
  <text x="28" y="96" font-family="{FONT}" font-size="32" font-weight="700" fill="#F5F7FB" letter-spacing="-0.5">{title}</text>
  <text x="28" y="126" font-family="Inter,'Segoe UI',Arial,sans-serif" font-size="16" fill="#A7B0C5">{sub}</text>
  <rect x="28" y="160" width="{pill_w:.0f}" height="34" rx="17" fill="{c1}" fill-opacity="0.12" stroke="{c1}" stroke-opacity="0.5"/>
  <text x="42" y="182" font-family="Inter,'Segoe UI',Arial,sans-serif" font-size="14" font-weight="600" fill="#F5F7FB">{stat}</text>
</svg>
'''


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    for c in CARDS:
        (OUT / f"{c[0]}.svg").write_text(card(*c), encoding="utf-8")
    print(f"wrote {len(CARDS)} cards to {OUT}")

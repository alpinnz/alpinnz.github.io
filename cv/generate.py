"""Build the two public CV PDFs from the reviewed JSON files.

Install with `python -m pip install -r cv/requirements.txt`, then run
`python cv/generate.py` from the repository root.
"""

import json
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)


ROOT = Path(__file__).resolve().parent.parent
FONT_DIR = Path(__import__("reportlab").__file__).resolve().parent / "fonts"
pdfmetrics.registerFont(TTFont("Vera", str(FONT_DIR / "Vera.ttf")))
pdfmetrics.registerFont(TTFont("Vera-Bold", str(FONT_DIR / "VeraBd.ttf")))

INK = colors.HexColor("#152638")
MUTED = colors.HexColor("#4B5D6B")
ACCENT = colors.HexColor("#17648C")
RULE = colors.HexColor("#CEDCE5")

styles = {
    "name": ParagraphStyle("name", fontName="Vera-Bold", fontSize=20, leading=24, textColor=INK, spaceAfter=4),
    "role": ParagraphStyle("role", fontName="Vera", fontSize=10, leading=15, textColor=ACCENT, spaceAfter=8),
    "contact": ParagraphStyle("contact", fontName="Vera", fontSize=8.5, leading=13, textColor=MUTED, spaceAfter=2),
    "heading": ParagraphStyle("heading", fontName="Vera-Bold", fontSize=10, leading=14, textColor=ACCENT, spaceBefore=13, spaceAfter=6),
    "body": ParagraphStyle("body", fontName="Vera", fontSize=8.5, leading=13.5, textColor=INK, spaceAfter=4),
    "entry": ParagraphStyle("entry", fontName="Vera-Bold", fontSize=9, leading=13, textColor=INK, spaceAfter=2),
    "meta": ParagraphStyle("meta", fontName="Vera", fontSize=8, leading=12, textColor=MUTED, spaceAfter=3),
    "footer": ParagraphStyle("footer", fontName="Vera", fontSize=7, leading=10, textColor=MUTED, alignment=TA_CENTER),
}


def paragraph(value, style="body"):
    return Paragraph(escape(value), styles[style])


def section(story, title):
    story.append(paragraph(title, "heading"))
    story.append(HRFlowable(width="100%", thickness=0.65, color=RULE, spaceAfter=7))


def draw_footer(canvas, document, locale, updated):
    canvas.saveState()
    canvas.setStrokeColor(RULE)
    canvas.line(42, 38, A4[0] - 42, 38)
    label = f"Alfin Noviaji  |  {updated}  |  {document.page}"
    canvas.setFont("Vera", 7)
    canvas.setFillColor(MUTED)
    canvas.drawCentredString(A4[0] / 2, 27, label)
    canvas.restoreState()


def build_cv(locale):
    content = json.loads((ROOT / "cv" / f"{locale}.json").read_text(encoding="utf-8"))
    destination = ROOT / "public" / f"Alfin-Noviaji-CV-{locale.upper()}.pdf"
    document = SimpleDocTemplate(
        str(destination), pagesize=A4, leftMargin=42, rightMargin=42,
        topMargin=35, bottomMargin=50, title=f"Alfin Noviaji | CV ({locale.upper()})",
        author="Alfin Noviaji", subject="Professional curriculum vitae",
    )
    story = [paragraph("Alfin Noviaji", "name"), paragraph(content["role"], "role")]
    story.append(Paragraph(
        'Malang, Indonesia  |  <link href="mailto:alpinnz@gmail.com" color="#17648C">alpinnz@gmail.com</link>'
        '  |  <link href="https://alpinnz.github.io/" color="#17648C">alpinnz.github.io</link>',
        styles["contact"],
    ))
    story.append(Paragraph(
        '<link href="https://github.com/alpinnz" color="#17648C">github.com/alpinnz</link>'
        '  |  <link href="https://www.linkedin.com/in/alpinnz/" color="#17648C">linkedin.com/in/alpinnz</link>',
        styles["contact"],
    ))

    section(story, content["sections"]["summary"])
    story.append(paragraph(content["summary"]))

    section(story, content["sections"]["skills"])
    for skill in content["skills"]:
        story.append(Paragraph(f"<b>{escape(skill['label'])}:</b> {escape(skill['value'])}", styles["body"]))

    section(story, content["sections"]["experience"])
    for position in content["experience"]:
        story.append(KeepTogether([
            paragraph(position["role"], "entry"),
            paragraph(f"{position['organization']}  |  {position['period']}", "meta"),
            paragraph(position["description"]),
            Spacer(1, 4),
        ]))

    section(story, content["sections"]["projects"])
    for project in content["projects"]:
        story.append(KeepTogether([
            paragraph(project["name"], "entry"),
            paragraph(project["description"]),
            Paragraph(f'<link href="{escape(project["url"])}" color="#17648C">{escape(project["url"])}</link>', styles["meta"]),
            Spacer(1, 3),
        ]))

    section(story, content["sections"]["education"])
    story.append(paragraph(content["education"]))
    story.append(paragraph(content["certification"]))
    document.build(
        story,
        onFirstPage=lambda canvas, doc: draw_footer(canvas, doc, locale, content["updated"]),
        onLaterPages=lambda canvas, doc: draw_footer(canvas, doc, locale, content["updated"]),
    )
    print(destination)


if __name__ == "__main__":
    for language in ("id", "en"):
        build_cv(language)

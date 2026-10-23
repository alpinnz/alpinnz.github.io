"""Build the public PDF and HTML CVs from the reviewed JSON files.

Install with `python -m pip install -r cv/requirements.txt`, then run
`python cv/generate.py` from the repository root.
"""

import json
from html import escape as html_escape
from pathlib import Path
from shutil import copyfile
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)


ROOT = Path(__file__).resolve().parent.parent
FONT_DIR = Path(__import__("reportlab").__file__).resolve().parent / "fonts"
pdfmetrics.registerFont(TTFont("Vera", str(FONT_DIR / "Vera.ttf")))
pdfmetrics.registerFont(TTFont("Vera-Bold", str(FONT_DIR / "VeraBd.ttf")))

INK = colors.HexColor("#172B3A")
MUTED = colors.HexColor("#40515E")
ACCENT = colors.HexColor("#155D82")

styles = {
    "name": ParagraphStyle("name", fontName="Vera-Bold", fontSize=20, leading=24, textColor=INK, spaceAfter=4),
    "role": ParagraphStyle("role", fontName="Vera", fontSize=11, leading=15, textColor=ACCENT, spaceAfter=8),
    "contact": ParagraphStyle("contact", fontName="Vera", fontSize=10, leading=14, textColor=MUTED, spaceAfter=2),
    "heading": ParagraphStyle("heading", fontName="Vera-Bold", fontSize=11, leading=15, textColor=ACCENT, spaceBefore=12, spaceAfter=5),
    "body": ParagraphStyle("body", fontName="Vera", fontSize=10, leading=14, textColor=INK, spaceAfter=3),
    "entry": ParagraphStyle("entry", fontName="Vera-Bold", fontSize=10, leading=14, textColor=INK, spaceAfter=2),
    "meta": ParagraphStyle("meta", fontName="Vera", fontSize=10, leading=13, textColor=MUTED, spaceAfter=2),
}


def paragraph(value, style="body"):
    return Paragraph(escape(value), styles[style])


def section(story, title):
    story.append(paragraph(title, "heading"))


def build_cv(locale):
    content = json.loads((ROOT / "cv" / f"{locale}.json").read_text(encoding="utf-8"))
    destination = ROOT / "public" / f"Alfin-Noviaji-CV-{locale.upper()}.pdf"
    document = SimpleDocTemplate(
        str(destination), pagesize=A4, leftMargin=40, rightMargin=40,
        topMargin=38, bottomMargin=38, title=f"Alfin Noviaji | CV ({locale.upper()})",
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
            Spacer(1, 3),
        ]))

    section(story, content["sections"]["projects"])
    for project in content["projects"]:
        story.append(KeepTogether([
            paragraph(project["name"], "entry"),
            paragraph(project["description"]),
            Paragraph(f'<link href="{escape(project["url"])}" color="#17648C">{escape(project["url"])}</link>', styles["meta"]),
            Spacer(1, 2),
        ]))

    section(story, content["sections"]["education"])
    story.append(paragraph(content["education"]))
    section(story, content["sections"]["certification"])
    story.append(paragraph(content["certification"]))
    document.build(story)
    print(destination)


def build_html(locale):
    content = json.loads((ROOT / "cv" / f"{locale}.json").read_text(encoding="utf-8"))
    e = html_escape
    sections = content["sections"]
    contact = (
        '<a href="mailto:alpinnz@gmail.com">alpinnz@gmail.com</a>'
        '<a href="https://alpinnz.github.io/">alpinnz.github.io</a>'
        '<a href="https://github.com/alpinnz">GitHub</a>'
        '<a href="https://www.linkedin.com/in/alpinnz/">LinkedIn</a>'
    )
    skills = "".join(
        f"<li><strong>{e(skill['label'])}</strong><span>{e(skill['value'])}</span></li>"
        for skill in content["skills"]
    )
    experience = "".join(
        '<article class="cv-entry">'
        f"<h3>{e(position['role'])}</h3>"
        f"<p class='cv-meta'>{e(position['organization'])} · {e(position['period'])}</p>"
        f"<p>{e(position['description'])}</p>"
        '</article>'
        for position in content["experience"]
    )
    projects = "".join(
        '<article class="cv-entry">'
        f"<h3>{e(project['name'])}</h3>"
        f"<p>{e(project['description'])}</p>"
        f"<a href='{e(project['url'], quote=True)}'>{e(project['url'])}</a>"
        '</article>'
        for project in content["projects"]
    )
    download = "Unduh PDF" if locale == "id" else "Download PDF"
    back = "Kembali ke portofolio" if locale == "id" else "Back to portfolio"
    other = "English" if locale == "id" else "Bahasa Indonesia"
    other_locale = "en" if locale == "id" else "id"
    html = f"""<!doctype html>
<html lang="{locale}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="{e(content['summary'], quote=True)}">
  <title>Alfin Noviaji | CV</title>
  <link rel="stylesheet" href="/cv.css">
</head>
<body>
  <main class="cv">
    <nav class="cv-actions" aria-label="CV">
      <a href="/">{back}</a>
      <a href="/cv-{other_locale}.html" lang="{other_locale}">{other}</a>
      <a href="/Alfin-Noviaji-CV-{locale.upper()}.pdf" download>{download}</a>
    </nav>
    <header class="cv-header">
      <h1>Alfin Noviaji</h1>
      <p class="cv-role">{e(content['role'])}</p>
      <p>Malang, Indonesia</p>
      <div class="cv-contact">{contact}</div>
    </header>
    <section aria-labelledby="summary"><h2 id="summary">{e(sections['summary'])}</h2><p>{e(content['summary'])}</p></section>
    <section aria-labelledby="skills"><h2 id="skills">{e(sections['skills'])}</h2><ul class="cv-skills">{skills}</ul></section>
    <section aria-labelledby="experience"><h2 id="experience">{e(sections['experience'])}</h2>{experience}</section>
    <section aria-labelledby="projects"><h2 id="projects">{e(sections['projects'])}</h2>{projects}</section>
    <section aria-labelledby="education"><h2 id="education">{e(sections['education'])}</h2><p>{e(content['education'])}</p></section>
    <section aria-labelledby="certification"><h2 id="certification">{e(sections['certification'])}</h2><p>{e(content['certification'])}</p></section>
  </main>
</body>
</html>
"""
    destination = ROOT / "public" / f"cv-{locale}.html"
    destination.write_text(html, encoding="utf-8")
    print(destination)


if __name__ == "__main__":
    copyfile(ROOT / "cv" / "style.css", ROOT / "public" / "cv.css")
    for language in ("id", "en"):
        build_cv(language)
        build_html(language)

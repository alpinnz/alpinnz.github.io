"""Build responsive CV pages and tagged PDFs from the two JSON sources.

Run `python cv/generate.py` with Google Chrome or Chromium installed.
"""

import json
import shutil
import subprocess
import tempfile
import time
from html import escape
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"


def find_browser():
    candidates = [
        Path("C:/Program Files/Google/Chrome/Application/chrome.exe"),
        Path("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"),
        Path("C:/Program Files/Microsoft/Edge/Application/msedge.exe"),
    ]
    for name in ("google-chrome", "chrome", "chromium", "chromium-browser", "msedge"):
        path = shutil.which(name)
        if path:
            candidates.append(Path(path))
    for candidate in candidates:
        if candidate.is_file():
            return candidate
    raise RuntimeError("Chrome, Chromium, or Edge is required to generate the CV PDFs.")


def build_html(locale):
    content = json.loads((ROOT / "cv" / f"{locale}.json").read_text(encoding="utf-8"))
    sections = content["sections"]
    contact = (
        '<a href="mailto:alpinnz@gmail.com">alpinnz@gmail.com</a>'
        '<a href="https://alpinnz.github.io/">alpinnz.github.io</a>'
        '<a href="https://github.com/alpinnz">GitHub</a>'
        '<a href="https://www.linkedin.com/in/alpinnz/">LinkedIn</a>'
    )
    skills = "".join(
        f"<li><strong>{escape(skill['label'])}</strong><span>{escape(skill['value'])}</span></li>"
        for skill in content["skills"]
    )
    experience = ""
    for position in content["experience"]:
        if "highlights" in position:
            details = "<ul class='cv-highlights'>" + "".join(
                f"<li>{escape(highlight)}</li>" for highlight in position["highlights"]
            ) + "</ul>"
        else:
            details = f"<p>{escape(position['description'])}</p>"
        experience += (
            '<article class="cv-entry">'
            f"<h3>{escape(position['role'])}</h3>"
            f"<p class='cv-meta'>{escape(position['organization'])} · {escape(position['period'])}</p>"
            f"{details}"
            '</article>'
        )
    projects = "".join(
        '<article class="cv-entry">'
        f"<h3>{escape(project['name'])}</h3>"
        f"<p>{escape(project['description'])}</p>"
        f"<a href='{escape(project['url'], quote=True)}'>{escape(project['url'])}</a>"
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
  <meta name="description" content="{escape(content['summary'], quote=True)}">
  <title>Alfin Noviaji | CV</title>
  <link rel="stylesheet" href="cv.css">
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
      <p class="cv-role">{escape(content['role'])}</p>
      <p>Malang, Indonesia</p>
      <div class="cv-contact">{contact}</div>
    </header>
    <section aria-labelledby="summary"><h2 id="summary">{escape(sections['summary'])}</h2><p>{escape(content['summary'])}</p></section>
    <section aria-labelledby="skills"><h2 id="skills">{escape(sections['skills'])}</h2><ul class="cv-skills">{skills}</ul></section>
    <section aria-labelledby="experience"><h2 id="experience">{escape(sections['experience'])}</h2>{experience}</section>
    <section aria-labelledby="projects"><h2 id="projects">{escape(sections['projects'])}</h2>{projects}</section>
    <section aria-labelledby="education"><h2 id="education">{escape(sections['education'])}</h2><p>{escape(content['education'])}</p></section>
    <section aria-labelledby="certification"><h2 id="certification">{escape(sections['certification'])}</h2><p>{escape(content['certification'])}</p></section>
  </main>
</body>
</html>
"""
    destination = PUBLIC / f"cv-{locale}.html"
    destination.write_text(html, encoding="utf-8")
    print(destination)
    return destination


def build_pdf(browser, html_path, locale):
    destination = PUBLIC / f"Alfin-Noviaji-CV-{locale.upper()}.pdf"
    with tempfile.TemporaryDirectory(prefix="alpinnz-cv-") as directory:
        temporary = Path(directory)
        output = temporary / "cv.pdf"
        command = [
            str(browser), "--headless=new", "--disable-gpu", "--disable-extensions",
            "--no-first-run", "--no-pdf-header-footer", "--export-tagged-pdf",
            f"--user-data-dir={temporary / 'browser'}", f"--print-to-pdf={output}",
            html_path.as_uri(),
        ]
        subprocess.run(command, check=True, capture_output=True, timeout=45)
        deadline = time.monotonic() + 30
        while time.monotonic() < deadline:
            if output.exists() and b"%%EOF" in output.read_bytes()[-1024:]:
                break
            time.sleep(0.2)
        else:
            raise RuntimeError(f"Browser did not create {destination.name}")
        shutil.copyfile(output, destination)
    print(destination)


if __name__ == "__main__":
    browser_path = find_browser()
    for language in ("id", "en"):
        build_pdf(browser_path, build_html(language), language)

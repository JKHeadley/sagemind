#!/usr/bin/env python3
"""
Extract book content from Apple Notes via AppleScript and convert to Markdown.
Book: "The Hidden Gate: An Analytical Framework for the Seen and the Unseen"
"""

import subprocess
import re
import os
import json
import html

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENT_DIR = os.path.join(BASE_DIR, "content", "en")

def slugify(text):
    """Convert text to a filename-safe slug."""
    text = text.lower().strip()
    text = re.sub(r'[àáâãäå]', 'a', text)
    text = re.sub(r'[èéêë]', 'e', text)
    text = re.sub(r'[ìíîï]', 'i', text)
    text = re.sub(r'[òóôõö]', 'o', text)
    text = re.sub(r'[ùúûü]', 'u', text)
    text = re.sub(r'[ñ]', 'n', text)
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'[\s]+', '-', text)
    text = re.sub(r'-+', '-', text)
    return text.strip('-')

def get_note_body(folder, note_name):
    """Get the HTML body of a note via AppleScript."""
    escaped_name = note_name.replace('"', '\\"')
    escaped_folder = folder.replace('"', '\\"')
    script = f'tell application "Notes" to get body of note "{escaped_name}" in folder "{escaped_folder}"'
    try:
        result = subprocess.run(
            ['osascript', '-e', script],
            capture_output=True, text=True, timeout=30
        )
        if result.returncode == 0:
            return result.stdout.strip()
        else:
            print(f"  ERROR getting '{note_name}' from '{folder}': {result.stderr.strip()}")
            return None
    except subprocess.TimeoutExpired:
        print(f"  TIMEOUT getting '{note_name}' from '{folder}'")
        return None

def html_to_markdown(html_content):
    """Convert Apple Notes HTML to clean Markdown."""
    if not html_content:
        return ""

    text = html_content

    # Decode HTML entities
    text = html.unescape(text)

    # Handle headings
    for i in range(6, 0, -1):
        text = re.sub(rf'<h{i}[^>]*>(.*?)</h{i}>', lambda m: '#' * i + ' ' + m.group(1).strip(), text, flags=re.DOTALL)

    # Handle bold
    text = re.sub(r'<b[^>]*>(.*?)</b>', r'**\1**', text, flags=re.DOTALL)
    text = re.sub(r'<strong[^>]*>(.*?)</strong>', r'**\1**', text, flags=re.DOTALL)

    # Handle italic
    text = re.sub(r'<i[^>]*>(.*?)</i>', r'*\1*', text, flags=re.DOTALL)
    text = re.sub(r'<em[^>]*>(.*?)</em>', r'*\1*', text, flags=re.DOTALL)

    # Handle underline (no native markdown, use emphasis)
    text = re.sub(r'<u[^>]*>(.*?)</u>', r'*\1*', text, flags=re.DOTALL)

    # Handle links
    text = re.sub(r'<a[^>]*href="([^"]*)"[^>]*>(.*?)</a>', r'[\2](\1)', text, flags=re.DOTALL)

    # Handle line breaks
    text = text.replace('<br>', '\n')
    text = text.replace('<br/>', '\n')
    text = text.replace('<br />', '\n')

    # Handle horizontal rules
    text = re.sub(r'<hr[^>]*/?>', '\n---\n', text)

    # Handle list items - convert to markdown bullets
    # First handle nested lists by tracking depth
    text = re.sub(r'<li[^>]*>(.*?)</li>', r'- \1', text, flags=re.DOTALL)

    # Handle ordered lists (convert ol to numbered items)
    def convert_ol(match):
        items = re.findall(r'- (.*?)(?=\n- |\Z)', match.group(0), re.DOTALL)
        result = []
        for i, item in enumerate(items, 1):
            result.append(f"{i}. {item.strip()}")
        return '\n'.join(result)

    # Remove list container tags
    text = re.sub(r'</?ul[^>]*>', '\n', text)
    text = re.sub(r'</?ol[^>]*>', '\n', text)

    # Handle blockquotes
    text = re.sub(r'<blockquote[^>]*>(.*?)</blockquote>', lambda m: '> ' + m.group(1).strip().replace('\n', '\n> '), text, flags=re.DOTALL)

    # Handle tables (basic)
    text = re.sub(r'</?table[^>]*>', '\n', text)
    text = re.sub(r'</?thead[^>]*>', '', text)
    text = re.sub(r'</?tbody[^>]*>', '', text)
    text = re.sub(r'<tr[^>]*>(.*?)</tr>', lambda m: '| ' + m.group(1).strip() + ' |', text, flags=re.DOTALL)
    text = re.sub(r'<t[hd][^>]*>(.*?)</t[hd]>', lambda m: m.group(1).strip() + ' | ', text, flags=re.DOTALL)

    # Remove remaining divs and spans
    text = re.sub(r'</?div[^>]*>', '\n', text)
    text = re.sub(r'</?span[^>]*>', '', text)
    text = re.sub(r'</?p[^>]*>', '\n', text)

    # Remove any remaining HTML tags
    text = re.sub(r'<[^>]+>', '', text)

    # Clean up whitespace
    text = re.sub(r'&nbsp;', ' ', text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    text = re.sub(r'[ \t]+\n', '\n', text)
    text = re.sub(r'\n[ \t]+\n', '\n\n', text)

    # Clean up bold/italic artifacts (empty or whitespace-only)
    text = re.sub(r'\*\*\s*\*\*', '', text)
    text = re.sub(r'\*\s*\*', '', text)

    return text.strip()


# ============================================================
# Mapping: Apple Notes folder → output directory + note order
# ============================================================

EXTRACTION_MAP = {
    # Front matter
    "The Hidden Gate: An Analytical Framework for the Seen and the Unseen": {
        "dir": "00-front-matter",
        "notes": ["Dedication", "Preface", "Table of Contents"]
    },

    # Part I: The Seen
    "Analysis": {
        "dir": "01-analysis",
        "notes": [
            "Self-Similarity",
            "Metacognition",
            "Semiotics",
            "Etymology",
            "Socio-onomastics",
            "Yogacara Analysis",
            "Intelligence Analysis",
            "Logical Fallacies",
            "Biases",
            "Language learning"
        ]
    },
    "Material Science": {
        "dir": "02-material-science",
        "notes": ["Brief Review of Physics", "Thermodynamics", "Brief Review of Chemistry"]
    },
    "Biology": {
        "dir": "03-biology",
        "notes": ["Brief Review of Biology", "Web of Life", "Evolution"]
    },
    "Pyschology": {  # Note: typo in Apple Notes folder name
        "dir": "04-psychology",
        "notes": ["Brief Review of Psychodynamics", "Personality and Behavior", "Cognitive Framing"]
    },
    "Music": {
        "dir": "05-music",
        "notes": ["Brief Review of Music Theory", "Circle of Fifths", "The Role of Music", "The Psalms and The Quran"]
    },
    "Philosophy": {
        "dir": "06-philosophy",
        "notes": ["Ontology", "Epistemology", "Aesthetics"]
    },
    "Law": {
        "dir": "07-law",
        "notes": ["Brief Review of Law", "Brief Review of International Law"]
    },

    # Part II: The Unseen - Chapter 8: Religious Transmissions
    "Religious Transmissions": {
        "dir": "08-religious-transmissions",
        "notes": ["The Seven Churches", "Post-Inquisitional Trauma"]
    },
    "Eastern Transmissions": {
        "dir": "08-religious-transmissions/eastern-transmissions",
        "notes": ["Shamans of The Eurasian Steppes"]
    },
    "Indo-Iranian Transmission": {
        "dir": "08-religious-transmissions/eastern-transmissions/indo-iranian",
        "notes": [
            "Brief Explication of Persian Religions and their Influence on the…",
            "Brief Analysis of the Tauroctany",
            "Brief Review of Religion and Spirituality in the Indus Valley",
            "Brief Review of Advaita Vedanta",
            "Brief Review of Shaivism"
        ]
    },
    "Taoist Transmission": {
        "dir": "08-religious-transmissions/eastern-transmissions/taoist",
        "notes": ["Brief Review of Taoism"]
    },
    "Buddhist Transmission": {
        "dir": "08-religious-transmissions/eastern-transmissions/buddhist",
        "notes": [
            "Brief Review of the Yogacara Tradition",
            "Brief Review of Tibetan Buddhism",
            "Brief Review of Buddhist Transmission from Siddhartha Gautama to Madame…"
        ]
    },
    "Abrahamic Transmissions": {
        "dir": "08-religious-transmissions/abrahamic-transmissions",
        "notes": ["1st Century Abrahamic Divinity Conflict"]
    },
    "Judaic Transmission": {
        "dir": "08-religious-transmissions/abrahamic-transmissions/judaic",
        "notes": [
            "The Laws of Torah",
            "Brief History of First Temple Judaism",
            "Brief History of Second Temple Judaism",
            "Comparison of First and Second Temple Judaism",
            "Brief Comparisons of Jewish Sects during Second Temple Period",
            "Brief Review of Dead Sea Scrolls",
            "The Noetic Commandments for Non-Jews",
            "Brief Review of Jewish Kabbalah",
            "Yeshu ha-Notzri",
            "Review of Solomonic Inspired Initiations Preserved within York Rite…",
        ]
    },
    "Christian Transmission": {
        "dir": "08-religious-transmissions/abrahamic-transmissions/christian",
        "notes": [
            "Brief Review of Early Christian Gospels both Canonical and Non-Canonical",
            "Review of Nazorean/Galilean Christians (Part 1.  John the Baptist…",
            "Review of Nazorean/Galilean Christians (Part 2. Gospel Composition",
            "Review of Nazorean/Galilean Christians (Part 3. Speculative Gospel…",
            "Brief Review of Peter vs Paul",
            "Brief Review of The Coptic and Ethiopian Church",
            "Brief Review of the Valentinian School",
            "Comparing Modern Existent Christianities",
            "Modern Neo-Templar Mythology",
            "Review of Templar Inspired Initiations Preserved within York Rite…"
        ]
    },
    "Islamic Transmission": {
        "dir": "08-religious-transmissions/abrahamic-transmissions/islamic",
        "notes": [
            "Brief Explication of Shia Islam and Transmission",
            "Review of Islamic Transmission Given to Templars (Part I: Ja'far al…",
            "Review of Islamic Transmission Given to Templars (Part II: Zaydism…",
            "Review of Islamic Transmission Given to Templars (Part III: The Ikhwān…",
            "Review of Islamic Transmission Given to Templars (Part IV: Fatimid",
            "Review of Islamic Transmission Given to Templars (Part V: Ḥikmat al…",
            "Review of Islamic Transmission Given to Templars (Part VI: The Nizari…",
            "Surah An-Nisa (4:157)",
            "Brief Review of Sultan Muhammad III of Morocco and his Role in the…"
        ]
    },
    "New World Transmissions": {
        "dir": "08-religious-transmissions/new-world-transmissions",
        "notes": ["Religion in the New World"]
    },
    "Pre-Colonial Transmission": {
        "dir": "08-religious-transmissions/new-world-transmissions/pre-colonial",
        "notes": ["Brief Review of African Spirituality", "Brief Review of American Spirituality"]
    },
    "Post-Colonial Transmission": {
        "dir": "08-religious-transmissions/new-world-transmissions/post-colonial",
        "notes": [
            "Brief Review of Regla De Ocha",
            "Brief Review of Palo Kimbisa",
            "Brief Review of Curanderismo",
            "Brief Review of Espiritismo",
            "Brief Review of Rastafarianism"
        ]
    },
    "Theosophical Transmission": {
        "dir": "08-religious-transmissions/new-world-transmissions/theosophical",
        "notes": [
            "Brief Review of Theosophy",
            "Brief Review of The Secret Doctrine (Part I: Cosmogenesis)",
            "Brief Review of The Secret Doctrine (Part II: Anthropogenesis)"
        ]
    },

    # Chapter 9
    "Comparative Mythology And Religion": {
        "dir": "09-comparative-myth-and-religion",
        "notes": [
            "Brief Explication of Tropes",
            "Religious Syncretism",
            "The Quintessential Myth",
            "Chaoskampf",
            "Foundational Myth",
            # "The Myth of Perseus" - not found in folder listing
            "The Indian and Iranian Split",
            "The Daughters of Allah, The Norns and the Fates",
            "The Dharma Religion Underneath Abrahamic Religions",
            "Iberia and Latin America"
        ]
    },

    # Chapter 10: Mysteries
    "Mysteries": {
        "dir": "10-mysteries",
        "notes": ["The Charge Against Jesus"]
    },
    "Division Of Bodies": {
        "dir": "10-mysteries/division-of-bodies",
        "notes": ["According to Egpytians", "According to Blavatsky"]
    },
    "Astrology": {
        "dir": "10-mysteries/astrology",
        "notes": [
            "Sasanian Persian Astrology",
            "Mayan Astrology",
            "Chinese Astrology",
            "Natal Chart in Western Astrology",
            "The Draconic Chart",
            "Planetary and Other Important Glyphs",
            "Houses",
            "Lunar Mansions",
            "Names of Full Moons by Month",
            "Abrahamic Correspondences",
            "The Tree of Life",
            "Twin Mystery"
        ]
    },
    "Numerology": {
        "dir": "10-mysteries/numerology",
        "notes": ["Pythagorean Numerology", "Arabic Gematria"]
    },
    "Theophany": {
        "dir": "10-mysteries/theophany",
        "notes": ["Brief Explication of Theophany", "The 72", "Common Language of Theurgy", "Synchronicities"]
    },
    "Illusion Casting And Perception Manipulation": {
        "dir": "10-mysteries/illusion-casting",
        "notes": ["History of Magic in War", "Magical Warfare", "Tricknology"]
    },

    # Chapter 11
    "Initiantion Rite": {  # Note: typo in Apple Notes folder name
        "dir": "11-initiation-rite",
        "notes": [
            "Secret Rite of John the Apostle (A Speculative Take on The Book of…",
            "Secret Phrase"
        ]
    }
}


def get_notes_in_folder(folder):
    """Get all note names in a folder via AppleScript."""
    escaped_folder = folder.replace('"', '\\"')
    script = f'tell application "Notes" to get name of every note in folder "{escaped_folder}"'
    result = subprocess.run(['osascript', '-e', script], capture_output=True, text=True, timeout=15)
    if result.returncode == 0:
        return [n.strip() for n in result.stdout.strip().split(',')]
    return []


def find_matching_note(folder, partial_name, actual_notes):
    """Find the actual note name that matches a partial name."""
    # Exact match first
    for note in actual_notes:
        if note.strip() == partial_name.strip():
            return note.strip()

    # Partial match (for truncated names)
    for note in actual_notes:
        if partial_name.strip().rstrip('…').rstrip('.') in note.strip():
            return note.strip()
        if note.strip().startswith(partial_name.strip()[:30]):
            return note.strip()

    return None


def extract_all():
    """Main extraction function."""
    total = 0
    errors = 0

    for folder, config in EXTRACTION_MAP.items():
        output_dir = os.path.join(CONTENT_DIR, config["dir"])
        os.makedirs(output_dir, exist_ok=True)

        # Get actual note names in this folder
        actual_notes = get_notes_in_folder(folder)
        print(f"\n{'='*60}")
        print(f"Folder: {folder}")
        print(f"  Found {len(actual_notes)} notes: {actual_notes}")
        print(f"  Output: {config['dir']}")

        for note_name in config["notes"]:
            # Find the actual note name (handles truncation)
            matched_name = find_matching_note(folder, note_name, actual_notes)

            if not matched_name:
                print(f"  WARNING: Could not find note '{note_name}' in folder '{folder}'")
                errors += 1
                continue

            print(f"  Extracting: {matched_name}")

            # Get HTML content
            body = get_note_body(folder, matched_name)
            if not body:
                print(f"  ERROR: No content for '{matched_name}'")
                errors += 1
                continue

            # Convert to markdown
            markdown = html_to_markdown(body)

            # Generate filename
            filename = slugify(matched_name) + ".md"
            filepath = os.path.join(output_dir, filename)

            # Write file
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(markdown)

            total += 1
            print(f"  ✓ Saved: {filepath}")

    # Create Ethics placeholder
    ethics_path = os.path.join(CONTENT_DIR, "07-law", "ethics.md")
    with open(ethics_path, 'w', encoding='utf-8') as f:
        f.write("# Ethics\n\n*[Content pending]*\n")
    total += 1
    print(f"\n  ✓ Created placeholder: {ethics_path}")

    print(f"\n{'='*60}")
    print(f"DONE: {total} files extracted, {errors} errors")


if __name__ == "__main__":
    extract_all()

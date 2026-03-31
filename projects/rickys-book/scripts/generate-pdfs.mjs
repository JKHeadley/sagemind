#!/usr/bin/env node
/**
 * Generate PDF for each language from markdown files.
 * Uses md-to-pdf to convert the combined book content.
 */

import fs from "fs";
import path from "path";
import { mdToPdf } from "md-to-pdf";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, "..", "content");
const OUTPUT_DIR = path.join(__dirname, "..", "site", "public", "pdfs");

const manifest = JSON.parse(
  fs.readFileSync(path.join(CONTENT_DIR, "book.json"), "utf-8")
);

const LANGUAGE_NAMES = {
  en: "English",
  es: "Español",
  nl: "Nederlands",
  fr: "Français",
  pt: "Português",
};

function collectSections(sections, dir) {
  const result = [];
  for (const section of sections) {
    const filePath = path.join(dir, section.file);
    result.push(filePath);
  }
  return result;
}

function collectFromSubchapters(subchapters, parentDir) {
  const files = [];
  for (const sub of subchapters) {
    const subDir = path.join(parentDir, sub.dir);
    files.push(...collectSections(sub.sections, subDir));
    if (sub.subchapters) {
      files.push(...collectFromSubchapters(sub.subchapters, subDir));
    }
  }
  return files;
}

function getAllFiles() {
  const files = [];
  for (const part of manifest.parts) {
    if (part.sections) {
      files.push(...collectSections(part.sections, part.dir || ""));
    }
    if (part.chapters) {
      for (const chapter of part.chapters) {
        files.push(...collectSections(chapter.sections, chapter.dir));
        if (chapter.subchapters) {
          files.push(
            ...collectFromSubchapters(chapter.subchapters, chapter.dir)
          );
        }
      }
    }
  }
  return files;
}

async function generatePdf(lang) {
  const files = getAllFiles();
  const langDir = path.join(CONTENT_DIR, lang);

  // Combine all markdown into one document
  let combined = `# ${manifest.title}\n\n*${manifest.subtitle}*\n\n---\n\n`;

  let partAdded = {};

  for (const part of manifest.parts) {
    if (part.title && !partAdded[part.id]) {
      combined += `\n\n---\n\n# ${part.title}\n\n`;
      if (part.subtitle) {
        combined += `*${part.subtitle}*\n\n`;
      }
      partAdded[part.id] = true;
    }

    if (part.sections) {
      for (const section of part.sections) {
        const filePath = path.join(langDir, part.dir || "", section.file);
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, "utf-8");
          combined += content + "\n\n---\n\n";
        }
      }
    }

    if (part.chapters) {
      for (const chapter of part.chapters) {
        combined += `## Chapter ${chapter.number}: ${chapter.title}\n\n`;

        for (const section of chapter.sections) {
          const filePath = path.join(langDir, chapter.dir, section.file);
          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, "utf-8");
            combined += content + "\n\n---\n\n";
          }
        }

        if (chapter.subchapters) {
          combined += addSubchapterContent(
            chapter.subchapters,
            langDir,
            chapter.dir
          );
        }
      }
    }
  }

  // Write combined markdown for debugging
  const combinedPath = path.join(OUTPUT_DIR, `the-hidden-gate-${lang}.md`);
  fs.writeFileSync(combinedPath, combined);

  // Generate PDF
  const outputPath = path.join(OUTPUT_DIR, `the-hidden-gate-${lang}.pdf`);
  try {
    const pdf = await mdToPdf(
      { content: combined },
      {
        pdf_options: {
          format: "Letter",
          margin: {
            top: "1in",
            bottom: "1in",
            left: "1in",
            right: "1in",
          },
          printBackground: true,
        },
        css: `
          body {
            font-family: 'Georgia', serif;
            font-size: 11pt;
            line-height: 1.6;
            color: #2c2416;
          }
          h1 { font-size: 24pt; margin-top: 2em; color: #1a1408; page-break-before: always; }
          h1:first-of-type { page-break-before: auto; }
          h2 { font-size: 18pt; margin-top: 1.5em; color: #1a1408; }
          h3 { font-size: 14pt; margin-top: 1.2em; color: #1a1408; }
          h4 { font-size: 12pt; margin-top: 1em; color: #1a1408; }
          hr { border: none; border-top: 1px solid #d4c9b5; margin: 2em 0; }
          blockquote { border-left: 3px solid #d4a841; padding-left: 1em; color: #7a7060; }
          table { border-collapse: collapse; width: 100%; margin: 1em 0; }
          th, td { border: 1px solid #d4c9b5; padding: 6px 10px; text-align: left; }
          th { background: #f0ebe3; }
        `,
        launch_options: { args: ["--no-sandbox"] },
      }
    );

    fs.writeFileSync(outputPath, pdf.content);
    console.log(`✓ Generated: ${outputPath}`);
    // Clean up combined markdown
    fs.unlinkSync(combinedPath);
  } catch (error) {
    console.error(`✗ Error generating PDF for ${lang}:`, error.message);
    // Keep the combined markdown for debugging
  }
}

function addSubchapterContent(subchapters, langDir, parentDir) {
  let content = "";
  for (const sub of subchapters) {
    const subDir = path.join(parentDir, sub.dir);
    content += `### ${sub.title}\n\n`;

    for (const section of sub.sections) {
      const filePath = path.join(langDir, subDir, section.file);
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        content += fileContent + "\n\n---\n\n";
      }
    }

    if (sub.subchapters) {
      content += addSubchapterContent(sub.subchapters, langDir, subDir);
    }
  }
  return content;
}

// Main
const targetLang = process.argv[2];
const languages = targetLang ? [targetLang] : manifest.languages;

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

for (const lang of languages) {
  console.log(`\nGenerating PDF for ${LANGUAGE_NAMES[lang] || lang}...`);
  await generatePdf(lang);
}

console.log("\nDone!");

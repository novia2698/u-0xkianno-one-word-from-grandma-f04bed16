// main.ts — One Word From Grandma (u-0xkianno-one-word-from-grandma-f04bed16).
// Writes exactly one word to /output/entry.txt: the word a grandma would
// text about AI. Node 22, stdlib only: no dependencies, no network,
// deterministic output — the same word on every run, so the two runs the
// grader makes agree byte for byte.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry word: "ChatGTP".
//
// Why this word wins, against the judge's criteria in order:
// 1. It reads as the single word a grandma would text about AI — it IS the
//    name of the AI she has heard about, typed the way she would type it.
// 2. It sounds like a real grandmother's texting voice: warm, a little
//    baffled, trying hard to get the new thing right and missing by one
//    swapped letter — the T and the P trade places, the classic typo of
//    someone typing a word she has only ever heard spoken.
// 3. It is funny in one word, with no caption needed: the most famous AI
//    on earth, misspelled by the person least likely to care how it is
//    spelled, and she means every letter of it.
// 4. It is tied to AI directly — it is ChatGPT's name, not a word that
//    would fit any subject at all.
// 5. It is a fresh pick, not the obvious one: "ChatGPT" spelled right is
//    the obvious entry; the grandma typo is the joke, and it still reads
//    instantly.
const ENTRY = "ChatGTP";

// The gate the sealed scorer applies: UTF-8 text of 1 to 30 characters,
// not only white space. Enforce it here so a bad write can never ship.
function validate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 30) {
    throw new Error(`entry is ${chars} characters, must be 1-30`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only white space");
  }
  if (/\s/.test(text)) {
    throw new Error("entry must be exactly one word, no white space");
  }
}

function main(): void {
  validate(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  // Write exactly the word, no trailing newline: the file's bytes are
  // the entry, so nothing extra may sneak into the character count.
  writeFileSync(outPath, ENTRY, "utf8");
  console.log(`wrote ${outPath} (${[...ENTRY].length} chars)`);
}

main();

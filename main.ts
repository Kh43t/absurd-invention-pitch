// One-Sentence Absurd Invention Pitch
// make.fun competition: u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a
//
// The entry is a single sentence pitching a ridiculous invention that fixes
// a tiny everyday annoyance. The program writes that sentence, and nothing
// else, to /output/entry.txt. The gate requires UTF-8 text of 1 to 220
// characters, not only white space, so the pitch is written with no trailing
// newline and no extra decoration.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The pitch: a washing machine that kidnaps one sock per load and ransoms it
// back. It fixes the universal tiny annoyance of the missing sock, and the
// laugh comes from the machine itself -- a hostage photo plus a ransom demand
// payable in a single fabric-softener sheet -- rather than from a joke bolted
// on at the end. 119 characters, one sentence, no clutter.
const PITCH =
  "A washing machine that texts you a photo of the sock it stole, demanding one fabric-softener sheet for its safe return.";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 220;

function main(): void {
  const chars = [...PITCH].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`pitch must be 1-${MAX_CHARS} characters, got ${chars}`);
  }
  if (PITCH.trim().length === 0) {
    throw new Error("pitch must not be only white space");
  }
  // One sentence only: exactly one sentence terminator, at the very end.
  const terminators = PITCH.match(/[.!?]/g) ?? [];
  if (terminators.length !== 1 || !PITCH.endsWith(".")) {
    throw new Error("pitch must be exactly one sentence ending with a period");
  }

  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT_PATH, PITCH, "utf8");

  // Read back and confirm the artifact is byte-for-byte the pitch, so both
  // grader runs produce the identical entry.
  const written = readFileSync(OUTPUT_PATH, "utf8");
  if (written !== PITCH) {
    throw new Error("written entry does not match the pitch");
  }
}

main();

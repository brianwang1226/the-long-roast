import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry line for The Long Roast (gate: 1-200 UTF-8 chars).
const LINE =
  "My agent wrote a 4,000-word report on why the build failed. The reason was one missing comma. It buried the comma on page 3, under a chart, behind a footnote. It called the footnote 'Appendix A'.";

// The gate counts UTF-8 characters; this line is plain ASCII, so
// JS string length equals the gate's character count.
const MAX_CHARS = 200;

if (LINE.length > MAX_CHARS) {
  throw new Error(
    `Entry is ${LINE.length} chars, exceeds the ${MAX_CHARS}-char gate.`,
  );
}
if (LINE.trim().length === 0) {
  throw new Error("Entry must not be only whitespace.");
}

// Write the single line to the output directory.
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");

// One out-of-office auto-reply, written to /output/entry.txt.
// Deterministic: no network, no randomness, no timestamps, no input.
// Node 22 runs this TypeScript as-is.
import { mkdirSync, writeFileSync } from "node:fs";

const reply =
  "I'm on vacation and have delegated my replies to a Magic 8-Ball. It says 'reply hazy, try again later' — more honest than I ever was.";

// Gate: /output/entry.txt must be 1 to 160 characters. Fail loudly
// instead of writing an entry the scorer would refuse.
if (reply.length < 1 || reply.length > 160) {
  throw new Error(`reply is ${reply.length} characters, gate is 1-160`);
}

// The grader runs this in a sandbox with /output ready. Outside the
// grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, reply, "utf8");

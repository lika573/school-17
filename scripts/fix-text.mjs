import { readFileSync, writeFileSync } from "fs";
import { readdirSync, statSync } from "fs";
import path from "path";

const replacements = [
  ["სიახლeები", "\u10e1\u10d8\u10d0\u10ee\u10da\u10d4\u10d1\u10d8"],
  ["სიახლe", "\u10e1\u10d8\u10d0\u10ee\u10da\u10d4"],
  ["სიახლeების", "\u10e1\u10d8\u10d0\u10ee\u10da\u10d4\u10d1\u10d8\u10e1"],
  ["მოსწავლe", "\u10db\u10dd\u10e1\u10ec\u10d0\u10d5\u10da\u10d4"],
  ["მოსწავლeების", "\u10db\u10dd\u10e1\u10ec\u10d0\u10d5\u10da\u10d4\u10d1\u10d8\u10e1"],
  ["მასწავლebeლები", "\u10db\u10d0\u10e1\u10ec\u10d0\u10d5\u10da\u10d4\u10d1\u10d4\u10da\u10d8"],
  ["მასწავლebeლი", "\u10db\u10d0\u10e1\u10ec\u10d0\u10d5\u10da\u10d4\u10d1\u10d4\u10da\u10d8"],
  ["მასწავლebeლთa", "\u10db\u10d0\u10e1\u10ec\u10d0\u10d5\u10da\u10d4\u10d1\u10d4\u10da\u10d7\u10d0"],
  ["გალereა", "\u10d2\u10d0\u10da\u10d4\u10e0\u10d4\u10d0"],
  ["გალereის", "\u10d2\u10d0\u10da\u10d4\u10e0\u10d4\u10d8\u10e1"],
  ["ყოველდღeური", "\u10e7\u10dd\u10d5\u10d4\u10da\u10d3\u10e6\u10d8\u10e3\u10e0\u10d8"],
  ["პedaგogi", "\u10de\u10d4\u10d3\u10d0\u10d2\u10dd\u10d2\u10d8"],
  ["პedaგogები", "\u10de\u10d4\u10d3\u10d0\u10d2\u10dd\u10d2\u10d4\u10d1\u10d8"],
];

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, files);
    else if (/\.(tsx|ts|json)$/.test(entry)) files.push(full);
  }
  return files;
}

for (const file of walk("src")) {
  let content = readFileSync(file, "utf8");
  let changed = false;
  for (const [from, to] of replacements) {
    if (content.includes(from)) {
      content = content.replaceAll(from, to);
      changed = true;
    }
  }
  if (changed) {
    writeFileSync(file, content, "utf8");
    console.log("Fixed:", file);
  }
}

console.log("done");

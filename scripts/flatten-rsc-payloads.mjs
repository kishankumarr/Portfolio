// Static export writes nested segment payloads such as
//   out/projects/x/__next.projects/$d$slug/__PAGE__.txt
// while the client router requests the flat name
//   out/projects/x/__next.projects.$d$slug.__PAGE__.txt
// Plain static hosts (GitHub Pages) can't rewrite, so add flat copies.
// Without them navigation still works, but falls back to full page loads.
import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.argv[2] ?? "out";
let copied = 0;

function filesUnder(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? filesUnder(full) : [full];
  });
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory()) continue;
    if (name.startsWith("__next.")) {
      for (const file of filesUnder(full)) {
        const flat = join(dir, relative(dir, file).split(/[\\/]/).join("."));
        if (!existsSync(flat)) {
          copyFileSync(file, flat);
          copied += 1;
        }
      }
    } else {
      walk(full);
    }
  }
}

walk(root);
console.log(`flatten-rsc-payloads: added ${copied} flat payload file(s) in ${root}/`);

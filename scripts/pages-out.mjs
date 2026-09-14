import { copyFileSync, existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dirs = ["dist/client", "dist"];
const dir = dirs.find(
  (d) => existsSync(join(d, "index.html")) || existsSync(join(d, "_shell.html")),
);
if (!dir) {
  throw new Error("Build sem HTML. O GitHub Pages precisa do site compilado.");
}

const htmlName = existsSync(join(dir, "index.html")) ? "index.html" : "_shell.html";
let html = readFileSync(join(dir, htmlName), "utf8");

const assetsDir = join(dir, "assets");
if (existsSync(assetsDir)) {
  const files = readdirSync(assetsDir);
  html = html.replace(/\/assets\/([A-Za-z0-9_.@-]+\.(?:css|js))/g, (full, name) => {
    if (files.includes(name)) return full;
    const ext = name.split(".").pop();
    const stem = name.replace(/\.[^.]+$/, "").split("-")[0];
    const same = files.filter((f) => f.startsWith(`${stem}-`) && f.endsWith(`.${ext}`));
    if (same.length === 1) return full.replace(name, same[0]);
    if (ext === "css") {
      const css = files.filter((f) => f.endsWith(".css"));
      if (css.length === 1) return full.replace(name, css[0]);
    }
    return full;
  });
}

writeFileSync(join(dir, "index.html"), html);
copyFileSync(join(dir, "index.html"), join(dir, "404.html"));
writeFileSync(join(dir, ".nojekyll"), "");
process.stdout.write(`${dir}\n`);

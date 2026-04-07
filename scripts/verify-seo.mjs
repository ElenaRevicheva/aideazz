/**
 * Ensures SEO files from /public are present in dist after Vite build.
 * 4everland serves static files from IPFS; these must ship in the build output.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, "..", "dist");
const required = ["sitemap.xml", "sitemap.txt", "robots.txt"];

let ok = true;
for (const name of required) {
  const p = path.join(dist, name);
  if (!fs.existsSync(p)) {
    console.error(`verify-seo: missing ${name} in dist/ (run vite build from repo root)`);
    ok = false;
  }
}
if (!ok) process.exit(1);
console.log("verify-seo: OK —", required.join(", "));

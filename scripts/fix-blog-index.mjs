// fix-blog-index.mjs — run after `vite build`.
//
// cto-aipa publishes per-article static HTML into public/blog/<slug>/index.html
// (SEO/GEO pages). That makes /blog/ a REAL directory in the IPFS build, and the
// gateway resolves real directories BEFORE the SPA _redirects catch-all — so
// https://aideazz.xyz/blog started serving a raw IPFS directory listing instead
// of the React Writing page (June 11 2026).
//
// Fix: copy the built SPA entry (dist/index.html, with hashed asset URLs) to
// dist/blog/index.html so the directory route renders the SPA; React Router
// matches /blog/ and shows BlogIndex as before. Per-article pages are untouched.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";

const src = "dist/index.html";
const outDir = "dist/blog";
if (!existsSync(src)) {
  console.error("fix-blog-index: dist/index.html not found — run after vite build");
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });
copyFileSync(src, `${outDir}/index.html`);
console.log("fix-blog-index: OK — dist/blog/index.html now serves the SPA Writing page");

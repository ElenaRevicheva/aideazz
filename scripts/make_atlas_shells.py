"""aideazz.xyz/atlas (Atlas — The Monday Move) + aideazz.xyz/atlas/finder (WHITESPACE): FLAT shell pages on the main
site that frame the live app on the webhook host (20 Oct 2026: flat pages, Pitz-style structure, FAQ single source).

The article under the frame is the crawlable part. Its Q/A is NOT written here: it is read from the app pages' own
<script type="application/json" id="faqData"> block (whitespace/public/atlas.html for /atlas, index.html for
/atlas/finder), the same block the app renders with Skin.faq. So the app FAQ, this article and the FAQPage JSON-LD
are one text and can never drift apart. The build FAILS LOUDLY and writes nothing if a block is missing, EN and ES
differ in length or in which items are cards, or fewer than 3 items are marked "card". No new claims, no new numbers.

Run from the aideazz repo:  python scripts/make_atlas_shells.py
(writes public/atlas.html and public/atlas-finder.html; never hand-edit them). The app source is read from the
whitespace checkout next to this repo (../whitespace/public), or from $WHITESPACE_PUBLIC."""
import datetime
import html
import json
import pathlib
import re
import sys

import os
REPO = pathlib.Path(__file__).resolve().parents[1]
OUT = REPO / "public"
APP = pathlib.Path(os.environ.get("WHITESPACE_PUBLIC") or (REPO.parent / "whitespace" / "public"))   # the live app's source: faqData, I18N, skin.js
BASE = "https://webhook.aideazz.xyz/whitespace/"
SITE = "https://aideazz.xyz"
PAY = SITE + "/pay/analisis-tecnico?sku=diagnostic_call&lng="
SAME_AS = ["https://linkedin.com/in/elenarevicheva", "https://github.com/ElenaRevicheva", "https://x.com/reviceva",
           "https://dev.to/elenarevicheva", "https://www.youtube.com/@AIdeazz"]
BUILD_DATE = datetime.date.today().isoformat()

# The Atlas product name: Elena's pick (#2 of the shortlist, 20 Oct 2026). The SAME four strings as Skin.NAME in
# whitespace/public/skin.js (the one place the app keeps it); the build refuses to run if the two disagree.
NAME = {"en": "The Monday Move", "es": "La Jugada del Lunes",
        "tagEn": "Your ad move this week: enter, watch, or avoid.",
        "tagEs": "Tu jugada publicitaria de la semana: entrar, vigilar o evitar."}

# skin.js TIER_T t1 (EN): the free scan, used as the description of the finder's $0 Offer.
T1_EN = ["2 scans a day · 10 LatAm markets + Spain + US", "Crowded lanes + the open angle",
         "Ad copy or a GEO/AEO content brief", "Evidence links to the live units"]
# The $100 diagnostic is a SERVICE of AIdeazz (skin.js TIER_T t2), not a price of either app: its own node.
DIAG_SERVICE = {"@type": "Service", "@id": SITE + "/#ai-growth-diagnostic", "name": "AI Growth diagnostic",
                "provider": {"@id": SITE + "/#org"}, "url": PAY + "en",
                "offers": {"@type": "Offer", "price": "100", "priceCurrency": "USD", "url": PAY + "en"}}
FREE_OFFER = {"@type": "Offer", "price": "0", "priceCurrency": "USD", "description": " · ".join(T1_EN) + "."}  # unchanged


ATLAS_TITLE = "Atlas — " + NAME["en"] + " by AIdeazz AI Lab"
FINDER_TITLE = "WHITESPACE — find the ad nobody is running yet · AIdeazz"

PAGES = {
    "atlas": {
        "file": "atlas.html", "frame": "atlas.html", "path": "/atlas", "faq_src": "atlas.html",
        "title": ATLAS_TITLE,
        # = the app's own <meta name=description> (whitespace/public/atlas.html), so both say the same thing
        "desc": "Atlas — " + NAME["en"] + " by AIdeazz AI Lab: Atlas reads the live ad market every Monday, scores every angle and ships test-ready creative when a window opens.",
        "app_name": "Atlas — " + NAME["en"], "frame_title": "Atlas · " + NAME["en"] + " — live",
        # the old entity names keep resolving to this page
        "alt_names": ["Atlas Shifted AIPA", "Atlas Shifted Adaptive Intelligent Personal Assistant", NAME["es"]],
        "h1": "Atlas — " + NAME["en"],
        "lede": {"en": NAME["tagEn"], "es": NAME["tagEs"]},
        "handle": {"en": "About Atlas · FAQ ↓", "es": "Sobre Atlas · Preguntas ↓"},
        "links": {"en": [("/atlas/finder", "WHITESPACE free scan", "btn ghost"), (PAY + "en", "Book the $100 diagnostic", "btn")],
                  "es": [("/atlas/finder", "Escaneo gratuito WHITESPACE", "btn ghost"), (PAY + "es", "Reservar el diagnóstico de $100", "btn")]},
        "crumbs": [("AIdeazz", SITE), ("Atlas", SITE + "/atlas")],
        "offers": None,                            # Atlas has no public price; the diagnostic is DIAG_SERVICE
    },
    "finder": {
        "file": "atlas-finder.html", "frame": "", "path": "/atlas/finder", "faq_src": "index.html",
        "title": FINDER_TITLE,
        "desc": "WHITESPACE by AIdeazz AI Lab maps which ad and content angles are saturated in your market and surfaces the open one, with a sourced evidence trail.",
        "app_name": "WHITESPACE — ad & content whitespace finder", "frame_title": "WHITESPACE finder — live",
        "alt_names": [],
        "h1": "WHITESPACE — find the angle nobody is running yet",
        # the app's own hero chip (index.html I18N `kicker`, EN / ES)
        "lede": {"en": "Ad & content whitespace finder · LatAm", "es": "Buscador de whitespace en anuncios y contenido · LatAm"},
        "handle": {"en": "About WHITESPACE · FAQ ↓", "es": "Sobre WHITESPACE · Preguntas ↓"},
        "links": {"en": [("/atlas", "Atlas · " + NAME["en"], "btn ghost"), (PAY + "en", "Book the $100 diagnostic", "btn")],
                  "es": [("/atlas", "Atlas · " + NAME["es"], "btn ghost"), (PAY + "es", "Reservar el diagnóstico de $100", "btn")]},
        "crumbs": [("AIdeazz", SITE), ("Atlas", SITE + "/atlas"), ("WHITESPACE", SITE + "/atlas/finder")],
        "offers": FREE_OFFER,
    },
}

TEMPLATE = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<script>/* First thing on the page: an owner token never rides on this domain - removed before analytics reads the address. */
(function(){try{var u=new URL(location.href);if(u.searchParams.has('token')||u.searchParams.has('ship_token')){u.searchParams.delete('token');u.searchParams.delete('ship_token');history.replaceState(null,'',u.pathname+u.search+u.hash);}}catch(e){}})();</script>
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- aideazz.xyz@@PATH@@: a FLAT shell page (never a public/atlas/ directory: IPFS would 301 /atlas -> /atlas/ and can
     serve a DirIndex). The live app runs on the webhook host and is framed below, so its per-visitor limits, lead form,
     chat bubbles and media keep working exactly as there. The article under the frame is the crawlable part: its Q/A
     is the app's own faqData block, word for word (generated by scripts/make_atlas_shells.py - do not hand-edit).
     NO HubSpot loader here: the framed page draws the launcher itself. -->
<title>@@TITLE@@</title>
<meta name="description" content="@@DESC@@">
<link rel="canonical" href="https://aideazz.xyz@@PATH@@">
<meta name="theme-color" content="#020617">
<meta property="og:type" content="website">
<meta property="og:site_name" content="AIdeazz">
<meta property="og:url" content="https://aideazz.xyz@@PATH@@">
<meta property="og:title" content="@@TITLE@@">
<meta property="og:description" content="@@DESC@@">
<meta property="og:image" content="https://aideazz.xyz/aideazz-og-v2.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="@@TITLE@@">
<meta name="twitter:description" content="@@DESC@@">
<meta name="twitter:image" content="https://aideazz.xyz/aideazz-og-v2.jpg">
<link rel="icon" type="image/svg+xml" href="/atlas-favicon.svg?v=1"><!-- the Atlas globe: the Earth in purple + yellow, as on the app -->
<link rel="apple-touch-icon" href="/apple-touch-icon.png?v=3">
<link rel="preconnect" href="https://webhook.aideazz.xyz">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Manrope:wght@400;600;700&display=swap">
<!-- Google tag (gtag.js) — the same property as the rest of aideazz.xyz -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-TL5S8V23LT"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-TL5S8V23LT');
</script>
<!-- Ahrefs Web Analytics (cookie-free; separates LLM referrals). Public site key, as on index.html. -->
<script src="https://analytics.ahrefs.com/analytics.js" data-key="06Z2AphR1Lvzb5NSr2agUg" async></script>
<script type="application/ld+json">
@@JSONLD@@
</script>
<style>
  /* the skin tokens of whitespace/public/skin.css, copied inline (this page loads no app CSS) */
  html,body{margin:0;background:#020617;color:#e5e7eb}
  @media (prefers-reduced-motion:no-preference){html{scroll-behavior:smooth}}
  .app{display:block;width:100%;height:calc(100vh - 44px);height:calc(100dvh - 44px);border:0;background:#020617}
  .handle{display:flex;align-items:center;justify-content:center;height:44px;box-sizing:border-box;padding:0 16px;background:rgba(10,8,20,.72);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border-block:1px solid rgba(255,255,255,.1);font:600 14px/1 Manrope,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;letter-spacing:.01em;color:rgba(255,255,255,.8);text-decoration:none;white-space:nowrap}
  .handle:hover,.handle:focus-visible{color:#fde68a}
  .about{max-width:960px;margin:0 auto;padding:48px 16px 72px;font:16px/1.65 Manrope,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:#e5e7eb}
  .ahead{margin:0 0 28px}
  .eyebrow{display:block;margin:0 0 12px;font:500 11px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;letter-spacing:.18em;text-transform:uppercase;color:#edb867}
  .about h1{margin:0 0 14px;font:400 32px/1.1 "Instrument Serif",Georgia,serif;letter-spacing:-.01em;color:#fff}
  .lede{margin:0 0 4px;max-width:46rem;font-size:17px;color:rgba(255,255,255,.8)}
  .lede[lang="es"]{font-size:15px;color:rgba(255,255,255,.6)}
  details.lang{border-top:1px solid rgba(255,255,255,.1)}
  details.lang+details.lang{border-bottom:1px solid rgba(255,255,255,.1)}
  .about summary{list-style:none;cursor:pointer;display:flex;align-items:center;gap:12px;min-height:48px}
  .about summary::-webkit-details-marker{display:none}
  .about summary::after{content:"";flex:none;margin-left:auto;width:8px;height:8px;border-right:1.6px solid rgba(255,255,255,.6);border-bottom:1.6px solid rgba(255,255,255,.6);transform:translateY(-2px) rotate(45deg);transition:transform .16s}
  .about details[open]>summary::after{transform:translateY(2px) rotate(-135deg)}
  details.lang>summary{font:600 12px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;letter-spacing:.16em;text-transform:uppercase;color:#fff}
  .cards{display:grid;grid-template-columns:minmax(0,1fr);gap:16px;margin:8px 0 28px}
  .card{padding:22px 22px 20px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.1);border-radius:16px}
  .card h2{margin:0 0 10px;font:400 24px/1.15 "Instrument Serif",Georgia,serif;color:#fff}
  .card p{margin:0;font-size:15px;line-height:1.65;color:rgba(255,255,255,.78)}
  .how{margin:8px 0 24px}
  .how h2{margin:0 0 12px;font:400 26px/1.15 "Instrument Serif",Georgia,serif;color:#fff}
  .how ol{margin:0;padding-left:1.4em;display:grid;gap:8px;max-width:46rem;font-size:15px;line-height:1.6;color:rgba(255,255,255,.78)}
  .how li::marker{color:#edb867;font-weight:600}
  .faq{border-top:1px solid rgba(255,255,255,.1)}
  .qa{border-bottom:1px solid rgba(255,255,255,.1)}
  .qa>summary{padding:12px 0}
  .qa h3{margin:0;font:600 17px/1.35 Manrope,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:#fff}
  .qa p{margin:0 0 18px;max-width:46rem;font-size:15px;line-height:1.65;color:rgba(255,255,255,.78)}
  .ctas{display:flex;flex-wrap:wrap;gap:12px;margin:28px 0 32px}
  .btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;box-sizing:border-box;padding:13px 26px;border:0;border-radius:999px;background:#fff;color:#020617;font:700 15.5px/1.25 Manrope,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;letter-spacing:-.02em;text-align:center;text-decoration:none;box-shadow:0 0 0 1px rgba(255,255,255,.6);transition:box-shadow .15s}
  .btn:hover{box-shadow:0 0 0 1px #fde68a,0 10px 34px -10px rgba(245,200,120,.55)}
  .btn.ghost{background:rgba(255,255,255,.06);color:#fff;box-shadow:0 0 0 1px rgba(255,255,255,.16)}
  .btn.ghost:hover{box-shadow:0 0 0 1px rgba(255,255,255,.4)}
  .about a:not(.btn){color:#c4b5fd}
  .about .fine{margin-top:40px;font-size:13px;color:rgba(255,255,255,.5)}
  @media (min-width:640px){.about{padding:64px 24px 88px}.about h1{font-size:40px}}
  @media (min-width:860px){.cards{grid-template-columns:repeat(3,minmax(0,1fr))}}
  @media (prefers-reduced-motion:reduce){.about summary::after,.btn{transition:none}}
</style>
</head>
<body>
<main>
  <iframe id="app" class="app" title="@@FRAME_TITLE@@" allow="autoplay; fullscreen; clipboard-write" allowfullscreen></iframe>
  <noscript><p style="padding:16px"><a style="color:#c4b5fd" href="@@BASE@@@@FRAME@@?direct=1">Open the live @@APP_NAME@@</a></p></noscript>
  <a class="handle" id="handle" href="#about" data-es="@@HANDLE_ES@@">@@HANDLE_EN@@</a>
  <article class="about" id="about">
    <header class="ahead">
      <span class="eyebrow">AIdeazz AI Lab</span>
      <h1>@@H1@@</h1>
      <p class="lede">@@LEDE_EN@@</p>
      <p class="lede" lang="es">@@LEDE_ES@@</p>
    </header>
@@BLOCKS@@
    <p class="fine">AIdeazz AI Lab · <a href="/portfolio">Portfolio</a> · <a href="/api">GEO/AEO Visibility API</a> · <a href="@@BASE@@@@FRAME@@?direct=1" target="_blank" rel="noopener">Open full screen ↗</a></p>
  </article>
  <script>/* Language: a Spanish browser gets the Español block open and English closed. Without JS, English is open.
     Both blocks always stay in the DOM (inside <details>, never display:none), and the JSON-LD carries both. */
  (function(){try{if(!/^es/i.test(navigator.language||''))return;var d=document.querySelectorAll('#about details.lang');if(d.length===2){d[0].open=false;d[1].open=true;}var h=document.getElementById('handle');if(h&&h.getAttribute('data-es'))h.textContent=h.getAttribute('data-es');}catch(e){}})();
  </script>
</main>
<script>
(function () {
  var BASE = '@@BASE@@', PAGE = '@@FRAME@@';
  try {
    var u = new URL(location.href);
    // (the owner token was already removed by the first script in <head>; owner mode stays on the webhook URL)
    // src is set ONCE, here: a static src plus this assignment would load the app (and its API calls) twice.
    // ?q=, ?track=1 and #anchors reach the app unchanged.
    document.getElementById('app').src = BASE + PAGE + u.search + u.hash;
    // The framed app reports (1) which page it shows: the address bar and tab title follow; (2) its two GA4 key
    // events (it has no GA4 of its own): fired here on this property. Names and params are allow-listed.
    var EV = { generate_lead: 1, contact_whatsapp: 1 }, EVP = ['form', 'lang', 'placement', 'state', 'page'];
    addEventListener('message', function (e) {
      if (e.origin !== 'https://webhook.aideazz.xyz' || !e.data) return;
      if (e.data.ws === 'event') {
        if (!EV[e.data.name] || typeof gtag !== 'function') return;
        var src = e.data.params || {}, p = { surface: 'atlas_frame' };
        EVP.forEach(function (k) { var v = src[k]; if (typeof v === 'string' && v.length <= 40) p[k] = v; });
        gtag('event', e.data.name, p);
        return;
      }
      if (e.data.ws !== 'nav') return;
      var path = e.data.page === 'finder' ? '/atlas/finder' : '/atlas';
      var q = new URLSearchParams(typeof e.data.search === 'string' ? e.data.search : '');
      q.delete('token'); q.delete('ship_token');
      var s = q.toString() ? '?' + q.toString() : '';
      if (location.pathname !== path || location.search !== s) history.replaceState(null, '', path + s + location.hash);
      // the tab title follows the page shown in the frame, like the address bar
      document.title = e.data.page === 'finder' ? @@FINDER_TITLE_JS@@ : @@ATLAS_TITLE_JS@@;
    });
  } catch (e) {}
})();
</script>
</body>
</html>
"""


def die(msg):
    sys.stderr.write("make_shells.py: FAIL - " + msg + "\n(nothing was written)\n")
    sys.exit(1)


def esc(s):
    return html.escape(s, quote=True)


def js_str(s):
    """A single-quoted JS string literal (titles go into the message listener)."""
    return "'" + s.replace("\\", "\\\\").replace("'", "\\'").replace("</", "<\\/") + "'"


SCRIPT_RE = re.compile(r"<script\b([^>]*)>(.*?)</script\s*>", re.S | re.I)


def read_faq(src):
    """The app page's faqData block -> {"en": [...], "es": [...]}. Fails loudly on anything the layout cannot trust."""
    path = APP / src
    if not path.is_file():
        die(f"{path}: file not found")
    text = path.read_text(encoding="utf-8")
    blocks = [(attrs, body) for attrs, body in SCRIPT_RE.findall(text) if re.search(r"""\bid\s*=\s*["']faqData["']""", attrs)]
    if len(blocks) != 1:
        die(f'{path}: expected exactly 1 <script type="application/json" id="faqData"> block, found {len(blocks)}')
    attrs, body = blocks[0]
    if not re.search(r"""\btype\s*=\s*["']application/json["']""", attrs, re.I):
        die(f'{path}: the faqData block is not type="application/json"')
    try:
        data = json.loads(body)
    except json.JSONDecodeError as e:
        die(f"{path}: faqData is not valid JSON ({e})")
    if not isinstance(data, dict):
        die(f"{path}: faqData must be an object with en and es lists")
    for lg in ("en", "es"):
        items = data.get(lg)
        if not isinstance(items, list) or not items:
            die(f"{path}: faqData.{lg} is missing or empty")
        for i, it in enumerate(items):
            if not isinstance(it, dict):
                die(f"{path}: faqData.{lg}[{i}] is not an object")
            for k in ("q", "a"):
                if not isinstance(it.get(k), str) or not it[k].strip():
                    die(f"{path}: faqData.{lg}[{i}].{k} is missing or empty")
    en, es = data["en"], data["es"]
    if len(en) != len(es):
        die(f"{path}: faqData EN has {len(en)} items but ES has {len(es)}")
    cards_en = [bool(it.get("card")) for it in en]
    cards_es = [bool(it.get("card")) for it in es]
    if cards_en != cards_es:
        die(f"{path}: EN and ES mark different items as card (EN {cards_en}, ES {cards_es})")
    if sum(cards_en) < 3:
        die(f"{path}: only {sum(cards_en)} items are marked card; the article needs 3")
    return {lg: [(it["q"].strip(), it["a"].strip(), bool(it.get("card"))) for it in data[lg]] for lg in ("en", "es")}


HOW_RE = re.compile(r"^\s*(howEyebrow|how\d)\s*:\s*'((?:[^'\\]|\\.)*)'\s*,", re.M)


def read_how(src):
    """The app page's own "How it works" (I18N howEyebrow + how1..howN): the EN table first, then ES. Word for word."""
    path = APP / src
    found = {}
    for k, v in HOW_RE.findall(path.read_text(encoding="utf-8")):
        found.setdefault(k, []).append(html.unescape(re.sub(r"<[^>]+>", "", v.replace("\\'", "'"))))
    steps = sorted((k for k in found if k != "howEyebrow"), key=lambda k: int(k[3:]))
    if not found.get("howEyebrow") or len(steps) < 3:
        die(f"{path}: I18N howEyebrow + how1..how3 not found")
    for k in ["howEyebrow"] + steps:
        if len(found[k]) != 2:
            die(f"{path}: I18N {k} found {len(found[k])} times (want EN + ES)")
    return {lg: (found["howEyebrow"][i], [found[k][i] for k in steps]) for i, lg in enumerate(("en", "es"))}


def check_name():
    """make_shells.py NAME must equal skin.js Skin.NAME: change one, change both."""
    path = APP / "skin.js"
    if not path.is_file():
        die(f"{path}: file not found (Skin.NAME lives there)")
    m = re.search(r"Skin\.NAME\s*=\s*\{(.*?)\}", path.read_text(encoding="utf-8"), re.S)
    if not m:
        die(f"{path}: Skin.NAME = {{...}} not found")
    got = dict(re.findall(r"(\w+)\s*:\s*'((?:[^'\\]|\\.)*)'", m.group(1)))
    for k, v in NAME.items():
        if got.get(k) != v:
            die(f"name drift: make_shells.py NAME[{k!r}] = {v!r} but skin.js Skin.NAME.{k} = {got.get(k)!r}")


def split(items):
    """The first 3 items marked card become the 3 article cards; every other item is a FAQ row, in source order.
    Each Q/A is shown exactly once, so the visible Q/A and the FAQPage JSON-LD are the same set."""
    cards, rows = [], []
    for q, a, card in items:
        (cards if card and len(cards) < 3 else rows).append((q, a))
    return cards, rows


def lang_block(p, lg, items, how):
    cards, rows = split(items)
    open_attr = " open" if lg == "en" else ""
    out = [f'    <details class="lang"{open_attr} lang="{lg}"><summary>{"English" if lg == "en" else "Español"}</summary>']
    head, steps = how[lg]
    out += [f'      <section class="how"><h2>{esc(head)}</h2><ol>'] + [f'        <li>{esc(x)}</li>' for x in steps] + ['      </ol></section>']
    out += ['      <div class="cards">']
    out += [f'        <section class="card"><h2>{esc(q)}</h2><p>{esc(a)}</p></section>' for q, a in cards]
    out += ['      </div>', '      <div class="faq">']
    out += [f'        <details class="qa"><summary><h3>{esc(q)}</h3></summary><p>{esc(a)}</p></details>' for q, a in rows]
    out += ['      </div>']
    links = " ".join(f'<a class="{cls}" href="{esc(h)}"' + (' target="_blank" rel="noopener"' if h.startswith("http") else "") + f">{esc(t)} →</a>"
                     for h, t, cls in p["links"][lg])
    out += [f'      <p class="ctas">{links}</p>', '    </details>']
    return "\n".join(out), cards + rows


def build(key, faq, how):
    p = PAGES[key]
    blocks, shown = [], {}
    for lg in ("en", "es"):
        b, shown[lg] = lang_block(p, lg, faq[lg], how)
        blocks.append(b)
    url = SITE + p["path"]
    app = {"@type": "WebApplication", "name": p["app_name"]}
    if p["alt_names"]:
        app["alternateName"] = p["alt_names"]
    app.update({"url": url, "applicationCategory": "BusinessApplication", "operatingSystem": "Web",
                "inLanguage": ["en", "es"], "dateModified": BUILD_DATE, "publisher": {"@id": SITE + "/#org"}})
    if p["offers"]:
        app["offers"] = p["offers"]
    graph = {"@context": "https://schema.org", "@graph": [
        {"@type": "Organization", "@id": SITE + "/#org", "name": "AIdeazz", "url": SITE, "sameAs": SAME_AS},
        app,
        DIAG_SERVICE,
        {"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": i + 1, "name": n, "item": u}
                                                         for i, (n, u) in enumerate(p["crumbs"])]},
        # word for word the visible Q/A, in the order shown (EN block, then ES block)
        {"@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": q, "inLanguage": lg,
                                             "acceptedAnswer": {"@type": "Answer", "text": a}}
                                            for lg in ("en", "es") for q, a in shown[lg]]},
    ]}
    vals = {
        "PATH": p["path"], "TITLE": esc(p["title"]), "DESC": esc(p["desc"]), "FRAME_TITLE": esc(p["frame_title"]),
        "APP_NAME": esc(p["app_name"]), "BASE": BASE, "FRAME": p["frame"], "H1": esc(p["h1"]),
        "LEDE_EN": esc(p["lede"]["en"]), "LEDE_ES": esc(p["lede"]["es"]),
        "HANDLE_EN": esc(p["handle"]["en"]), "HANDLE_ES": esc(p["handle"]["es"]), "BLOCKS": "\n".join(blocks),
        "FINDER_TITLE_JS": js_str(FINDER_TITLE), "ATLAS_TITLE_JS": js_str(ATLAS_TITLE),
        "JSONLD": json.dumps(graph, ensure_ascii=False, indent=1).replace("</", "<\\/"),
    }
    out = re.sub(r"@@([A-Z0-9_]+)@@", lambda m: vals[m.group(1)], TEMPLATE)   # an unknown token -> KeyError (loud)
    left = re.findall(r"@@\w*@@", out)
    if left:
        die(f'{p["file"]}: template tokens left unfilled: {sorted(set(left))}')
    # loud checks before anything is written
    if not 15 <= len(p["title"]) <= 70:
        die(f'{p["file"]}: title is {len(p["title"])} chars (want 15-70)')
    if not 50 <= len(p["desc"]) <= 170:
        die(f'{p["file"]}: description is {len(p["desc"])} chars (want 50-170)')
    if len(re.findall(r"<h1\b", out)) != 1:
        die(f'{p["file"]}: expected exactly one <h1>')
    if "\r" in out:
        die(f'{p["file"]}: CR found; the output must be LF only')
    words = sum(len((q + " " + a).split()) for lg in ("en", "es") for q, a in shown[lg])
    stat = f'{p["file"]} {len(out.encode("utf-8"))} bytes | {sum(len(shown[lg]) for lg in shown)} Q/A ({words} words) | title {len(p["title"])} | desc {len(p["desc"])}'
    return out, stat


def main():
    check_name()
    built = []
    for key, p in PAGES.items():
        built.append((p["file"],) + build(key, read_faq(p["faq_src"]), read_how(p["faq_src"])))
    for name, out, stat in built:   # write only after BOTH pages built cleanly
        (OUT / name).write_bytes(out.encode("utf-8"))
        print(stat)


if __name__ == "__main__":
    main()

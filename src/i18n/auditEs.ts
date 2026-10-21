/**
 * Spanish for the AI Visibility audit's FIXED texts (21 Oct 2026). The audit API answers in English; its check names,
 * "why it matters" lines and fix lines are evergreen strings from cto-aipa src/visibility-audit.ts, collected from live
 * audits. The page shows these on the Spanish site and falls back to the API's English for anything not listed (a new
 * check, or a fix that embeds an observed value). The observed `detail` stays as the API wrote it: it carries the
 * site's own values. Deterministic — no model translates an audit result.
 */
export const AUDIT_LABEL_ES: Record<string, string> = {
  "http-response": "El servidor entrega una página legible (HTTP 200)",
  "robots-txt": "robots.txt accesible",
  "crawler-gptbot": "ChatGPT (OpenAI) puede rastrear (GPTBot)",
  "crawler-oai-searchbot": "ChatGPT Search puede rastrear (OAI-SearchBot)",
  "crawler-claudebot": "Claude (Anthropic) puede rastrear (ClaudeBot)",
  "crawler-perplexitybot": "Perplexity puede rastrear (PerplexityBot)",
  "crawler-google-extended": "Gemini (Google AI) puede rastrear (Google-Extended)",
  "crawler-ccbot": "Los corpus de entrenamiento de LLM pueden rastrear (CCBot)",
  "llms-txt": "llms.txt presente",
  sitemap: "Sitemap XML disponible",
  "no-noindex": "La página es indexable (sin noindex en meta ni cabecera)",
  "json-ld": "Datos estructurados presentes (JSON-LD / microdata)",
  "schema-identity": "Schema de identidad (Organization / Person / WebSite)",
  "schema-answer": "Schema con respuestas (FAQ / Article / Product / Service)",
  "entity-links": "Enlaces de entidad (sameAs a perfiles / knowledge graph)",
  "open-graph": "Etiquetas Open Graph (título, descripción, imagen)",
  canonical: "URL canónica declarada",
  "html-lang": "Idioma declarado en <html>",
  "meta-description": "Meta description (50–170 caracteres)",
  title: "Etiqueta title (15–70 caracteres)",
  h1: "Exactamente un H1",
  "heading-structure": "Encabezados (H2/H3) que estructuran el contenido",
  "question-headings": "Encabezados en forma de pregunta (señal FAQ)",
  "content-depth": "Profundidad del contenido (300+ palabras)",
  "semantic-html": "Landmarks semánticos de HTML5",
  "extractable-facts": "Listas o tablas (datos extraíbles)",
  "freshness-signal": "Señal de actualidad (fechas)",
  https: "Servido por HTTPS",
  "response-time": "Tiempo de respuesta menor a 1,5 s",
  "page-weight": "HTML menor a 1,5 MB",
  viewport: "Meta viewport para móvil",
  "img-alt": "Cobertura de texto alt en imágenes ≥ 80 %",
  "ssr-content": "Contenido presente en el HTML original (no solo JS)",
  "no-meta-refresh": "Sin redirección meta-refresh",
};

/** Keyed by check id; every crawler-* check shares one line. */
export const AUDIT_WHY_ES: Record<string, string> = {
  "http-response": "Si el servidor no devuelve una página legible, nada de lo demás importa: ningún rastreador llega a ver el contenido.",
  "robots-txt": "robots.txt es el primer archivo que pide cada rastreador. Si falta o está mal formado, cada motor adivina — y cada uno adivina distinto.",
  "crawler-*": "Cada motor lee robots.txt con su propio nombre de user-agent. Una regla general de permiso no los cubre, y bloquear uno saca el sitio solo de ese motor.",
  "llms-txt": "La convención emergente para decirles a los modelos de IA qué ofrece un sitio, en markdown simple que leen sin tener que interpretar el HTML.",
  sitemap: "El sitemap es como un rastreador encuentra páginas que nada enlaza de forma visible. Sin él, las páginas más profundas pueden no visitarse nunca.",
  "no-noindex": "Una etiqueta noindex saca la página de los motores por completo. Una sola línea olvidada puede borrarla de todos los motores de respuesta a la vez.",
  "json-ld": "Los datos estructurados declaran hechos en un formato que la máquina no tiene que deducir. Deducir es justo donde los motores se equivocan con un negocio.",
  "schema-identity": "El schema de identidad le dice al motor QUIÉN habla. Sin él, lo que afirma la página es texto sin autor.",
  "schema-answer": "Un schema con forma de respuesta permite que el motor cite una respuesta completa tal cual, en lugar de parafrasear la página y arriesgar el sentido.",
  "entity-links": "Los enlaces sameAs conectan la página con perfiles en los que los motores ya confían. Así un nombre pasa de ser un texto a ser una entidad reconocida.",
  "open-graph": "Open Graph no es solo para vistas previas en redes: varios recuperadores de IA lo leen, y a menudo es el resumen exacto que terminan citando.",
  canonical: "Las URL duplicadas reparten la atribución del contenido. La canónica elige a la ganadora en lugar de dejar que el motor decida.",
  "html-lang": "El atributo lang evita que el motor adivine el idioma, que es lo que hace aparecer una página ante el público equivocado.",
  "meta-description": "Suele ser la frase exacta que un motor reutiliza al resumir la página. Dejarla vacía es dejarle a él la elección de las palabras.",
  title: "La señal individual más fuerte de qué trata una página, y normalmente la línea que aparece junto a una cita.",
  h1: "Un solo H1 le dice al extractor cuál es el tema de la página. Varios H1 lo vuelven ambiguo para una máquina.",
  "heading-structure": "Los motores de respuesta extraen fragmentos por sección. Los encabezados son las costuras por donde cortan.",
  "question-headings": "Los encabezados escritos como preguntas literales coinciden con cómo pregunta la gente, y eso es lo que vuelve citable un pasaje como respuesta.",
  "content-depth": "Las páginas delgadas casi nunca se citan, porque no tienen suficiente sustancia para citar.",
  "semantic-html": "Los landmarks permiten al extractor separar el contenido real de la navegación y del relleno.",
  "extractable-facts": "Las listas y tablas se citan tal cual. Los mismos datos escondidos en un párrafo se parafrasean, o se pierden.",
  "freshness-signal": "Los motores prefieren fuentes recientes. Sin fecha, una página actual compite como si no tuviera fecha.",
  https: "Motores y navegadores desconfían del HTTP sin cifrar, y algunos recuperadores directamente no lo descargan.",
  "response-time": "Las respuestas lentas reducen el presupuesto de rastreo, y los recuperadores de IA se rinden antes de que llegue la página.",
  "page-weight": "Varios lectores de IA cortan los documentos muy grandes; todo lo que queda después del corte es invisible para ellos.",
  viewport: "El renderizado móvil influye en cómo se evalúa una página, y sin viewport parece una página que nadie mantiene.",
  "img-alt": "El texto alt es contenido indexable que describe imágenes que un rastreador no puede leer de otra forma.",
  "ssr-content": "La mayoría de los rastreadores de IA no ejecuta JavaScript. Si el contenido solo aparece cuando corre el bundle, reciben una cáscara vacía.",
  "no-meta-refresh": "Las redirecciones meta-refresh confunden a los rastreadores, que a menudo terminan registrando el destino equivocado.",
};

/** Keyed by the API's exact English fix text (fixes and topFixes use the same strings). */
export const AUDIT_FIX_ES: Record<string, string> = {
  'Add <link rel="canonical" href="..."> pointing to the preferred URL of this page.':
    'Agrega <link rel="canonical" href="..."> apuntando a la URL preferida de esta página.',
  'Add <meta name="viewport" content="width=device-width, initial-scale=1">.':
    'Agrega <meta name="viewport" content="width=device-width, initial-scale=1">.',
  "Add JSON-LD (schema.org) describing the page: at minimum Organization or WebSite.":
    "Agrega JSON-LD (schema.org) que describa la página: como mínimo Organization o WebSite.",
  "Add Organization (or Person) JSON-LD with name, url, logo, sameAs links to your profiles.":
    "Agrega JSON-LD de Organization (o Person) con name, url, logo y enlaces sameAs a tus perfiles.",
  "Add an FAQ section whose H2/H3s are the literal questions customers ask.":
    "Agrega una sección de preguntas frecuentes cuyos H2/H3 sean las preguntas literales que hacen tus clientes.",
  "Add an llms.txt at the site root: a short markdown file listing your key pages and what they offer.":
    "Agrega un llms.txt en la raíz del sitio: un markdown corto con tus páginas clave y lo que ofrece cada una.",
  "Add dateModified to JSON-LD or visible <time> elements on updated content.":
    "Agrega dateModified al JSON-LD o elementos <time> visibles en el contenido actualizado.",
  'Add lang="en" (or your language) to the <html> tag.': 'Agrega lang="es" (o tu idioma) a la etiqueta <html>.',
  "Add og:title, og:description and og:image — used for previews AND by several AI retrievers.":
    "Agrega og:title, og:description y og:image — se usan en las vistas previas Y en varios recuperadores de IA.",
  "Add sameAs to your JSON-LD: links to LinkedIn, GitHub, Wikidata, social profiles.":
    "Agrega sameAs a tu JSON-LD: enlaces a LinkedIn, GitHub, Wikidata y tus redes.",
  "Break content into H2 sections — answer engines extract section-level chunks.":
    "Divide el contenido en secciones H2 — los motores de respuesta extraen fragmentos por sección.",
  "Describe images in alt text — it is indexable content and an accessibility win.":
    "Describe las imágenes en el texto alt — es contenido indexable y suma accesibilidad.",
  "Generate a sitemap.xml and reference it from robots.txt (Sitemap: <url>).":
    "Genera un sitemap.xml y refiérelo desde robots.txt (Sitemap: <url>).",
  "Give the page a 15–70 character title that names the offer, not just the brand.":
    "Dale a la página un title de 15–70 caracteres que nombre la oferta, no solo la marca.",
  "Mark up your FAQ or key offer as FAQPage / Service JSON-LD so engines can lift Q&A directly.":
    "Marca tus preguntas frecuentes u oferta clave como JSON-LD FAQPage / Service para que los motores citen las respuestas directamente.",
  "Present key facts (features, prices, steps) as lists — LLMs lift structured facts verbatim.":
    "Presenta los datos clave (funciones, precios, pasos) como listas — los LLM citan los datos estructurados tal cual.",
  "Publish a robots.txt that explicitly welcomes AI crawlers and points to your sitemap.":
    "Publica un robots.txt que dé la bienvenida explícita a los rastreadores de IA y apunte a tu sitemap.",
  "Server-render or prerender the page. A JS-only SPA is invisible to most AI retrievers.":
    "Renderiza la página en el servidor o pre-renderízala. Una SPA solo con JS es invisible para la mayoría de los recuperadores de IA.",
  "Thin pages rarely get cited. Add substantive copy: what you do, for whom, proof, FAQs.":
    "Las páginas delgadas casi nunca se citan. Agrega contenido con sustancia: qué haces, para quién, pruebas y preguntas frecuentes.",
  "Use exactly one H1 that states the page topic in plain words.":
    "Usa exactamente un H1 que diga el tema de la página en palabras simples.",
  "Wrap content in <main>/<article>/<section> so extractors can isolate the substance.":
    "Envuelve el contenido en <main>/<article>/<section> para que los extractores aíslen lo importante.",
  "Write a 50–170 char meta description that states what you offer and for whom.":
    "Escribe una meta description de 50–170 caracteres que diga qué ofreces y para quién.",
};

const AUDIT_CATEGORY_ES: Record<string, string> = {
  aiAccess: "Acceso de rastreadores de IA",
  geo: "Datos estructurados (GEO)",
  aeo: "Preparación para respuestas (AEO)",
  techSeo: "Base técnica",
};

export const auditCategoryEs = (id: string, en: string) => AUDIT_CATEGORY_ES[id] ?? en;
export const auditLabelEs = (id: string, en: string) => AUDIT_LABEL_ES[id] ?? en;
export const auditWhyEs = (id: string, en?: string) => AUDIT_WHY_ES[id.startsWith("crawler-") ? "crawler-*" : id] ?? en;
export const auditFixEs = (en?: string) => (en ? AUDIT_FIX_ES[en] ?? en : en);

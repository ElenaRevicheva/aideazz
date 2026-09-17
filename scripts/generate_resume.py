"""
Resume PDF generator for Elena Revicheva — EN + ES from ONE content source.

Run:  python scripts/generate_resume.py
Out:  public/Elena_Revicheva_Resume.pdf       (English)
      public/Elena_Revicheva_Resume_ES.pdf    (Spanish)
Both are the files linked from aideazz.xyz/portfolio (src/pages/BusinessCard.tsx).
Bump the ?v= cache-buster there whenever these are regenerated.

WHY ONE FILE. Until 17 Sep 2026 the EN PDF was a Word export and the ES PDF was
rendered separately, so the two could drift and neither matched this script — the
April version of which was still claiming a resume nobody shipped. One content
dict, two renders: the translation can lag, but the FACTS cannot.

17 Sep 2026 update — verified live before writing, per the "never publish anything
unverified" rule:
  * AI Visibility Audit API: POST https://webhook.aideazz.xyz/cto/v1/visibility
    with the public demo key returned score 100 / grade A+ for aideazz.xyz, with
    4 weighted categories (11 + 8 + 8 + 7 = 34 checks) and 6 AI-crawler verdicts.
  * aideazz.xyz/api, /ai-ops-wiki.html, /llms.txt, /geo-manifest.json,
    /sitemap.xml, /robots.txt all return 200.
  * AI Ops Wiki corpus: 21 incidents + 18 concepts (content/ai-ops-wiki/).
  * 146 published blog pages (public/blog/).
  * Weekly AI citation probe: Oracle crontab, Mondays 13:00 UTC.
  * VJH judge: 413 contract tests green; replay of 51 rejected jobs found 20
    false negatives before deploy (17 Sep 2026).
Headline is product/solutions-first per Elena's decision on 17 Sep 2026: her lanes
are AI Product Manager, AI Solutions Architect, AI Systems Consultant, Chief AI
Officer — with the builder proof kept second, so one PDF serves both lanes.
"""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import (
    HRFlowable, PageBreak, Paragraph, SimpleDocTemplate, Spacer,
)

DARK_BLUE = colors.HexColor('#1a3d5c')
TEAL = colors.HexColor('#1a6b8a')
BLACK = colors.HexColor('#1a1a1a')

OUT_DIR = Path(__file__).resolve().parents[1] / 'public'


# ──────────────────────────────────────────────────────────────────────────────
# CONTENT — edit here, never in the layout code below.
# ──────────────────────────────────────────────────────────────────────────────

CONTACT = ('aipa@aideazz.xyz  |  +507 616 66 716 (WhatsApp)  |  '
           '<link href="https://www.linkedin.com/in/elena-revicheva/"><font color="#1a6b8a">LinkedIn</font></link>  |  '
           '<link href="https://github.com/ElenaRevicheva"><font color="#1a6b8a">GitHub</font></link>  |  '
           '<link href="https://aideazz.xyz/portfolio"><font color="#1a6b8a">Portfolio</font></link>')

EN = {
    'name': 'ELENA REVICHEVA',
    'title': ('AI Product &amp; Solutions Lead | AI-Augmented Builder<br/>'
              'Agentic Systems · Automation · AI Visibility (GEO/AEO)'),
    'contact': CONTACT,
    'location': ('Juan Diaz, Panama City, Panama  |  <b>Available in person in Panama City</b>  |  '
                 'Remote worldwide  |  UTC-5'),
    'sections': [
        ('WHAT I DO FOR A BUSINESS', [
            ('b', '<b>Get you found by AI.</b> People now ask ChatGPT, Claude, Gemini and Perplexity '
                  'instead of searching. I check whether those assistants can read and recommend your '
                  'website, and I fix what blocks them. <b>Free instant score: aideazz.xyz/api</b>'),
            ('b', '<b>Answer customers 24/7, in Spanish and English.</b> AI assistants on WhatsApp and '
                  'Telegram that remember each customer and hand over to a human when it matters.'),
            ('b', '<b>Stop losing enquiries.</b> Every enquiry becomes a written reply ready to send and '
                  'a record in your CRM — you approve with one tap, nothing is forgotten.'),
            ('b', '<b>Take the repetitive work off your team.</b> Reports, follow-ups, publishing and '
                  'data entry run automatically, with a person still approving what matters.'),
            ('b', '<b>I build it and I run it.</b> From the business problem to a working system that '
                  'stays up — no long project, no big team, results you can see in days.'),
        ]),
        ('PROFESSIONAL SUMMARY', [
            ('p', 'AI product and solutions lead. I design, build and run AI systems that are used every '
                  'day — and I own the result from the business problem to live operation.'),
            ('p', 'In eighteen months I built and now operate <b>12+ AI systems in production</b>, on my '
                  'own: customer-facing assistants, automated marketing and sales operations, and a '
                  '<b>public AI Visibility Audit API</b> that scores any website for AI search.'),
            ('p', 'Before AI, <b>7+ years as a company executive</b> — Deputy CEO and Chief Legal Officer '
                  'of a national e-government operator, leading large digital transformation programs in '
                  'a strictly regulated environment. So I can sit with the owner, agree what matters, '
                  'and then build it myself.'),
            ('p', 'Strongest at turning an unclear problem into a working system — and at finding the '
                  'failure nobody noticed.'),
        ]),
        ('SELECTED WORK', [
            ('job', ('AI Product &amp; Solutions Lead | AIdeazz.xyz (founder-led AI Lab)',
                     'Panama / Remote  |  2025–Present')),
            ('p', 'Designed, built and operate an AI-first ecosystem of <b>12+ production AI systems</b>, '
                  'autonomous agents and automation pipelines, hosted on the Oracle Cloud Startup '
                  'Program. Operating method: <link href="https://aideazz.xyz/sop-ai-ops.html">'
                  '<font color="#1a6b8a">aideazz.xyz/sop-ai-ops.html</font></link>'),
            ('sub', 'AI VISIBILITY AUDIT API — my own product, free to try: aideazz.xyz/api'),
            ('lead', 'Tells any business, in seconds, whether ChatGPT, Claude, Perplexity and Google AI '
                     'can read and recommend its website — and exactly what to fix first.'),
            ('b', 'Public web service that scores any site 0–100 with a grade and a prioritized fix '
                  'list: <b>34 automatic checks</b> in four areas — access for AI assistants (25%), '
                  'machine-readable business facts (25%), answer-readiness (30%), technical health (20%).'),
            ('b', 'Reports separately whether <b>ChatGPT, Claude, Perplexity, Gemini</b> and two more AI '
                  'crawlers are allowed to read the site at all — the blocker most owners never see.'),
            ('b', 'Runs on my own infrastructure with API keys and a public demo key; used as the '
                  'opening offer for AI-visibility consulting work.'),
            ('sub', 'AI SEARCH VISIBILITY ENGINE (GEO / AEO / TECHNICAL SEO)'),
            ('lead', 'Being recommended by AI assistants is the new referral. I run the full system that '
                     'makes a site quotable — and I measure whether it actually gets cited.'),
            ('b', 'Machine-readable identity for aideazz.xyz: structured data (company, person, FAQ), '
                  '<b>llms.txt</b>, a published fact sheet with a preferred citation format, sitemap and '
                  'an explicit policy for AI crawlers.'),
            ('b', '<b>146 published pages</b> from a daily English/Spanish publishing pipeline with two '
                  'safety gates I built after real failures: it <b>refuses to publish any number that '
                  'cannot be traced to a verified source</b>, and it blocks near-duplicate articles.'),
            ('b', 'A <b>weekly automated check</b> of whether AI answer engines really cite the site — '
                  'visibility proven by measurement, not claimed.'),
            ('b', '<b>AI Ops Wiki</b> (aideazz.xyz/ai-ops-wiki.html): <b>21 real production incidents and '
                  '18 named failure patterns</b>, written up automatically from verified records and '
                  'cross-posted to the blog and Dev.to.'),
            ('sub', 'CMO AIPA — AI marketing and revenue operations'),
            ('lead', 'Marketing that runs itself: campaigns, content and reporting, with the numbers '
                     'traced back to where the money came from.'),
            ('b', '<b>Atlas Shifted AIPA</b>, an AI marketing strategist for competitive intelligence, '
                  'creative ideation and campaign optimization (live: webhook.aideazz.xyz/whitespace/atlas.html).'),
            ('b', 'Automated revenue operations in HubSpot: AI lead qualification, campaign attribution '
                  'and <b>GA4 reporting</b>.'),
            ('b', 'Multi-channel publishing across <b>LinkedIn, Instagram</b> and web, synchronizing '
                  'product launches with content distribution.'),
            ('sub', 'VIBEJOBHUNTER — AI that finds, scores and screens opportunities'),
            ('lead', 'The same pattern that filters CVs, sales leads or suppliers: an AI reviews each '
                     'item against written criteria, a human makes the final call.'),
            ('b', 'Reviewed <b>2,500+ opportunities</b> through an automatic find → score → screen '
                  'pipeline with human approval at every decision point; supported 600+ tailored '
                  'applications and 250+ personalized outreach messages, every send human-approved.'),
            ('b', 'Built the <b>AI screening layer</b> on five AI providers so one outage cannot stop it, '
                  'plus a weekly loop that re-learns from real decisions recorded in the CRM.'),
            ('b', 'Found it was silently rejecting good matches because the criteria had drifted across '
                  'seven places; fixed it with <b>one shared rulebook and 413 automatic tests</b>, and '
                  'proved with a re-run of 51 rejected items that 20 were wrongly rejected — before '
                  'anything went live.'),
            ('sub', 'CTO AIPA — sales and operations automation on HubSpot CRM'),
            ('lead', 'No enquiry lost, no manual data entry, and the owner still approves every message '
                     'that leaves the company.'),
            ('b', 'Central <b>HubSpot</b> CRM fed by several AI agents: 900+ deals and 500+ contacts with '
                  'automatic source, campaign and stage tracking.'),
            ('b', '<b>Lead Concierge</b>: an enquiry arrives, AI writes a personalized reply with the '
                  'right attachments, one tap sends it, and the CRM records everything.'),
            ('b', 'Daily automated briefings across 12 active projects; workflows built with Make.com, '
                  'Claude and Oracle Cloud.'),
            ('sub', 'ESPALUZ — customer-facing AI assistant with paying users'),
            ('lead', 'A 24/7 bilingual assistant on WhatsApp and Telegram that remembers each customer.'),
            ('b', 'Subscription product for families relocating to Latin America (English/Spanish), with '
                  'long-term memory built on <b>PostgreSQL + pgvector</b>. Early users in <b>19 countries</b>.'),
            ('sub', 'ATUONA — AI video studio (atuona.xyz/aifilmstudio)'),
            ('lead', 'Marketing video produced end to end by AI, at a fraction of agency cost.'),
            ('b', 'Script → images → video with automatic fallback between four AI video providers → '
                  'assembly → published gallery, with single scenes regenerated without rebuilding the film.'),
        ]),
        ('TECHNICAL STACK (for technical reviewers)', [
            ('kv', ('AI Engineering', 'Claude · OpenAI · Gemini · Groq · LangGraph · LangChain · RAG · '
                    'LLM-as-judge &amp; evaluation harnesses · tool calling · multi-provider failover')),
            ('kv', ('AI-Augmented Development', 'Cursor · Claude Code · Python · TypeScript · FastAPI · REST APIs')),
            ('kv', ('AI Visibility (GEO/AEO)', 'AI Visibility Audit API · JSON-LD structured data · llms.txt · '
                    'AI-crawler policy · answer-readiness · technical SEO · AI citation tracking')),
            ('kv', ('Automation &amp; Integrations', 'HubSpot · Make.com · n8n · GitHub API · Telegram · WhatsApp · '
                    'Playwright · Buffer · Resend')),
            ('kv', ('Cloud &amp; Operations', 'Oracle Cloud (OCI) · AWS Lambda · PostgreSQL + pgvector · Docker · systemd · PM2')),
        ]),
        ('PREVIOUS EXPERIENCE', [
            ('b', '<b>Operational Co-Founder</b> — OmniBazaar, decentralised e-commerce (2024–2025)'),
            ('b', '<b>Deputy CEO &amp; Chief Legal Officer</b> — e-government operator (Russia, 2011–2018). '
                  'Led large-scale digital transformation programs in a regulated environment.'),
            ('b', '<b>Deputy CEO (Business Development)</b> — Fundery LLC (2017–2018)'),
        ]),
        ('EDUCATION AND CERTIFICATIONS', [
            ('b', 'Anthropic Academy — Claude Certification Program | 2026 | In Progress'),
            ('b', 'Polkadot Blockchain Academy (PBA-X Wave #3) | 2025 | Online'),
            ('b', 'How-To-DAO Cohort Graduate | 2025 | Online'),
            ('b', 'MA Social Psychology | Penza State University | 2018 | Russia'),
            ('b', 'Blockchain Regulation | MGIMO | 2017 | Moscow'),
            ('b', 'Presidential Program for Executive Management | RANEPA | 2015 | Moscow'),
            ('b', 'Internship | Nyskapingsparken Innovation Park | Bergen, Norway'),
        ]),
        ('LANGUAGES', [
            ('p', 'Russian (Native) | English (Advanced) | Spanish (Intermediate) | French (Elementary)'),
        ]),
        ('TARGET ROLES', [
            ('p', '<b>AI Product Manager · AI Solutions Architect · AI Systems Consultant · '
                  'Chief AI Officer (fractional) · AI Automation &amp; Operations Lead · '
                  'GEO/AEO &amp; Technical SEO Lead · Applied AI Engineer</b>'),
            ('p', 'I work equally well with business teams and technical teams: I agree the outcome with '
                  'the owner, design the system, deliver it into production, and explain it in plain '
                  'language to the people who pay for it.'),
            ('p', 'Open to: <b>Full-time · Fractional · Project work · On-site in Panama City · '
                  'Remote worldwide</b>'),
        ]),
    ],
}

ES = {
    'name': 'ELENA REVICHEVA',
    'title': ('Líder de Producto y Soluciones de IA | Constructora Aumentada por IA<br/>'
              'Sistemas Agénticos · Automatización · Visibilidad en IA (GEO/AEO)'),
    'contact': CONTACT.replace('Portfolio', 'Portafolio'),
    'location': ('Juan Díaz, Ciudad de Panamá, Panamá  |  <b>Disponible presencialmente en Ciudad de '
                 'Panamá</b>  |  Remoto mundial  |  UTC-5'),
    'sections': [
        ('QUÉ HAGO POR UN NEGOCIO', [
            ('b', '<b>Que la IA lo encuentre.</b> Hoy los clientes preguntan a ChatGPT, Claude, Gemini y '
                  'Perplexity en vez de buscar. Verifico si esos asistentes pueden leer y recomendar su '
                  'sitio web, y corrijo lo que se lo impide. <b>Puntaje gratis al instante: aideazz.xyz/api</b>'),
            ('b', '<b>Atender clientes 24/7, en español e inglés.</b> Asistentes de IA en WhatsApp y '
                  'Telegram que recuerdan a cada cliente y pasan la conversación a una persona cuando hace falta.'),
            ('b', '<b>Dejar de perder consultas.</b> Cada consulta se convierte en una respuesta lista '
                  'para enviar y en un registro en su CRM: usted aprueba con un toque y no se olvida nada.'),
            ('b', '<b>Quitar el trabajo repetitivo a su equipo.</b> Reportes, seguimientos, publicaciones '
                  'y carga de datos funcionan solos, con una persona aprobando lo importante.'),
            ('b', '<b>Lo construyo y lo opero.</b> Del problema de negocio a un sistema que funciona y se '
                  'mantiene en pie: sin proyectos eternos ni equipos grandes, con resultados en días.'),
        ]),
        ('RESUMEN PROFESIONAL', [
            ('p', 'Líder de producto y soluciones de IA. Diseño, construyo y opero sistemas de IA que se '
                  'usan todos los días, y asumo el resultado desde el problema de negocio hasta la '
                  'operación en vivo.'),
            ('p', 'En dieciocho meses construí y hoy opero <b>más de 12 sistemas de IA en producción</b>, '
                  'por mi cuenta: asistentes de cara al cliente, automatización de marketing y ventas, y '
                  'una <b>API pública de Auditoría de Visibilidad en IA</b> que puntúa cualquier sitio web.'),
            ('p', 'Antes de la IA, <b>más de 7 años como ejecutiva</b>: Directora General Adjunta y '
                  'Directora Jurídica de un operador nacional de gobierno electrónico, liderando grandes '
                  'programas de transformación digital en un entorno altamente regulado. Puedo sentarme '
                  'con el dueño, acordar lo que importa y luego construirlo yo misma.'),
            ('p', 'Mi mayor fortaleza es convertir un problema confuso en un sistema que funciona, y '
                  'encontrar la falla que nadie notó.'),
        ]),
        ('TRABAJO DESTACADO', [
            ('job', ('Líder de Producto y Soluciones de IA | AIdeazz.xyz (laboratorio de IA liderado por su fundadora)',
                     'Panamá / Remoto  |  2025–Presente')),
            ('p', 'Diseñé, construí y opero un ecosistema AI-first de <b>más de 12 sistemas de IA en '
                  'producción</b>, agentes autónomos y pipelines de automatización, alojados en el '
                  'Oracle Cloud Startup Program. Método de trabajo: '
                  '<link href="https://aideazz.xyz/sop-ai-ops.html">'
                  '<font color="#1a6b8a">aideazz.xyz/sop-ai-ops.html</font></link>'),
            ('sub', 'API DE AUDITORÍA DE VISIBILIDAD EN IA — producto propio, gratis de probar: aideazz.xyz/api'),
            ('lead', 'Le dice a cualquier negocio, en segundos, si ChatGPT, Claude, Perplexity y Google IA '
                     'pueden leer y recomendar su sitio web, y qué corregir primero.'),
            ('b', 'Puntúa cualquier sitio de 0 a 100, con calificación y lista priorizada de correcciones: '
                  '<b>34 verificaciones automáticas</b> en cuatro áreas — acceso para asistentes de IA '
                  '(25%), datos legibles por máquinas (25%), preparación para responder preguntas (30%) '
                  'y salud técnica (20%).'),
            ('b', 'Informa por separado si <b>ChatGPT, Claude, Perplexity, Gemini</b> y dos rastreadores '
                  'más tienen permitido leer el sitio: el bloqueo que casi ningún dueño ve.'),
            ('b', 'Sobre infraestructura propia, con llaves de API y una llave de demostración pública; es '
                  'la oferta de entrada para consultoría en visibilidad con IA.'),
            ('sub', 'MOTOR DE VISIBILIDAD EN BÚSQUEDA CON IA (GEO / AEO / SEO TÉCNICO)'),
            ('lead', 'Que un asistente de IA lo recomiende es la nueva referencia de boca en boca. Opero '
                     'todo el sistema que hace un sitio citable, y mido si realmente lo citan.'),
            ('b', 'Identidad legible por máquinas: datos estructurados (empresa, persona, preguntas '
                  'frecuentes), <b>llms.txt</b>, ficha de datos con formato de cita preferido, sitemap y '
                  'política explícita para rastreadores de IA.'),
            ('b', '<b>146 páginas publicadas</b> desde un pipeline diario en inglés y español con dos '
                  'controles que construí tras fallas reales: <b>se niega a publicar cualquier cifra sin '
                  'fuente verificada</b> y bloquea artículos casi duplicados.'),
            ('b', 'Una <b>verificación semanal automática</b> de si los motores de respuesta de IA '
                  'realmente citan el sitio: visibilidad demostrada con medición, no afirmada.'),
            ('b', '<b>AI Ops Wiki</b> (aideazz.xyz/ai-ops-wiki.html): <b>21 incidentes reales de '
                  'producción y 18 patrones de falla con nombre</b>, redactados automáticamente desde '
                  'registros verificados y publicados también en el blog y Dev.to.'),
            ('sub', 'CMO AIPA — marketing y operaciones de ingresos con IA'),
            ('lead', 'Marketing que se opera solo: campañas, contenido y reportes, con los números '
                     'trazados hasta el origen del dinero.'),
            ('b', '<b>Atlas Shifted AIPA</b>, un estratega de marketing con IA para inteligencia '
                  'competitiva, ideación creativa y optimización de campañas (en vivo: '
                  'webhook.aideazz.xyz/whitespace/atlas.html).'),
            ('b', 'RevOps automatizado en HubSpot: calificación de prospectos con IA, atribución de '
                  'campañas y <b>reportes en GA4</b>.'),
            ('b', 'Publicación multicanal en <b>LinkedIn, Instagram</b> y web, sincronizando '
                  'lanzamientos de producto con la distribución de contenido.'),
            ('sub', 'VIBEJOBHUNTER — IA que encuentra, puntúa y filtra oportunidades'),
            ('lead', 'El mismo patrón que filtra hojas de vida, prospectos de venta o proveedores: la IA '
                     'revisa cada caso contra criterios escritos y una persona decide al final.'),
            ('b', 'Revisó <b>más de 2,500 oportunidades</b> con un pipeline automático de búsqueda → '
                  'puntuación → filtrado, con aprobación humana en cada decisión; apoyó más de 600 '
                  'postulaciones personalizadas y más de 250 mensajes de contacto, todos aprobados por '
                  'una persona.'),
            ('b', 'Construí la <b>capa de filtrado con IA</b> sobre cinco proveedores, para que una caída '
                  'no la detenga, más un ciclo semanal que reaprende de las decisiones reales del CRM.'),
            ('b', 'Detecté que rechazaba en silencio buenas coincidencias: los criterios se habían desviado '
                  'en siete lugares. Lo corregí con <b>un único reglamento compartido y 413 pruebas '
                  'automáticas</b>, y una repetición de 51 casos rechazados demostró que 20 estaban mal '
                  'rechazados, antes de producción.'),
            ('sub', 'CTO AIPA — automatización de ventas y operaciones sobre HubSpot CRM'),
            ('lead', 'Ninguna consulta perdida, sin carga manual de datos, y el dueño sigue aprobando cada '
                     'mensaje que sale de la empresa.'),
            ('b', 'CRM central en <b>HubSpot</b> alimentado por varios agentes de IA: más de 900 negocios '
                  'y 500 contactos con seguimiento automático de fuente, campaña y etapa.'),
            ('b', '<b>Lead Concierge</b>: llega una consulta, la IA redacta una respuesta personalizada '
                  'con los adjuntos correctos, un toque la envía y el CRM lo registra todo.'),
            ('b', 'Briefings automáticos diarios sobre 12 proyectos activos; flujos construidos con '
                  'Make.com, Claude y Oracle Cloud.'),
            ('sub', 'ESPALUZ — asistente de IA de cara al cliente, con usuarios de pago'),
            ('lead', 'Un asistente bilingüe 24/7 en WhatsApp y Telegram que recuerda a cada cliente.'),
            ('b', 'Producto por suscripción para familias que se mudan a América Latina (español/inglés), '
                  'con memoria de largo plazo sobre <b>PostgreSQL + pgvector</b>. Primeros usuarios en '
                  '<b>19 países</b>.'),
            ('sub', 'ATUONA — estudio de video con IA (atuona.xyz/aifilmstudio)'),
            ('lead', 'Video de marketing producido de punta a punta por IA, a una fracción del costo de agencia.'),
            ('b', 'Guion → imágenes → video con respaldo entre cuatro proveedores de IA → ensamblaje → '
                  'galería publicada, regenerando escenas sueltas sin rehacer la pieza.'),
        ]),
        ('STACK TÉCNICO (para revisores técnicos)', [
            ('kv', ('Ingeniería de IA', 'Claude · OpenAI · Gemini · Groq · LangGraph · LangChain · RAG · '
                    'LLM como juez y marcos de evaluación · tool calling · failover multiproveedor')),
            ('kv', ('Desarrollo Aumentado por IA', 'Cursor · Claude Code · Python · TypeScript · FastAPI · APIs REST')),
            ('kv', ('Visibilidad en IA (GEO/AEO)', 'API de Auditoría de Visibilidad · datos estructurados JSON-LD · '
                    'llms.txt · política de rastreadores de IA · answer-readiness · SEO técnico · '
                    'seguimiento de citas en IA')),
            ('kv', ('Automatización e Integraciones', 'HubSpot · Make.com · n8n · GitHub API · Telegram · WhatsApp · '
                    'Playwright · Buffer · Resend')),
            ('kv', ('Nube y Operaciones', 'Oracle Cloud (OCI) · AWS Lambda · PostgreSQL + pgvector · Docker · systemd · PM2')),
        ]),
        ('EXPERIENCIA PREVIA', [
            ('b', '<b>Cofundadora Operativa</b> — OmniBazaar, comercio electrónico descentralizado (2024–2025)'),
            ('b', '<b>Directora General Adjunta y Directora Jurídica</b> — operador de gobierno electrónico '
                  '(Rusia, 2011–2018). Lideré programas de transformación digital a gran escala en un '
                  'entorno regulado.'),
            ('b', '<b>Directora General Adjunta (Desarrollo de Negocio)</b> — Fundery LLC (2017–2018)'),
        ]),
        ('EDUCACIÓN Y CERTIFICACIONES', [
            ('b', 'Anthropic Academy — Programa de Certificación de Claude | 2026 | En curso'),
            ('b', 'Polkadot Blockchain Academy (PBA-X Wave #3) | 2025 | En línea'),
            ('b', 'How-To-DAO Cohort Graduate | 2025 | En línea'),
            ('b', 'Maestría en Psicología Social | Universidad Estatal de Penza | 2018 | Rusia'),
            ('b', 'Regulación de Blockchain | MGIMO | 2017 | Moscú'),
            ('b', 'Programa Presidencial de Gestión Ejecutiva | RANEPA | 2015 | Moscú'),
            ('b', 'Pasantía | Nyskapingsparken Innovation Park | Bergen, Noruega'),
        ]),
        ('IDIOMAS', [
            ('p', 'Ruso (Nativo) | Inglés (Avanzado) | Español (Intermedio) | Francés (Básico)'),
        ]),
        ('ROLES OBJETIVO', [
            ('p', '<b>Product Manager de IA · Arquitecta de Soluciones de IA · Consultora de Sistemas de '
                  'IA · Chief AI Officer (fraccional) · Líder de Automatización y Operaciones de IA · '
                  'Líder de GEO/AEO y SEO Técnico · Ingeniera de IA Aplicada</b>'),
            ('p', 'Trabajo igual de bien con equipos de negocio y con equipos técnicos: acuerdo el '
                  'resultado con el dueño, diseño el sistema, lo pongo en producción y lo explico en '
                  'lenguaje claro a quienes lo pagan.'),
            ('p', 'Disponible para: <b>Tiempo completo · Fraccional · Por proyecto · Presencial en Ciudad '
                  'de Panamá · Remoto mundial</b>'),
        ]),
    ],
}


# ──────────────────────────────────────────────────────────────────────────────
# LAYOUT
# ──────────────────────────────────────────────────────────────────────────────

def build_styles(scale=1.0):
    # Spanish runs ~15% longer than English for the same facts. Rather than cut
    # content to fit, the ES render shrinks the body text slightly — both stay
    # two pages, which is what a person handed a resume in a lobby will read.
    def fs(size):
        return round(size * scale, 2)
    return {
        'name': ParagraphStyle('name', fontName='Helvetica-Bold', fontSize=20,
                               textColor=DARK_BLUE, spaceAfter=3, leading=23),
        'title': ParagraphStyle('title', fontName='Helvetica-Bold', fontSize=10,
                                textColor=TEAL, spaceAfter=4, leading=13),
        'contact': ParagraphStyle('contact', fontName='Helvetica', fontSize=8.5,
                                  textColor=BLACK, spaceAfter=1, leading=11),
        'section': ParagraphStyle('section', fontName='Helvetica-Bold', fontSize=11,
                                  textColor=DARK_BLUE, spaceBefore=6.5, spaceAfter=1.5, leading=13),
        'sub': ParagraphStyle('sub', fontName='Helvetica-Bold', fontSize=9.5,
                              textColor=TEAL, spaceBefore=4.5, spaceAfter=1.5, leading=11.5),
        # The plain-language line under each project: what it does for a business, for a
        # reader who is not an engineer. Kept visually distinct so a non-technical reader
        # (owner, HR) can read only these lines and still understand the whole resume.
        'lead': ParagraphStyle('lead', fontName='Helvetica-Oblique', fontSize=fs(8.3),
                               textColor=BLACK, spaceAfter=2.2, leading=fs(10.7), leftIndent=6),
        'job': ParagraphStyle('job', fontName='Helvetica-Bold', fontSize=10,
                              textColor=TEAL, spaceBefore=4, spaceAfter=1, leading=13),
        'org': ParagraphStyle('org', fontName='Helvetica-Oblique', fontSize=8.5,
                              textColor=BLACK, spaceAfter=3, leading=11),
        'body': ParagraphStyle('body', fontName='Helvetica', fontSize=fs(8.3),
                               textColor=BLACK, spaceAfter=2.2, leading=fs(10.7), alignment=TA_LEFT),
        'bullet': ParagraphStyle('bullet', fontName='Helvetica', fontSize=fs(8.3),
                                 textColor=BLACK, spaceAfter=1.8, leading=fs(10.7),
                                 leftIndent=11, firstLineIndent=-11),
    }


def build_pdf(content, output_path, scale=1.0):
    s = build_styles(scale)
    doc = SimpleDocTemplate(
        str(output_path), pagesize=letter,
        leftMargin=0.55 * inch, rightMargin=0.55 * inch,
        topMargin=0.45 * inch, bottomMargin=0.4 * inch,
        title='Elena Revicheva — Resume', author='Elena Revicheva',
        subject='AI Product & Solutions Lead',
    )

    flow = [
        Paragraph(content['name'], s['name']),
        Paragraph(content['title'], s['title']),
        Paragraph(content['contact'], s['contact']),
        Paragraph(content['location'], s['contact']),
        Spacer(1, 3),
        HRFlowable(width='100%', thickness=1, color=DARK_BLUE, spaceAfter=2),
    ]

    for heading, items in content['sections']:
        flow.append(Paragraph(heading, s['section']))
        flow.append(HRFlowable(width='100%', thickness=0.5, color=TEAL, spaceAfter=3))
        for kind, value in items:
            if kind == 'p':
                flow.append(Paragraph(value, s['body']))
            elif kind == 'b':
                flow.append(Paragraph(f'•&nbsp;&nbsp;{value}', s['bullet']))
            elif kind == 'kv':
                label, text = value
                flow.append(Paragraph(f'<b>{label}:</b> {text}', s['body']))
            elif kind == 'sub':
                flow.append(Paragraph(value, s['sub']))
            elif kind == 'lead':
                flow.append(Paragraph(value, s['lead']))
            elif kind == 'job':
                role, org = value
                flow.append(Paragraph(role, s['job']))
                flow.append(Paragraph(org, s['org']))
            elif kind == 'break':
                flow.append(PageBreak())
            else:
                raise ValueError(f'unknown content kind: {kind}')

    doc.build(flow)
    print(f'PDF generated: {output_path}')


if __name__ == '__main__':
    build_pdf(EN, OUT_DIR / 'Elena_Revicheva_Resume.pdf')
    build_pdf(ES, OUT_DIR / 'Elena_Revicheva_Resume_ES.pdf', scale=0.93)

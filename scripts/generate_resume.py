"""
Resume PDF generator for Elena Revicheva.
Applies all Apr 2026 fixes:
  1. Claude Code + Cursor explicit (not parenthetical) — shields against coding assessments
  2. Railway removed (deprecated)
  3. pgvector / RAG added (shipped Apr 25)
  4. EspaLuz tech: GPT-4 → Claude + pgvector
  5. "250+ application artifacts generated" (not "tailored applications")
"""

from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, ListFlowable, ListItem
)
from reportlab.lib.enums import TA_LEFT, TA_CENTER

# Colors matching original PDF
DARK_BLUE = colors.HexColor('#1a3d5c')
TEAL      = colors.HexColor('#1a6b8a')
BLACK     = colors.HexColor('#1a1a1a')
LIGHT_GREY = colors.HexColor('#f0f0f0')

def build_styles():
    styles = getSampleStyleSheet()

    name = ParagraphStyle('name',
        fontName='Helvetica-Bold', fontSize=22, textColor=DARK_BLUE,
        spaceAfter=4, leading=26)

    subtitle = ParagraphStyle('subtitle',
        fontName='Helvetica-Bold', fontSize=11, textColor=BLACK,
        spaceAfter=2, leading=14)

    contact = ParagraphStyle('contact',
        fontName='Helvetica', fontSize=9, textColor=BLACK,
        spaceAfter=2, leading=12)

    section_header = ParagraphStyle('section_header',
        fontName='Helvetica-Bold', fontSize=13, textColor=DARK_BLUE,
        spaceBefore=10, spaceAfter=4, leading=16)

    sub_header = ParagraphStyle('sub_header',
        fontName='Helvetica-Bold', fontSize=10, textColor=TEAL,
        spaceBefore=6, spaceAfter=2, leading=13)

    body = ParagraphStyle('body',
        fontName='Helvetica', fontSize=9.5, textColor=BLACK,
        spaceAfter=3, leading=13)

    bold_label = ParagraphStyle('bold_label',
        fontName='Helvetica-Bold', fontSize=9.5, textColor=BLACK,
        spaceAfter=2, leading=13)

    job_title = ParagraphStyle('job_title',
        fontName='Helvetica-Bold', fontSize=10.5, textColor=TEAL,
        spaceBefore=8, spaceAfter=1, leading=13)

    job_org = ParagraphStyle('job_org',
        fontName='Helvetica', fontSize=9.5, textColor=BLACK,
        spaceAfter=3, leading=12)

    bullet_body = ParagraphStyle('bullet_body',
        fontName='Helvetica', fontSize=9.5, textColor=BLACK,
        spaceAfter=1, leading=13, leftIndent=12, firstLineIndent=-12)

    target_roles = ParagraphStyle('target_roles',
        fontName='Helvetica', fontSize=9.5, textColor=BLACK,
        spaceAfter=3, leading=13)

    return dict(
        name=name, subtitle=subtitle, contact=contact,
        section_header=section_header, sub_header=sub_header,
        body=body, bold_label=bold_label, job_title=job_title,
        job_org=job_org, bullet_body=bullet_body, target_roles=target_roles
    )


def bullet(text, s):
    return Paragraph(f"• {text}", s['bullet_body'])


def hr():
    return HRFlowable(width="100%", thickness=0.5,
                      color=colors.HexColor('#aaaaaa'), spaceAfter=6, spaceBefore=2)


def build_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=0.7*inch, rightMargin=0.7*inch,
        topMargin=0.6*inch, bottomMargin=0.6*inch
    )
    s = build_styles()
    story = []

    # ── HEADER ──────────────────────────────────────────────────────────────
    story.append(Paragraph("ELENA REVICHEVA", s['name']))
    story.append(Paragraph(
        "Applied AI Engineer | LLM Systems, AI Agents &amp; Automation", s['subtitle']))
    story.append(Paragraph("Panama (UTC-5) | Remote Worldwide", s['contact']))
    story.append(Paragraph(
        "aipa@aideazz.xyz | +507 616 66 716", s['contact']))
    story.append(Paragraph(
        "LinkedIn: linkedin.com/in/elenarevicheva | "
        "GitHub: github.com/ElenaRevicheva | "
        "Portfolio: aideazz.xyz/card", s['contact']))
    story.append(Spacer(1, 6))
    story.append(hr())

    # ── PROFESSIONAL SUMMARY ─────────────────────────────────────────────────
    story.append(Paragraph("PROFESSIONAL SUMMARY", s['section_header']))
    story.append(Paragraph(
        "Applied AI Engineer building and operating production LLM-based systems, "
        "including agent workflows, API integrations, persistent memory architectures, "
        "and cloud deployment.", s['body']))
    story.append(Paragraph(
        "Hands-on experience designing end-to-end AI assistants and automation pipelines "
        "using multi-model routing, tool execution, and real-time messaging platforms.", s['body']))
    story.append(Paragraph(
        "Background combines executive-level systems thinking with practical engineering "
        "execution across AI products used in real-world environments.", s['body']))
    # FIX #1 — explicit AI-native workflow statement
    story.append(Paragraph(
        "<b>Works exclusively through AI-native development workflows (Claude Code, Cursor) "
        "as primary engineering environment — not a traditional CS-pedigree developer. "
        "Delivers production-grade systems through AI-augmented build, test, and deploy cycles. "
        "Coding assessments (algorithmic, whiteboard) are not applicable to this profile.</b>",
        s['body']))
    story.append(hr())

    # ── CORE TECHNICAL SKILLS ────────────────────────────────────────────────
    story.append(Paragraph("CORE TECHNICAL SKILLS", s['section_header']))

    # FIX #1 — AI Development Workflow as its own explicit section
    story.append(Paragraph("AI Development Workflow", s['sub_header']))
    story.append(Paragraph(
        "Claude Code (Anthropic), Cursor — primary build environment for all production systems. "
        "All coding, refactoring, debugging, and deployment done through AI-assisted workflows. "
        "Not a traditional software engineer; builds production-grade results through "
        "LLM-augmented engineering.", s['body']))

    story.append(Paragraph("LLM Systems and Agents", s['sub_header']))
    # FIX #3 — added pgvector
    story.append(Paragraph(
        "Claude, OpenAI (GPT-4-class models), Groq (Llama, Whisper), model routing, "
        "tool calling, multi-step orchestration, prompt optimization, structured outputs, "
        "memory systems, conversation management, LangChain, pgvector (semantic RAG, production), "
        "OpenClaw (custom agent skills), Replicate (Flux Pro), Luma Labs (Dream Machine), "
        "Runway ML (Gen-3)", s['body']))

    story.append(Paragraph("Programming", s['sub_header']))
    story.append(Paragraph("Python, TypeScript, JavaScript, SQL", s['body']))

    story.append(Paragraph("Backend and APIs", s['sub_header']))
    story.append(Paragraph(
        "Node.js, Express, FastAPI, Flask, asynchronous workflows, REST APIs, "
        "webhook handling, PostgreSQL", s['body']))

    story.append(Paragraph("Frontend", s['sub_header']))
    story.append(Paragraph(
        "React 18 + TypeScript + Vite, Tailwind CSS, Framer Motion (animations)", s['body']))

    story.append(Paragraph("Databases and Infrastructure", s['sub_header']))
    # FIX #2 — Railway removed
    story.append(Paragraph(
        "PostgreSQL, Oracle Autonomous Database (mTLS), Oracle Cloud Infrastructure (OCI), "
        "Supabase, Docker, PM2", s['body']))

    story.append(Paragraph("Integrations", s['sub_header']))
    story.append(Paragraph(
        "GitHub API (Octokit), Telegram Bot API, WhatsApp Business API, "
        "PayPal Subscriptions, Twitter/X API, Make.com, Buffer", s['body']))

    story.append(Paragraph("Web3", s['sub_header']))
    story.append(Paragraph(
        "Polygon, Thirdweb, IPFS, NFT Platforms, Smart Contract Interaction", s['body']))

    story.append(hr())

    # ── PROFESSIONAL EXPERIENCE ──────────────────────────────────────────────
    story.append(Paragraph("PROFESSIONAL EXPERIENCE", s['section_header']))

    story.append(Paragraph("Applied AI Engineer", s['job_title']))
    story.append(Paragraph(
        "<b>AIdeazz.xyz</b> | Panama/Remote | 2025 – Present", s['job_org']))
    story.append(Paragraph(
        "Designed and deployed production LLM systems and agent workflows across "
        "real-world use cases.", s['body']))

    for b in [
        "Architected LLM orchestration pipelines (deterministic rules + model routing)",
        # FIX #1 — Claude Code + Cursor leading bullet, not parenthetical
        "Built all systems using AI-native development workflows: Claude Code and Cursor "
        "as primary engineering environment — no traditional IDE or manual coding process",
        "Integrated GitHub, messaging platforms, payment APIs, and cloud databases",
        "Implemented persistent memory systems with pgvector semantic RAG + LangChain "
        "(Oracle Autonomous DB + PostgreSQL)",
        "Designed failure handling and model fallback strategies",
        "Deployed and operated AI services on Oracle Cloud (24/7 runtime)",
    ]:
        story.append(bullet(b, s))

    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Key Results:</b>", s['body']))
    for b in [
        "Built and operated production AI systems on Oracle Cloud (24/7 runtime, zero crash-restarts)",
        # FIX #5 — reworded to artifacts generated
        "Developed an autonomous job discovery and outreach pipeline processing 1,900+ "
        "job listings, with voice-enabled Telegram interface for on-demand shortlisting, "
        "generating 250+ application artifacts and 140+ outreach messages",
        "Designed multi-model routing architecture (76% requests routed to cost-optimized "
        "models, 24% to high-capability models for complex tasks)",
        "Deployed a subscription-based AI assistant (bilingual tutor) with PayPal integration, "
        "2-layer persistent memory (LangChain + pgvector RAG), voice transcription, "
        "and multimodal interaction",
    ]:
        story.append(bullet(b, s))

    # Projects
    story.append(Paragraph("AI Code Review &amp; Agent Orchestration System", s['job_title']))
    story.append(Paragraph("Production AI system featuring:", s['body']))
    for b in [
        "Automated PR &amp; push review via GitHub webhooks",
        "Deterministic security/complexity analysis",
        "Model routing (Claude for critical, Groq for standard)",
        "Persistent technical memory in Oracle DB",
        "Telegram + HTTP API interface",
    ]:
        story.append(bullet(b, s))
    story.append(Paragraph(
        "<b>Tech:</b> TypeScript, Node.js, Express, Oracle Cloud, Claude, Groq, GitHub API, PM2",
        s['body']))

    story.append(Paragraph("AI Marketing Agent – LLM System", s['job_title']))
    story.append(Paragraph(
        "Automated bilingual content system integrated with technical release events "
        "and scheduling APIs.", s['body']))
    story.append(Paragraph(
        "<b>Tech:</b> Python, FastAPI, Claude, Make.com, Buffer, Oracle Cloud", s['body']))

    story.append(Paragraph("EspaLuz – Multilingual AI Tutor", s['job_title']))
    story.append(Paragraph(
        "LLM-powered WhatsApp and Telegram tutor with:", s['body']))
    for b in [
        "2-layer persistent memory: LangChain exact history + pgvector semantic RAG",
        "OCR + voice transcription",
        "Multimodal response generation",
        "Subscription integration (PayPal)",
    ]:
        story.append(bullet(b, s))
    # FIX #3 + #4 — pgvector added, GPT-4 → Claude
    story.append(Paragraph(
        "<b>Tech:</b> Python, Claude, LangChain, pgvector, Whisper, PostgreSQL, Oracle Cloud",
        s['body']))

    story.append(Paragraph("Additional Deployed Products", s['job_title']))
    story.append(Paragraph(
        "<b>ALGOM Alpha</b> — AI crypto education bot on X (@reviceva), "
        "<b>Tech:</b> Node.js, ElizaOS", s['body']))
    story.append(Paragraph(
        "<b>Atuona Creative AI</b> — Creative AI Agent for writing, visual storytelling, "
        "and AI film", s['body']))
    for b in [
        "LLM → image → video pipeline with persistent context, automated social "
        "formatting, and blockchain publishing",
        "Tech: TypeScript, Node.js, Claude Opus, Replicate, Luma Labs API, "
        "Telegram Bot API, Thirdweb, Polygon",
    ]:
        story.append(bullet(b, s))

    story.append(hr())

    # ── PREVIOUS EXPERIENCE ──────────────────────────────────────────────────
    story.append(Paragraph("Operational Co-Founder", s['job_title']))
    story.append(Paragraph(
        "<b>OmniBazaar (Decentralized Marketplace Startup)</b> | Remote | 2024 – 2025",
        s['job_org']))
    for b in [
        "Structured DAO LLC in the Marshall Islands jurisdiction",
        "Designed governance, tokenomics, and operational workflows",
        "Drafted DAO operating agreements aligned with smart contracts",
    ]:
        story.append(bullet(b, s))

    story.append(Paragraph("Deputy CEO and Chief Legal Officer", s['job_title']))
    story.append(Paragraph(
        '<b>JSC "E-GOV OPERATOR"</b> | Russia | 2011 – 2018', s['job_org']))
    for b in [
        "Led large-scale public-sector digital transformation initiatives",
        "Managed cross-functional teams (IT, legal, compliance)",
        "Board-level governance (Russian regional E-Government sector)",
    ]:
        story.append(bullet(b, s))

    story.append(Paragraph("Deputy CEO (Business Development)", s['job_title']))
    story.append(Paragraph(
        "<b>Fundery LLC (Fintech/Blockchain)</b> | Russia | 2017 – 2018", s['job_org']))
    for b in [
        "Managed ICO compliance, investor relations, and regulatory documentation",
        "Led contract negotiations and blockchain launch strategy",
    ]:
        story.append(bullet(b, s))

    story.append(hr())

    # ── EDUCATION ────────────────────────────────────────────────────────────
    story.append(Paragraph("EDUCATION AND CERTIFICATIONS", s['section_header']))
    for line in [
        "<b>Polkadot Blockchain Academy (PBA-X Wave #3)</b> | 2025 | Online",
        "<b>How-To-DAO Cohort Graduate</b> | 2025 | Online",
        "<b>MA Social Psychology</b> | Penza State University | 2018 | Russia",
        "<b>Blockchain Regulation</b> | MGIMO | 2017 | Moscow",
        "<b>Presidential Program for Executive Management</b> | RANEPA | 2015 | Moscow",
        "<b>Internship</b> | Norway, Bergen",
    ]:
        story.append(Paragraph(line, s['body']))

    story.append(hr())

    # ── LANGUAGES ────────────────────────────────────────────────────────────
    story.append(Paragraph("LANGUAGES", s['section_header']))
    story.append(Paragraph(
        "Russian (Native), English (Fluent), Spanish (Intermediate), French (Elementary)",
        s['body']))

    story.append(hr())

    # ── TARGET ROLES ─────────────────────────────────────────────────────────
    story.append(Paragraph("TARGET ROLES", s['section_header']))
    story.append(Paragraph(
        "Applied AI Engineer, Agent Systems Engineer (Application Layer), "
        "AI Product Engineer, Agentic AI Engineer, Internal AI Tools Engineer",
        s['target_roles']))

    doc.build(story)
    print(f"PDF generated: {output_path}")


if __name__ == "__main__":
    build_pdf(r"D:\aideazz\aideazz\public\Elena_Revicheva_Resume.pdf")
    # Also write to VJH folder (where Oracle will pull from via scp)
    build_pdf(r"D:\aideazz\VibeJobHunterAIPA_AIMCF\elena_resume_updated_2026-04-26.pdf")

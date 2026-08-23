---
title: Fabrication under degradation
slug: fabrication-under-degradation
one_liner: When the good model runs out, the fallback does not go quiet — it goes confident.
aka: confabulation on fallback; the weaker writer invents; degraded-mode hallucination
---
Every serious AI pipeline has a fallback chain, and the chain is right: when one provider fails, another answers, and the work continues. That is redundancy doing its job.

But redundancy protects **availability**, not **truth**. A retry that returns text has succeeded by every measure the system knows how to take. It ran, it returned, it was well-formed, it was the right length. Nothing in that check asks whether the text is *true*.

This is what makes the failure mode dangerous. A degraded model asked to write about a system it cannot inspect does not stop and say "I do not have this detail". It fills the gap with the most statistically ordinary answer — the thing that architecture usually uses. Asked about checkpointing, it reaches for Redis, because most checkpointing articles involve Redis. The output is fluent, technically plausible, internally consistent, and describes infrastructure that does not exist.

Compare it to a silent failure, which produces nothing and tells nobody. This produces *something*, and that something is worse, because it passes every automated check and every casual human read. Volume makes it worse still: a pipeline on a schedule does not fabricate once, it fabricates on a cadence, and each copy looks as reasonable as the last.

The defences are structural, not editorial:

- **Never let a model re-tell a fact it cannot verify.** Assemble published claims deterministically from fields that were measured. A template that interpolates a verified number cannot invent a different one.
- **Name the writer in the artefact.** If the output records which provider produced it, "everything since June was written by the fallback" is a query rather than an archaeology project.
- **Treat a provider downgrade as an editorial event, not just an ops event.** Credit exhaustion silently changes who is speaking in your name. That deserves an alert, not a log line.
- **Cap the blast radius.** Anything published automatically, under a real person's name, on a public surface, should require a verified source — or require a human before it goes out.

The reputational asymmetry is the part worth internalising. A crash costs you an afternoon. Published fabrication costs you the credibility of everything true you ever wrote next to it — and it is discovered by the reader, not by you.

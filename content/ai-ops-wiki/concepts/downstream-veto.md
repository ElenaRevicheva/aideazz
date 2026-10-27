---
title: Downstream veto
slug: downstream-veto
one_liner: A cheap rule that runs after a careful judgement silently overrules it, so the system's best decision is thrown away by its crudest one.
aka: post-filter override; the keyword guard beats the classifier; last check wins
---
Pipelines often stack decisions: a careful judgement first — a model that reads the whole message, a reviewer who weighs the case — then a few cheap guards after it, added later to catch known noise. Each guard is reasonable on its own. The trouble is order: whatever runs last has the final word, and a guard written as "if the text contains X, drop it" does not know, or care, how sure the judgement before it was.

That is a **downstream veto**: the crude rule overrules the considered one. It is invisible in testing, because every component passes its own test — the model classifies correctly, the guard matches the phrase it was written for — and it is invisible in production, because a dropped item produces no error, only a calm log line saying it was skipped.

The remedy is not to delete the guards; they exist because the noise was real. It is to let strong evidence outrank weak rules: a guard should step aside when the judgement before it is confident, or when the item carries a signal the guard was never meant to catch, and a guard that drops something the judgement rated highly should say so to a person instead of only to the log.

Ordinary-life version: a doctor reads a scan and writes "urgent — call the patient today", and the front desk files it with the routine letters because the envelope says "results enclosed", like every routine letter does.

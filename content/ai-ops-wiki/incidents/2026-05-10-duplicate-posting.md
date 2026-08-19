---
title: The milestone that posted twice
slug: 2026-05-10-duplicate-posting
date: 2026-05-10
subtitle: The same update emitted twice, six minutes apart
concepts: idempotency, single-source-of-truth
symptom: Pending milestones resurfaced on every automation cycle and were published more than once.
root_cause: A triple mismatch between the flag that marked work as done, the field the filter read, and the key the completion endpoint matched on, so completed work never looked completed to the next cycle.
fix: The read excludes either flag, the completion endpoint falls back through several keys, and the client sends enough context for fallback matching.
verified: A clean API snapshot showing zero pending items, plus two full automation cycles with no duplication.
rule: If an operation can run twice, it must be safe to run twice. Deduplicate on a key that genuinely identifies the work.
---

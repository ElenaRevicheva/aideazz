---
title: The engagement loop that never ran
slug: 2026-05-25-engagement-loop
date: 2026-05-25
subtitle: Configuration promised 32 engagements a day; the logs showed zero cycles had ever completed
concepts: verify-from-logs, silent-failure
symptom: A published engagement rate could not be substantiated. The startup banner appeared 4,357 times in the logs; the line proving a completed cycle appeared zero times. The behaviour had never occurred, whatever the configuration said.
root_cause: Three layers. The first run was scheduled five minutes after startup; an external scheduled job was restarting the process every five minutes; and that job was a health check whose text match never matched the process manager's table output, so it judged a healthy process dead, permanently.
fix: The health check was rewritten to read structured state rather than to match rendered text. The process stayed up, and the first engagement cycle in the agent's history fired the same day.
verified: Real replies and follows confirmed from logs after the fix.
rule: Never claim agent behaviour from configuration. Grep for the action line, not the setup line.
---

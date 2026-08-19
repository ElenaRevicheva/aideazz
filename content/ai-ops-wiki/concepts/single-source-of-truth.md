---
title: Single source of truth
slug: single-source-of-truth
one_liner: Copy logic instead of calling it, and you have scheduled a bug for a date nobody will tell you about.
aka: DRY; configuration drift
---
When the same rule, prompt, threshold or piece of logic exists in more than one place, the copies begin identical and end different. Nothing announces the divergence. Someone updates one copy, the others keep running the old behaviour, and the system's actual conduct is now split across versions that no single file describes.

The failure is especially nasty when a copy lives somewhere code review cannot see it: a hosted workflow builder, a dashboard setting, a scheduled job on one machine, a prompt pasted into a vendor interface. Those copies never appear in a diff, so the drift stays invisible until it produces a visibly wrong result in front of a customer.

Two defences that work:

- **One definition, imported everywhere.** Every consumer reads the same file. Where a copy must physically live elsewhere, generate and push it from that file rather than editing it by hand.
- **Detect drift automatically.** Re-read the remote copies on a schedule and raise an alert when one no longer matches the source. A copy you cannot diff is a copy you must monitor.

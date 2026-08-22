---
title: Redundancy is not precedence
slug: redundancy-is-not-precedence
one_liner: Two systems that can both do the job is not a rule for which one should.
aka: fastest-wins; the fallback that quietly became the default
---
Redundancy answers "will this get done". It does not answer "by whom". When two paths can both handle the same work and nothing decides between them, latency decides — whichever path is quicker wins every time, permanently, regardless of which one you would have chosen.

That is harmless while the fast path is also the good one. It gets expensive the moment it is not. The better system is present, healthy, correctly configured, doing its work — and its work is discarded on arrival because something quicker got there first. Nothing errors. Nothing alerts. The good path looks idle and is in fact running perfectly, every time, into a bin.

Ordinary-life version: two people are told to answer the front door. Nobody says who goes first, so the one sitting nearest always gets there. The other can be better at it, fully available, and walking over on every single ring — and never once open the door.

Precedence is the missing rule. It has three parts, and each fails on its own:

1. **A verdict** — is the preferred path able to work right now? Cache it. Asking mid-request spends exactly the latency you are trying to protect.
2. **A grace window** — the preferred path must be given time it does not have to win on speed. Without this, the verdict changes nothing at all.
3. **A backstop** — if the preferred path produces nothing inside the grace, the other one still must. Fail toward acting, never toward waiting.

Defences:

1. **Name the preferred path in writing.** "Either can do it" is a capability statement, not an architecture.
2. **Apply the rule at every entry point.** A second door into the same behaviour will not consult a rule it was never told about, and it will look like the rule is broken rather than absent.
3. **Never let the readiness check require the work it gates.** If the verdict demands evidence that only the gated path can produce — a successful job, a processed record — it has locked itself. Ask "is it able", not "has it recently".
4. **Make duplicate suppression idempotent before you add precedence**, not after. Both paths running is the normal case during a handover, and the overlap has to collapse silently. See [[idempotency]].

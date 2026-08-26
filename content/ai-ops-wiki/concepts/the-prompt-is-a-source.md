---
title: The prompt is a source
slug: the-prompt-is-a-source
one_liner: A numbered claim in a system prompt is as much a source as a log line -- and a fail-closed gate will treat it that way.
aka: poisoned brief; the prompt leaked into the output; flavour text that was not flavour
---
A verifier that refuses unsourced numbers is doing the right job. The model still has to write from *something*. If that something -- a topic brief, a few-shot example, a "write about X" paragraph -- contains a leftover figure, the model copies it. The gate then fires on a number that was never in the evidence file, and the pipeline skips even when the day produced plenty of real facts.

The trap is treating the prompt as flavour text. The model does not. To the generator, a brief that says "BrightData $40/run" is a fact. To the gate, `$40` is unsourced. Both readings are locally correct. Cadence dies in the gap.

Ordinary-life version: you ask someone to write the minutes from the meeting notes, and you also slide them last year's budget that still says the coffee machine costs forty dollars. They copy the forty. The auditor who only accepted numbers from the notes throws the minutes out. Nobody invented the forty. The briefing packet did.

The defences are structural:

1. **Grounded mode must not inject a numbered brief.** Derive the angle from measured evidence, or strip every digit from flavour text before it reaches the model.
2. **Separate fail-closed on claims from fail-open on cadence.** Skipping is the right answer to a fake stack. It is the wrong answer to a poisoned prompt on a day that had evidence.
3. **If the gate still fails, salvage, then fall back.** Rewrite unsourced numbers against the licensed set, then compose an evidence-only article so the day still ships. Silence remains correct only when there is nothing to measure.

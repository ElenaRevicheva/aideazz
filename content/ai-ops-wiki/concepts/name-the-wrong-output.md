---
title: Name the wrong output
slug: name-the-wrong-output
one_liner: A generative model that keeps producing the wrong thing is usually obeying you exactly — describe the failure and forbid it by name.
aka: underspecification; negative constraints; the obedient wrong answer
---
When a model keeps returning something wrong, the instinct is to describe what you want more richly. That instinct is usually wrong, and it is expensive, because each round feels like progress.

**An underspecified prompt is not the model being wrong. It is the instruction admitting a reading nobody meant.** Positive description narrows toward one good output. It does nothing to close off the bad ones — and if a bad reading satisfies every word you wrote, more words in the same direction will not exclude it.

A real example: a shot asking for *"a blade sweeps down and cleaves it open, the cut face revealing the flesh"* produced a separate cut slice sitting beside a completely intact fruit. Every clause was honoured. "Cut face" was satisfied without anything being cut. Four rounds of richer description did not move it. What worked on the first attempt was naming the failure:

> *"There is only ONE fruit in frame and it is the one being split; no separate slice, no ring, no piece sitting beside it, nothing already cut."*

The move is mechanical once you see it: **take the output you keep getting, describe it plainly, and forbid it.** Not "make it more X" — "it must not be the thing I just received."

This is why negative prompts exist in image and video tooling, but the idea is not specific to them. It applies to any instruction-following system:

- **LLM extraction** that keeps returning a summary instead of a quote — forbid paraphrase explicitly, don't ask for "more faithful" quotes.
- **Code generation** that keeps adding a dependency — say which approach is banned, not just which is preferred.
- **Classifiers** that keep choosing a plausible neighbouring label — name the confusable class and rule it out.
- **Agents** that keep taking a reasonable but unwanted action — enumerate the action, don't reweight the goal.

Two cautions. Negative constraints are cheap to add and easy to over-apply; a wall of prohibitions crowds out the actual request and can suppress the good output along with the bad. And a constraint only works if it names something the model can recognise — "not ugly" forbids nothing, while "not two objects, not symmetrical" forbids something specific.

The general habit this belongs to: when several rounds of refinement along one axis do not converge, the axis is wrong. Adjectives, temperature and length are all the same axis. Prohibition is a different one. So is fixing the input instead of the output, and so is abandoning generation for an asset you already have.

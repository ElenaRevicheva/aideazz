---
title: Tolerance erases evidence
slug: tolerance-erases-evidence
one_liner: A component that repairs bad input destroys the proof that something upstream is broken.
aka: the forgiving middle; repair hides the fault; Postel's dark side
---
Robustness is usually a virtue: be liberal in what you accept. The cost nobody mentions is that **a component which accepts and repairs malformed input also deletes the only signal that the input was malformed.**

The fault is real, upstream, and reproducible. But it never reaches an alert, because the tolerant component in the middle cleans up after it and hands the next stage something perfectly well-formed. Everything downstream then reports health — truthfully. You are measuring the repair, not the original.

This is what makes it worse than an ordinary [[silent-failure]]. There, nothing happened and nobody said so. Here, *something did happen* — a component detected damage and corrected it — and that detection was thrown away instead of raised.

**The tell is that your evidence all comes from after the tolerant step.** A file that decodes cleanly, a record that validates, a response that parses, a status that says delivered. All true. None of them can distinguish "the input was fine" from "the input was broken and got fixed on the way through", because the tolerant component has made those two cases produce identical output. Testing harder at that point cannot work; you are inspecting the wrong artifact.

Common forgiving middles:

- **Transcoders and muxers.** Correct timestamps, resample, patch headers — and log it at a verbosity nobody runs in production.
- **Retry wrappers.** The first attempt failed for a reason. Succeeding on the second hides it, and the failure rate never appears anywhere.
- **Lenient parsers.** Trailing commas, coerced types, missing fields defaulted. The producer stays broken and nobody learns.
- **ORMs and serialisers.** A string silently becomes an integer, and the bug surfaces years later somewhere unrelated.
- **CDNs and SPA fallbacks.** A missing asset answered with `200` and an HTML body — see [[the-render-is-the-artifact]].

The defence is three moves:

- **Inspect the input to the tolerant step, not its output.** That is the only place the fault is still visible.
- **Run the producing pipeline at the verbosity where the consumer complains.** The decoder, parser or validator usually states the problem exactly and precisely once, then fixes it and moves on.
- **Promote repairs to signals.** If a component corrects something, that correction is an event worth counting. A repair rate that climbs from zero is an outage forming.

The related trap is diagnostic, not architectural: when one mode of a system works and another does not, **that pair is worth more than any amount of reasoning about the broken one**. It converts an unfalsifiable question — "why is this wrong?" — into a diff between two artifacts produced by the same code, which is a question with an answer.

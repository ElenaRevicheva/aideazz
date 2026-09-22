---
title: The vacuous guard
slug: vacuous-guard
one_liner: A check whose condition can never be true is not a weak control — it is no control, and it reads in the source exactly like a working one.
aka: fail-open by absence; the limit that never said no; unreachable refusal branch
---
Most broken safeguards are miscalibrated: the threshold is too high, the rule has a hole, someone tuned it down during an incident and never tuned it back. Those are visible in principle — the guard fires sometimes, you can count how often, you can argue about the number.

A vacuous guard is different. Its refusal branch is **unreachable**. Not rarely taken — unreachable. It permits everything, it will permit everything forever, and it occupies exactly the same lines of code that a working guard would.

The usual mechanism is absence meeting comparison. A ceiling reads a number out of somebody else's response, the field it reads is not the field the vendor sends, and the value is missing. Missing coerces to something — `NaN`, `undefined`, `null`, empty string — and the crucial property of those values is that they compare **false against everything**, including the comparison you wrote to catch danger. A spending cap that asks `price > limit` against a `NaN` gets `false`. So does `price < limit`. There is no value of the limit that changes the answer. The guard fails **open**, which is the direction that costs money, leaks data or ships the wrong thing, and it does so without erroring, because nothing has gone wrong in the machine's view.

This is a cousin of [[null-is-not-zero]] with a different victim. There, an absent measurement becomes a plausible finding and misleads a human decision. Here, an absent value disables a *control* and no human is consulted at all. And it is distinct from [[silent-failure]]: nothing failed. The code ran, top to bottom, exactly as written.

**The tells:**

- **A guard that has never once refused.** If you cannot point to a log line, a test, or a memory of it saying no, treat it as unproven. Age is not evidence; a limit that has been in production for a year and never fired is the *most* suspect kind.
- **A comparison against a value you did not watch arrive.** Field names in documentation describe the API. They are not the API. The first real call is the only source of truth about shape.
- **A missing annotation in the output.** The cheapest symptom is usually cosmetic — a price, a count, a name quietly absent from a message — and it is worth stopping for, because the same absence that dropped the label is what disarmed the check.

**The defences, cheapest first.** Print the vendor's unparsed body once on the first real call and read it with your eyes. Make absence loud: if the value cannot be found, refuse or alarm — never fall through to "it did not exceed the limit". And test the guard the only way that means anything: set the ceiling *below* a known value and confirm it actually says no. A limit that has never refused anything is indistinguishable from a comment, and comments do not stop spending.

The discipline is the one in [[verify-from-logs]], pointed at your own safety code: before you trust what a control permits, prove it can forbid.

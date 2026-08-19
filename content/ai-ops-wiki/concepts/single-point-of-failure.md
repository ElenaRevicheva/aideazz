---
title: Single point of failure (SPOF)
slug: single-point-of-failure
one_liner: One component whose death kills the whole chain.
aka: SPOF
---
Every system has a critical path -- the sequence of steps that must all succeed for the thing to work. A single point of failure is any step in that path with no alternative.

The trap is that these are usually invisible until they fire, because they hide behind something that has never failed before: a vendor account, a prepaid balance, one API key, one machine, one person who knows how the deploy works.

The lesson that generalises, and the one most teams get wrong: **redundancy only counts if it is in the path.** Having five interchangeable providers configured somewhere in your estate does nothing if the one place that actually makes the call can only reach one of them. Spare tyres in the garage do not help on the motorway.

Practical test: for each external dependency on your critical path, ask *"if this returns an error for the next 72 hours, what does the user see?"* If the answer is "nothing at all", that dependency is a single point of failure, and the fallback belongs where the call is made -- not elsewhere.

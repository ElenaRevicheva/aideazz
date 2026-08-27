---
title: Null is not zero
slug: null-is-not-zero
one_liner: A measurement that could not be taken is not a measurement of zero.
aka: missing reported as empty; unmeasured rendered as measured; the plausible zero
---
"We were cited 0 times" and "we could not check whether we were cited" are completely different facts about the world. One is a finding you plan against. The other is an outage wearing a finding's clothes. Systems collapse them constantly, because both come out of the pipe as the number `0`.

This is not the same failure as [[silent-failure]], and the difference matters. A silent failure means something broke and swallowed the error. Null-is-not-zero can happen with **nothing broken at all**. Google Analytics reported `form_submit: 0` on a site whose forms work perfectly -- the forms call `preventDefault()` and post over `fetch`, and the browser's automatic form tracking only fires on native submits. Nothing errored. The event was never observable. The `0` was structurally guaranteed and read for months as "nobody is converting".

A zero is dangerous precisely because it is *plausible*. A crash gets investigated. A `0%` gets put in a report, then in a roadmap, and the team goes off to fix a problem that may not exist while the real one -- that the instrument is blind -- goes unexamined.

**The tells, in order of usefulness:**

- **Watch the denominator, not the value.** The headline number can stay flat while coverage silently collapses underneath it. If a report says `0 of 17` one week and `0 of 12` the next, the story is not "still zero", it is "a third of the measurement disappeared".
- **Count the sources that answered, not the sources configured.** A run listing three engines proves nothing about how many replied.
- **Ask whether the event is even emittable.** Before trusting a zero, confirm the thing being counted has a code path that can fire. Many do not.

**The defence is to make coverage a first-class output.** Never report a metric without reporting how much of the intended surface it was computed over, and make any component that measured nothing say so by name rather than contributing a harmless-looking `0`. A run that measured nothing should be shaped differently from a run that measured zero -- loud, distinct, and impossible to average away.

The discipline this earns is the same one in [[verify-from-logs]], one step earlier: before you trust what the number says, prove the instrument could see.

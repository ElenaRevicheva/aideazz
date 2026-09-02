---
title: Resilience is opt-in
slug: resilience-is-opt-in
one_liner: A fallback chain protects only the calls that route through it. Every hand-rolled call is a second, unprotected system wearing the first one's reputation.
aka: the bypassed safety net; the unrouted call; your uptime is the uptime of your least-routed dependency
---
You build a provider chain: five vendors, ordered by cost and quality, each failure falling through to the next. You test it. A vendor goes dark and the system keeps answering. The claim "we survive a provider outage" is now true, demonstrated, and written on the architecture diagram.

Then, somewhere in the codebase, one function calls the vendor directly. Not maliciously — it was written before the chain existed, or in a hurry, or by someone who only needed one quick classification and reached for the SDK. It works perfectly. It goes on working perfectly for months.

The day the primary vendor's balance hits zero, the chain routes around it exactly as designed, and that one function returns nothing.

**The failure is invisible in a specific and dangerous way.** The system is not down — most of it demonstrably still works, which is the strongest possible argument that the outage is not your problem. The broken path usually has a fallback of its own: an empty array, a default value, a "not classified" branch. So it does not error. It quietly does the *other* thing, and the other thing is often plausible enough to look like a product decision rather than a defect.

Three properties make this worth naming as its own failure mode:

- **The bypass is invisible from the resilient side.** Nothing in the chain's code, tests or metrics can see a call that never enters it. Coverage of the chain tells you nothing about coverage of the system.
- **It survives exactly as long as the primary works.** Which means it is introduced, reviewed, tested and shipped without ever being wrong. There is no moment where the mistake is observable — until the outage.
- **Its blast radius is the opposite of its footprint.** One function, five lines. The behaviour it silently disables can be an entire product surface.

The defences are unglamorous and cheap:

- **Grep for the vendor, not for the wrapper.** The audit question is "what calls `api.vendor.com` or imports the SDK?", not "does everything use our chain?" One of those has an answer.
- **Make the wrapper the only thing holding the credential.** A function that cannot reach the key cannot bypass the chain.
- **Never let a classifier fail into a default.** Returning `[]` on error is the mechanism that converts an outage into a silent behaviour change. Fail loudly, or fail into a state the operator can see.
- **Name the responder.** If every routed call logs which provider answered, a bypass is visible as an *absence* — the one path that never names anybody.

The rule this earns: resilience is a property of calls, not of systems. Audit the call sites, because the chain cannot audit them for you.

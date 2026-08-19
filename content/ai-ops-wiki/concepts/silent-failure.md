---
title: Silent failure
slug: silent-failure
one_liner: The system did something reasonable, and told nobody.
aka: quiet failure; failing without a signal
---
The most expensive bug class there is, because the clock keeps running while everyone assumes things are fine.

A silent failure is not a crash. A crash is loud and gets fixed. A silent failure is a component making a *defensible local decision* -- drop this message, skip this record, return an empty string -- that nobody downstream is told about. From the outside, a system that is working perfectly and a system that is completely dead can produce the identical observation: nothing happened.

The defence is not "add more logging". It is to make the healthy state **provable**, so that "nothing happened" can be distinguished from "nothing was supposed to happen". Two things do that:

- **Log the outcome, not the attempt.** "sending notification" tells you nothing. "notification DELIVERED (id 4661)" versus "notification REJECTED 400" tells you everything.
- **Run a canary.** A synthetic transaction pushed through the real path on a schedule, which shouts when it does not come out the far end. Without one, you are relying on a customer to report your outage.

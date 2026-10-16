---
title: Fate-sharing
slug: fate-sharing
one_liner: Two duties that should be independent ride the same code path, so when one has nothing to do, the other quietly stops too.
aka: unintended coupling; the early return that skips unrelated work; shared fate
---
In network design, **fate-sharing** is a deliberate choice: David Clark's 1988 paper on the design of the Internet's protocols argued that the state of a connection should live with the endpoints that use it, so that the state is lost only when those endpoints themselves are lost. Two things that share fate fail together, and that is the point.

The bug is the *unintended* version: two duties that have nothing to do with each other end up sharing fate because they happen to live in the same function, the same job, or the same branch. The usual carrier is an early return. A loop does A, then B, then C; someone adds "if A found nothing, stop here" — correct for B, which depends on A — and C, which never depended on A, now runs only when A happens to be busy.

Ordinary-life version: a night guard is asked to sign for deliveries and, while at the door, to check the mailbox. One day the instruction becomes "if there is no delivery tonight, go back to your desk." Quiet nights get quieter. Nobody told the guard to stop checking the mail; it just stopped happening on every night without a parcel.

The usual shapes:

- **The early return.** "Nothing new — waiting for next run" ends the whole cycle, including the steps that had their own reason to run.
- **The shared try block.** One failing step aborts every step after it, so a broken scraper also silences the health report written at the end.
- **The chained schedule.** Job 2 is triggered by job 1's output; when job 1 legitimately produces nothing, job 2 never runs.
- **The monitor on the patient.** The thing that watches a system runs on that system, so the outage it should report also takes the reporter down.

It is a special case of [[silent-failure]]: the skipped duty leaves no trace, and the line that is logged ("no new jobs") is true and calm. It also hides behind [[liveness-is-not-correctness]]: the loop runs every hour, so every liveness signal is green, while one of its duties runs only some of the hours.

**The defences.** Put a duty that does not depend on a branch *before* the branch, or give it its own trigger. Treat every early return as a decision about everything after it, not only about the step that motivated it. And measure each duty's real frequency from its own log line ([[verify-from-logs]]) — count "mailbox checked" per cycle, not "cycle ran".

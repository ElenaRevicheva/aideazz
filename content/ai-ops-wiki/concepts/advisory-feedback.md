---
title: Advisory feedback
slug: advisory-feedback
one_liner: Feedback that is recorded, summarised and shown to a model — but wired where it cannot change a decision — is logging, not learning.
aka: the disconnected feedback loop; learning on words; the lesson that can only whisper
---
A self-improving system needs three parts, and it is easy to build two. A **sensor** that captures the human's verdict and the reason for it. A **memory** that keeps those verdicts. And a **switch** — the point in the pipeline where the decision is actually made — that the memory is allowed to move.

Advisory feedback is the failure where the first two exist, work, and are proven end to end, while the third is missing. The verdicts are read, stored, summarised and even injected into a model's prompt, so every inspection of the loop comes back green: the file updates, the prompt contains the lessons, the logs show the sync running. And the outcome does not change, because the component that receives the lessons is not the component that decides.

The usual shapes:

- **The lesson reaches the wrong box.** The feedback is fed to a reviewer that sits on a side path, while the main path into the outcome runs on fixed rules that never read it.
- **The lesson is told it cannot win.** It arrives as "calibration" that must not override the base criteria — so a reason as crisp as a hard eligibility rule becomes a hint that loses every time it conflicts.
- **The memory is a window, not a record.** "The most recent N" feels like memory. With rising volume the window shrinks until the system remembers a week of a person's judgement and forgets the rest.

It is a cousin of [[silent-failure]] — nothing errors — and of [[verify-from-logs]]: the tell is that you can show the lesson *arriving* but not the decision it *changed*.

**The defences.** Trace from the outcome backwards, not from the sensor forwards: for the thing the human keeps rejecting, find the exact line that let it through, and check whether the lesson can reach that line. Turn crisp lessons into enforced rules with provenance, and leave only fuzzy judgement to the model. And prove it by **replay** — run the new logic over the human's past decisions and report two numbers: rejections it now catches, and approvals it now wrongly blocks, which must stay at zero. Re-run the replay after every prompt change, because prompt pieces interact ([[the-prompt-is-a-source]]): two harmless additions can combine into a new failure.

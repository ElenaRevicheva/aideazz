---
title: Acknowledgement is not completion
slug: ack-is-not-completion
one_liner: A receipt proves delivery. It never proves processing.
aka: 200 OK is not success; 202 does not mean done
---
When you hand work to something asynchronous -- a queue, a webhook, a workflow tool, a background job -- the response you get back means *"I have received this"*. It does not mean *"I have done this"*, and very often it does not even mean *"I intend to do this"*.

This is the trap behind a large share of "the data just vanished" incidents. The sending side logs a success, the receiving side never processes anything, and both halves look healthy in isolation. A queue that accepts your message and never reads it looks exactly like one that works.

Defences, in order of strength:

1. **Do not branch on the acknowledgement.** If your fallback logic reads *"if the handoff failed, do it myself"*, it will never run, because the handoff reports success. Make the local path unconditional and let idempotency absorb the duplicate.
2. **Confirm from the other side.** Check that the work actually completed -- a status endpoint, a result record, a callback -- rather than trusting the receipt.
3. **Set a deadline.** If the expected outcome has not appeared within N minutes, treat it as failed and act, rather than waiting forever.

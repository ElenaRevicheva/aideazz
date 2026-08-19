---
title: Idempotency
slug: idempotency
one_liner: Doing it twice produces the same result as doing it once.
aka: safe retries; deduplication
---
An operation is idempotent if repeating it changes nothing beyond the first time. Setting a value to 5 is idempotent. Adding 5 is not.

This is the property that makes reliability affordable. Networks time out, retries fire, and redundant paths overlap -- so in any real system some operations *will* happen more than once. If those operations are idempotent, that is a non-event. If they are not, your safety net becomes the thing that corrupts the data or spams the customer.

The usual implementation is a **fingerprint**: a hash of the inputs that identify the work. Before acting, check whether that fingerprint was already handled inside some window; if so, do nothing, and say so in the log.

The detail that separates a junior implementation from a senior one is *what goes into the fingerprint*. Too narrow and genuine repeat work gets swallowed; too wide and duplicates slip through. Hashing only "who" would silently discard a real follow-up message from the same person an hour later. Hashing "who **plus** what they said" collapses the duplicates while letting a genuine second message through.

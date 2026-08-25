---
title: Liveness is not correctness
slug: liveness-is-not-correctness
one_liner: A dead job announces itself. A job that runs perfectly and emits slightly wrong output never will.
aka: green logs, wrong answers; the cron that succeeded at the wrong thing
---
Almost every check you own measures *liveness*: did it run, did it return, did it exit zero, did it publish. Almost none measures *correctness*: was the thing it produced the right thing. These are different properties, and the gap between them is where the expensive incidents live.

The asymmetry is what makes this dangerous. A job that stops firing is loud — the output is missing, someone notices within a day. A job that fires on schedule and produces output that is subtly wrong is silent, and it stays silent for as long as nobody reads the output, because every signal you have is reporting the truth. The scheduler really did fire. The API really did return 200. The file really was written. Each check passes honestly while the only thing that matters fails.

Two shapes to watch for:

1. **The safety net that adjusts instead of refusing.** A guard catches a bad condition, then modifies the input so the operation can proceed — renaming a colliding key, truncating an over-long field, coercing a bad type. The error disappears from the logs and the bad condition ships anyway. A guard that never refuses is not a control; it is a laundering step, converting a real signal into a clean log line. Prefer failing closed: a skipped run is cheap and visible, a wrong run is expensive and invisible.
2. **The record that drifts from the reality.** Any check that compares against a cache, a state file, or a local ledger is only as good as that memory. When the memory can be truncated by a restart, a fresh machine, or a path that writes to one place and reads from another, the check degrades quietly and keeps returning "fine". Seed the memory from the artifacts themselves wherever you can, and periodically assert that the two still agree.

The practical defence is to add one check that reads the *output* rather than the exit code, and to make it something a human would actually notice — a count that should be stable, a uniqueness constraint, a spot comparison against what shipped last time. You are not trying to verify everything. You are trying to have at least one signal that fails when the job succeeds incorrectly.

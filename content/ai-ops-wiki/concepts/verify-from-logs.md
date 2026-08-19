---
title: Verify from logs, not config
slug: verify-from-logs
one_liner: Configuration tells you what somebody intended. Logs tell you what happened.
aka: observability; probe, do not assume
---
A setting, an environment variable or a present API key is a statement of intent. It is evidence that somebody meant for a behaviour to occur. It is not evidence that the behaviour occurs.

The gap between the two is where the longest outages live, because reading the configuration *feels* like verification. It produces confident, wrong statements: the key is set, so the provider works; the schedule says every fifteen minutes, so it runs every fifteen minutes; the file was deployed, so the new code is running.

Each of those has a cheap, decisive check that costs seconds:

- **Probe the dependency**, do not read its credential. A key that exists proves nothing about the balance behind it.
- **Grep for the action line, not the setup line.** A startup banner proves the process started, not that it ever did its work.
- **Compare timestamps** after a deploy. If the running process is older than the file on disk, it is still executing the previous version from memory.

The rule this earns: never report a system's behaviour from its configuration. Grep the line that proves the behaviour happened, and quote it.

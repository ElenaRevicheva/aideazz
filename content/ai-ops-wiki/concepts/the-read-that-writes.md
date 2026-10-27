---
title: The read that writes
slug: the-read-that-writes
one_liner: An operation everyone treats as "just looking" changes the thing it looks at, so the watcher quietly rewrites the state the owner depends on.
aka: side-effecting read; observer effect in software; a GET that mutates
---
Most systems split operations into **reads**, which only look, and **writes**, which change something. Monitoring, auditing and dashboards are built on the promise that looking is free: you can watch as often as you like and nothing moves.

The failure is a read that is secretly a write. In email, the ordinary way to fetch a message over IMAP marks it as read on the server. A program that "only reads" a mailbox every hour therefore stamps every message as opened, and the person who owns the mailbox loses the one signal they rely on: what is new. The same shape appears as a web `GET` that increments a counter, a health check that consumes a queue item, or a report that resets a statistic it was meant to show.

It compounds when the state it rewrites is also training data. A service that learns from "what the user opened" — an inbox ranking messages as important, a feed ranking posts — reads those fake opens as real behaviour, and its predictions drift a little further every week.

The fix is to use the explicitly side-effect-free form of the read (in IMAP: open the folder read-only and fetch with `PEEK`), and to prove it the only way that counts: measure the state before and after the watcher runs. If the numbers moved, the read wrote.

Ordinary-life version: a building inspector told to "just check" every apartment, who flips every light switch on the way out. Nothing in the report is wrong, but the tenants come home to a house that no longer shows what they left.

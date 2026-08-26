---
title: The prompt poisoned the grounding gate
slug: 2026-08-26-prompt-poisoned-the-grounding-gate
date: 2026-08-26
blog: no
subtitle: A leftover $40 in the topic brief made a fail-closed verifier skip the daily blog on a day that had real evidence
concepts: the-prompt-is-a-source, liveness-is-not-correctness, fabrication-under-degradation, silent-failure
symptom: The 14:30 Panama cron ran on 26 August and Telegram reported the daily blog skipped -- Grounding gate, unsourced number(s): 40. The scheduler was not off. The mutex line on that message was leftover wording. Four generation attempts each carried a $40 that was not in the evidence file, and the publisher published nothing.
root_cause: Fail-closed on claims and fail-open on cadence were never separated. After the 23 August Redis fabrication, the publisher collected real facts and then still injected a rotation brief that contained BrightData $40/run (and other leftover figures). The model copied 40. The gate correctly refused a number it could not license. All three readings were locally correct. Cadence died for about forty minutes on a day that had evidence. The white IPFS page opened at 20:10 UTC was the already-documented pin lag -- git-is-not-the-origin -- not a second outage; the host finished pinning at 20:12.
fix: Grounded mode no longer injects the numbered brief. After four gate failures the publisher salvages licensed numbers, then composes an evidence-only article so the day still ships. A one-shot catch-up on afternoon process start covers a skip that already happened that day without firing a second post the next morning. The cron stays 14:30 America/Panama.
verified: Telegram 26 Aug 19:31 UTC -- Daily blog SKIPPED / Grounding gate / unsourced number(s): 40. Topic brief in the publisher still contained the string BrightData $40/run. Catch-up published GitHub commit 77f2ee0 at 20:10:42Z, HTML 15098 bytes. 4everland production deploy succeeded 20:12:01Z. Live audit HTTP/2 200, title 55,193 Restarts in 10 Days: Debugging an AI Agent's Endless Loop, CID bafybeidmkpn4e5xojctg7mj2h42ery7ddmi3lyjvy7xgbomnpmla2jyp3y, A+ 93/100. Cron expression unchanged: 30 14 * * * America/Panama.
rule: A prompt is a source. If a verifier is fail-closed on numbers, every number in the prompt has to be licensed or stripped. Skipping is the right answer to a fake claim and the wrong answer to a poisoned brief. Fail-closed on claims, fail-open on cadence -- those are two different decisions, and they must not share a skip path.
---

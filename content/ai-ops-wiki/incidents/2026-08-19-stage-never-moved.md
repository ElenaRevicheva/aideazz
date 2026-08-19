---
title: Answered leads that still looked untouched
slug: 2026-08-19-stage-never-moved
date: 2026-08-19
subtitle: Sending a reply logged the activity but never moved the deal
concepts: monotonic-state-machine
symptom: Approving and sending a reply created a note and an email activity on the customer record, but the deal stayed in the "not triaged yet" column. A lead that had been personally answered was indistinguishable on the board from one nobody had touched.
root_cause: The deal was created in the first stage and nothing in the send path ever updated it. The board had stopped describing reality, which is the only thing a board is for.
fix: A successful send now advances the associated deals to the "sent, awaiting reply" stage, from both the one-tap and the edited-reply paths. The advance is forward-only, because the stage that follows "sent" is "they replied, act now" -- so stamping "sent" on a follow-up to someone who had already replied would have buried the one deal that needed attention that day. Closed and unrecognised stages are left untouched rather than guessed at.
verified: Confirmed in both directions on a live record. The first run advanced the deal and reported one moved; the second reported "already at or past sent, not moved back" and moved zero.
rule: Where stages encode who must act next, transitions must be forward-only, and the ordering belongs in one list -- internal stage identifiers rarely resemble their display labels.
---

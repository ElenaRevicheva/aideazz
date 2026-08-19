---
title: The lead pipeline that answered nobody for four days
slug: 2026-08-19-concierge-outage
date: 2026-08-19
subtitle: A prepaid balance inside a hosted workflow tool was the single point of failure for every inbound lead
concepts: single-point-of-failure, silent-failure, single-source-of-truth
symptom: Inbound enquiries produced a customer record and an acknowledgement email, but no reply draft ever reached the operator. Test submissions produced nothing at all, which is indistinguishable from a completely dead pipeline.
root_cause: The component that wrote every reply lived inside a hosted workflow tool and could call only one model vendor. That vendor's prepaid balance reached zero, and the workflow returned "credit balance is too low" on every run for four days. Five other providers were configured and healthy on the application server the whole time, but the call was not made there, so none of them could be reached. Compounding it, the drafting instructions existed in four separate copies; three had drifted out of date, and one still pitched a sales call to job applicants.
fix: Drafting moved into the application itself, behind a five-provider fallback chain ordered by use case. The reply endpoint now writes the draft when no draft text is supplied, which made the workflow tool optional rather than required, and drafting happens inline the moment a lead arrives instead of waiting on an external schedule. All four copies of the instructions were reduced to one.
verified: Read from production logs rather than configuration. A provider probe returned HTTP 400 "credit balance too low" for the primary vendor while the chain routed to the next provider and produced a 605-character reply in 2.4 seconds. End-to-end runs were confirmed for both a first-time enquirer and a returning one, each producing a customer record, an acknowledgement to the sender, a copy to the shared mailbox, and an approval card -- under 30 seconds from submission.
rule: Redundancy only counts if it sits in the path where the call is made. A fallback chain configured elsewhere in the estate protects nothing.
---

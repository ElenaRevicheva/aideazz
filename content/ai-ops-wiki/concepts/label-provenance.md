---
title: Label provenance
slug: label-provenance
one_liner: A learner that reads "the human's reasons" from a shared record must know who wrote each line — otherwise another agent's text becomes the human's preference.
aka: whose words is this; agent text learned as human feedback; the borrowed lesson
---
A feedback learner needs labels: the human's verdict and the reason behind it. In a real operation those reasons rarely live in a clean dataset. They live in the same place everything else lives — a CRM note, a ticket comment, a chat thread — and other software writes there too: a staging script, a document generator, an assistant leaving instructions for the human.

**Label provenance** is the property that every line the learner reads carries *who wrote it*. When it is missing, the learner does what any reader does with an unsigned note: it assumes the most likely author. On a record that a person decided on, that author is the person. So an agent's instruction ("change the rate field before you submit") is filed as the person's reason ("the pay was too low"), counted, summarised, and served back to a model as one of her strongest preferences.

Ordinary-life version: a manager learns what a client dislikes by reading the margin notes on the proposals the client rejected. The assistant who prepared the proposals also writes in those margins — reminders like "fix the price on page 2". After a month the manager is convinced the client always rejects on price. The client never said a word about price.

The usual shapes:

- **The blocklist that fails open.** The learner skips notes that match known agent templates. Every agent added later is trusted by default until someone remembers to register its template.
- **The cache that keeps the wrong label.** The exclusion is fixed, but the reasons already derived from the agent's note stay in the learner's memory, because the record itself never changed and nothing triggers a re-read.
- **The lesson that looks strongest.** Agent text is repetitive by nature (a template on every record), so a mislabelled note does not add noise — it adds the *most frequent* lesson, and frequency is exactly what a summariser ranks by.

It is a cousin of [[the-prompt-is-a-source]] — text you did not mean as evidence becomes evidence — and of [[advisory-feedback]]: both are about whether a feedback loop is learning what you think it is learning. Check it with [[verify-from-logs]]: read the learner's actual top lessons and the exact quotes behind them, not the count of lessons.

**The defences.** Mark authorship at write time where you can (a distinct note type or a stable marker in the visible text). Where you cannot, keep one registry of agent note types next to the learner, and add to it in the same change that introduces a new agent writer. When an exclusion is added, re-derive the cached labels it affects. And read the top lessons with their quotes after every new writer ships: a lesson whose quotes are instructions rather than opinions is borrowed.

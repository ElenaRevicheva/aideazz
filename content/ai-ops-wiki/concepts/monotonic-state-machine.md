---
title: Monotonic state machine
slug: monotonic-state-machine
one_liner: States advance. They never regress.
aka: forward-only transitions
---
When a record moves through stages -- an order, a ticket, a deal, a deployment -- the sequence usually carries meaning: later stages represent more progress. A monotonic state machine enforces that an update may move a record forward, never backwards.

Without that rule, a routine automated update can quietly destroy information. An order that goes from *Shipped* back to *Processing* has lost the fact that it shipped. Nobody notices, because no error was raised: the write succeeded perfectly.

The damage is worst when the stages encode *who needs to act next*. If "we contacted them" sits before "they replied to us", then an automation that stamps "we contacted them" on every outgoing message will drag replied-to records out of the human's action queue -- burying exactly the items that most needed attention.

Implementation is simple and worth doing every time:

- Keep the ordering in **one list**, not in scattered comparisons. Internal state identifiers frequently do not resemble their display labels, so comparing them by name is guesswork waiting to break.
- Compare positions before writing, and skip if the record is already at or past the target.
- Leave **unrecognised** states alone rather than guessing where they belong.

---
title: Last-modified is not last activity
slug: last-modified-is-not-last-activity
one_liner: A last-modified timestamp records when the system changed a record, not when anybody did anything with it.
aka: the system-maintained proxy; derived-field fan-out; recently updated is not recently active
---
Almost every store keeps a "last modified" or "updated at" field for free, so it is the first thing anyone reaches for when they want "what is new" or "what is active". The trouble is who moves it. The store moves it whenever *any* write lands on the record, and many of those writes are the store's own: a rollup recalculating, a trigger firing, a sync job re-saving, a migration touching every row. None of that is a customer doing anything. A "recently updated" view built on that field is measuring the database, not the customer.

The worst version is **fan-out through a shared parent**. One record sits above many others: a catch-all contact, a default account, a shared folder. A derived field on the children summarises something about that parent. When the parent changes, the store recalculates the field on every child, and every child's last-modified moves in the same few seconds. Hundreds of records look freshly active, nothing visible changed on any of them, and the instinct is to hunt for a rogue job that wrote to them all.

Ordinary-life version: a hotel marks a room "recently serviced" whenever the linen cupboard on its floor is restocked. Every room on the floor looks freshly cleaned at the same minute, and nobody walked into any of them.

**The tells:**

- **Many records changed within the same few seconds.** People do not act in bursts like that. Systems do.
- **The diff is empty.** The timestamp moved and no field a person can see moved with it.
- **The change history names the system as the writer.** A calculated, rollup or workflow source, with zero writes from a user or an API key.
- **The records share one parent.** Group them by what they are attached to before you go looking for a job.

**The defences:**

1. **Define activity explicitly.** Choose the fields that move only when something you care about happens (created, a note added, a stage changed, a reply received), take the latest of them, and give that value a name in the code. Never let the store's own timestamp stand in for it.
2. **Ask what your definition misses before it ships.** An explicit definition fails the other way: it can make real activity look old. Name each kind of real activity and check that at least one of your fields moves for it.
3. **Read the change history before hunting for a job.** It says whether a person, an API key or the system wrote the value, and that answer usually closes the investigation in minutes.
4. **Watch catch-all parents.** A record with many children hanging off it amplifies every change made to it. Moving the children off it, or closing the dead ones, removes the amplifier.

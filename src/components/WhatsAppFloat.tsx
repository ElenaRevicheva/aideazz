import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, CalendarClock } from "lucide-react";
import { useTranslation } from "react-i18next";

interface WhatsAppFloatProps {
  /** Digits only, international format, no "+" — e.g. "50761666716". */
  phone?: string;
  /** Pre-filled message override. Defaults to the localized `whatsappFloat.prefill`. */
  prefill?: string;
  /** Calendly (or any) booking link shown as the after-hours fallback. */
  bookingUrl?: string;
  /** IANA timezone whose clock decides "online" vs "after hours". */
  timeZone?: string;
  /** First hour (0-23, local to timeZone) considered online. */
  openHour?: number;
  /** Last hour still considered online. e.g. 17 = online until 17:59. */
  closeHour?: number;
  /** Days of week counted as working days. 0 = Sunday … 6 = Saturday. */
  businessDays?: number[];
}

/** Hour (0-23) and weekday (0=Sun … 6=Sat) in a given IANA timezone, regardless of the visitor's own clock. */
function nowInZone(timeZone: string): { hour: number; day: number } {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "numeric",
      hour12: false,
      weekday: "short",
    }).formatToParts(new Date());
    const hourStr = parts.find((p) => p.type === "hour")?.value ?? "0";
    const wd = parts.find((p) => p.type === "weekday")?.value ?? "";
    const dayMap: Record<string, number> = {
      Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
    };
    // "24" can appear for midnight in some engines; normalise to 0.
    return { hour: parseInt(hourStr, 10) % 24, day: dayMap[wd] ?? new Date().getDay() };
  } catch {
    const d = new Date();
    return { hour: d.getHours(), day: d.getDay() };
  }
}

/**
 * Floating WhatsApp click-to-chat bubble (bottom-right).
 * No WhatsApp Business API and no backend — it just opens a wa.me deep link,
 * so it costs nothing and works on desktop + mobile.
 *
 * Time-aware: outside business hours (in `timeZone`) it stops promising a fast
 * reply and offers a booking link instead, so an after-hours lead always has a
 * concrete next step rather than messaging into silence.
 */
export default function WhatsAppFloat({
  phone = "50761666716",
  prefill,
  bookingUrl = "https://calendly.com/elena_revicheva/coffee-chat",
  timeZone = "America/Panama",
  openHour = 9,
  closeHour = 17, // online 09:00–17:59 Panama; flips to "Away" at 18:00 (6pm)
  businessDays = [1, 2, 3, 4, 5, 6], // Mon–Sat; Sunday off
}: WhatsAppFloatProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const { hour, day } = nowInZone(timeZone);
  const online = businessDays.includes(day) && hour >= openHour && hour <= closeHour;

  const message = prefill ?? t("whatsappFloat.prefill");
  const chatUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-72 overflow-hidden rounded-2xl border border-green-400/30 bg-slate-900/95 shadow-2xl shadow-green-500/20 backdrop-blur"
          >
            <div className="flex items-center gap-3 bg-green-600 px-4 py-3">
              <MessageCircle className="h-5 w-5 text-white" />
              <span className="font-semibold text-white">{t("whatsappFloat.header")}</span>
              <span
                className={`ml-auto flex items-center gap-1.5 text-xs font-medium ${
                  online ? "text-white" : "text-green-100/80"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    online ? "bg-green-300" : "bg-amber-300"
                  }`}
                />
                {online ? t("whatsappFloat.online") : t("whatsappFloat.away")}
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="text-white/80 transition-colors hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 p-4">
              <div className="rounded-xl rounded-tl-none bg-white/10 px-3 py-2 text-sm text-gray-100">
                {online
                  ? t("whatsappFloat.greetingOnline")
                  : t("whatsappFloat.greetingAway")}
              </div>

              <a
                href={chatUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-semibold text-white shadow-lg shadow-green-500/40 transition-all hover:bg-green-500"
              >
                {online ? t("whatsappFloat.openChat") : t("whatsappFloat.sendMessage")} <Send className="h-4 w-4" />
              </a>

              {!online && (
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-purple-400/40 bg-purple-600/20 px-4 py-3 font-semibold text-purple-100 transition-all hover:bg-purple-600/30"
                >
                  <CalendarClock className="h-4 w-4" /> {t("whatsappFloat.bookCall")}
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative flex h-14 w-14 items-center justify-center">
        {/* Attention-grabbing pulse rings — only while the chat is closed. */}
        {!open && (
          <>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-40"
              style={{ animationDelay: "0.6s" }}
            />
          </>
        )}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          // Periodic "wiggle" bounce to draw the eye; still while open.
          animate={
            open
              ? { rotate: 0, scale: 1 }
              : { rotate: [0, -12, 12, -8, 8, 0], scale: [1, 1.06, 1] }
          }
          transition={
            open
              ? { duration: 0.2 }
              : { duration: 0.9, repeat: Infinity, repeatDelay: 2.4, ease: "easeInOut" }
          }
          onClick={() => setOpen((v) => !v)}
          aria-label="Open WhatsApp chat"
          className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 shadow-lg shadow-green-500/50 transition-colors hover:bg-green-500"
        >
          {open ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <MessageCircle className="h-7 w-7 text-white" />
          )}
        </motion.button>
      </div>
    </div>
  );
}

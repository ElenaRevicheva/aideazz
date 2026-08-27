import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";
import { track } from "@/lib/analytics";
import {
  NEWSLETTER_SUBSCRIBE_URL,
  PORTFOLIO_NEWSLETTER_ANCHOR,
} from "@/config/marketing";

type NewsletterSignupProps = {
  id?: string;
  className?: string;
  /** Recorded on the subscriber row so signups can be attributed to a page. */
  source?: string;
};

/**
 * Double opt-in signup. Deliberately separate from InquiryForm: an inquiry is a
 * lead the concierge replies to, a subscription is a reader — mixing them would
 * put newsletter volume through a transactional path and risk that domain.
 */
const NewsletterSignup = ({
  id = PORTFOLIO_NEWSLETTER_ANCHOR,
  className,
  source = "portfolio",
}: NewsletterSignupProps) => {
  const { i18n } = useTranslation();
  const es = i18n.language.startsWith("es");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const copy = es
    ? {
        title: "Construyendo en público, por email",
        subtitle:
          "Lo que estoy construyendo, lo que se rompió y lo que dijeron los números. Sin relleno, cancela cuando quieras.",
        placeholder: "tu@email.com",
        submit: "Suscribirme",
        sending: "Enviando…",
        check: "Revisa tu correo y haz clic en el enlace de confirmación.",
        already: "Ya estás en la lista.",
        invalid: "Ese correo no parece válido.",
        error: "No pude suscribirte ahora. Intenta de nuevo en un momento.",
        confirmNote: "Doble confirmación: no recibirás nada hasta que hagas clic.",
      }
    : {
        title: "Building in public, by email",
        subtitle:
          "What I'm building, what broke, and what the numbers actually said. No filler, unsubscribe any time.",
        placeholder: "you@email.com",
        submit: "Subscribe",
        sending: "Sending…",
        check: "Check your inbox and click the confirmation link.",
        already: "You're already on the list.",
        invalid: "That doesn't look like a valid email.",
        error: "Couldn't sign you up right now. Try again in a moment.",
        confirmNote: "Double opt-in: nothing is sent until you click confirm.",
      };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (website.trim() !== "") return; // honeypot
    if (!email.trim()) {
      toast.error(copy.invalid);
      return;
    }
    setSending(true);
    try {
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 30_000);
      const r = await fetch(NEWSLETTER_SUBSCRIBE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source, website }),
        signal: controller.signal,
      }).finally(() => window.clearTimeout(timeoutId));
      const data = (await r.json().catch(() => ({}))) as {
        ok?: boolean;
        alreadySubscribed?: boolean;
        error?: string;
      };
      if (!r.ok || !data.ok) {
        toast.error(data.error === "invalid_email" ? copy.invalid : copy.error);
        return;
      }
      toast.success(data.alreadySubscribed ? copy.already : copy.check);
      track("newsletter_signup", { already_subscribed: !!data.alreadySubscribed });
      setDone(true);
      setEmail("");
    } catch (err) {
      console.error(err);
      toast.error(copy.error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      id={id}
      className={
        className ??
        "max-w-xl mx-auto text-left rounded-2xl border border-emerald-500/25 bg-white/[0.04] p-6 sm:p-8 scroll-mt-24"
      }
    >
      <h3 className="text-xl font-semibold text-white mb-2 font-poppins">
        {copy.title}
      </h3>
      <p className="text-sm text-gray-400 mb-5">{copy.subtitle}</p>

      {done ? (
        <p className="flex items-start gap-2 text-sm text-emerald-300">
          <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{copy.check}</span>
        </p>
      ) : (
        <form onSubmit={submit} className="space-y-3">
          <div
            className="absolute -left-[9999px] opacity-0 pointer-events-none"
            aria-hidden="true"
          >
            <label htmlFor="newsletter-website">Website</label>
            <input
              id="newsletter-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="relative z-10 bg-white/5 border-white/20 text-white pointer-events-auto"
              placeholder={copy.placeholder}
              aria-label={copy.title}
            />
            <Button
              type="submit"
              disabled={sending}
              className="shrink-0 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            >
              {sending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {copy.sending}
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  {copy.submit}
                </>
              )}
            </Button>
          </div>
          <p className="text-xs text-gray-500">{copy.confirmNote}</p>
        </form>
      )}
    </div>
  );
};

export default NewsletterSignup;

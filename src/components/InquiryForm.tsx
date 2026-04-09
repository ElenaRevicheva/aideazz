import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MARKETING_INQUIRY_PROXY_URL } from "@/config/marketing";
import { Send, Loader2 } from "lucide-react";

/**
 * Phase 3: UTM from URL + Oracle business_leads via CTO AIPA (real POST, no simulation).
 */
const InquiryForm = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [utm, setUtm] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
    const next: Record<string, string> = {};
    for (const k of keys) {
      const v = searchParams.get(k);
      if (v) next[k] = v;
    }
    setUtm(next);
  }, [searchParams]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot.trim() !== "") {
      return;
    }
    if (!name.trim() && !email.trim() && !message.trim()) {
      toast.error(t("cta.inquiryValidation"));
      return;
    }
    setSending(true);
    try {
      const page_url =
        typeof window !== "undefined" ? window.location.href.split("#")[0] : "";
      const body: Record<string, string> = {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        page_url,
        ...utm,
      };
      const r = await fetch(MARKETING_INQUIRY_PROXY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await r.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!r.ok || !data.ok) {
        throw new Error(data.error || r.statusText);
      }
      toast.success(t("cta.inquirySuccess"));
      setMessage("");
    } catch (err) {
      console.error(err);
      toast.error(t("cta.inquiryError"));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto text-left">
      <h3 className="text-xl font-semibold text-white mb-2 font-poppins">{t("cta.inquiryTitle")}</h3>
      <p className="text-sm text-gray-400 mb-6">{t("cta.inquirySubtitle")}</p>
      <form onSubmit={submit} className="space-y-4">
        {/* Honeypot — leave empty; hidden from real users */}
        <div className="absolute -left-[9999px] opacity-0 pointer-events-none" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="inquiry-name" className="text-gray-300">
            {t("cta.inquiryName")}
          </Label>
          <Input
            id="inquiry-name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white/5 border-white/20 text-white"
            placeholder={t("cta.inquiryNamePlaceholder")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="inquiry-email" className="text-gray-300">
            {t("cta.inquiryEmail")}
          </Label>
          <Input
            id="inquiry-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/5 border-white/20 text-white"
            placeholder={t("cta.inquiryEmailPlaceholder")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="inquiry-message" className="text-gray-300">
            {t("cta.inquiryMessage")}
          </Label>
          <Textarea
            id="inquiry-message"
            name="message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-white/5 border-white/20 text-white resize-y min-h-[100px]"
            placeholder={t("cta.inquiryMessagePlaceholder")}
          />
        </div>
        <Button
          type="submit"
          disabled={sending}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          {sending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {t("cta.inquirySending")}
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              {t("cta.inquirySubmit")}
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default InquiryForm;

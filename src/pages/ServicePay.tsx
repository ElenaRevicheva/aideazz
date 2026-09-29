import { useEffect, useLayoutEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SERVICE_CHECKOUT_API } from "@/config/services";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ArrowLeft, CreditCard, Loader2 } from "lucide-react";

type Sku = "diagnostic_call" | "web_audit_prelim" | "web_audit_blueprint";

const SKUS: Sku[] = ["diagnostic_call", "web_audit_prelim", "web_audit_blueprint"];

/**
 * Diagnostic intake. Values go into `notes` in ENGLISH whatever the page language —
 * CTO AIPA's diagnostic-delivery.ts parses these exact labels and values.
 */
const CHANNELS: Array<{ key: string; value: string }> = [
  { key: "whatsapp", value: "WhatsApp" },
  { key: "phone", value: "Phone" },
  { key: "form", value: "Website form" },
  { key: "email", value: "Email" },
  { key: "social", value: "Instagram / social" },
  { key: "referrals", value: "Referrals / walk-in" },
];
const SALE_VALUES: Array<{ key: string; value: string }> = [
  { key: "under500", value: "Under $500" },
  { key: "s500to2k", value: "$500–2,000" },
  { key: "s2kto10k", value: "$2,000–10,000" },
  { key: "over10k", value: "Over $10,000" },
];

const chipClass = (on: boolean) =>
  `px-3 py-1.5 rounded-full text-sm border transition-colors ${
    on
      ? "border-purple-400 bg-purple-500/20 text-white"
      : "border-white/20 bg-white/5 text-gray-300 hover:border-white/40"
  }`;

const ServicePay = () => {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const preselected = searchParams.get("sku") as Sku | null;
  const inviteBlueprint = searchParams.get("invite") === "blueprint";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");
  const [website, setWebsite] = useState("");
  const [channels, setChannels] = useState<string[]>([]);
  const [saleValue, setSaleValue] = useState("");
  const [activeSku, setActiveSku] = useState<Sku>(
    preselected && SKUS.includes(preselected) ? preselected : "web_audit_prelim",
  );
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (preselected && SKUS.includes(preselected)) setActiveSku(preselected);
  }, [preselected]);

  /** LATAM-first pay page: Spanish unless ?lng=en or ?lang=en */
  useLayoutEffect(() => {
    const lng = searchParams.get("lng") ?? searchParams.get("lang");
    const target = lng === "en" ? "en" : lng === "es" ? "es" : "es";
    if (!i18n.language.startsWith(target)) {
      void i18n.changeLanguage(target);
    }
  }, [searchParams, i18n]);

  useEffect(() => {
    document.documentElement.lang = i18n.language.startsWith("es") ? "es" : "en";
  }, [i18n.language]);

  const pageUrl = typeof window !== "undefined" ? window.location.href.split("#")[0] : "";

  const composeNotes = (sku: Sku): string => {
    const free = notes.trim();
    const site = website.trim();
    if (sku !== "diagnostic_call") {
      return site ? [`Website: ${site}`, free && `Notes: ${free}`].filter(Boolean).join("\n") : free;
    }
    return [
      `Website: ${site}`,
      channels.length ? `Customers reach us via: ${channels.join(", ")}` : "",
      saleValue ? `Typical sale value: ${saleValue}` : "",
      free ? `Notes: ${free}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  };

  const checkout = async (sku: Sku) => {
    setActiveSku(sku);
    if (!name.trim() || !email.trim()) {
      toast.error(t("servicePay.validationContact"));
      return;
    }
    if (sku === "diagnostic_call" && !website.trim()) {
      toast.error(t("servicePay.validationWebsite"));
      document.getElementById("sp-website")?.focus();
      return;
    }
    setPaying(true);
    try {
      const utm: Record<string, string> = {};
      for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const) {
        const v = searchParams.get(k);
        if (v) utm[k] = v;
      }
      const body: Record<string, unknown> = {
        sku,
        name: name.trim(),
        email: email.trim(),
        company: company.trim(),
        notes: composeNotes(sku),
        page_url: pageUrl,
        ...utm,
      };
      if (sku === "web_audit_blueprint" && inviteBlueprint) {
        body.allow_blueprint = true;
      }
      const r = await fetch(SERVICE_CHECKOUT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await r.json().catch(() => ({}))) as {
        ok?: boolean;
        checkout_url?: string;
        error?: string;
        message?: string;
      };
      if (!r.ok || !data.checkout_url) {
        if (data.error === "blueprint_requires_prelim") {
          throw new Error("__BLUEPRINT__");
        }
        throw new Error(data.message || data.error || r.statusText);
      }
      window.location.href = data.checkout_url;
    } catch (e) {
      const msg =
        e instanceof Error && e.message === "__BLUEPRINT__"
          ? t("servicePay.blueprintBlocked")
          : t("servicePay.checkoutError");
      toast.error(msg);
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#05060a] via-[#0a0c14] to-[#05060a] text-white">
      <div className="container mx-auto px-6 py-12 max-w-3xl">
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-purple-300 hover:text-purple-200"
          >
            <ArrowLeft className="w-4 h-4" />
            aideazz.xyz
          </Link>
          <LanguageSwitcher
            syncQueryParam
            className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/5"
          />
        </div>

        <div className="mb-8">
          <p className="text-sm text-emerald-400 font-medium mb-2">{t("servicePay.paymentBadge")}</p>
          <h1 className="text-3xl md:text-4xl font-bold font-poppins mb-3">
            {t("servicePay.title")}
          </h1>
          <p className="text-gray-300 leading-relaxed">{t("servicePay.subtitle")}</p>
        </div>

        <div className="glass-card p-6 mb-8 border border-white/10">
          <h3 className="text-lg font-semibold mb-4">{t("servicePay.formTitle")}</h3>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="sp-name">{t("servicePay.name")}</Label>
              <Input
                id="sp-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/5 border-white/20 mt-1"
              />
            </div>
            <div>
              <Label htmlFor="sp-email">{t("servicePay.email")}</Label>
              <Input
                id="sp-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/20 mt-1"
              />
            </div>
            <div>
              <Label htmlFor="sp-company">{t("servicePay.company")}</Label>
              <Input
                id="sp-company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="bg-white/5 border-white/20 mt-1"
              />
            </div>
            <div>
              <Label htmlFor="sp-website">{t("servicePay.intake.website")}</Label>
              <Input
                id="sp-website"
                type="url"
                inputMode="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder={t("servicePay.intake.websitePlaceholder")}
                className="bg-white/5 border-white/20 mt-1"
              />
            </div>
            {activeSku === "diagnostic_call" && (
              <div className="grid gap-4 rounded-lg border border-purple-400/30 bg-purple-500/5 p-4">
                <p className="text-sm font-medium text-purple-200">{t("servicePay.intake.title")}</p>
                <div>
                  <p className="text-sm mb-2">{t("servicePay.intake.channels")}</p>
                  <div className="flex flex-wrap gap-2">
                    {CHANNELS.map((c) => {
                      const on = channels.includes(c.value);
                      return (
                        <button
                          key={c.key}
                          type="button"
                          aria-pressed={on}
                          className={chipClass(on)}
                          onClick={() =>
                            setChannels((prev) =>
                              on ? prev.filter((v) => v !== c.value) : [...prev, c.value],
                            )
                          }
                        >
                          {t(`servicePay.intake.channelOptions.${c.key}`)}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <p className="text-sm mb-2">{t("servicePay.intake.saleValue")}</p>
                  <div className="flex flex-wrap gap-2">
                    {SALE_VALUES.map((s) => (
                      <button
                        key={s.key}
                        type="button"
                        aria-pressed={saleValue === s.value}
                        className={chipClass(saleValue === s.value)}
                        onClick={() => setSaleValue(saleValue === s.value ? "" : s.value)}
                      >
                        {t(`servicePay.intake.saleOptions.${s.key}`)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div>
              <Label htmlFor="sp-notes">{t("servicePay.notes")}</Label>
              <Textarea
                id="sp-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="bg-white/5 border-white/20 mt-1"
                placeholder={t("servicePay.notesPlaceholder")}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {SKUS.map((sku) => (
            <div
              key={sku}
              className={`glass-card p-6 border transition-colors ${
                activeSku === sku ? "border-purple-400/50" : "border-white/10"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    {t(`servicePay.products.${sku}.title`)}
                  </h2>
                  <p className="text-gray-300 text-sm leading-relaxed mb-2">
                    {t(`servicePay.products.${sku}.description`)}
                  </p>
                  <p className="text-2xl font-bold text-emerald-400">
                    ${t(`servicePay.products.${sku}.price`)} USD
                  </p>
                  {sku === "diagnostic_call" && (
                    <div className="mt-4 text-sm text-gray-300">
                      <p className="font-medium text-white mb-2">
                        {t("servicePay.products.diagnostic_call.howTitle")}
                      </p>
                      <ol className="list-decimal pl-5 space-y-1 leading-relaxed">
                        <li>{t("servicePay.products.diagnostic_call.step1")}</li>
                        <li>{t("servicePay.products.diagnostic_call.step2")}</li>
                        <li>{t("servicePay.products.diagnostic_call.step3")}</li>
                      </ol>
                      <p className="mt-3 text-emerald-300/90">
                        {t("servicePay.products.diagnostic_call.credit")}
                      </p>
                    </div>
                  )}
                </div>
                <Button
                  disabled={paying}
                  onClick={() => checkout(sku)}
                  className="shrink-0 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                >
                  {paying && activeSku === sku ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <CreditCard className="w-4 h-4 mr-2" />
                  )}
                  {t("servicePay.payButton")}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card p-6 mb-8 border border-amber-500/20 bg-amber-500/5">
          <p className="text-sm text-amber-100/90 leading-relaxed">{t("servicePay.afterPayNote")}</p>
        </div>

        <p className="text-xs text-gray-500 text-center">
          {t("servicePay.footer")} · Elena Revicheva · AIdeazz
        </p>
      </div>
    </div>
  );
};

export default ServicePay;

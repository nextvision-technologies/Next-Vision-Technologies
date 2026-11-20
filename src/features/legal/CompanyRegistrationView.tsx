import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, BadgeCheck, Building2, ChevronRight, FileCheck2, Landmark,
  MapPin, Receipt, ScanLine, ShieldAlert, ShieldCheck,
} from "lucide-react";
import { company, companyDocuments, companyFaqs, registrationPromises, secpRecord } from "@/content/company";
import { emailBodies, emailLink, site, whatsappLink } from "@/content/site";
import { formatDate } from "@/lib/format";
import { buttonClass } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcons";
import { Faq } from "@/components/sections/Blocks";
import { BreadcrumbJsonLd } from "@/components/seo/SiteJsonLd";
import { DocumentGallery } from "./DocumentGallery";

const facts = [
  { icon: Building2, label: "Legal name", value: company.legalName },
  { icon: FileCheck2, label: "SECP Corporate Unique ID (CUIN)", value: company.cuin },
  { icon: Receipt, label: "FBR registration No.", value: company.ntn },
  { icon: Landmark, label: "Company type", value: company.type },
  { icon: MapPin, label: "Registered office", value: company.registeredOffice, wide: true },
];

export function CompanyRegistrationView() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Home", href: "/" }, { label: "Company Registration" }]} />

      {/* ---------- Hero ---------- */}
      <header className="relative overflow-hidden border-b border-line bg-gradient-to-b from-brand-50 via-card to-card">
        <div className="container-page relative flex flex-col gap-5 py-12 sm:py-14">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
              <li><Link href="/" className="hover:text-brand-600">Home</Link></li>
              <li><ChevronRight className="size-3.5" aria-hidden /></li>
              <li>Legal</li>
              <li><ChevronRight className="size-3.5" aria-hidden /></li>
              <li aria-current="page" className="text-heading">Company Registration</li>
            </ol>
          </nav>
          <div className="flex items-center gap-4">
            <span className="solid-primary inline-flex size-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-lift">
              <BadgeCheck className="size-7" strokeWidth={1.8} aria-hidden />
            </span>
            <h1 className="text-3xl leading-tight font-extrabold text-heading sm:text-5xl">Company Registration</h1>
          </div>
          <p className="max-w-3xl text-lg leading-relaxed text-muted">
            {company.legalName} is a registered company in Pakistan, incorporated with the SECP and registered with the FBR.
            Here are our official documents, and how you can verify them yourself in under a minute.
          </p>
          <div className="flex flex-wrap gap-2.5 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-card px-3 py-1.5 font-semibold text-success"><ShieldCheck className="size-4" aria-hidden /> SECP incorporated</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-card px-3 py-1.5 font-semibold text-success"><ShieldCheck className="size-4" aria-hidden /> FBR registered taxpayer</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1.5 text-muted"><MapPin className="size-4" aria-hidden /> Lahore, Pakistan</span>
          </div>
        </div>
      </header>

      <div className="container-page flex flex-col gap-16 py-12 sm:py-16">
        {/* ---------- Key facts ---------- */}
        <section aria-labelledby="facts">
          <h2 id="facts" className="text-2xl font-bold text-heading sm:text-3xl">Registration details</h2>
          <p className="mt-2 max-w-2xl text-muted">Copied exactly from our government-issued documents below.</p>
          <dl className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {facts.map(({ icon: Icon, label, value, wide }) => (
              <div key={label} className={`flex gap-4 rounded-2xl border border-line bg-card p-5 shadow-card ${wide ? "sm:col-span-2" : ""}`}>
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><Icon className="size-5" aria-hidden /></span>
                <div className="min-w-0">
                  <dt className="text-xs font-semibold tracking-wider text-muted uppercase">{label}</dt>
                  <dd className="mt-1 font-semibold break-words text-heading">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm text-muted">Incorporated under the {company.law} by the {company.registrar}. Tax office: {company.taxOffice}.</p>
        </section>

        {/* ---------- Documents ---------- */}
        <section aria-labelledby="documents">
          <h2 id="documents" className="text-2xl font-bold text-heading sm:text-3xl">Official documents</h2>
          <p className="mt-2 max-w-2xl text-muted">Select a document to view it in full.</p>
          <DocumentGallery documents={companyDocuments} owner={company.legalName} />
        </section>

        {/* ---------- Verify ---------- */}
        <section aria-labelledby="verify" className="section-dark relative overflow-hidden rounded-[1.75rem] p-7 text-white sm:p-10">
          <span className="bg-logo-gradient absolute -top-24 -right-24 size-72 rounded-full opacity-25 blur-3xl" aria-hidden />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-glow-400 uppercase">Don&apos;t just trust us, check</p>
              <h2 id="verify" className="mt-2 text-2xl font-bold sm:text-3xl">Verify our registration yourself</h2>
              <ol className="mt-6 flex flex-col gap-4">
                {[
                  <>Open the official SECP verification page using the button below, or scan the QR code on our Certificate of Incorporation.</>,
                  <>Check that the record shows <strong>{company.legalName}</strong> with CUIN <strong>{company.cuin}</strong>.</>,
                  <>For tax registration, search registration No. <strong>{company.ntn}</strong> on the FBR website.</>,
                ].map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="solid-primary inline-flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold">{i + 1}</span>
                    <span className="pt-0.5 text-white/80">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex flex-col gap-3">
              <a href={company.secpVerifyUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("primary", "lg", "w-full")}>
                <ScanLine className="size-5" aria-hidden /> Verify on SECP <ArrowUpRight className="size-4" aria-hidden />
              </a>
              <a href={company.fbrUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("light", "lg", "w-full")}>
                Visit FBR website <ArrowUpRight className="size-4" aria-hidden />
              </a>
              <p className="text-center text-xs text-white/60">Both links open the official government websites in a new tab.</p>
            </div>
          </div>
        </section>

        {/* ---------- SECP online record ---------- */}
        <section aria-labelledby="secp-record" className="grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-brand-600 uppercase">Official online record</p>
            <h2 id="secp-record" className="mt-2 text-2xl font-bold text-heading sm:text-3xl">What SECP&apos;s verification page shows</h2>
            <p className="mt-3 leading-relaxed text-muted">
              This is the public record SECP holds for our company, as shown on its &ldquo;Verify Company Information&rdquo; page.
              The applicant&apos;s national ID number is hidden here for privacy; you can see the complete record on the SECP website.
            </p>
            <a href={company.secpVerifyUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("primary", "md", "mt-6")}>
              See it live on SECP <ArrowUpRight className="size-4" aria-hidden />
            </a>
          </div>
          <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-card">
            <div className="flex items-center justify-between gap-3 border-b border-line bg-surface px-5 py-3.5">
              <span className="flex items-center gap-2 text-sm font-bold text-heading"><Landmark className="size-4 text-brand-600" aria-hidden /> SECP · Verify Company Information</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-success px-2.5 py-0.5 text-xs font-bold text-white"><BadgeCheck className="size-3.5" aria-hidden /> Verified</span>
            </div>
            <dl className="divide-y divide-line">
              {secpRecord.rows.map((r) => (
                <div key={r.label} className="grid gap-1 px-5 py-3 sm:grid-cols-[13rem_1fr] sm:gap-4">
                  <dt className="text-sm font-semibold text-muted">{r.label}</dt>
                  <dd className="text-sm font-semibold text-heading">{r.value}</dd>
                </div>
              ))}
            </dl>
            <p className="border-t border-line bg-surface px-5 py-2.5 text-xs text-muted">Record checked on {formatDate(secpRecord.checked)} at leap.secp.gov.pk</p>
          </div>
        </section>

        {/* ---------- What it means ---------- */}
        <section aria-labelledby="means">
          <h2 id="means" className="text-2xl font-bold text-heading sm:text-3xl">What this means for you</h2>
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            {registrationPromises.map((p) => (
              <div key={p.title} className="flex gap-4 rounded-2xl border border-line p-6">
                <ShieldCheck className="mt-0.5 size-6 shrink-0 text-brand-600" aria-hidden />
                <div>
                  <h3 className="font-bold text-heading">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Fraud notice ---------- */}
        <aside className="flex flex-col gap-4 rounded-2xl border border-glow-400/30 bg-glow-100/50 p-6 sm:flex-row sm:p-7" aria-labelledby="fraud">
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-glow-400 text-on-warm"><ShieldAlert className="size-5" aria-hidden /></span>
          <div>
            <h2 id="fraud" className="font-bold text-heading">Protect yourself from fraud</h2>
            <p className="mt-1 text-sm leading-relaxed text-body">
              We never ask for fees for jobs or internships, and we never take deposits or offer investment, MLM or lottery schemes.
              All payments are made only against a signed agreement or an official invoice from {company.legalName}.
              If someone contacts you in our name and asks for money, email <a href={emailLink("Verification request - Next Vision Technologies", emailBodies.verification)} className="font-semibold text-brand-600 hover:underline">{site.email}</a> before you pay.
            </p>
          </div>
        </aside>

        {/* ---------- FAQ ---------- */}
        <section><Faq items={companyFaqs} /></section>

        {/* ---------- Contact ---------- */}
        <section className="section-dark relative overflow-hidden rounded-[1.5rem] p-7 text-white sm:p-9">
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex-1">
              <p className="font-display text-xl font-bold">Need our documents for vendor onboarding?</p>
              <p className="mt-1 text-white/70">We can share certified copies and our company profile for your procurement or compliance team.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className={buttonClass("primary")}>Contact us <ArrowRight className="size-4" /></Link>
              <a href={whatsappLink("Hi Next Vision, I'd like your company registration documents.")} target="_blank" rel="noopener noreferrer" className={buttonClass("light")}>
                <SocialIcon name="whatsapp" className="size-4" /> WhatsApp
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

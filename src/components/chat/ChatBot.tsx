"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { getReply, welcome, type Lang, type Reply } from "@/content/chatbot";
import { services } from "@/content/services";
import { RichText } from "@/components/content/RichText";

type Msg = { from: "bot" | "user"; text: string; chips?: string[] };
type LeadStep = null | "name" | "phone" | "service";

const ALL_CHIPS = new Set([
  "Services", "Pricing", "Get a quote", "Book a demo", "Talk to a human", "Quote chahiye", "Demo book karein", "Insaan se baat",
  "AI chatbot", "Website", "SEO", "Mobile app", "Website cost", "Office location", "Contact", "Our team", "Portfolio", "About",
  "Refund policy", "Payment", "Courses", "Jobs",
]);

const leadText = {
  en: {
    name: "What's your name?",
    phone: (n: string) => `Nice to meet you, ${n}! What's your **WhatsApp or phone number**?`,
    badPhone: "That number looks incomplete. Please share a full phone or WhatsApp number, e.g. +92 300 1234567.",
    service: "Which service do you need? Pick one below or type it.",
    sending: "Sending your request…",
    done: (n: string) => `Thank you, ${n}! ✅ Your request has been sent. Our team will contact you within **24 hours**. Anything else I can help with?`,
    error: "Sorry, I couldn't send that. Please use the [contact form](/contact) or WhatsApp us.",
  },
  ur: {
    name: "Aapka naam kya hai?",
    phone: (n: string) => `Aap se mil kar khushi hui, ${n}! Apna **WhatsApp ya phone number** batayein.`,
    badPhone: "Yeh number adhoora lag raha hai. Poora phone ya WhatsApp number likhein, jaise +92 300 1234567.",
    service: "Aapko kaun si service chahiye? Neeche se chunein ya likh dein.",
    sending: "Aapki request bheji ja rahi hai…",
    done: (n: string) => `Shukriya, ${n}! ✅ Aapki request bhej di gayi hai. Hamari team **24 ghante** mein aap se rabta karegi. Kuch aur madad chahiye?`,
    error: "Maazrat, request nahi ja saki. [Contact form](/contact) use karein ya WhatsApp par message karein.",
  },
};

const serviceChips = ["Website", "AI chatbot", "AI automation", "Mobile app", "SEO", "Digital marketing", "Shopify store", "Other"];

function BotText({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <span key={i} className="block min-h-[0.5em]">
          <RichText text={line} linkClassName="font-semibold text-brand-600 underline underline-offset-2" />
        </span>
      ))}
    </>
  );
}

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const [lead, setLead] = useState<LeadStep>(null);
  const [leadData, setLeadData] = useState({ name: "", phone: "" });
  const [teaser, setTeaser] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Gentle teaser bubble after a few seconds (once per visit)
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("nv-chat-teaser") === "1"; } catch { /* storage blocked */ }
    if (seen) return;
    const t = setTimeout(() => setTeaser(true), 6000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  function dismissTeaser() {
    setTeaser(false);
    try { sessionStorage.setItem("nv-chat-teaser", "1"); } catch { /* storage blocked */ }
  }

  function openChat() {
    dismissTeaser();
    setOpen(true);
    if (msgs.length === 0) setMsgs([{ from: "bot", ...welcome.en }]);
    setTimeout(() => inputRef.current?.focus(), 150);
  }

  function botSay(reply: Reply | string, delay = 550) {
    setTyping(true);
    const r = typeof reply === "string" ? { text: reply } : reply;
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: "bot", text: r.text, chips: r.chips }]);
    }, delay + Math.min(r.text.length * 4, 700));
  }

  async function submitLead(service: string, l: Lang) {
    botSay(leadText[l].sending, 200);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: leadData.name, phone: leadData.phone, service, details: "Sent from the website chatbot", variant: "quote" }),
      });
      if (!res.ok) throw new Error();
      botSay({ text: leadText[l].done(leadData.name), chips: l === "ur" ? ["Services", "Pricing"] : ["Services", "Pricing"] }, 900);
    } catch {
      botSay(leadText[l].error, 900);
    }
  }

  function send(raw: string) {
    const text = raw.trim();
    if (!text) return;
    setInput("");
    setMsgs((m) => [...m, { from: "user", text }]);

    // Lead capture steps
    if (lead === "name") {
      const name = text.replace(/^(my name is|i am|i'm|mera naam|naam)\s+/i, "").split(" ").slice(0, 3).join(" ");
      setLeadData((d) => ({ ...d, name }));
      setLead("phone");
      botSay(leadText[lang].phone(name));
      return;
    }
    if (lead === "phone") {
      const digits = text.replace(/\D/g, "");
      if (digits.length < 7) { botSay(leadText[lang].badPhone); return; }
      setLeadData((d) => ({ ...d, phone: text }));
      setLead("service");
      botSay({ text: leadText[lang].service, chips: serviceChips });
      return;
    }
    if (lead === "service") {
      setLead(null);
      const match = services.find((s) => s.title.toLowerCase().includes(text.toLowerCase()) || text.toLowerCase().includes(s.title.toLowerCase()));
      void submitLead(match?.title ?? text, lang);
      return;
    }

    // Normal answer
    const { reply, lang: detected } = getReply(text);
    const l = ALL_CHIPS.has(text) ? lang : detected; // chips keep the visitor's language
    setLang(l);
    const r = l === detected ? reply : getReplyInLang(text, l);
    botSay(r);
    if (r.action === "lead") {
      setLead("name");
      setTimeout(() => botSay(leadText[l].name, 300), 900);
    }
  }

  // Same intent, other language (used when a chip is clicked mid-conversation)
  function getReplyInLang(text: string, l: Lang): Reply {
    const { reply } = getReply(l === "ur" ? `${text} hai` : text);
    return reply;
  }

  return (
    <>
      {/* Teaser */}
      {teaser && !open && (
        <div className="animate-rise fixed right-[max(1.25rem,env(safe-area-inset-right))] bottom-[calc(max(1.25rem,env(safe-area-inset-bottom))+4.75rem)] z-40 w-64 rounded-2xl border border-line bg-white p-4 pr-9 text-sm text-navy-900 shadow-lift">
          <button type="button" onClick={dismissTeaser} aria-label="Dismiss" className="absolute top-2.5 right-2.5 text-muted hover:text-navy-900"><X className="size-4" /></button>
          <button type="button" onClick={openChat} className="text-left">Hi 👋 Need help with your project? <strong className="text-brand-600">Ask me anything!</strong></button>
        </div>
      )}

      {/* Launcher */}
      <button type="button" onClick={() => (open ? setOpen(false) : openChat())} aria-label={open ? "Close chat" : "Open chat assistant"} aria-expanded={open}
        className="bg-brand-gradient fixed right-[max(1.25rem,env(safe-area-inset-right))] bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-50 inline-flex size-15 items-center justify-center rounded-full text-white shadow-lift ring-4 ring-white/70 transition hover:scale-105">
        {open ? <X className="size-7" /> : <MessageCircle className="size-7" />}
        {!open && <span className="absolute top-0.5 right-0.5 size-3.5 rounded-full border-2 border-white bg-emerald-400" aria-hidden />}
      </button>

      {/* Panel */}
      {open && (
        <section role="dialog" aria-label="Next Vision chat assistant"
          className="animate-rise fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[calc(max(1.25rem,env(safe-area-inset-bottom))+5rem)] z-50 flex h-[min(36rem,calc(100dvh-8rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-[0_30px_80px_-20px_rgb(31_10_77/0.45)] [animation-duration:.25s]">
          {/* Header */}
          <header className="bg-navy-radial relative flex items-center gap-3 px-4 py-3.5 text-white">
            <div className="bg-pixel-grid pointer-events-none absolute inset-0" aria-hidden />
            <span className="relative inline-flex size-10 items-center justify-center rounded-full bg-white">
              <Image src="/brand/mark.svg" alt="" width={28} height={28} className="size-7" />
              <span className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-navy-950 bg-emerald-400" />
            </span>
            <div className="relative flex-1">
              <p className="font-display text-sm font-bold">Next Vision Assistant</p>
              <p className="text-xs text-white/70">Online · English &amp; Roman Urdu</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="relative inline-flex size-8 items-center justify-center rounded-full hover:bg-white/10"><X className="size-5" /></button>
          </header>

          {/* Messages */}
          <div ref={listRef} data-lenis-prevent className="flex flex-1 flex-col gap-3 overflow-y-auto bg-surface px-4 py-4" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={`flex flex-col gap-2 ${m.from === "user" ? "items-end" : "items-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  m.from === "user" ? "bg-brand-gradient rounded-br-md text-white" : "rounded-bl-md border border-line bg-white text-ink shadow-sm"}`}>
                  {m.from === "bot" ? <BotText text={m.text} /> : m.text}
                </div>
                {m.from === "bot" && m.chips && i === msgs.length - 1 && !typing && (
                  <div className="flex flex-wrap gap-1.5">
                    {m.chips.map((c) => (
                      <button key={c} type="button" onClick={() => send(c)}
                        className="rounded-full border border-brand-600/30 bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 transition hover:bg-brand-600 hover:text-white">
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className="flex w-fit gap-1 rounded-2xl rounded-bl-md border border-line bg-white px-4 py-3" aria-label="Assistant is typing">
                {[0, 1, 2].map((d) => <span key={d} className="size-2 animate-bounce rounded-full bg-brand-600/60" style={{ animationDelay: `${d * 0.15}s` }} />)}
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2 border-t border-line bg-white p-3">
            <label htmlFor="nv-chat-input" className="sr-only">Type your message</label>
            <input id="nv-chat-input" ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} autoComplete="off"
              placeholder={lead === "phone" ? "+92 300 1234567" : lang === "ur" ? "Apna sawal likhein…" : "Type your question…"}
              className="h-11 flex-1 rounded-full border border-line bg-surface px-4 text-sm text-ink outline-none focus:border-brand-600 focus:ring-4 focus:ring-brand-100" />
            <button type="submit" aria-label="Send" disabled={!input.trim()}
              className="bg-brand-gradient inline-flex size-11 shrink-0 items-center justify-center rounded-full text-white transition disabled:opacity-40">
              <Send className="size-4" />
            </button>
          </form>
        </section>
      )}
    </>
  );
}

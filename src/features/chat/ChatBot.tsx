"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import { Hand, LoaderCircle, MessageCircle, X } from "lucide-react";

/**
 * Chat launcher: the floating button and the teaser bubble.
 * The chat window itself (ChatPanel, with all replies and matching code) is split into its own
 * chunk and only downloaded when the visitor shows interest (hover, focus or click).
 */
const loadPanel = () => import("./ChatPanel");
const ChatPanel = lazy(loadPanel);

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false); // panel stays mounted once opened, so the conversation is kept
  const [teaser, setTeaser] = useState(false);

  // Gentle teaser bubble after a few seconds (once per visit)
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("nv-chat-teaser") === "1"; } catch { /* storage blocked */ }
    if (seen) return;
    const t = setTimeout(() => setTeaser(true), 6000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function dismissTeaser() {
    setTeaser(false);
    try { sessionStorage.setItem("nv-chat-teaser", "1"); } catch { /* storage blocked */ }
  }

  function openChat() {
    dismissTeaser();
    setLoaded(true);
    setOpen(true);
  }

  // Start downloading the panel as soon as the visitor reaches for the button
  const prefetch = () => void loadPanel();

  return (
    <>
      {/* Teaser */}
      {teaser && !open && (
        <div className="animate-rise fixed right-[max(1.25rem,env(safe-area-inset-right))] bottom-[calc(max(1.25rem,env(safe-area-inset-bottom))+4.75rem)] z-40 w-64 rounded-2xl border border-line bg-card p-4 pr-9 text-base text-heading shadow-lift">
          <button type="button" onClick={dismissTeaser} aria-label="Dismiss" className="absolute top-2 right-2 inline-flex size-8 items-center justify-center text-muted hover:text-heading"><X className="size-4" /></button>
          <button type="button" onClick={openChat} onPointerEnter={prefetch} className="text-left"><Hand className="mr-1 inline size-4 -translate-y-px text-brand-600" aria-hidden />Hi! Need help with your project? <strong className="text-brand-600">Ask me anything!</strong></button>
        </div>
      )}

      {/* Launcher */}
      <button type="button" onClick={() => (open ? setOpen(false) : openChat())} onPointerEnter={prefetch} onFocus={prefetch}
        aria-label={open ? "Close chat" : "Open chat assistant"} aria-expanded={open}
        className="solid-primary fixed right-[max(1.25rem,env(safe-area-inset-right))] bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-50 inline-flex size-15 items-center justify-center rounded-full shadow-lift ring-4 ring-card/70 transition hover:scale-105">
        {open ? <X className="size-7" /> : <MessageCircle className="size-7" />}
        {!open && <span className="absolute top-0.5 right-0.5 size-3.5 rounded-full border-2 border-card bg-emerald-400" aria-hidden />}
      </button>

      {/* Panel (lazy) */}
      {loaded && (
        <Suspense fallback={open ? <PanelLoading /> : null}>
          <ChatPanel open={open} onClose={() => setOpen(false)} />
        </Suspense>
      )}
    </>
  );
}

function PanelLoading() {
  return (
    <div role="status" aria-label="Loading chat"
      className="fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[calc(max(1.25rem,env(safe-area-inset-bottom))+5rem)] z-50 flex size-16 items-center justify-center rounded-2xl border border-line bg-card shadow-lift">
      <LoaderCircle className="size-6 animate-spin text-brand-600" />
    </div>
  );
}

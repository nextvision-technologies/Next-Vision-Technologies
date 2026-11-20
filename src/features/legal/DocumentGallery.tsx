"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { BadgeCheck, ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { CompanyDocument } from "@/content/company";
import { formatDate } from "@/lib/format";

/**
 * Official document cards. "View document" opens the full document in a popup on the same page
 * (native <dialog>: Esc closes it, focus is trapped). Arrow keys or buttons move between documents.
 */
export function DocumentGallery({ documents, owner }: { documents: CompanyDocument[]; owner: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const doc = documents[index];

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = (dir: 1 | -1) => setIndex((i) => (i + dir + documents.length) % documents.length);

  return (
    <>
      <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {documents.map((d, i) => (
          <article key={d.slug} id={d.slug} className="group flex flex-col overflow-hidden rounded-card border border-line bg-card shadow-card transition hover:-translate-y-1 hover:shadow-lift">
            <button type="button" onClick={() => open(i)} aria-label={`View ${d.title}`}
              className="relative block aspect-[1/1.414] cursor-zoom-in overflow-hidden border-b border-line bg-surface p-3 sm:p-4">
              <Image src={d.image} alt={`${d.title} of ${owner}, issued by ${d.issuer}`} fill
                sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 92vw" className="object-contain p-3 drop-shadow-md transition duration-500 group-hover:scale-[1.03] sm:p-4" />
              <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-success px-2.5 py-1 text-xs font-bold text-white shadow">
                <BadgeCheck className="size-3.5" aria-hidden /> Official
              </span>
              <span className="absolute right-3 bottom-3 inline-flex size-10 items-center justify-center rounded-full bg-night-900/80 text-white opacity-0 transition group-hover:opacity-100">
                <Expand className="size-4" aria-hidden />
              </span>
            </button>
            <div className="flex flex-1 flex-col gap-2 p-6">
              <span className="text-xs font-semibold tracking-wider text-brand-600 uppercase">{d.issuer}</span>
              <h3 className="text-lg font-bold text-heading">{d.title}</h3>
              <p className="text-sm font-medium text-heading">{d.reference} · {formatDate(d.date)}</p>
              <p className="text-sm leading-relaxed text-muted">{d.summary}</p>
              <button type="button" onClick={() => open(i)} className="mt-auto inline-flex w-fit items-center gap-1.5 pt-4 text-sm font-semibold text-brand-600 hover:text-brand-700">
                <Expand className="size-4" aria-hidden /> View document
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Popup viewer */}
      <dialog ref={dialogRef} aria-label={doc.title} data-lenis-prevent
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        onKeyDown={(e) => { if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); }}
        className="m-auto h-[94dvh] max-h-none w-[min(94vw,calc((94dvh-8.5rem)/1.414+2rem))] min-w-[min(94vw,22rem)] max-w-none overflow-hidden rounded-2xl border border-line bg-card p-0 text-body shadow-lift backdrop:bg-night-950/80 backdrop:backdrop-blur-sm">
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-3 border-b border-line px-4 py-3 sm:px-5">
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold text-heading">{doc.title}</p>
              <p className="line-clamp-2 text-xs text-muted">{doc.issuer} · {doc.reference}</p>
            </div>
            <span className="hidden text-xs font-semibold text-muted sm:inline">{index + 1} / {documents.length}</span>
            <button type="button" onClick={close} aria-label="Close" autoFocus
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-heading hover:bg-surface">
              <X className="size-5" />
            </button>
          </div>

          {/* The whole page always fits: no scrolling inside the popup */}
          <div className="relative min-h-0 flex-1 bg-surface">
            <Image key={doc.image} src={doc.image} alt={`${doc.title} of ${owner}, full size`} fill
              sizes="(min-width: 900px) 48rem, 94vw" className="object-contain p-2 sm:p-3" />
          </div>

          {documents.length > 1 && (
            <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3 sm:px-5">
              <button type="button" onClick={() => step(-1)} className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-semibold text-heading hover:bg-surface">
                <ChevronLeft className="size-4" aria-hidden /> Previous
              </button>
              <span className="text-xs text-muted sm:hidden">{index + 1} / {documents.length}</span>
              <button type="button" onClick={() => step(1)} className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-semibold text-heading hover:bg-surface">
                Next <ChevronRight className="size-4" aria-hidden />
              </button>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}

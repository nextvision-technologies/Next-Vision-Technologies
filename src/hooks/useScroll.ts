"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

/*
 * One shared, passive, rAF-throttled scroll listener for the whole site.
 * Header, reading progress and the pinned hero all subscribe to it instead of each
 * adding their own window listener, so scrolling runs at most one batch of work per frame.
 */

type Listener = () => void;
const listeners = new Set<Listener>();
let frame = 0;

function flush() {
  frame = 0;
  listeners.forEach((l) => l());
}
function onScroll() {
  if (!frame) frame = requestAnimationFrame(flush);
}

/** Call `listener` once per animation frame while the page scrolls. Returns an unsubscribe function. */
export function subscribeScroll(listener: Listener) {
  if (listeners.size === 0) window.addEventListener("scroll", onScroll, { passive: true });
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      frame = 0;
    }
  };
}

/** Runs `callback` on every scroll frame (and once on mount). The latest callback is always used. */
export function useScrollEffect(callback: () => void) {
  const ref = useRef(callback);
  useEffect(() => {
    ref.current = callback;
  });
  useEffect(() => {
    const run = () => ref.current();
    run();
    return subscribeScroll(run);
  }, []);
}

/** True once the page has scrolled past `offset` px. Re-renders only when the answer changes. */
export function useScrolledPast(offset: number) {
  return useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > offset,
    () => false,
  );
}

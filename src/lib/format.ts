// Small formatting helpers shared by pages and components.

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });

/** "2026-07-03" -> "3 Jul 2026" (UTC, so server and browser agree) */
export const formatDate = (iso: string) => dateFmt.format(new Date(iso + "T00:00:00Z"));

/** URL-safe id for headings, used by the table of contents */
export const headingId = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

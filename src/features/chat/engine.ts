// Rule-based reply matching for the website assistant. Replies themselves live in content/chatbot.ts.
import { fallback, intents } from "@/content/chatbot";
import type { Intent, Lang, Reply } from "@/types/content";

const ROMAN_URDU = new Set([
  "kya", "kia", "hai", "hain", "hy", "he", "ap", "aap", "apka", "aapka", "apki", "aapki", "mujhe", "muje", "mjhe", "mera", "meri", "mere", "chahiye", "chaiye", "chahye",
  "kitna", "kitne", "kitni", "kaise", "kese", "kaisay", "kesay", "karna", "krna", "karni", "krni", "karwana", "krwana", "banwana", "bnwana", "banwani", "bnwani",
  "nahi", "nai", "haan", "han", "ji", "jee", "kab", "kahan", "kidhar", "kyun", "kyu", "kon", "kaun", "konsi", "kis", "ka", "ki", "ke", "ko", "se", "sy", "mein", "mai",
  "acha", "accha", "theek", "thik", "batao", "bataen", "btao", "dain", "dein", "hum", "humein", "hamein", "tum", "yar", "yaar", "bhai", "salam", "shukriya", "wala", "wali",
  "paise", "pese", "qeemat", "keemat", "kaam", "raha", "rahi", "rahe", "sakta", "sakte", "skta", "skte", "hoga", "hogi", "chahta", "chahti", "dikhao",
  "assalam", "alaikum", "aoa", "karoge", "karo", "kro", "milega", "milegi", "karein", "krein", "lagenge", "lagega", "dega", "deta", "dete", "banegi", "banega", "bnegi", "leta", "lete", "hu", "hoon", "ho", "tha", "thi", "kuch", "koi", "bhi", "aur", "lekin", "agar", "abhi",
]);

export function detectLang(text: string): Lang {
  const words = normalize(text).split(" ").filter(Boolean);
  const hits = words.filter((w) => ROMAN_URDU.has(w)).length;
  return hits >= 1 && hits / Math.max(words.length, 1) >= 0.15 ? "ur" : "en";
}

function normalize(t: string) {
  return t.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9\s.-]/g, " ").replace(/\s+/g, " ").trim();
}

function editDistance(a: string, b: string) {
  if (Math.abs(a.length - b.length) > 2) return 3;
  const d: number[][] = Array.from({ length: a.length + 1 }, (_, i) => Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)));
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1); // swapped letters
    }
  return d[a.length][b.length];
}

/** Score every intent against the message and return the best reply. Never returns empty. */
export function getReply(message: string): { reply: Reply; lang: Lang; intent: string } {
  const lang = detectLang(message);
  const text = ` ${normalize(message)} `;
  const words = text.trim().split(" ");
  let best: { intent: Intent; score: number } | null = null;

  for (const intent of intents) {
    let score = 0;
    const used = new Set<string>(); // each word of the message counts once per intent
    for (const k of new Set(intent.keywords.map(normalize))) {
      if (!k) continue;
      if (k.includes(" ")) {
        if (text.includes(` ${k} `)) score += 2 + k.split(" ").length * 0.5; // phrases weigh more
      } else if (words.includes(k)) {
        if (!used.has(k)) { used.add(k); score += k.length <= 2 ? 0.6 : 1; }
      } else if (k.length >= 6) {
        const w = words.find((x) => !used.has(x) && x.length >= 5 && editDistance(x, k) <= 1);
        if (w) { used.add(w); score += 0.9; } // typo tolerance, e.g. "webiste", "shopfy"
      }
    }
    // Services and pricing beat small talk when both match
    if (score > 0 && (intent.id.startsWith("service:") || intent.id === "pricing" || intent.id === "quote")) score += 0.25;
    if (!best || score > best.score) best = { intent, score };
  }

  if (!best || best.score < 0.6) return { reply: fallback[lang], lang, intent: "fallback" };
  return { reply: best.intent[lang], lang, intent: best.intent.id };
}

// Server-only helper (uses node:fs). Import it from server components and route handlers only.
import { existsSync } from "node:fs";
import { join } from "node:path";

/** True when a file exists in /public (checked at build time). */
export const publicFile = (...parts: string[]) => existsSync(join(process.cwd(), "public", ...parts));

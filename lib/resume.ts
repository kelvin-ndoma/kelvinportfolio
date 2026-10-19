import { stat } from "node:fs/promises";
import path from "node:path";

/** Public path of the approved CV. Drop the PDF here and the download appears on the next build. */
export const RESUME_PUBLIC_PATH = "/resume/kelvin-ndoma-mutua-cv.pdf";

export async function getResumeFile(): Promise<{ href: string; sizeKb: number } | null> {
  "use cache";
  try {
    const file = await stat(path.join(process.cwd(), "public", RESUME_PUBLIC_PATH));
    return file.isFile() ? { href: RESUME_PUBLIC_PATH, sizeKb: Math.max(1, Math.round(file.size / 1024)) } : null;
  } catch {
    return null;
  }
}

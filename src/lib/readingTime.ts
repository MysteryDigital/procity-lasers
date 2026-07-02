/**
 * Estimate reading time in minutes from raw markdown body text.
 * Average reading speed: 200 wpm.
 */
export function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

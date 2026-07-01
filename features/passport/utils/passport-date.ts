/**
 * Formats a date into a premium document string: "Month DD, YYYY"
 */
export function formatPassportDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
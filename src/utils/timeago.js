export default function timeago(date) {
  const now = new Date();
  const then = new Date(date);
  const diff = (then - now) / 1000; // seconds difference (negative if in the past)

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const seconds = diff;
  const minutes = diff / 60;
  const hours = diff / 3600;
  const days = diff / 86400;
  const months = diff / 2592000;   // approx 30 days
  const years = diff / 31536000;   // approx 365 days

  if (Math.abs(seconds) < 60) return rtf.format(Math.round(seconds), "second");
  if (Math.abs(minutes) < 60) return rtf.format(Math.round(minutes), "minute");
  if (Math.abs(hours) < 24) return rtf.format(Math.round(hours), "hour");
  if (Math.abs(days) < 30) return rtf.format(Math.round(days), "day");
  if (Math.abs(months) < 12) return rtf.format(Math.round(months), "month");

  return rtf.format(Math.round(years), "year");
}

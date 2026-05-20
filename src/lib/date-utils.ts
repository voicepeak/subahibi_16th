export const TARGET_DATE = new Date("2026-07-20T00:00:00+09:00");

export function getCountdown() {
  const now = new Date();
  const diff = TARGET_DATE.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return { days, expired: diff <= 0, remaining: diff > 0 };
}

export function isAfterEnd() {
  return !getCountdown().remaining;
}

import raw from "./text-fragments.json";

type FragDB = Record<string, string[]>;
const db = raw as FragDB;

const VOLUME_KEYS = [
  "BGT1序章",
  "第2卷",
  "第3卷",
  "第4卷",
  "BGT8 尾声 TIT",
];

const ALL_KEYS = Object.keys(db);

function clean(s: string): string {
  return s.replace(/^BGT1序章/, "").replace(/^第[2-4]卷/, "").trim();
}

export function getRandomShards(count = 1): { text: string; source?: string }[] {
  const results: { text: string; source?: string }[] = [];
  for (let i = 0; i < count; i++) {
    const key = ALL_KEYS[Math.floor(Math.random() * ALL_KEYS.length)];
    const pool = db[key];
    if (!pool || pool.length === 0) continue;
    const rawText = pool[Math.floor(Math.random() * pool.length)];
    results.push({
      text: clean(rawText),
      source: key,
    });
  }
  return results;
}

export function getVolumeShards(volumeKey: string, count = 3): { text: string; source?: string }[] {
  const pool = db[volumeKey];
  if (!pool || pool.length === 0) return [];
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((t) => ({
    text: clean(t),
    source: volumeKey,
  }));
}

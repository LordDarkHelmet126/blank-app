async function readJson(name) {
  if (typeof window === "undefined") {
    const { readFile } = await import("node:fs/promises");
    const { dirname, join } = await import("node:path");
    const { fileURLToPath } = await import("node:url");
    const root = join(dirname(fileURLToPath(import.meta.url)), "..", "data", name);
    return JSON.parse(await readFile(root, "utf8"));
  }
  const res = await fetch(`data/${name}`);
  if (!res.ok) throw new Error(`Could not load data/${name} (${res.status})`);
  return res.json();
}

export async function loadContent() {
  const [officers, factions, regions, tech] = await Promise.all([
    readJson("officers.json"),
    readJson("factions.json"),
    readJson("regions.json"),
    readJson("tech.json"),
  ]);
  return { officers, factions, regions, tech };
}

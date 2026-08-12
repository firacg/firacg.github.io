import { readdir, writeFile } from "node:fs/promises";
import { extname, join, relative, resolve, sep } from "node:path";

const root = resolve(import.meta.dirname, "..");
const publicDir = join(root, "public");
const portfolioDir = join(publicDir, "portfolio");
const supported = new Set([
  ".avif",
  ".gif",
  ".jpg",
  ".jpeg",
  ".mp4",
  ".png",
  ".svg",
  ".webm",
  ".webp",
]);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? walk(path) : [path];
    }),
  );
  return files.flat();
}

const assets = (await walk(portfolioDir))
  .filter((path) => supported.has(extname(path).toLowerCase()))
  .map((path) => `/${relative(publicDir, path).split(sep).join("/")}`)
  .sort();

await writeFile(
  join(publicDir, "portfolio-manifest.json"),
  `${JSON.stringify({ assets }, null, 2)}\n`,
  "utf8",
);
console.log(`Portfolio preload manifest: ${assets.length} assets`);

import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

const appDirectory = path.resolve(process.cwd(), "src/app");
const publicDirectory = path.resolve(process.cwd(), "public");

async function getPngDimensions(filePath: string) {
  const file = await readFile(filePath);

  expect(file.subarray(1, 4).toString("ascii")).toBe("PNG");

  return {
    width: file.readUInt32BE(16),
    height: file.readUInt32BE(20),
  };
}

describe("metadata assets", () => {
  it.each([
    ["opengraph-image.png", path.join(publicDirectory, "opengraph-image.png"), 1200, 630],
    ["icon.png", path.join(appDirectory, "icon.png"), 512, 512],
    ["apple-icon.png", path.join(appDirectory, "apple-icon.png"), 180, 180],
    ["icon-192.png", path.join(publicDirectory, "icon-192.png"), 192, 192],
  ])("ships %s at the intended size", async (_name, filePath, width, height) => {
    const asset = await stat(filePath);

    expect(asset.isFile()).toBe(true);
    await expect(getPngDimensions(filePath)).resolves.toEqual({ width, height });
  });

  it.each([
    path.join(publicDirectory, "opengraph-image.png"),
    path.join(appDirectory, "favicon.ico"),
    path.join(appDirectory, "icon.png"),
    path.join(appDirectory, "apple-icon.png"),
    path.join(publicDirectory, "icon-192.png"),
  ])("keeps %s within a five-megabyte sharing and metadata asset budget", async (filePath) => {
    const asset = await stat(filePath);

    expect(asset.size).toBeLessThan(5 * 1024 * 1024);
  });
});

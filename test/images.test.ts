import { describe, expect, it } from "vitest";
import { collectImages } from "../src/images";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

describe("collectImages", () => {
  it("returns images from input only", () => {
    const images = collectImages("nginx\n# comment\nredis:8\n", "");
    expect(images).toEqual(["nginx", "redis:8"]);
  });

  it("loads images from txt file", () => {
    const dir = mkdtempSync(join(tmpdir(), "image-sync-action-"));
    const file = join(dir, "images.txt");

    try {
      writeFileSync(file, "# comment\nbitnami/redis:8\n\npostgres:16\n", "utf8");
      const images = collectImages("", file);
      expect(images).toEqual(["bitnami/redis:8", "postgres:16"]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("merges input images and file images", () => {
    const dir = mkdtempSync(join(tmpdir(), "image-sync-action-"));
    const file = join(dir, "images.txt");

    try {
      writeFileSync(file, "postgres:16\n", "utf8");
      const images = collectImages("nginx\nredis:8\n", file);
      expect(images).toEqual(["nginx", "redis:8", "postgres:16"]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});

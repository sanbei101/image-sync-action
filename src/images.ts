import { readFileSync } from "node:fs";

function parseLines(content: string): string[] {
  return content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
}

export function collectImages(imagesInput: string, imagesFile: string): string[] {
  const fromInput = parseLines(imagesInput);

  const filePath = imagesFile.trim();
  if (!filePath) {
    return fromInput;
  }

  const fileContent = readFileSync(filePath, "utf8");
  const fromFile = parseLines(fileContent);

  return [...fromInput, ...fromFile];
}

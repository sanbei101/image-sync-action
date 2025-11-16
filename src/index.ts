import * as core from "@actions/core";
import * as exec from "@actions/exec";

export type SyncOpts = {
  registry: string;
  namespace: string;
  username: string;
  password: string;
  images: string[];
};
export function Src2Dst(image: string, opts: SyncOpts) {
  const [name, tag = "latest"] = image.split(":");

  const parts = name.split("/");
  if (parts.length > 2) {
    parts.shift(); // 处理如 ghcr.io/bitnami/redis:8
  }
  const dst = parts.join("/");

  return `${opts.registry}/${opts.namespace}/${dst}:${tag}`;
}

async function docker(cmd: string[]): Promise<void> {
  try {
    await exec.exec("docker", cmd);
  } catch (e: any) {
    core.error(`docker ${cmd.join(" ")} failed: ${e.message}`);
    throw e;
  }
}

export async function sync(opts: SyncOpts): Promise<void> {
  const { registry, username, password, images } = opts;

  core.info(`🔐 login ${registry}`);
  await exec.exec("docker", [
    "login",
    "-u",
    username,
    "-p",
    password,
    registry,
  ]);

  for (const img of images) {
    try {
      const src = img,
        dst = Src2Dst(img, opts);
      core.info(`🚚 ${src} -> ${dst}`);
      await docker(["pull", src]);
      await docker(["tag", src, dst]);
      await docker(["push", dst]);
      await docker(["image", "rm", src, dst]);
    } catch (e: any) {
      core.warning(`image: ${img} sync failed: ${e.message}, continue...`);
    }
  }

  core.info("✅ all images synced!");
}

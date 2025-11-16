import * as core from "@actions/core";
import { sync } from "./sync";

async function run(): Promise<void> {
  try {
    const registry = core.getInput("registry", { required: true });
    const namespace = core.getInput("namespace", { required: true });
    const username = core.getInput("username", { required: true });
    const password = core.getInput("password", { required: true });
    const images = core
      .getInput("images", { required: true })
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean);

    await sync({ registry, namespace, username, password, images });
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();

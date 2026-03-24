import * as core from "@actions/core";
import { sync } from "./sync";
import { collectImages } from "./images";

async function run(): Promise<void> {
  try {
    const registry = core.getInput("registry", { required: true });
    const namespace = core.getInput("namespace", { required: true });
    const username = core.getInput("username", { required: true });
    const password = core.getInput("password", { required: true });
    const source_registry = core.getInput("source_registry");
    const source_username = core.getInput("source_username");
    const source_password = core.getInput("source_password");
    const images = collectImages(
      core.getInput("images"),
      core.getInput("images_file"),
    );

    if (images.length === 0) {
      throw new Error("images and images_file are both empty");
    }

    await sync({
      registry,
      namespace,
      username,
      password,
      source_registry,
      source_username,
      source_password,
      images,
    });
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();

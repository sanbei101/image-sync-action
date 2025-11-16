import { type SyncOpts, Src2Dst } from "../src/sync";
import { describe, expect, it } from "vitest";
const testOpts: SyncOpts = {
  registry: "test.com",
  namespace: "test",
  username: "",
  password: "",
  images: [],
};
const cases = [
  {
    input: "nginx",
    expect: `${testOpts.registry}/${testOpts.namespace}/nginx:latest`,
  },
  {
    input: "nginx:1.21",
    expect: `${testOpts.registry}/${testOpts.namespace}/nginx:1.21`,
  },
  {
    input: "bitnami/redis",
    expect: `${testOpts.registry}/${testOpts.namespace}/bitnami/redis:latest`,
  },
  {
    input: "bitnami/redis:8",
    expect: `${testOpts.registry}/${testOpts.namespace}/bitnami/redis:8`,
  },
  {
    input: "ghcr.io/bitnami/redis:8",
    expect: `${testOpts.registry}/${testOpts.namespace}/bitnami/redis:8`,
  },
];

describe("Src2Dst", () => {
  for (const c of cases) {
    it(`Src2Dst(${c.input}) => ${c.expect}`, () => {
      const dst = Src2Dst(c.input, testOpts);
      expect(dst).toBe(c.expect);
    });
  }
});

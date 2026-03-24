import { type SyncOpts, Src2Dst } from "../src/sync";
import { describe, expect, it } from "vitest";
const testOpts: SyncOpts = {
  registry: "swr.cn-north-4.myhuaweicloud.com",
  namespace: "namespace",
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
  {
    input: "dhi.io/postgres:18-debian13",
    expect: `${testOpts.registry}/${testOpts.namespace}/dhi.io/postgres:18-debian13`,
  }
];

describe("Src2Dst", () => {
  for (const c of cases) {
    it(`Src2Dst(${c.input}) => ${c.expect}`, () => {
      const dst = Src2Dst(c.input, testOpts);
      expect(dst).toBe(c.expect);
    });
  }
});

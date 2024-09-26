import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  noExternal: ["@actions/core", "@actions/github", "@octokit/rest"],
});

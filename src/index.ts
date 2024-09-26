import * as github from "@actions/github";
import * as core from "@actions/core";

async function run(): Promise<void> {
  try {
    const githubToken = core.getInput("github_token");

    const labels = core
      .getInput("labels")
      .split(",")
      .filter((l) => l !== "");
    const ignoreLabels = (core.getInput("ignore_labels") || "")
      .split(",")
      .filter((l) => l !== "");

    const [owner, repo] = core.getInput("repo").split("/");
    const number =
      core.getInput("number") === ""
        ? github.context.issue.number
        : parseInt(core.getInput("number"));

    const octokit = github.getOctokit(githubToken);

    const { data: existingLabels = [] } =
      await octokit.rest.issues.listLabelsForRepo({
        owner,
        repo,
        issue_number: number,
      });

    const existingLabelNames = existingLabels.map((label) => label.name);

    await octokit.rest.issues.setLabels({
      owner,
      repo,
      issue_number: number,
      name: [
        ...labels,
        ...existingLabelNames.filter((label) => ignoreLabels.includes(label)),
      ],
    });
  } catch (e) {
    if (e instanceof Error) {
      core.error(e);
      core.setFailed(e.message);
    }
  }
}

run();

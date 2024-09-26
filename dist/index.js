"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const github = __importStar(require("@actions/github"));
const core = __importStar(require("@actions/core"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
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
            const number = core.getInput("number") === ""
                ? github.context.issue.number
                : parseInt(core.getInput("number"));
            const octokit = github.getOctokit(githubToken);
            const { data: existingLabels = [] } = yield octokit.rest.issues.listLabelsForRepo({
                owner,
                repo,
                issue_number: number,
            });
            const existingLabelNames = existingLabels.map((label) => label.name);
            yield octokit.rest.issues.setLabels({
                owner,
                repo,
                issue_number: number,
                name: [
                    ...labels,
                    ...existingLabelNames.filter((label) => ignoreLabels.includes(label)),
                ],
            });
        }
        catch (e) {
            if (e instanceof Error) {
                core.error(e);
                core.setFailed(e.message);
            }
        }
    });
}
run();

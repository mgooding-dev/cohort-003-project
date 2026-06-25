import { run, claudeCode } from "@ai-hero/sandcastle";
import { docker } from "@ai-hero/sandcastle/sandboxes/docker";

const [, , prdPath, planPath, maxIterationsArg] = process.argv;

const parsedIterations = Number(maxIterationsArg);
const maxIterations = Number.isFinite(parsedIterations) ? parsedIterations : 3;

await run({
  sandbox: docker(),
  agent: claudeCode("claude-sonnet-4-6"),
  promptFile: `.sandcastle/sandcastle-prompt.md`,
  maxIterations,
  promptArgs: {
    INPUTS: `PRD: ${prdPath}\nPlan: ${planPath}`,
  },
  hooks: {
    onSandboxReady: [{ command: "pnpm install" }],
  },
  completionSignal: "<promise>NO MORE TASKS</promise>",
});

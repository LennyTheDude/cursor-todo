---
name: worker-reviewer-iterate
description: Coordinates a subagent workflow where a `worker` implements a development task, a `code reviewer` audits the result for critical errors, flaws, and optimization opportunities, and then the `worker` iterates to apply the reviewer’s optimization suggestions. Use when the user requests implementation or other development work that requires code changes.
---

# Worker -> Code Reviewer -> Worker (Iterate)

## When to use this skill
Use this workflow for implementation-level tasks where code quality checks are important, such as feature work, refactors, bug fixes, and other development tasks that modify the codebase.

## Subagent workflow (required order)
1. **Launch a subagent worker first**
   - Create/implement the requested changes.
   - Ensure the worker’s output includes what it changed and which files are affected.

2. **Launch a subagent code reviewer after worker completion**
   - Review the worker’s output and the relevant code changes.
   - If the reviewer finds **critical errors, flaws, or opportunities to optimize**, they must write them down clearly (not just “LGTM”).
   - The reviewer’s deliverable must be structured as:
     - **Critical / must-fix** (correctness, security, broken builds, failing tests, or serious regressions)
     - **Flaws** (robustness, readability/maintainability issues, unclear logic, missing error handling)
     - **Optimization opportunities** (performance, simplification, better abstractions, reduced complexity, consistency)

3. **Launch the worker again to apply reviewer suggestions**
   - The worker must implement **all optimization suggestions** the reviewer listed.
   - If the reviewer listed **Critical / must-fix** items, the worker must fix them as well before considering the task complete.
   - The worker’s second output must include what was updated in response to each reviewer item.

## Stop conditions
- If the reviewer reports no critical errors/flaws and no optimization opportunities, the workflow can end after the first worker run.

## Final response requirements
When presenting results to the user, include:
1. A brief summary of what the worker implemented.
2. The code reviewer’s findings (including any critical/flaw/optimization items).
3. What changed during the worker’s second run to address those findings.


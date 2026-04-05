# AGENTS.md

## Cursor Cloud specific instructions

This repository (`dev-knowlege-cursor`) is currently an empty/skeleton project with only a `README.md`. As of the initial setup:

- **No application code, services, or dependencies exist.**
- **No package manager lockfiles or dependency manifests** (`package.json`, `requirements.txt`, etc.) are present.
- **No build, lint, or test configurations** are defined.
- **No Docker, devcontainer, or CI/CD configuration** exists.

### When code is added

Once source code and dependency files are introduced, future agents should:

1. Identify the package manager from the lockfile (`package-lock.json` → npm, `yarn.lock` → yarn, `pnpm-lock.yaml` → pnpm, `bun.lockb` → bun).
2. Install dependencies accordingly.
3. Check `README.md` and any docs for updated build/run/test instructions.
4. Update the VM environment update script via `SetupVmEnvironment` if new dependencies are introduced.

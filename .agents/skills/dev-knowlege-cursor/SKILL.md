```markdown
# dev-knowlege-cursor Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill covers the core development conventions and patterns for the `dev-knowlege-cursor` repository, a TypeScript project built with Next.js. It documents file naming, import/export styles, commit message conventions, and testing patterns to ensure consistency and maintainability across the codebase.

## Coding Conventions

### File Naming
- Use **camelCase** for all file names.
  - Example: `userProfile.ts`, `apiRoutes.ts`

### Import Style
- Use **alias imports** for modules.
  - Example:
    ```typescript
    import { getUser } from '@/services/userService';
    ```

### Export Style
- **Mixed** export style is used (both named and default exports).
  - Example:
    ```typescript
    // Named export
    export function fetchData() { ... }

    // Default export
    export default function handler(req, res) { ... }
    ```

### Commit Messages
- Use **conventional commit** format.
- Prefix all commits with `feat`.
- Keep commit messages concise (average ~69 characters).
  - Example:
    ```
    feat: add user authentication middleware
    ```

## Workflows

_No automated workflows detected in this repository._

## Testing Patterns

- Test files follow the `*.test.*` pattern.
  - Example: `userService.test.ts`
- Testing framework is **unknown** (not detected).
- Place test files alongside the code or in a dedicated test directory.
- Example test file:
  ```typescript
  import { getUser } from '@/services/userService';

  describe('getUser', () => {
    it('returns user data for valid ID', () => {
      // test implementation
    });
  });
  ```

## Commands
| Command | Purpose |
|---------|---------|
| /commit | Format your commit message using the conventional commit style (e.g., `feat: ...`) |
| /test   | Run all test files matching the `*.test.*` pattern |
```
# Project Context

This is a **TanStack Start** application deployed on **Cloudflare Workers**. It uses **React 19**, **Vite**, **Drizzle ORM** (D1 + SQLite), and **ORPC** for type-safe APIs.

## Tech Stack & Architecture

- **Framework:** TanStack Start (SSR/Client hybrid), TanStack Router (File-based routing).
- **Runtime:** Cloudflare Workers (via `wrangler`).
- **Language:** TypeScript (Strict).
- **Package Manager:** `bun` (Use `bun --bun` for runtime).
- **Database:** Cloudflare D1 (SQLite) accessed via Drizzle ORM.
- **API/RPC:** `orpc` (similar to tRPC) for server-client communication.
- **Styling:** Tailwind CSS v4 + Shadcn UI.
- **Linting/Formatting:** Biome (via Ultracite).

## Agent Guidelines

**CRITICAL**: This project uses `AGENTS.md` files in key directories to store context-specific instructions.

- `src/components/AGENTS.md`
- `src/integrations/AGENTS.md`
- `src/features/api/AGENTS.md`
- `src/routes/AGENTS.md`

**ALWAYS** read the `AGENTS.md` file in the directory you are working in (or creating files in) before making changes.

**MAINTENANCE RULE**: If you implement a new pattern, add a major library, or change a core architectural decision, you **MUST** update the relevant `AGENTS.md` file or this `copilot-instructions.md` file to reflect the change. Do this _before_ finishing your task.

## Critical Libraries & Best Practices

### 1. Database (Drizzle ORM)

- **Strict Schema**: Column/Table names are defined in `src/integrations/db/constants.ts`. **ALWAYS** use these constants.
- **Conventions**: The DB uses `snake_case`. Drizzle handles the mapping.
- **Migrations**: Always run `bun run db:generate` after `schema.ts` changes.

### 2. API (ORPC)

- **Type-Safe**: Use `@/features/api` for definitions.
- **Input/Output**: Define Zod schemas in `.schema.ts` files adjacent to usage.
- **No Fetch**: Never use `fetch()` for internal API calls. Use the `orpc` client hooks.

### 3. Routing (TanStack Start)

- **Server/Client**: Use `loader` in `createFileRoute` for server-side logic.
- **Layouts**: Use `_` prefix for layout files.
- **Links**: Use `<Link>` component, not `<a>`.

### 4. Auth (Better Auth)

- **Integration**: Wrappers are in `@/integrations/auth`.
- **Schema**: Auth tables are also governed by `constants.ts`.

### 5. Email (Plunk + React Email)

- **Integration**: `@/integrations/email`.
- **Sending**: `getEmailClient(env).send({...})`.
- **Templates**: React components in `@/integrations/email/templates`.
- **Dev**: Run `bun run email:dev` to preview templates.

## Core Workflows

### 1. Development

- Start dev server: `bun --bun run dev`
- Run typecheck: `bun run check` (Biome)

### 2. Database (Drizzle + Cloudflare D1)

- **Schema:** Located in `src/integrations/db/schema.ts`.
- **Constants:** ALWAYS use constants from `src/integrations/db/constants.ts` for column names (e.g., `COMMON_COLUMN_ENUM.CREATED_AT`).
- **Migration Workflow:**
  1. Modify `schema.ts`.
  2. Generate migrations: `bun run db:generate`
  3. Apply to local D1: `bun run db:local:migrate`
  4. Apply to prod D1: `bun run db:production:migrate` (CI/CD usually handles this, be careful).

### 3. Routing (TanStack Router)

- Routes are in `src/routes/`.
- Use `createFileRoute` for defining routes.
- Link: `import { Link } from "@tanstack/react-router"`.

### 4. API & Data Fetching (ORPC)

- **Definition:** Define procedures in `src/features/api/`. `public-api` and `admin-api` are separated.
- **Rules:**
  - Input/Output schemas in `.schema.ts`.
  - Implementation in `.ts` using `base` builder from `@/integrations/orpc/base`.
- **Client Usage:**
  - **Do NOT** use `fetch` directly for internal APIs.

### 6. Environment Variables

- Defined in `src/integrations/appenv/index.ts` (using T3 Env).
- **Client**: Prefix with `VITE_`.
- **Import**: `import { appenv } from "@/integrations/appenv"`.

## Documentation Maintenance

**IMPORTANT**: If you add a new library or integration to this project, you **MUST**:

1.  **Analyze**: Understand its purpose, "Do's and Don'ts", and optimal usage pattern.
2.  **Document**: Add a section to the relevant `AGENTS.md` file containing:
    - Library Name & Doc Link.
    - Critical Implementation Guidelines.
    - Best Practices (Do's/Don'ts).
3.  **Update**: Add a brief summary to this `copilot-instructions.md` file under "Critical Libraries".

## Project Structure & Conventions

- `src/integrations/`: ISOLATED modules for third-party services (DB, Email, KV, Auth, ORPC infra).
- `src/features/api/`: API router definitions and procedures.
- `src/routes/api/`: API entry points (e.g., `admin.$.ts` mounts the ORPC handler).
- `src/components/ui/`: Shadcn components.
- **KV Storage:** Use `src/integrations/kv/index.ts` wrappers instead of raw binding access.

---

# Ultracite Code Standards

This project uses **Ultracite**, a zero-config Biome preset that enforces strict code quality standards through automated formatting and linting.

## Quick Reference

- **Format code**: `bun x ultracite fix`
- **Check for issues**: `bun x ultracite check`
- **Diagnose setup**: `bun x ultracite doctor`

Biome (the underlying engine) provides extremely fast Rust-based linting and formatting. Most issues are automatically fixable.

---

## Core Principles

Write code that is **accessible, performant, type-safe, and maintainable**. Focus on clarity and explicit intent over brevity.

### Type Safety & Explicitness

- Use explicit types for function parameters and return values when they enhance clarity
- Prefer `unknown` over `any` when the type is genuinely unknown
- Use const assertions (`as const`) for immutable values and literal types
- Leverage TypeScript's type narrowing instead of type assertions
- Use meaningful variable names instead of magic numbers - extract constants with descriptive names

### Modern JavaScript/TypeScript

- Use arrow functions for callbacks and short functions
- Prefer `for...of` loops over `.forEach()` and indexed `for` loops
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safer property access
- Prefer template literals over string concatenation
- Use destructuring for object and array assignments
- Use `const` by default, `let` only when reassignment is needed, never `var`

### Async & Promises

- Always `await` promises in async functions - don't forget to use the return value
- Use `async/await` syntax instead of promise chains for better readability
- Handle errors appropriately in async code with try-catch blocks
- Don't use async functions as Promise executors

### React & JSX

- Use function components over class components
- Call hooks at the top level only, never conditionally
- Specify all dependencies in hook dependency arrays correctly
- Use the `key` prop for elements in iterables (prefer unique IDs over array indices)
- Nest children between opening and closing tags instead of passing as props
- Don't define components inside other components
- Use semantic HTML and ARIA attributes for accessibility:
  - Provide meaningful alt text for images
  - Use proper heading hierarchy
  - Add labels for form inputs
  - Include keyboard event handlers alongside mouse events
  - Use semantic elements (`<button>`, `<nav>`, etc.) instead of divs with roles

### Error Handling & Debugging

- Remove `console.log`, `debugger`, and `alert` statements from production code
- Throw `Error` objects with descriptive messages, not strings or other values
- Use `try-catch` blocks meaningfully - don't catch errors just to rethrow them
- Prefer early returns over nested conditionals for error cases

### Code Organization

- Keep functions focused and under reasonable cognitive complexity limits
- Extract complex conditions into well-named boolean variables
- Use early returns to reduce nesting
- Prefer simple conditionals over nested ternary operators
- Group related code together and separate concerns

### Security

- Add `rel="noopener"` when using `target="_blank"` on links
- Avoid `dangerouslySetInnerHTML` unless absolutely necessary
- Don't use `eval()` or assign directly to `document.cookie`
- Validate and sanitize user input

### Performance

- Avoid spread syntax in accumulators within loops
- Use top-level regex literals instead of creating them in loops
- Prefer specific imports over namespace imports
- Avoid barrel files (index files that re-export everything)

### Framework-Specific Guidance

**React 19+:**

- Use ref as a prop instead of `React.forwardRef`
- Use `use()` API for Promise unwrapping where appropriate
- Use `<Link>` from `@tanstack/react-router` for navigation

---

## Testing

- Write assertions inside `it()` or `test()` blocks
- Avoid done callbacks in async tests - use async/await instead
- Don't use `.only` or `.skip` in committed code
- Keep test suites reasonably flat - avoid excessive `describe` nesting

## When Biome Can't Help

Biome's linter will catch most issues automatically. Focus your attention on:

1. **Business logic correctness** - Biome can't validate your algorithms
2. **Meaningful naming** - Use descriptive names for functions, variables, and types
3. **Architecture decisions** - Component structure, data flow, and API design
4. **Edge cases** - Handle boundary conditions and error states
5. **User experience** - Accessibility, performance, and usability considerations
6. **Documentation** - Add comments for complex logic, but prefer self-documenting code

---

Most formatting and common issues are automatically fixed by Biome. Run `bun x ultracite fix` before committing to ensure compliance.

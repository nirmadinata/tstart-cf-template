# Routes Directory Agents

## Guidelines

- **Framework**: TanStack Router (File-based routing).
- **Structure**:
    - `__root.tsx`: The root layout.
    - Files starting with `_` are layout routes (do not add to URL path segments).
    - `.` is used for nesting (e.g., `_admin.dashboard`).
    - `$` is used for params or splats.

## Creating Routes

- Use `createFileRoute`.
- Define `loader` for data requirements.
- Define `component` for the UI.

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/my-route")({
  component: MyComponent,
  loader: async ({ context }) => {
    // Server-side data loading
  }
});

function MyComponent() {
  // ...
}
```

## CSS/Head
- We inject styles in the `head` property of routes when needed (see `_admin.tsx`).

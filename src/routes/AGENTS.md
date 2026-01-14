# Routes Directory Agents

## Critical Library: TanStack Router & Start

- **Library**: `@tanstack/react-router`, `@tanstack/react-start`.
- **Documentation**: [TanStack Router Docs](https://tanstack.com/router/latest/docs/framework/react/start/overview).

## Implementation Guidelines

### 1. File Structure
- **Root**: `__root.tsx` defines the global layout and context.
- **Layouts**: Files starting with `_` (e.g., `_admin.tsx`) are Layout Routes. They usually contain an `<Outlet />`.
- **Routes**: Normal files (e.g., `about.tsx`) or directories (e.g., `_admin.dashboard/`).
- **Dynamic**: Use `$` (e.g., `posts.$postId.tsx`).
- **Nesting**: Use `.` delimiter (e.g., `_admin.dashboard.products.tsx`).

### 2. Data Loading (`loader`)
- **Do's**:
  - Use the `loader` function exported from `createFileRoute` for server-side data fetching.
  - Use dependency injection via `context` (e.g., `context.queryClient`, `context.db`).
  - Return serializable JSON data.
- **Don'ts**:
  - Do not fetch initial data inside the component using `useEffect` (matches waterfalling).
  - Do not import server-only modules directly into client components (use `.server.ts` or loader boundary).

### 3. Components
- **Do's**:
  - Export the route component as `component`.
  - Use `<Link>` for internal navigation.
- **Don'ts**:
  - Do not use `<a>` tags for internal links (causes full reload).

## Example

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/posts/$postId")({
  // Validate params
  params: {
    parse: (params) => ({ postId: Number(params.postId) }),
  },
  // Load data
  loader: async ({ context, params }) => {
    // Access context injected in __root or server entry
    return { post: { id: params.postId, title: "Hello" } };
  },
  component: PostComponent,
});

function PostComponent() {
  const { post } = Route.useLoaderData();
  return <div>{post.title}</div>;
}
```

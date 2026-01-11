# ORPC Directory Agents

## Guidelines

- **Purpose**: Defines the API surface for the application using [ORPC](https://orpc.unstack.io/).
- **Structure**:
    - `router/`: Contains the procedure definitions.
    - `client.ts`: Exports the type-safe client with React Query integration.

## Defining Procedures

- Use `os` builder imported from `@orpc/server`.
- Define input validation using `zod`.
- Implement logic in `.handler()`.

```typescript
import { os } from "@orpc/server";
import { z } from "zod";

export const myProcedure = os
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    // Implementation
    return { success: true };
  });
```

## Client Usage

- Import `orpc` from `@/orpc/client`.
- Use standard React Query hooks: `.useQuery`, `.useMutation`.

```tsx
import { orpc } from "@/orpc/client";

// In component
const { data } = orpc.todos.listTodos.useQuery({});
```

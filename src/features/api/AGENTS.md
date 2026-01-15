# API Feature Agents

## Structure

- **Location**: `src/features/api/`.
- **Purpose**: Defines the API router and procedures for the application.
- **Organization**:
    - `lib/*.ts`: Domain-specific procedure definitions (e.g., `product.ts`).
    - `lib/*.schema.ts`: Zod schemas for inputs and outputs.
    - `lib/index.ts`: Aggregates all domain modules into the main `router`.
    - `index.ts`: Public API entry point, exporting `router` and `RouterType`.

## Creating Procedures

1. **Define Schema**: Create or update a `[domain].schema.ts` file in `lib/`.
   - Export input and output Zod schemas.
2. **Implement Procedure**: Create or update `[domain].ts`.
   - Import `base` from `@/integrations/orpc/base`.
   - Apply middleware (e.g., `injectHeadersMiddleware`) to create a builder.
   - Define the procedure using `builder.route({...})`.
   - Export the procedure constant.
3. **Register**: Add the new domain to `lib/index.ts`:
   - `import * as domain from "./domain";`
   - Add to the `router({ domain })` object.

## Conventions

- **Validation**: Use strict Zod schemas for inputs and outputs.
- **REST-friendly**: Define `method`, `summary`, and `tags` in `route()` for OpenAPI generation.
- **Return Types**: Ensure handlers return data strictly matching the output schema.
- **Simulations**: Remove any `setTimeout` or mock data when implementing real logic.

## Example

### Schema (`lib/example.schema.ts`)
```typescript
import { z } from "zod";

export const helloOutputSchema = z.object({
  message: z.string(),
});
```

### Procedure (`lib/example.ts`)
```typescript
import { base } from "@/integrations/orpc/base";
import { helloOutputSchema } from "./example.schema";

export const hello = base
  .route({
    method: "GET",
    path: "/hello",
    summary: "Say Hello",
  })
  .output(helloOutputSchema)
  .handler(async () => {
    return { message: "Hello World" };
  });
```

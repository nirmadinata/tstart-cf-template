# API Feature Agents

## Structure

- **Location**: `src/features/api/`.
- **Purpose**: Defines the API routers and procedures for the application.
- **Organization**:
    - `lib/admin-api/`: Admin-facing API procedures.
    - `lib/public-api/`: Public-facing API procedures.
    - `index.ts`: Exports the main routers (`adminApiRouter`, `publicApiRouter`).

## Creating Procedures

1. **Define Schema**: Create a `.schema.ts` file for Zod schemas (inputs/outputs).
2. **Implement Procedure**: Create a `.ts` file (or add to existing).
   - Import `base` from `@/integrations/orpc/base`.
   - Apply middleware if needed (e.g., `injectHeadersMiddleware`).
   - Define route with `builder.route({...})`.
   - Implement handler.
3. **Register**: Add the procedure to the router in `index.ts` (or the sub-router index).

## Conventions

- **Validation**: Use strict Zod schemas for inputs and outputs.
- **REST-friendly**: Define `method`, `path`, `summary`, and `tags` for OpenAPI generation.
- **Return Types**: Ensure handlers return data matching the output schema.

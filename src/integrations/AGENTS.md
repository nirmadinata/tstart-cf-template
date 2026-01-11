# Integrations Directory Agents

## Guidelines

- **Purpose**: This directory contains ISOLATED modules for third-party services and internal infrastructure.
- **Pattern**: Each subdirectory (e.g., `internal-db`, `email`) should treat itself as a standalone package/module.
- **Exports**: Expose functionality via `index.ts`. Other parts of the app should import from the integration root, not deep imports if possible.

## Modules

### `internal-db`
- **ORM**: Drizzle ORM with Cloudflare D1.
- **Access**: Use `getInternalDB()` to get the db instance.
- **Schema**: Defined in `schema.ts`.
- **Constants**: **MUST** use `constants.ts` for table and column names to ensure consistency.
- **Snake Case**: The DB is configured with `casing: "snake_case"`.

### `appenv`
- **Env Vars**: T3 Env definition. Validates environment variables at runtime.

### `email`
- Email sending logic and templates.

## Maintenance

- If you change `schema.ts`, you MUST run `bun run db:internal:generate` to generate migrations.

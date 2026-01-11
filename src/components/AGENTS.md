# Components Directory Agents

## Guidelines

- **Library**: We use [Shadcn UI](https://ui.shadcn.com/) components located in `ui/`.
- **Styling**: Tailwind CSS v4 is used for styling.
- **Utils**: Always use the `cn` utility from `@/lib/utils` for merging Tailwind classes safely.
- **Structure**:
    - `ui/`: Core primitive components (Button, Input, etc.). Do not modify these unless necessary for global style changes.
    - Create domain-specific components in sibling folders if the complexity grows.
- **Client Components**: Since we are using TanStack Start (SSR), be mindful of components that need browser APIs.

## Usage Example

```tsx
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function MyComponent({ className }: { className?: string }) {
  return (
    <div className={cn("p-4", className)}>
      <Button>Click me</Button>
    </div>
  );
}
```

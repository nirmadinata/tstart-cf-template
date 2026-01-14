# Components Directory Agents

## Critical Libraries

- **UI Framework**: React 19.
- **Styling**: Tailwind CSS v4.
- **Component Lib**: Shadcn UI (Radix UI primitives).
- **Icons**: Lucide React (standard for Shadcn).

## Implementation Guidelines

### 1. Styling (Tailwind v4)
- **Do's**:
  - Use `className` with utility classes.
  - Use the `cn()` utility (from `@/lib/utils`) to merge classes, especially when building reusable components.
  - Use CSS variables defined in `src/styles/styles.css` (or `globals.css`) for theming.
- **Don'ts**:
  - Avoid using `@apply` in CSS files unless creating a complex reusable animation or utility.
  - Do not write inline styles `style={{ ... }}` unless dynamic values are strictly required.

### 2. Shadcn UI Components
- **Location**: `src/components/ui/`.
- **Do's**:
  - Treat these as "your" components. You own the code.
  - Modify them if the design system requires it.
  - Import from `@/components/ui/component-name`.
- **Don'ts**:
  - Do not install a new Shadcn component without checking if it already exists or conflicts with existing patterns.

### 3. React 19 Features
- **Do's**:
  - Use `ref` as a prop (no need for `forwardRef` in standard cases, though Shadcn components might still use it for polymorphism).
  - Use `use()` for promise unwrapping if experimental features are enabled (check config).
- **Don'ts**:
  - Do not use `useClient` or `useServer` directives unless you are explicitly crossing the Server/Client boundary in a way TanStack Start doesn't handle automatically.

## Usage Example

```tsx
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

export function Card({ className, active, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow",
        active && "border-primary",
        className
      )}
      {...props}
    >
        {children}
        <Button variant="outline">Action</Button>
    </div>
  );
}
```

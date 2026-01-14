import { base } from "@/integrations/orpc/base";

export const router = base.prefix("/api/admin").router({});
export type RouterType = typeof router;

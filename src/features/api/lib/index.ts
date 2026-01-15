import * as products from "@/features/api/lib/product";
import { base } from "@/integrations/orpc/base";

export const router = base.prefix("/api/rpc").router({
	products,
});

export type RouterType = typeof router;

import * as products from "@/features/api/lib/public-api/product";
import { base } from "@/integrations/orpc/base";

export const router = base.prefix("/api/public").router({
	products,
});

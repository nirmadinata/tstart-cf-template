import * as products from "@/features/api/lib/public-api/product";
import { publicAPIBase } from "@/integrations/orpc/base";

export const router = publicAPIBase.prefix("/api/public").router({
	products,
});


import { Product } from "@/types/product";
export type EditableProduct = Product & { localImage?: string | ArrayBuffer | null };

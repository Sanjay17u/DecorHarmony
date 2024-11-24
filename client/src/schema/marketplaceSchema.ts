import { z } from "zod";

export const marketplaceFromSchema = z.object({
  productname: z.string().nonempty({ message: "Product name is required" }),
  productcategory: z
    .array(z.string().nonempty({ message: "Each product category is required" })) 
    .min(1, { message: "At least one product category is required" }),
  productsku: z.string().nonempty({ message: "SKU is Important!" }),
  stockquantity: z.number().min(0, { message: "Quantity is required" }),
  productprice: z.number().min(0, { message: "Price is required" }),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => file?.size !== 0, { message: "Image file is required" }), 
});

export type MarketplaceFormSchema = z.infer<typeof marketplaceFromSchema>;

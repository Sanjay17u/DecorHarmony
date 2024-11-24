import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MarketplaceFormSchema,
  marketplaceFromSchema,
} from "@/schema/marketplaceSchema";
import { useMarketplaceStore } from "@/store/useMarketplaceStore";
import { Loader2 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

const Marketplace = () => {
  const [input, setInput] = useState<MarketplaceFormSchema>({
    productname: "",
    productcategory: [],
    productsku: "",
    stockquantity: 1,
    productprice: 1,
    image: undefined,
  });
  const [errors, setErrors] = useState<Partial<MarketplaceFormSchema>>({});
  const {
    loading,
    marketplace,
    updateMarketplace,
    createMarketplace,
    getMarketplace,
  } = useMarketplaceStore();

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Validate form input
    const result = marketplaceFromSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<MarketplaceFormSchema>);
      return;
    }
  
    // Now submit the form
    try {
      const formData = new FormData();
      formData.append('productname', input.productname);
      formData.append('productcategory', JSON.stringify(input.productcategory));
      formData.append('productsku', input.productsku);
      formData.append('stockquantity', input.stockquantity.toString());
      formData.append('productprice', input.productprice.toString());
  
      if (input.image) {
        formData.append('image', input.image);
      }
  
      if (marketplace) {
        // If a marketplace exists, update it
        await updateMarketplace(formData);
      } else {
        // Otherwise, create a new marketplace
        await createMarketplace(formData);
      }
    } catch (error) {
      console.log('Form submission failed:', error);
      toast.error('Something went wrong while submitting the form.');
    }
  };
  

  useEffect(() => {
    const fetchMarketplace = async () => {
      await getMarketplace();
      if (marketplace) {
        setInput({
          productname: marketplace.productname || "",
          productcategory: marketplace.productcategory ? marketplace.productcategory.map((productcategory: string) => productcategory) : [],
          productsku: marketplace.productsku || "",
          stockquantity: marketplace.stockquantity || 1,
          productprice: marketplace.productprice || 1,
          image: undefined,
        });
      }
    };
    fetchMarketplace();
    console.log(marketplace);
  }, [getMarketplace, marketplace]);

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div>
        <div>
          <h1 className="font-extrabold text-2xl mb-5">Add Marketplace</h1>
          <form onSubmit={submitHandler}>
            <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
              {/* Product Name */}
              <div>
                <Label className="flex justify-start mb-2">Product Name</Label>
                <Input
                  type="text"
                  name="productname"
                  value={input.productname}
                  onChange={changeEventHandler}
                  placeholder="Enter product name"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.productname}
                  </span>
                )}
              </div>
              <div>
                <Label className="flex justify-start mb-2">Product SKU</Label>
                <Input
                  type="text"
                  name="productsku"
                  value={input.productsku}
                  onChange={changeEventHandler}
                  placeholder="Enter product SKU"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.productsku}
                  </span>
                )}
              </div>
              <div>
                <Label className="flex justify-start mb-2">Product Category</Label>
                <Input
                  type="text"
                  name="productcategory"
                  value={input.productcategory.join(",")}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      productcategory: e.target.value.split(",").map((category) => category.trim())
                    })
                  }
                  placeholder="e.g. Electronics, Gadgets"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.productcategory}
                  </span>
                )}
              </div>
              <div>
                <Label className="flex justify-start mb-2">Stock Quantity</Label>
                <Input
                  type="number"
                  name="stockquantity"
                  value={input.stockquantity}
                  onChange={changeEventHandler}
                  placeholder="Enter stock quantity"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.stockquantity}
                  </span>
                )}
              </div>
              <div>
                <Label className="flex justify-start mb-2">Product Price</Label>
                <Input
                  type="number"
                  name="productprice"
                  value={input.productprice}
                  onChange={changeEventHandler}
                  placeholder="Enter product price"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.productprice}
                  </span>
                )}
              </div>
              <div>
                <Label className="flex justify-start mb-2">Upload Product Image</Label>
                <Input
                  onChange={(e) =>
                    setInput({
                      ...input,
                      image: e.target.files?.[0] || undefined,
                    })
                  }
                  type="file"
                  accept="image/*"
                  name="image"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.image?.name}
                  </span>
                )}
              </div>
            </div>
            <div className="my-5 w-fit">
              {loading ? (
                <Button disabled className="bg-orange hover:bg-hoverOrange">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button className="bg-orange hover:bg-hoverOrange">
                  {marketplace
                    ? "Update Your Product"
                    : "Add Your Product"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;

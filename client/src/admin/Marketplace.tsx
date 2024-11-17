import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MarketplaceFormSchema,
  marketplaceFromSchema,
} from "@/schema/marketplaceSchema";
import { Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";

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

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Convert value to number if it's a number field
    if (name === "stockquantity" || name === "productprice") {
      setInput({
        ...input,
        [name]: value ? parseFloat(value) : 0, // If the input is empty, default to 0
      });
    } else {
      setInput({
        ...input,
        [name]: value,
      });
    }
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(input);

    // Parse stockquantity and productprice before validation
    const parsedInput = {
      ...input,
      stockquantity: parseFloat(input.stockquantity.toString()),
      productprice: parseFloat(input.productprice.toString()),
    };

    const result = marketplaceFromSchema.safeParse(parsedInput);

    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<MarketplaceFormSchema>);
      return;
    }

    // Add Marketplace Api Implementation.
    console.log(parsedInput);
  };

  const loading = false;
  const productHaiButton = false;
  const productHaiTitle = false;

  return (
    <>
      <div className="max-w-6xl mx-auto my-10">
        <div>
          <div>
            <h1 className="font-extrabold text-2xl mb-5 flex justify-start">
              {productHaiTitle
                ? "Update Marketplace Items"
                : "List Marketplace Items"}
            </h1>
            <form onSubmit={submitHandler}>
              <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
                {/* Marketplace Name */}
                <div>
                  <Label className="my-3 w-fit flex justify-start">
                    Product Name
                  </Label>
                  <Input
                    type="text"
                    value={input.productname}
                    onChange={changeEventHandler}
                    name="productname"
                    placeholder="Enter your decor item name"
                  />
                  {errors && (
                    <span className="text-xs text-red-600">
                      {errors.productname}
                    </span>
                  )}
                </div>
                <div>
                  <Label className="my-3 w-fit flex justify-start">
                    Product Category
                  </Label>
                  <Input
                    type="text"
                    value={input.productcategory}
                    onChange={(e) =>
                      setInput({
                        ...input,
                        productcategory: e.target.value.split(","),
                      })
                    }
                    name="productcategory"
                    placeholder="e.g Glass, Lamp, Mug"
                  />
                  {errors && (
                    <span className="text-xs text-red-600">
                      {errors.productcategory}
                    </span>
                  )}
                </div>
                <div>
                  <Label className="my-3 w-fit flex justify-start">
                    Product SKU
                  </Label>
                  <Input
                    type="text"
                    value={input.productsku}
                    onChange={changeEventHandler}
                    name="productsku"
                    placeholder="Enter your product dimensions"
                  />
                  {errors && (
                    <span className="text-xs text-red-600">
                      {errors.productsku}
                    </span>
                  )}
                </div>
                <div>
                  <Label className="my-3 w-fit flex justify-start">
                    Stock Quantity
                  </Label>
                  <Input
                    type="number"
                    value={input.stockquantity}
                    onChange={changeEventHandler}
                    name="stockquantity"
                    placeholder="Enter your stock availability"
                  />
                  {errors && (
                    <span className="text-xs text-red-600">
                      {errors.stockquantity}
                    </span>
                  )}
                </div>
                <div>
                  <Label className="my-3 w-fit flex justify-start">
                    Product Price
                  </Label>
                  <Input
                    type="number"
                    value={input.productprice}
                    onChange={changeEventHandler}
                    name="productprice"
                    placeholder="Enter your product price"
                  />
                  {errors && (
                    <span className="text-xs text-red-600">
                      {errors.productprice}
                    </span>
                  )}
                </div>
                <div>
                  <Label className="my-3 w-fit flex justify-start">
                    Upload Item Image
                  </Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={changeEventHandler}
                    name="image"
                  />
                  {errors.image && typeof errors.image === "string" && (
                    <span className="text-xs text-red-600">{errors.image}</span>
                  )}
                </div>
              </div>
              <div className="my-5 w-fit">
                {loading ? (
                  <Button
                    disabled
                    className="bg-orange hover:bg-hoverOrange flex"
                  >
                    <Loader2 className="animate-spin" />
                    Please Wait
                  </Button>
                ) : (
                  <Button className="bg-orange hover:bg-hoverOrange flex">
                    {productHaiButton ? "Update Your Item" : "List Your Item"}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Marketplace;

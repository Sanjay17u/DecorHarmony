/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import Image from "@/assets/HeroImage.jpg";
import EditMenu from "./EditMenu";
import { MenuFormSchema, menuSchema } from "@/schema/menuSchema"
import { useMenuStore } from "@/store/useMenuStore";

interface Menu {
  title: string;
  description: string;
  price: number;
  image: string;
}

interface Input {
  title: string;
  description: string;
  price: number;
  image: File | undefined;
}


const menus: Menu[] = [
  {
    title: 'Glass',
    description: "Lorem ipsum dolor sit amet.",
    price: 80,
    image: Image
  },
  {
    title: 'Lamp',
    description: "Lorem ipsum dolor sit amet.",
    price: 70,
    image: Image
  }
];

const AddMenu = () => {
  const [input, setInput] = useState<MenuFormSchema>({
    title: '',
    description: "",
    price: 0,
    image: undefined
  });
  
  const [open, setOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [error, setError] = useState<Partial<MenuFormSchema>>({})
  const {loading, createMenu} = useMenuStore()
  // const loading = false;

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === 'number' && name === 'price') {
      const price = Math.max(0, Number(value));
      setInput({ ...input, [name]: price });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(input);
    const result = menuSchema.safeParse(input)
    if(!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors
      setError(fieldErrors as Partial<MenuFormSchema>)
      return;
    }
    // api start yha se
    try {
      const formData = new FormData()
      formData.append("title", input.title)
      formData.append("description", input.description)
      formData.append("price", input.price.toString())
      if (input.image) formData.append("image", input.image);
      await createMenu(formData)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex justify-between">
          <h1 className="font-bold md:font-extrabold text-lg md:text-2xl">
            Available Menus
          </h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="flex justify-between">
              <Button className="bg-orange hover:bg-hoverOrange">
                <Plus className="mr-1" />
                Add Menus
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add A New Menu</DialogTitle>
                <DialogDescription>
                  Create a menu that will make your marketplace stand out.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={submitHandler} className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    type="text"
                    name="title"
                    value={input.title}
                    onChange={changeEventHandler}
                    placeholder="Enter menu name"
                    className="mt-2"
                  />
                  {error && <span className="text-sm font-medium text-red-600">{error.title}</span>}
                </div>
                <div>
                  <Label>Description</Label>
                  <Input
                    type="text"
                    name="description"
                    value={input.description}
                    onChange={changeEventHandler}
                    placeholder="Enter menu description"
                    className="mt-2"
                  />
                  {error && <span className="text-sm font-medium text-red-600">{error.description}</span>}
                </div>
                <div>
                  <Label>Price in (₹)</Label>
                  <Input
                    type="number"
                    name="price"
                    value={input.price}
                    onChange={changeEventHandler}
                    placeholder="Enter menu price"
                    className="mt-2"
                  />
                  {error && <span className="text-sm font-medium text-red-600">{error.price}</span>}
                </div>
                <div>
                  <Label>Upload Menu Image</Label>
                  <Input
                    type="file"
                    name="image"
                    className="mt-2"
                    onChange={(e) => setInput({ ...input, image: e.target.files?.[0] || undefined })}
                  />
                  {error && <span className="text-sm font-medium text-red-600">{error.image?.name}</span>}
                </div>
                <DialogFooter className="mt-5">
                  {loading ? (
                    <Button disabled className="bg-orange hover:bg-hoverOrange">
                      <Loader2 className="animate-spin" />
                      Please Wait
                    </Button>
                  ) : (
                    <Button className="bg-orange hover:bg-hoverOrange">
                      Submit
                    </Button>
                  )}
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        {menus.map((menu: any, idx: number) => (
          <div className="mt-6 space-y-4" key={idx}>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 p-2 shadow-md rounded-lg border">
              <img
                src={menu.image}
                alt={menu.title}
                className="md:h-24 md:w-24 h-16 w-full object-cover rounded-lg"
              />
              <div className="flex-1">
                <h1 className="text-lg font-semibold text-gray-800 flex justify-start">
                  {menu.title}
                </h1>
                <p className="flex justify-start text-sm text-gray-600 mt-1">
                  {menu.description}
                </p>
                <h2 className="text-md font-semibold mt-2 flex justify-start ">
                  Price :<span className="text-[#D19254] pl-1">₹{menu.price}</span>
                </h2>
              </div>
              <Button
                onClick={() => {
                  setSelectedMenu(menu);
                  setEditOpen(true);
                }}
                size={"sm"}
                className="bg-orange hover:bg-hoverOrange mt-2"
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
        {/* Pass the selectedMenu and editOpen props to EditMenu */}
        {selectedMenu && (
          <EditMenu selectedMenu={selectedMenu} editOpen={editOpen} setEditOpen={setEditOpen} />
        )}
      </div>
    </>
  );
};

export default AddMenu;

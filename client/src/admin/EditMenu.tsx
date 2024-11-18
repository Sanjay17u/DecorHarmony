import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { MenuFormSchema } from "@/schema/menuSchema"


// Menu Interface
interface Menu {
  title: string;
  description: string;
  price: number;
  image: string; // Assuming it's a string URL for image
}

interface EditMenuProps {
  selectedMenu: Menu | null;
  editOpen: boolean;
  setEditOpen: Dispatch<SetStateAction<boolean>>;
}

const EditMenu = ({
  selectedMenu,
  editOpen,
  setEditOpen,
}: EditMenuProps) => {

  const [input, setInput] = useState<MenuFormSchema>({
    title: "",
    description: "",
    price: 0,
    image: undefined as File | undefined,
  });

  const loading = false; 

  // Pre-fill the input fields when a menu is selected
  useEffect(() => {
    if (selectedMenu) {
      setInput({
        title: selectedMenu.title,
        description: selectedMenu.description,
        price: selectedMenu.price,
        image: undefined, // We can't pre-fill file input, so leave it undefined
      });
    }
  }, [selectedMenu]);

  // Change handler for form inputs
  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === 'number' && name === 'price') {
      const price = Math.max(0, Number(value)); // Ensure price is not negative
      setInput({ ...input, [name]: price });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  // File change handler for the image upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setInput({ ...input, image: e.target.files[0] });
    }
  };

  // Submit handler for the form
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // You can add your API call to update the menu here
    console.log("Updated Menu:", input);
  };

  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Menu: {selectedMenu?.title}</DialogTitle>
          <DialogDescription>
            Update your menu to keep your offerings fresh!
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
          </div>
          <div>
            <Label>Upload Menu Image</Label>
            <Input
              type="file"
              name="image"
              className="mt-2"
              onChange={handleFileChange}
            />
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
  );
};

export default EditMenu;

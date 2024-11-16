import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Label } from "./label";

export type FilterOptionState = {
  id: string;
  label: string;
};

const filterOptions: FilterOptionState[] = [
  { id: "lamp", label: "Lamp" },
  { id: "mugs", label: "Mugs" },
  { id: "wallArt", label: "Wall Art" },
  { id: "indoorPlants", label: "Indoor Plants" },
];
const FilterPage = () => {
  const appliedFilterHandler = (value: string) => {};

  return (
    <>
      <div className="md:w-72">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-lg">Filter By Category</h1>
          <Button variant={"link"}>Reset</Button>
        </div>
        {filterOptions.map((Option) => (
          <div key={Option.id} className="flex items-center space-x-2 my-5">
            <Checkbox
              id={Option.id}
              onClick={() => appliedFilterHandler(Option.label)}
            />
            <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {Option.label}
            </Label>
          </div>
        ))}
      </div>
    </>
  );
};

export default FilterPage;

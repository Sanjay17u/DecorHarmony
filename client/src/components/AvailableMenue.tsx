import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import Image from "@/assets/HeroImage.jpg";

const AvailableMenue = () => {
  return (
    <>
      <div className="md:p-4 ">
        <h1 className="text-xl md:text-2xl font-extrabold mb-6 flex justify-start">
          Available Menue
        </h1>
        <div className="grid md:grid-cols-3 space-y-4 md:space-y-0 flex justify-start">
          <Card className="max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden ">
            <img src={Image} alt="" className="w-full h-40 object-cover" />
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex justify-start">
                Wall Art
              </h2>
              <p className="flex justify-start text-sm text-gray-600 mt-2 ">
                Lorem ipsum dolor sit amet.
              </p>
              <h3 className="flex justify-start mt-4 font-semibold">
                Price:{" "}
                <span className="flex justify-start text-[#D19254]">₹80</span>
              </h3>
            </CardContent>
            <CardFooter className="flex justify-start p-4 -mt-3">
              <Link to={`/Cart/`}>
              <Button className="w-full bg-orange hover:bg-hoverOrange">
                Add to Cart
              </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AvailableMenue;

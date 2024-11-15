import { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import HeroImage from '../assets/HeroImage.jpg'

const HeroSection = () => {
  const [searchText, setSearchText] = useState<string>("");

  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto md:p-10 rounded-lg items-center justify-center m-4 gap-10">
      {/* Left Section: Text and Input */}
      <div className="flex flex-col gap-8 md:w-1/2">
        <div className="flex flex-col gap-5">
          <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl text-center md:text-left">
            Ready to Redefine Your Space? Order Now and Bring Your Vision to Life!
          </h1>
          <p className="text-gray-500 text-lg text-center md:text-left">
            Transform Every Corner, Make Every Moment Unforgettable.
          </p>
        </div>
        <div className="relative flex items-center gap-2">
          <Input
            type="text"
            value={searchText}
            placeholder="Search your products"
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-10 shadow-lg w-full sm:w-auto"
          />
          <Search className="text-gray-500 absolute inset-y-2 left-2" />
          <Button className="bg-orange hover:bg-hoverOrange">Search</Button>
        </div>
      </div>

      {/* Right Section: Image */}
      <div className="relative flex justify-center w-full md:w-1/2">
        <img
          src={HeroImage}
          alt="Hero"
          className="object-cover w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-lg"
        />
      </div>
    </div>
  );
};

export default HeroSection;

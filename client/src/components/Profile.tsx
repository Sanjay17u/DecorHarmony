import { Loader2, Locate, Mail, MapPin, MapPinned, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import React, { FormEvent, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    fullname: "",
    email: "",
    address: "",
    city: "",
    country: "",
    profilePicture: "",
  });
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [selectedProfilePicture, setSelectedProfilePicture] = useState<string>("");
  const [loading] = useState(false);

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedProfilePicture(result);
        setProfileData((prevData) => ({
          ...prevData,
          profilePicture: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const updateProfileHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Update Profile Api Implementation
  };

  return (
    <>
      <form onSubmit={updateProfileHandler} className="max-w-7xl mx-auto my-5">
        {/* Profile Avatar and Full Name Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="relative md:w-28 md:h-28 w-20 h-20">
              <AvatarImage src={selectedProfilePicture} />
              <AvatarFallback>CN</AvatarFallback>
              <input
                ref={imageRef}
                className="hidden"
                type="file"
                accept="image/*"
                onChange={fileChangeHandler}
              />
              <div
                onClick={() => imageRef.current?.click()}
                className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer"
              >
                <Plus className="text-white w-8 h-8" />
              </div>
            </Avatar>
            <Input
              type="text"
              name="fullname"
              value={profileData.fullname}
              onChange={changeHandler}
              className="font-semibold text-lg outline-none border-none focus:ring-transparent"
              placeholder="Full Name"
            />
          </div>
        </div>

        {/* Email Input Section */}
        <div className="my-6">
          <div className="flex flex-col md:flex-row items-center gap-4 rounded-sm p-3">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Mail className="text-gray-500 w-5 h-5" />
              <Label
                htmlFor="email"
                className="text-xs md:text-sm font-medium text-gray-700"
              >
                Email
              </Label>
            </div>

            <div className="w-full md:w-64 mt-2 md:mt-0">
              <input
                id="email"
                name="email"
                type="email"
                value={profileData.email}
                onChange={changeHandler}
                className="w-full p-2 text-sm rounded-md text-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Address Input Section */}
        <div className="my-6">
          <div className="flex flex-col md:flex-row items-center gap-4 rounded-sm p-3">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Locate className="text-gray-500 w-5 h-5" />
              <Label
                htmlFor="address"
                className="text-xs md:text-sm font-medium text-gray-700"
              >
                Address
              </Label>
            </div>

            <div className="w-full md:w-64 mt-2 md:mt-0">
              <input
                id="address"
                name="address"
                type="text"
                value={profileData.address}
                onChange={changeHandler}
                className="w-full p-2 text-sm rounded-md text-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* City Input Section */}
        <div className="my-6">
          <div className="flex flex-col md:flex-row items-center gap-4 rounded-sm p-3">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <MapPin className="text-gray-500 w-5 h-5" />
              <Label
                htmlFor="city"
                className="text-xs md:text-sm font-medium text-gray-700"
              >
                City
              </Label>
            </div>

            <div className="w-full md:w-64 mt-2 md:mt-0">
              <input
                id="city"
                name="city"
                type="text"
                value={profileData.city}
                onChange={changeHandler}
                className="w-full p-2 text-sm rounded-md text-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Country Input Section */}
        <div className="my-6">
          <div className="flex flex-col md:flex-row items-center gap-4 rounded-sm p-3">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <MapPinned className="text-gray-500 w-5 h-5" />
              <Label
                htmlFor="country"
                className="text-xs md:text-sm font-medium text-gray-700"
              >
                Country
              </Label>
            </div>

            <div className="w-full md:w-64 mt-2 md:mt-0">
              <input
                id="country"
                name="country"
                type="text"
                value={profileData.country}
                onChange={changeHandler}
                className="w-full p-2 text-sm rounded-md text-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Submit Button Section */}
        <div className="text-center">
          {loading ? (
            <Button disabled>
              <Loader2 className="animate-spin" /> Please Wait
            </Button>
          ) : (
            <Button className="bg-orange hover:bg-hoverOrange">Update</Button>
          )}
        </div>
      </form>
    </>
  );
};

export default Profile;

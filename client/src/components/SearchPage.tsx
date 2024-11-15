import { useParams } from "react-router-dom"
import FilterPage from "./ui/FilterPage"
import { Input } from "./ui/input"
import { useState } from "react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { X } from "lucide-react"

const SearchPage = () => {

    const params = useParams()
    const [searchQuery, setSearchQuery] = useState<string>("")

    return(
        <>
          <div className="max-w-7xl mx-auto my-10">
            <div className="flex flex-col md:flex-row justify-between gap-10">
              <FilterPage/>
              <div className="flex-1">
                {/* Search Input Field */}
                <div className="flex items-center gap-2">
                  <Input
                   type="text"
                   value={searchQuery}
                   placeholder="Search by resturant & cuisines"
                   onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button className="bg-orange hover:bg-hoverOrange">Search</Button>
                </div>
                {/* Searched Items Displayed Here..! */}
                <div>
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
                    <h1 className="font-medium text-lg">(2) Search result found</h1>
                    <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                    {
                    ["Glass", "Cup", "Mug"].map((_selectedFilter: string, idx: number) => {
                      return (
                        <div key={idx} className="relative inline-flex items-center max-w-full">
                          <Badge className="text-[#D19254] rounded-md hover:cursor-pointer pr-6 whitespace-nowrap" variant={"outline"}>{_selectedFilter}</Badge>
                          <X
                          size={16}
                          className="absolute text-[#D19254] right-1 hover:cursor-pointer"
                          />
                        </div>
                      );
                    })
                  }
                    </div>
                  </div>
                  {/* Resturant Cards */}
                    <div className="grid md:grid-cols-3 gap-4">
                      
                    </div>
                </div>
              </div>
            </div>
          </div>
        </>
    )
}

export default SearchPage
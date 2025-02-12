import React from "react";
import { Input } from "../input";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 " />
      <Input
        type="text"
        placeholder="Search"
        className="w-full p-2 pl-10 border rounded-full text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
      />
    </div>
  );
};

export default SearchBar;

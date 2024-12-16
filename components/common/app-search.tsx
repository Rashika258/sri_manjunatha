import React from "react";
import { Input } from "../ui/input";

const AppSearch = ({
  searchQuery,
  handleSearch,
}: {
  searchQuery: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Input
      placeholder="Search by name"
      value={searchQuery}
      onChange={handleSearch}
      className="w-1/3"
    />
  );
};

export default AppSearch;

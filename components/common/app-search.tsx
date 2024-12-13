import React, { useState } from "react";
import { Input } from "../ui/input";

const AppSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

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

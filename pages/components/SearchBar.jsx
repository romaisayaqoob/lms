// components/SearchBar.js
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?q=${query}`);
    }
  };

  return (
    <div className="flex gap-3 text-[14px] items-center border p-2 rounded-md bg-gray-50 text-gray-500">
      <Search height={17} />
      <input
        type="text"
        placeholder="Search Course"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="bg-transparent outline-none"
      />
    </div>
  );
};

export default SearchBar;

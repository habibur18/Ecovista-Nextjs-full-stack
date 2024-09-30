"use client";

import { useDebounce } from "@/app/hook/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation"; // useSearchParams to access URL params
import { useCallback, useEffect, useState } from "react";

export default function Search() {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams(); // Get search parameters from URL

  // State to track the search query
  const [searchQuery, setSearchQuery] = useState("");

  // Sync search query from the URL on component mount
  useEffect(() => {
    const currentSearchQuery = searchParams.get("q") || "";
    setSearchQuery(currentSearchQuery); // Set input value to current query string
  }, [searchParams]);

  // Function to handle search
  const handleSearch = useCallback(
    (term) => {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("q", term); // Update the query string with the new search term
      } else {
        params.delete("q"); // Remove the query string if term is empty
      }
      replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, replace]
  );

  // Debounced version of handleSearch
  const debouncedHandleSearch = useDebounce(handleSearch, 550);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value); // Update the searchQuery state
    debouncedHandleSearch(value); // Call the debounced function
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        className="bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md"
        value={searchQuery} // Sync input field value with state
        onChange={handleInputChange}
      />
    </div>
  );
}

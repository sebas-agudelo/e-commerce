import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function ShowSearchPath({ category, selectedCatId }) {
  const [currentPath, setCurrentPath] = useState();
  const [searchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");

  const queryFromURL = searchParams.get("query") || "";

  useEffect(() => {
    if (window.location.pathname === "/products") {
      setCurrentPath("ALLA PRODUKTER");
    }
    if (
      window.location.pathname === `/products/${selectedCatId}/cat/${category}`
    ) {
      setCurrentPath(category);
    }
    if (window.location.pathname === "/search") {
      setCurrentPath("Sökresultat");
      setSearchQuery(queryFromURL);
    }
  }, [window.location.pathname]);
  return (
    <div>
      {searchQuery ? (
        <div className="search-text-wrapper">
          <h1>{currentPath}</h1>
          <h2>{searchQuery}</h2>
        </div>
      ) : (
        <h1>
          {currentPath}
          {/* : <span>{count}</span> */}
          {/* <span>{searchQuery}</span> */}
        </h1>
      )}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";

export default function ShowSearchPath({ selectedCatId, category }) {
  const [currentPath, setCurrentPath] = useState();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const path = location.pathname;

  const [searchQuery, setSearchQuery] = useState("");

  const queryFromURL = searchParams.get("query") || "";

  useEffect(() => {
    if (path === "/products") {
      setCurrentPath("ALLA PRODUKTER");
    }
    if (
        path === `/products/${selectedCatId}/cat/${category}`
    ) {
      setCurrentPath(category);
      console.log(category);
      
    }
    if (path === "/search") {
      setCurrentPath("Sökresultat");
      setSearchQuery(queryFromURL);
    }
  }, [location.pathname]);
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

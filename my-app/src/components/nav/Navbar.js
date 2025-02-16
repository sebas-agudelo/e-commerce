import React, { useContext, useState, useEffect, useRef  } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PiShoppingCartThin } from "react-icons/pi";
import { AuthSessionContext } from "../../Context/SessionProvider";
import { VscChromeClose } from "react-icons/vsc";
import { RxHamburgerMenu } from "react-icons/rx";
import { ProductContext } from "../../Context/ProductContext";
import { IoSearchOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";

export default function Navbar() {
  const { pathname } = useLocation();
  const { session } = useContext(AuthSessionContext);
  const { categories, getCategories } = useContext(ProductContext);
  const [query, setQuery] = useState("");
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  
  const [isClicked, setIsClicked] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchInputRef = useRef(null);
  
  const nav = useNavigate();

  useEffect(() => {
    getCategories();

    if(isSearchClicked){
      searchInputRef.current?.focus();
    }

    if (window.location.pathname === "/checkout") {
      setIsCheckOut(true);
    } else {
      setIsCheckOut(false);
    }

    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [window.location.pathname, isSearchClicked]);

  const isOpen = () => {
    setIsClicked(true);
  };

  const isClose = () => {
    setIsClicked(false);
    setIsSearchClicked(false);
  };

  const openSearchInput = () => {
    setIsSearchClicked(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      nav(`/search?query=${query}`);
    }

    setIsSearchClicked(false)
  };

  const toggleDropdown = (state) => {
    setIsDropdownOpen(state);
  };

  return (
    <header className={`${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">

        <div className="navbar-content-wrapper">

          <div className="nav-logo-img">
            <Link to={`/`}>
              <img src="/sound.png" />
            </Link>
          </div>

          <nav className={isClicked ? "active-menu" : ""}>
            <ul onClick={isClose}>
              <li
                className="headphones-link-container"
                onMouseEnter={() => toggleDropdown(true)}
                onMouseLeave={() => toggleDropdown(false)}
              >
                <Link className="headphones-link" to="">
                  Hörlurar
                </Link>

                <ul
                  className={`dropdown-links ${
                    isDropdownOpen ? "visible" : ""
                  }`}
                >
                  <li>
                    <Link
                      to={`/products`}
                      onClick={() => toggleDropdown(false)}
                    >
                      Alla hörlurar
                    </Link>
                  </li>
                  {categories.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={`/products/${item.id}/cat/${item.category}`}
                        onClick={() => toggleDropdown(false)}
                      >
                        {item.category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>

        <div className="navbar-icons-wrapper">
          {isSearchClicked ? (
            <>
              <div
                className={isSearchClicked ? "search-input-container" : ""}
                style={{ zIndex: "999" }}
              >
                <form onSubmit={handleSubmit}>
                  <input
                    type="search"
                    placeholder="Sök"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    ref={searchInputRef}
                  />
                  <VscChromeClose
                    className="close-search-input-icon"
                    onClick={isClose}
                  />
                </form>
              </div>
            </>
          ) : (
            <>
              {isCheckOut ? (
                ""
              ) : (
                <>
                  {isClicked ? (
                    ""
                  ) : (
                    <>
                      <div className="grapper">
                        <IoSearchOutline
                          className="search-icon"
                          onClick={openSearchInput}
                        />
                        {session ? (
                          <div>
                            <Link to={`/profile`}>
                              <GoPerson />
                            </Link>
                          </div>
                        ) : (
                          <div>
                            <Link to={`/signin`}>
                              <GoPerson />
                            </Link>
                          </div>
                        )}
                        <Link className="cart-icon" to={`/cart`}>
                          <PiShoppingCartThin />
                        </Link>
                  </div>
                    </>
                  )}
                </>
              )}

              {isClicked ? (
                <VscChromeClose className="close" onClick={isClose} />
              ) : (
                <RxHamburgerMenu className="open" onClick={isOpen} />
              )}
            </>
          )}

        </div>

</div>
    </header>
  );
}

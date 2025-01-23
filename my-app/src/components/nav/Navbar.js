import React, { useContext, useState, useEffect } from "react";
import SignOut from "../SignOut";
import { Link, useLocation } from "react-router-dom";
import { PiShoppingCartThin } from "react-icons/pi";
import { AuthSessionContext } from "../../Context/SessionProvider";
import { VscChromeClose } from "react-icons/vsc";
import { RxHamburgerMenu } from "react-icons/rx";
import { CartContext } from "../../Context/CartContext";
import ProductSearch from "../../pages/product_pages/Search";
import { ProductContext } from "../../Context/ProductContext";

export default function Navbar() {
  const { pathname } = useLocation();
  const { session } = useContext(AuthSessionContext);
  const { cartItems } = useContext(CartContext);
  const { categories, getCategories } = useContext(ProductContext);

  const [isClicked, setIsClicked] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCheckOut, setIsCheckOut] = useState(false);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    getCategories();

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
  }, [window.location.pathname]);

  const isOpen = () => {
    setIsClicked(true);
  };

  const isClose = () => {
    setIsClicked(false);
  };

  return (
    <header className={`${isScrolled ? "scrolled" : ""}`}>
      <div className="icons">
        <div className="nav-logo-img">
          <img src="/sound.png" />
        </div>

        <div className="cart">
          {isCheckOut ? (
            ""
          ) : (
            <>
              {isClicked ? (
                ""
              ) : (
                <>
                  <p className="view-qty">{totalQuantity}</p>
                  <Link className="cart-icon" to={`/cart`}>
                    <PiShoppingCartThin />
                  </Link>
                </>
              )}
            </>
          )}

          {isClicked ? (
            <VscChromeClose className="close" onClick={isClose} />
          ) : (
            <RxHamburgerMenu className="open" onClick={isOpen} />
          )}
        </div>
      </div>
      <nav className={isClicked ? "active-menu" : ""}>
        <ul onClick={isClose}>
          <li>
            <Link to={`/`}>Hem</Link>
          </li>
          <li className="products-link">
            <Link to={`/products`}>Alla produkter</Link>
          </li>
          <li>
            {categories.map((cat) => (
              <Link
                className="categories-link"
                to={`/products/${cat.id}/cat/${cat.category}`}
              >
                {cat.category}
              </Link>
            ))}
          </li>
          <li>
            <Link to={`/contact`}>Kontakta oss</Link>
          </li>
          <li>
            <Link to={`/about`}>Om oss</Link>
          </li>
          {session ? (
            <>
              <li>
                <Link to={`/profile`}>Mina sidor</Link>
              </li>
              <li>
                <SignOut />
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={`/signin`}>Logga in</Link>
              </li>
              <li>
                <Link to={`/signup`}>Registrera dig</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

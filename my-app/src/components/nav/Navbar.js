import React, { useContext, useState, useEffect } from "react";
import SignOut from "../SignOut";
import { Link, useLocation } from "react-router-dom";
import { PiShoppingCartThin } from "react-icons/pi";
import { AuthSessionContext } from "../../Context/SessionProvider";
import { VscChromeClose } from "react-icons/vsc";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Navbar() {
  const { pathname } = useLocation();
  const { session, admin } = useContext(AuthSessionContext);
  const [isClicked, setIsClicked] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      if (window.scrollY > 190) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  const isOpen = () => {
    setIsClicked(true);
  };

  const isClose = () => {
    setIsClicked(false);
  };

  return (
    <header className={`${isScrolled ? "scrolled" : ""}`}>
      <div className="icons">
        <>
          <Link to={`/cart`}>
            <PiShoppingCartThin />
          </Link>
        </>

        {isClicked ? (
          <VscChromeClose className="close" onClick={isClose} />
        ) : (
          <RxHamburgerMenu className="open" onClick={isOpen} />
        )}
      </div>
      <nav className={isClicked ? "active-menu" : ""}>
        <ul onClick={isClose}>
          <li>
            <Link to={`/`}>Start</Link>
          </li>
          <li>
            <Link to={`/products`}>Products</Link>
          </li>
          <li>
            <Link to={`/contact`}>Contact</Link>
          </li>
          <li>
            <Link to={`/about`}>About us</Link>
          </li>
          {session ? (
            <>
              <li>
                <Link to={`/profile`}>Profile</Link>
              </li>
              <li>
                <SignOut />
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={`/signin`}>Sign in</Link>
              </li>
              <li>
                <Link to={`/signup`}>Sign up</Link>
              </li>
            </>
          )}

          {session && admin ? (
            <>
              <li>
              <Link to={`/newpizza`}>New pizza</Link>
            </li>
            </>
          ) : (
                ""
          )}
        </ul>
      </nav>
    </header>
  );
}

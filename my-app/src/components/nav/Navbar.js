import React from 'react'
import SignOut from '../SignOut'
import { Link } from 'react-router-dom'
import { CiPizza } from "react-icons/ci";

export default function Navbar() {
  return (
    <header>
        {/* <nav>
            <ul>
                <li>
                    <Link to={`/`}>Start</Link>
                </li>
                <li>
                    <Link to={`pizzas`}>Pizzas</Link>
                </li>
                <li>
                    <Link to={`/contact`}>Contact</Link>
                </li>
                <li>
                    <Link to={`/about`}>About us</Link>
                </li>
                <li>
                    <Link to={`/profile`}>Profile</Link>
                </li>
                <li>
                    <Link to={`/signin`}>Sign in</Link>
                </li>
                <li>
                    <Link to={`/signup`}>Sign up</Link>
                </li>
                <li>
                    <CiPizza />
                </li>
                <li>
                    <SignOut />
                </li>
            </ul>
        </nav> */}
    </header>
  )
}

import React from "react"
import { NavLink } from "react-router-dom"
import Navigation from "../Navigation"
import "./header.css"


function Header() {
  return (
    <header>
      <NavLink exact to="/">
        HeirBnb
      </NavLink>
      <Navigation />
    </header>
  )
}

export default Header;

import React from "react"
import { NavLink } from "react-router-dom"
import Navigation from "../Navigation"
import "./header.css"


function Header({ isLoaded }) {
  return (
    <header>
      <Navigation />
    </header>
  )
}

export default Header;

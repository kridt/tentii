import { Link } from "@reach/router";
import React from "react";
import "./NavBar.scss";
import SideNav from "./SideNav";

export default function NavBar() {
  return (
    <>
      <nav id="navbar">
        <ul>
          <li>
            <Link to="/">logo</Link>
          </li>
          <li>
            <Link to="/">Search</Link>
          </li>
          <li>
            <Link to="/">fav</Link>
          </li>
          <li>
            <Link to="/">kurv</Link>
          </li>
          <li>
            <Link to="/login">Profil</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

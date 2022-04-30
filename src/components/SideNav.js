import { Link } from "@reach/router";
import React from "react";
import "./SideNav.scss";

export default function SideNav({ sticky }) {
  const NavLink = (props) => (
    <Link
      {...props}
      getProps={({ isCurrent }) => {
        // the object returned here is passed to the
        // anchor element's props
        return {
          style: {
            color: isCurrent ? "#FF9900" : "black",
            textDecoration: isCurrent ? "underline" : "none",
            fontWeight: isCurrent ? "normal" : "light",
          },
        };
      }}
    />
  );

  return (
    <nav
      style={{
        position: sticky ? "sticky" : null,
      }}
      id="sideNav"
    >
      <ul>
        <li>
          <NavLink to="/">Produkter</NavLink>
        </li>
        <li>
          <NavLink to="/sellers">Sælgere</NavLink>
        </li>
        <li>
          <NavLink to="/discover">Opdag</NavLink>
        </li>
        <li>
          <NavLink to="/about">Om os</NavLink>
        </li>
      </ul>
    </nav>
  );
}

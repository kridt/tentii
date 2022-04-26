import { Link } from "@reach/router";
import React from "react";

export default function SideNav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/products">Produkter</Link>
        </li>
        <li>
          <Link to="/sellers">Sælgere</Link>
        </li>
        <li>
          <Link to="/">Opdag</Link>
        </li>
        <li>
          <Link to="/">Om os</Link>
        </li>
      </ul>
    </nav>
  );
}

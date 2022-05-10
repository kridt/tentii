import { Link } from "@reach/router";
import React from "react";

export default function MiniNav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/signUpSeller/stepOne">Step one</Link>
        </li>
        <li>
          <Link to="/signUpSeller/stepTwo">Step two</Link>
        </li>
      </ul>
    </nav>
  );
}

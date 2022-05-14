import { Link } from "@reach/router";
import React from "react";
import "./MiniNav.scss";

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
        <li>
          <Link to="/signUpSeller/stepThree">Step three</Link>
        </li>

        <li>
          <Link to="/signUpSeller/test">Test the site</Link>
        </li>
      </ul>
    </nav>
  );
}

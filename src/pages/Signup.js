import React from "react";
import NavBar from "../components/NavBar";
import SideNav from "../components/SideNav";
import "./Signup.scss";
import { Link } from "@reach/router";

export default function Signup() {
  return (
    <div className="signUpPage">
      <NavBar />
      <SideNav />
      <div style={{ textAlign: "center" }}>
        <h1>Opret din profil</h1>
        <h2>Hvor starter rejsen?</h2>
      </div>
      <div className="signUpCoise">
        <div className="signUpCoise__left">
          <Link to="/">Kunde</Link>
        </div>
        <div className="signUpCoise__right">
          <Link to="/stepper">Sælger</Link>
        </div>
      </div>
    </div>
  );
}

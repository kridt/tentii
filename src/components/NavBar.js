import { Link } from "@reach/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { auth, db } from "../firebase-config";
import "./NavBar.scss";

export default function NavBar() {
  const [currentUser, setCurrentUser] = useState({});
  const [userData, setUserData] = useState({});
  const [trueFlaseUser, setTrueFalseUser] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        setTrueFalseUser(true);
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((item) => setUserData(item.data()));
      } else {
        setCurrentUser(null);
        setTrueFalseUser(false);
      }
    });
  }, [setCurrentUser, setTrueFalseUser, setUserData]);

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
            <Link to="/favList">fav</Link>
          </li>
          <li>
            <Link to="/">kurv</Link>
          </li>
          <li>
            {trueFlaseUser ? (
              <Link to="/dashboard">Profil</Link>
            ) : (
              <Link to="/login">login</Link>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}

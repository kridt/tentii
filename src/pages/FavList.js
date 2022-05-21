import { navigate } from "@reach/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import NavBar from "../components/NavBar";
import { auth, db } from "../firebase-config";

export default function FavList() {
  const [currentUser, setCurrentUser] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [favList, setFavList] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
        navigate("/login");
      }
    });
  }, [setCurrentUser]);

  useEffect(() => {
    db.collection("users")
      .doc(currentUser.uid)
      .get()
      .then((item) => {
        setFavList(item.data()?.favList);
      });
  }, [currentUser, setFavList]);

  console.log(currentUser);
  console.log(favList);
  return (
    <div>
      <NavBar />
      <h1>FavList</h1>
    </div>
  );
}

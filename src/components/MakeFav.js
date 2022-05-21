import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase-config";

export default function MakeFav({ id }) {
  const [fav, setFav] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, [setCurrentUser]);

  function makeFav(e) {
    e.preventDefault();

    if (fav === false) {
      setFav(true);

      db.collection("users")
        .doc(currentUser.uid)
        .update({
          favList: [id],
        });

      console.log(`Product ${id} is now a favorite`);
    } else {
      setFav(false);
      console.log(`Product ${id} is no longer a favorite`);
    }
  }

  return (
    <button
      style={{
        color: fav ? "red" : "white",
        fontSize: "2em",
        backgroundColor: "transparent",
        border: "none",
      }}
      onClick={(e) => makeFav(e)}
    >
      <i className="fa-solid fa-heart"></i>
    </button>
  );
}

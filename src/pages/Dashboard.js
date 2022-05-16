import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import NavBar from "../components/NavBar";
import { auth } from "../firebase-config";
import { sendEmailVerification } from "firebase/auth";
import { navigate } from "@reach/router";

export default function Dashboard() {
  const [user, setUser] = useState();

  if (user === null) {
    navigate("/login");
  }
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, [setUser, auth]);

  function logOut() {
    auth.signOut().then(() => {
      navigate("/");
    });
  }

  return (
    <div>
      <NavBar />
      <h1>Dashboard</h1>

      <div>
        <p>Din email: {user?.email}</p>
        {user?.emailVerified ? (
          <>
            <p>Din email er verificeret</p>
          </>
        ) : (
          <>
            <p>Din email er ikke verificeret</p>
            <button onClick={() => sendEmailVerification(user).then((e) => e)}>
              verificer den her
            </button>
          </>
        )}

        <button onClick={() => logOut()}>Log ud</button>
      </div>
      <div className="userInfo"></div>
    </div>
  );
}

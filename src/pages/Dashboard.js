import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import NavBar from "../components/NavBar";
import { auth, db } from "../firebase-config";
import { sendEmailVerification } from "firebase/auth";
import { navigate } from "@reach/router";

export default function Dashboard() {
  const [user, setUser] = useState([]);
  const [userData, setUserData] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    setUserInfo(
      userData.find((user) => user.id === auth?.currentUser?.uid)?.data()
    );
  }, [userData, auth?.currentUser?.uid, setUserInfo]);

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

  useEffect(() => {
    db.collection("users")
      .get()
      .then((users) => {
        setUserData(users.docs);
      });
  }, [db, setUserData]);

  function logOut() {
    auth.signOut().then(() => {
      navigate("/");
    });
  }

  console.log(userInfo);

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
        <div>
          <p>
            Din navn:{" "}
            {userInfo?.data?.firstName + " " + userInfo?.data?.lastName}
          </p>
          <p>
            Din adresse: {userInfo?.data?.address}, {userInfo?.data?.zipcode}{" "}
            {" " + userInfo?.data?.city}
          </p>
          <p>Telefon nummer: {userInfo?.data?.phoneNumber}</p>
          {userInfo?.isSeller ? (
            <p>Tilmeldt som sælger</p>
          ) : (
            <p>Tilmeldt som kunde</p>
          )}
        </div>
        <button onClick={() => logOut()}>Log ud</button>
      </div>
      <div className="userInfo"></div>
    </div>
  );
}

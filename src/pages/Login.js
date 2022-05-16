import { navigate } from "@reach/router";
import { Link } from "@reach/router";
import React from "react";
import NavBar from "../components/NavBar";
import { auth } from "../firebase-config";

export default function Login() {
  function login(e) {
    const email = e.target.email.value;
    const password = e.target.password.value;
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((e) => {
        navigate("/dashboard");
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          alert("Email eller adgangskode er forkert");
        }
      });
  }

  return (
    <div>
      <NavBar />
      <h1>Login</h1>

      <form onSubmit={(e) => login(e)}>
        <div>
          <label style={{ color: "black" }}>Email</label>
          <input type="email" name="email" />
        </div>
        <div>
          <label style={{ color: "black" }}>Password</label>
          <input type="password" name="password" />
        </div>
        <input type="submit" value="Login" />
        <p>
          Har du ikke en profil? <Link to="/signup">Opret her!</Link>
        </p>
      </form>
    </div>
  );
}

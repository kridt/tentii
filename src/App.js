import Landingpage from "./pages/Landingpage";
import "./App.scss";
import { Router } from "@reach/router";
import Sellers from "./pages/Sellers";
import Discover from "./pages/Discover";
import About from "./pages/About";
import ProductPage from "./pages/ProductPage";
import SellerSIte from "./pages/SellerSIte";
import Signup from "./pages/Signup";
import SignUpSeller from "./pages/signUpSeller/SignUpSeller";
import StepOne from "./pages/signUpSeller/StepOne";
import StepTwo from "./pages/signUpSeller/StepTwo";
import { SignUpSellerContext } from "./contexts/SignUpSellerContext";
import { useState } from "react";
import StepThree from "./pages/signUpSeller/StepThree";
import TestSignUp from "./pages/signUpSeller/TestSignUp";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import FavList from "./pages/FavList";

function App() {
  const [signUpSeller, setSignUpSeller] = useState({});

  return (
    <SignUpSellerContext.Provider value={{ setSignUpSeller, signUpSeller }}>
      <Router className="App">
        <Landingpage path="/" />
        <Sellers path="/sellers" />
        <Discover path="/discover" />
        <About path="/about" />
        <ProductPage path="/product/:id" />
        <SellerSIte path="/sellerSite/:id" />
        <Signup path="/signup" />
        <SignUpSeller path="/signUpSeller" />
        <StepOne path="/signUpSeller/stepOne" />
        <StepTwo path="/signUpSeller/stepTwo" />
        <StepThree path="/signUpSeller/stepThree" />
        <TestSignUp path="/signUpSeller/test" />
        <Dashboard path="/dashboard" />
        <Login path="/login" />
        <FavList path="/favList" />
      </Router>
    </SignUpSellerContext.Provider>
  );
}

export default App;

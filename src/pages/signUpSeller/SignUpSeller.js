import { Router } from "@reach/router";
import * as React from "react";
import "./SignUpSeller.scss";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

export default function SignUpSeller() {
  return (
    <div className="signUpSeller">
      <Router>
        <StepOne path="/stepOne" />

        <StepTwo path="/stepTwo" />
      </Router>
    </div>
  );
}

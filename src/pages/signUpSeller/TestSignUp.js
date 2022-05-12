import React from "react";
import { useContext } from "react";
import { SignUpSellerContext } from "../../contexts/SignUpSellerContext";
import MiniNav from "./MiniNav";

export default function TestSignUp() {
  const { signUpSeller } = useContext(SignUpSellerContext);

  console.log(signUpSeller.personalInfo);
  return (
    <div>
      <MiniNav />
      <h1>her tester vi om informationen du har givet er rigtig</h1>

      <div>
        <p>Dit Brand hedder: {signUpSeller.brandName}</p>

        <p>Du ser dig selv som: {signUpSeller.timeUsage}</p>

        <p>Din fødselsdato er: {signUpSeller.personalInfo.birthday}</p>

        <h3>adresse informationerne</h3>
        <p>
          Du bor på {signUpSeller.personalInfo.adress},{" "}
          {signUpSeller.personalInfo.zipCode} {signUpSeller.personalInfo.city}
        </p>
      </div>
    </div>
  );
}

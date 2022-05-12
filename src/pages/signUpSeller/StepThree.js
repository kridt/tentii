import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { SignUpSellerContext } from "../../contexts/SignUpSellerContext";
import MiniNav from "./MiniNav";
import "./StepThree.scss";

export default function StepThree() {
  const { signUpSeller, setSignUpSeller } = useContext(SignUpSellerContext);
  const [city, setCity] = useState("");

  function allFormInfo(e) {
    e.preventDefault();
    const birthDate = e.target.birthDate?.value;
    const postCode = e.target.postCode?.value;
    const adress = postCode + " " + e.target.adress.value;
    const phoneNumber = e.target.phoneNumber.value;
    const cityInfo = city;

    setSignUpSeller({
      ...signUpSeller,
      personalInfo: {
        birthday: birthDate,
        zipcode: parseInt(postCode),
        adress,
        phone: parseInt(phoneNumber),
        cityInfo,
      },
    });
    console.log(signUpSeller);
  }

  function findCity(e) {
    const postCode = e.target.value;

    if (postCode.length === 4) {
      fetch(`https://api.dataforsyningen.dk/postnumre?nr=${postCode}`)
        .then((res) => res.json())
        .then((data) => setCity(data[0].navn));
    }
  }
  return (
    <div>
      <h1>Step Three</h1>

      <div>
        <form onSubmit={(e) => allFormInfo(e)}>
          <div>
            <label>Fødselsdato</label>
            <input type="date" name="birthDate" />
          </div>

          <div>
            <label>Adresse</label>
            <input type="text" name="adress" />
          </div>

          <div>
            <label>Postnummer</label>
            <input
              onChange={(e) => findCity(e)}
              type="number"
              name="postCode"
            />
          </div>

          <div>
            <label>By</label>
            <p name="city" id="city">
              {city}
            </p>
          </div>

          <div id="phoneDiv">
            <label>Telefonnummer</label>
            <div>
              <p id="phone">+45</p>
              <input type="number" name="phoneNumber" />
            </div>
          </div>

          <input type={"submit"} value="test" />
        </form>
      </div>
      <MiniNav />
    </div>
  );
}

import { navigate } from "@reach/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { SignUpSellerContext } from "../../contexts/SignUpSellerContext";
import MiniNav from "./MiniNav";
import "./StepThree.scss";

export default function StepThree() {
  const { signUpSeller, setSignUpSeller } = useContext(SignUpSellerContext);
  const [city, setCity] = useState("");
  const isCompany = signUpSeller.company;
  function allFormInfo(e) {
    e.preventDefault();
    const birthDate = e.target.birthDate?.value;
    const postCode = e.target.postCode?.value;
    const adress = e.target.adress.value;
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
    navigate("/signUpSeller/test");
  }

  function findCity(e) {
    const postCode = e.target.value;
    if (postCode.length === 4) {
      /* fetch(`https://api.dataforsyningen.dk/postnumre?nr=${postCode}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setCity(data[0].navn);
        }); */
      fetch("/postnumre.json")
        .then((res) => res.json())
        .then((data) => {
          if (data[postCode] !== undefined) {
            setCity(data[postCode]);
          } else {
            alert("Postnummer findes ikke");
          }
        });
    }
  }
  /* on your mind cvr 42023108 */
  return (
    <div className="stepThree">
      <h1>Step Three</h1>

      {isCompany ? (
        <div>
          <h2>Er disse info korrekte?</h2>
          <form>
            <div>
              <label>Cvr nummer</label>
              <input
                type="number"
                value={signUpSeller?.companyInfo.vat}
                name="cvr"
              />
            </div>
            <div>
              <label>Firmanavn</label>
              <input
                type={"text"}
                placeholder={signUpSeller?.companyInfo.name}
              />
            </div>
            <div>
              <label>Adresse</label>
              <input
                type={"text"}
                placeholder={signUpSeller?.companyInfo.address}
              />
            </div>
            <div>
              <label>Postnummer</label>
              <input
                type={"number"}
                name="postCode"
                placeholder={signUpSeller?.companyInfo.zipcode}
              />
            </div>
            <div>
              <label>By</label>
              <input
                type={"text"}
                placeholder={signUpSeller?.companyInfo.city}
              />
            </div>
            <div>
              <label>Land</label>
              <input defaultValue={"Danmark"} type="text" />
            </div>

            <input type={"submit"} value="Næste" />
          </form>
        </div>
      ) : (
        <>
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
            </form>
          </div>
        </>
      )}
    </div>
  );
}

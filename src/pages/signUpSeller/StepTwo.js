import { navigate } from "@reach/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { SignUpSellerContext } from "../../contexts/SignUpSellerContext";
import MiniNav from "./MiniNav";
import "./StepTwo.scss";

export default function StepTwo() {
  const { signUpSeller, setSignUpSeller } = useContext(SignUpSellerContext);
  const [cvr, setCvr] = useState(false);
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setAllCountries(data));
  }, [setAllCountries]);

  function cvrSetter(e) {
    setCvr(JSON.parse(e.target.value));
  }

  useEffect(() => {
    const trueDiv = document.querySelector(".cvr__true");
    const falseDiv = document.querySelector(".cvr__false");

    if (cvr === true) {
      trueDiv.style.border = "2px solid #000";
      falseDiv.style.border = "2px solid #fff";
    }

    if (cvr === false) {
      falseDiv.style.border = "2px solid #000";
      trueDiv.style.border = "2px solid #fff";
    }
  }, [cvr]);

  function stepTwoSignUpSellerPerson(e) {
    e.preventDefault();
    setSignUpSeller({
      ...signUpSeller,
      firstName: e.target.firstName?.value,
      lastName: e.target.lastName?.value,
      country: e.target.country?.value,
      company: false,
    });

    navigate("/signUpSeller/stepThree");
  }

  function cvrFirm(e) {
    e.preventDefault();
    const inputCvr = e.target.value;
    console.log(inputCvr);

    if (inputCvr.length === 8) {
      fetch(`https://cvrapi.dk/api?country=dk&vat=${inputCvr}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.name !== undefined) {
            if (
              window.confirm(
                "Vi har fundet det her firma på det CVR nummer" +
                  " " +
                  data.name +
                  "\n" +
                  "\n" +
                  "Er det korrekt?"
              )
            ) {
              console.log("ok pressed");
              setSignUpSeller({
                ...signUpSeller,
                company: true,
                companyInfo: data,
              });
              navigate("/signUpSeller/stepThree");
            } else {
              console.log("cancel pressed");
            }
          } else {
            alert("CVR nummer findes ikke");
          }
        });
    }
  }

  return (
    <div className="stepTwo">
      <h1>Step Two</h1>
      <h2>Til det knap så kreative</h2>

      <div>
        <h2>Hvad beskriver dig bedst?</h2>

        <form onClick={(e) => cvrSetter(e)} className="cvr">
          <div className="cvr__false">
            <input type={"radio"} name="cvr" value={false} checked />
            <label>Jeg har ikke CVR-nummer og sælger som hobby</label>
          </div>
          <div className="cvr__true">
            <input type={"radio"} name="cvr" value={true} />
            <label>Jeg har allerede et firma og har et CVR-nummer</label>
          </div>
        </form>
      </div>

      <div className="info">
        {cvr ? (
          <>
            <h2>Fortæl os lidt om dit firma</h2>
            <form onChange={(e) => cvrFirm(e)}>
              <label>Hvad er dit cvr nummer?</label>
              <input type={"number"} />
            </form>
          </>
        ) : (
          <>
            <h2>Fortæl os lidt om dig selv</h2>
            <form onSubmit={(e) => stepTwoSignUpSellerPerson(e)}>
              <div>
                <label>Fornavn</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Dit Fornavn?"
                />
              </div>
              <div>
                <label>Efternavn</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Dit efternavn?"
                />
              </div>
              <div>
                <label>Hvilket land bor du i?</label>
                <input
                  value={"Danmark"}
                  name="country"
                  list="countrylist"
                  type={"text"}
                />
                <datalist id="countrylist">
                  {/* {allCountries?.map((country) => {
                    console.log(country);
                    return (
                      <option
                        key={country.name.common}
                        value={country.name.common}
                      >
                        {country.altSpellings[1]}
                      </option>
                    );
                  })} */}
                </datalist>
              </div>

              <input type={"submit"} value="test" />
            </form>
          </>
        )}
      </div>

      <MiniNav />
    </div>
  );
}

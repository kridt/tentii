import { Link, navigate } from "@reach/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { signUpSelerDb } from "../db/SignUpSellerDb";
import "./StepTwo.scss";

export default function StepTwo() {
  const [allCountries, setAllCountries] = useState([]);
  const db = signUpSelerDb;
  const [currentDb, setCurrentDb] = useState();
  const [defaultFirstName, setDefaultFirstName] = useState("");
  const [defaultLastName, setDefaultLastName] = useState("");
  const [cvr, setCvr] = useState(false);

  useEffect(() => {
    db.collection("signUpSeller")
      .get()
      .then((item) => {
        setCvr(item[0].company);
        setCurrentDb(item);
      });
  }, [setCurrentDb, db, setCvr]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setAllCountries(data));
  }, [setAllCountries]);

  function cvrSetter(e) {
    setCvr(JSON.parse(e.target.value));
    db.collection("signUpSeller")
      .doc({ id: 1 })
      .update({
        isCompany: JSON.parse(e.target.value),
      });
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

    if (currentDb?.length !== 0) {
      console.log("already exists");
      db.collection("signUpSeller")
        .get()
        .then((item) => {
          setDefaultFirstName(item[0]?.firstName);
          setDefaultLastName(item[0]?.lastName);
        });
    } else {
      return;
    }
  }, [cvr, setDefaultFirstName, setDefaultLastName, currentDb]);

  function stepTwoSignUpSellerPerson(e) {
    e.preventDefault();

    db.collection("signUpSeller").doc({ id: 1 }).update({
      country: e.target.country?.value,
      company: false,
    });

    /* setSignUpSeller({
      ...signUpSeller,
      firstName: e.target.firstName?.value,
      lastName: e.target.lastName?.value,
      country: e.target.country?.value,
      company: false,
    }); */

    navigate("/signUpSeller/stepThree");
  }

  //fetches the data from virk.dk
  function cvrFirm(e) {
    e.preventDefault();
    const inputCvr = e.target.value;

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
              db.collection("signUpSeller").doc({ id: 1 }).update({
                company: true,
                companyInfo: data,
              });

              navigate("/signUpSeller/stepThree");
            } else {
              return;
            }
          } else {
            alert("CVR nummer findes ikke");
          }
        });
    }
  }

  function updateLocalDatabaseFirstName(e) {
    /* const lastName = e.target.lastName.value; */
    db.collection("signUpSeller").doc({ id: 1 }).update({
      firstName: e.target.value,
    });
  }

  function updateLocalDatabaseLastName(e) {
    /* const lastName = e.target.lastName.value; */
    db.collection("signUpSeller").doc({ id: 1 }).update({
      lastName: e.target.value,
    });
    console.log(e.target.value);
  }

  return (
    <div className="stepTwo">
      <h2 style={{ color: "white", textAlign: "center", margin: "2.5em 0" }}>
        Til det knap så kreative
      </h2>

      <div>
        <h2 style={{ color: "white", textAlign: "center", fontSize: "1.2em" }}>
          Hvad beskriver dig bedst?
        </h2>

        <form onClick={(e) => cvrSetter(e)} className="cvr">
          <div className="cvr__false">
            <input
              type={"radio"}
              name="cvr"
              defaultValue={false}
              defaultChecked
            />
            <label>Jeg har ikke CVR-nummer og sælger som hobby</label>
          </div>
          <div className="cvr__true">
            <input type={"radio"} name="cvr" defaultValue={true} />
            <label>Jeg har allerede et firma og har et CVR-nummer</label>
          </div>
        </form>
      </div>
      <hr style={{ border: ".19em solid white", width: "85%" }} />
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
                  name="firstName"
                  type="text"
                  defaultValue={defaultFirstName}
                  placeholder="Dit Fornavn?"
                  onBlur={(e) => updateLocalDatabaseFirstName(e)}
                />
              </div>
              <div>
                <label>Efternavn</label>
                <input
                  name="lastName"
                  type="text"
                  defaultValue={defaultLastName}
                  placeholder="Dit efternavn?"
                  onBlur={(e) => updateLocalDatabaseLastName(e)}
                />
              </div>
              <div>
                <label>Hvilket land bor du i?</label>
                <input
                  defaultValue={"Danmark"}
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

              <input id="nextBut2" type={"submit"} value="Næste" />
            </form>
          </>
        )}
      </div>

      <Link className="linkBackArrow" to="/signUpSeller/stepOne">
        &lt;
      </Link>
    </div>
  );
}

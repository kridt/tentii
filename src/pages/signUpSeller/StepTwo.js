import { Link, navigate } from "@reach/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { signUpSelerDb } from "../db/SignUpSellerDb";
import "./StepTwo.scss";

export default function StepTwo() {
  const db = signUpSelerDb;
  const [currentDb, setCurrentDb] = useState({});
  const [defaultFirstName, setDefaultFirstName] = useState(null);
  const [defaultLastName, setDefaultLastName] = useState(null);
  const [isCompany, setIsCompany] = useState(false);
  const [cvr, setCvr] = useState(false);

  useEffect(() => {
    db.collection("signUpSeller")
      .get()
      .then((item) => {
        if (item[0].isCompany === undefined) {
          db.collection("signUpSeller")
            .doc({ id: 1 })
            .update({
              isCompany: false,
              personalInfo: {
                firstName: null,
                lastName: null,
              },
              cvr: null,
            });
        } else {
          setDefaultFirstName(item[0].personalInfo?.firstName);
          setDefaultLastName(item[0].personalInfo?.lastName);
          setIsCompany(item[0].isCompany);
        }
      });
  }, [setCurrentDb, db, setCvr]);

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

    if (isCompany === true) {
      trueDiv.classList.add("active");
      falseDiv.classList.remove("active");
    }

    if (isCompany === false) {
      falseDiv.classList.add("active");
      trueDiv.classList.remove("active");
    }
  }, [isCompany, setDefaultFirstName, setDefaultLastName, currentDb]);

  function stepTwoSignUpSellerPerson(e) {
    e.preventDefault();
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

  return (
    <div className="stepTwo">
      <h2 style={{ color: "white", textAlign: "center", margin: "2.5em 0" }}>
        Til det knap så kreative
      </h2>

      <div>
        <h2 style={{ color: "white", textAlign: "center", fontSize: "1.2em" }}>
          Hvad beskriver dig bedst?
        </h2>

        <form className="cvr">
          <div className="cvr__false">
            <input
              type={"radio"}
              name="cvr"
              onClick={() => {
                setIsCompany(false);
                db.collection("signUpSeller").doc({ id: 1 }).update({
                  isCompany: false,
                });
              }}
              defaultChecked={false}
            />
            <label>Jeg har ikke CVR-nummer og sælger som hobby</label>
          </div>
          <div className="cvr__true">
            <input
              type={"radio"}
              name="cvr"
              onClick={() => {
                setIsCompany(true);
                db.collection("signUpSeller").doc({ id: 1 }).update({
                  isCompany: true,
                });
              }}
              defaultChecked={true}
            />
            <label>Jeg har allerede et firma og har et CVR-nummer</label>
          </div>
        </form>
      </div>
      <hr style={{ border: ".19em solid white", width: "85%" }} />
      <div className="info">
        {isCompany ? (
          <>
            <h2>Fortæl os lidt om dit firma</h2>
            <div>
              <label>Fornavn</label>
              <input
                name="firstName"
                type="text"
                defaultValue={defaultFirstName}
                placeholder="Dit Fornavn?"
                onBlur={(e) => {
                  setDefaultFirstName(e.target.value);

                  db.collection("signUpSeller")
                    .doc({ id: 1 })
                    .update({
                      personalInfo: {
                        firstName: e.target.value,
                        lastName: defaultLastName,
                      },
                    });
                }}
              />
            </div>
            <div>
              <label>Efternavn</label>
              <input
                name="lastName"
                type="text"
                defaultValue={defaultLastName}
                placeholder="Dit efternavn?"
                onBlur={(e) => {
                  setDefaultLastName(e.target.value);

                  db.collection("signUpSeller")
                    .doc({ id: 1 })
                    .update({
                      personalInfo: {
                        firstName: defaultFirstName,
                        lastName: e.target.value,
                      },
                    });
                }}
              />
            </div>
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
                  onBlur={(e) => {
                    setDefaultFirstName(e.target.value);
                    db.collection("signUpSeller")
                      .doc({ id: 1 })
                      .update({
                        personalInfo: {
                          firstName: e.target.value,
                          lastName: defaultLastName,
                        },
                      });
                  }}
                />
              </div>
              <div>
                <label>Efternavn</label>
                <input
                  name="lastName"
                  type="text"
                  defaultValue={defaultLastName}
                  placeholder="Dit efternavn?"
                  onBlur={(e) => {
                    setDefaultLastName(e.target.value);

                    db.collection("signUpSeller")
                      .doc({ id: 1 })
                      .update({
                        personalInfo: {
                          firstName: defaultFirstName,
                          lastName: e.target.value,
                        },
                      });
                  }}
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

      <Link
        style={{
          marginTop: "1em",
          color: "black",
          textDecoration: "none",
          fontSize: "2em",
        }}
        className="linkBackArrow"
        to="/signUpSeller/stepOne"
      >
        &lt;
      </Link>
    </div>
  );
}

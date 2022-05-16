import { Link, navigate } from "@reach/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { SignUpSellerContext } from "../../contexts/SignUpSellerContext";
import "./StepThree.scss";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { signUpSelerDb } from "../db/SignUpSellerDb";
import IosSwitch, { IOSSwitch } from "../../components/IosSwitch";
import { FormControlLabel } from "@mui/material";
import { auth, db as db3 } from "../../firebase-config";

export default function StepThree() {
  const { signUpSeller, setSignUpSeller } = useContext(SignUpSellerContext);
  const [city, setCity] = useState("");
  const db = signUpSelerDb;
  const db2 = db3;
  const [isCompany, setIsCompany] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({});
  const [personalInfo, setPersonalInfo] = useState({});
  const [currentDb, setCurrentDb] = useState({});
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipcode, setZipcode] = useState();
  const [email, setEmail] = useState("");

  useEffect(() => {
    db.collection("signUpSeller")
      .get()
      .then((item) => {
        setIsCompany(item[0]?.company);
        setCompanyInfo(item[0]?.companyInfo);
        setCurrentDb(item[0]);
        setBirthday(item[0]?.personalInfo?.birthDate);
        setAddress(item[0]?.personalInfo?.adress);
      });

    console.log(currentDb);
  }, [db, setIsCompany, setCompanyInfo, setCurrentDb, setBirthday]);

  function allFormInfo(e) {
    e.preventDefault();
    /* const birthDate = e.target.birthDate?.value;
    const postCode = e.target.postCode?.value;
    const adress = e.target.adress.value;
    const phoneNumber = e.target.phoneNumber.value;
    const cityInfo = city; */
    const email = e.target.email.value;
    const password = e.target.password.value;

    auth.createUserWithEmailAndPassword(email, password).then((user) => {
      return db3
        .collection("users")
        .doc(user.user.uid)
        .set(currentDb)
        .then(() => {
          db.collection("signUpSeller").delete();
          navigate("/");
        });
    });

    /* setSignUpSeller({
      ...signUpSeller,
      personalInfo: {
        birthday: birthDate,
        zipcode: parseInt(postCode),
        adress,
        phone: parseInt(phoneNumber),
        cityInfo,
      },
    }); */
    /*  navigate("/signUpSeller/test"); */
  }

  useEffect(() => {
    console.log(personalInfo);

    /* db.collection("signUpSeller").doc({ id: 1 }).update({
      personalInfo: personalInfo,
    }); */
  }, [personalInfo]);

  function findCity(e) {
    const postCode = e.target.value;
    if (postCode.length === 4) {
      fetch("/postnumre.json")
        .then((res) => res.json())
        .then((data) => {
          if (data[postCode] !== undefined) {
            setCity(data[postCode]);
            db.collection("signUpSeller")
              .doc({ id: 1 })
              .update({
                personalInfo: {
                  ...currentDb.personalInfo,
                  zipcode: parseInt(postCode),
                  city: data[postCode],
                },
              });
          } else {
            alert("Postnummer findes ikke");
          }
        });
    }
  }

  function correctInfo(e) {
    e.preventDefault();

    setIsCompany(false);
  }

  function birthDate(e) {
    e.preventDefault();
    db.collection("signUpSeller")
      .doc({ id: 1 })
      .update({
        personalInfo: {
          ...currentDb.personalInfo,
          birthDate: e.target.value,
        },
      });
  }
  function addressF(e) {
    e.preventDefault();
    db.collection("signUpSeller")
      .doc({ id: 1 })
      .update({
        personalInfo: {
          ...currentDb.personalInfo,
          adress: e.target.value,
        },
      });
  }

  /* function zipcodeF(e) {
    e.preventDefault();
    db.collection("signUpSeller").doc({ id: 1 }).update({
      personalInfo: {
        ...currentDb.personalInfo,
        zipcode: parseInt(e.target.value),
      }
    })
  } */

  function phoneNumberF(e) {
    e.preventDefault();
  }

  function emailF(e) {
    e.preventDefault();
    db.collection("signUpSeller").doc({ id: 1 }).update({
      email: e.target.value,
    });
  }

  /* on your mind cvr 42023108 */
  return (
    <div className="stepThree">
      {isCompany ? (
        <div>
          <h2>Er disse info korrekte?</h2>
          <form onSubmit={(e) => correctInfo(e)}>
            <div>
              <label>Cvr nummer</label>
              <input type="number" defaultValue={companyInfo?.vat} name="cvr" />
            </div>
            <div>
              <label>Firmanavn</label>
              <input
                type={"text"}
                name="companyName"
                defaultValue={companyInfo?.name}
              />
            </div>
            <div>
              <label>Adresse</label>
              <input
                type={"text"}
                name="companyAddress"
                defaultValue={companyInfo?.address}
              />
            </div>
            <div>
              <label>Postnummer</label>
              <input
                type={"number"}
                name="companyPostCode"
                defaultValue={companyInfo?.zipcode}
              />
            </div>
            <div>
              <label>By</label>
              <input
                type={"text"}
                name="companyCity"
                defaultValue={companyInfo?.city}
              />
            </div>
            <div>
              <label>Land</label>
              <input
                defaultValue={"Danmark"}
                name="companyCountry"
                type="text"
              />
            </div>

            <input type={"submit"} value="Næste" />
          </form>
        </div>
      ) : (
        <>
          <div>
            <h2
              style={{
                borderBottom: "4px solid white",
                width: "85%",
                margin: "2em auto",
              }}
            >
              Til det knap så <span style={{ color: "lightblue" }}>kr</span>
              <span style={{ color: "orange" }}>ea</span>
              <span style={{ color: "purple" }}>ti</span>
              <span style={{ color: "red" }}>ve</span>
            </h2>
            <form onSubmit={(e) => allFormInfo(e)}>
              <div>
                <label>Fødselsdato</label>
                <input
                  onBlur={(e) => birthDate(e)}
                  defaultValue={birthday}
                  type="date"
                  name="birthDate"
                />
              </div>

              <div>
                {/* <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} />}
                  onChange={(e) => setSameAddress(e.target.checked)}
                /> */}
                <label>Adresse</label>

                <input
                  onBlur={(e) => addressF(e)}
                  defaultValue={address}
                  type="text"
                  name="address"
                />

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
              </div>

              <div id="phoneDiv">
                <label>Telefonnummer</label>
                <div>
                  <p id="phone">+45</p>
                  <input
                    onBlur={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        phone: "+45 " + parseInt(e.target.value),
                      })
                    }
                    type="number"
                    name="phoneNumber"
                  />
                </div>
              </div>

              <div>
                <label>E-mail</label>
                <input
                  type={"email"}
                  name="email" /* onBlur={(e) => emailF(e)} */
                />
              </div>

              <div>
                <label>Adgangskode</label>
                <input type={"password"} name="password" />
              </div>

              <input type={"submit"} value="Opret Profil" />
            </form>
          </div>
        </>
      )}
      <Link
        style={{ marginTop: "1em" }}
        className="linkBackArrow"
        to="/signUpSeller/stepTwo"
      >
        <ArrowBackIosIcon />
      </Link>
    </div>
  );
}

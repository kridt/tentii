import { Link, navigate } from "@reach/router";
import React, { useEffect } from "react";
import { useState } from "react";
import "./StepThree.scss";
import { signUpSelerDb } from "../db/SignUpSellerDb";
import { auth, db as db3 } from "../../firebase-config";
import get6digitnum from "../../functions/get6digitnum";
import axios from "axios";

export default function StepThree() {
  const [personalInfoDb, setPersonalInfoDb] = useState({});
  const db = signUpSelerDb;
  const [isCompany, setIsCompany] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({});
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState(null);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const newSellerId = get6digitnum();
  const [brandName, setBrandName] = useState("");
  useEffect(() => {
    db.collection("signUpSeller")
      .get()
      .then((item) => {
        setBrandName(item[0].brandName);
        setIsCompany(item[0].isCompany);

        if (item[0].isCompany === true) {
          setCompanyInfo(item[0].companyInfo);
        }

        if (item[0].personalInfo.birthday === undefined) {
          setFirstName(item[0].personalInfo.firstName);
          setLastName(item[0].personalInfo.lastName);
          db.collection("signUpSeller")
            .doc({ id: 1 })
            .update({
              personalInfo: {
                fistName: item[0].personalInfo.firstName,
                lastName: item[0].personalInfo.lastName,
                birthday: null,
                address: null,
                city: null,
                zipcode: null,
                email: null,
                phoneNumber: null,
              },
            });
        } else {
          setBirthday(item[0].personalInfo?.birthday);
          setAddress(item[0].personalInfo?.address);
          setCity(item[0].personalInfo?.city);
          setZipcode(item[0].personalInfo?.zipcode);
          setEmail(item[0].personalInfo?.email);
          setPhoneNumber(item[0].personalInfo?.phoneNumber);
          setFirstName(item[0].personalInfo?.firstName);
          setLastName(item[0].personalInfo?.lastName);
        }
      });
  }, [
    db,
    setPersonalInfoDb,
    setBirthday,
    setAddress,
    setCity,
    setZipcode,
    setEmail,
    setPhoneNumber,
    setFirstName,
    setLastName,
    setIsCompany,
    setCompanyInfo,
  ]);

  function allFormInfo(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const repeat_password = e.target.repeat_password.value;
    const data = {
      email: email,
      birthday: birthday,
      address: address,
      city: city,
      zipcode: zipcode,
      phoneNumber: phoneNumber,
      firstName: firstName,
      lastName: lastName,
    };
    if (password === repeat_password) {
      auth.createUserWithEmailAndPassword(email, password).then((user) => {
        return db3
          .collection("users")
          .doc(user.user.uid)
          .set({
            id: user.user.uid,
            email: email,
            isSeller: true,
            sellerId: newSellerId,
            brandName: brandName,
            isAdmin: false,
            data: data,
            favList: [],
          })
          .then(() => {
            db3
              .collection("sellers")
              .doc(`${newSellerId}`)
              .set({
                sellerId: newSellerId,
                email: email,
                followsers: 0,
                displayName: brandName,
                personalTags: [],
                primaryColor: "red",
                secondaryColor: "blue",
                products: [],
                profileImage: "https://via.placeholder.com/150",
                profileDescription: "Your profile description",
                rating: 0,
                reviews: [],
                uid: user.user.uid,
              })
              .then(() => {
                db.collection("signUpSeller").delete();
                navigate("/dashboard");
              });
          });
      });
    } else {
      alert("Passwords do not match");
    }
  }

  function findCity(e) {
    const postCode = e.target.value;

    if (postCode.length === 4) {
      axios.get(`/postnumre.json`).then((res) => {
        const result = res.data.find((item) => item.nr === postCode);
        console.log(result);
        if (result === undefined) {
          alert("Postnummer ikke fundet");
        } else {
          setCity(result.navn);
          setZipcode(postCode);
          db.collection("signUpSeller")
            .doc({ id: 1 })
            .update({
              personalInfo: {
                firstName: firstName,
                lastName: lastName,
                birthday: birthday,
                address: address,
                phoneNumber: phoneNumber,
                email: email,
                city: result.navn,
                zipcode: postCode,
              },
            });
        }
      });

      /* fetch("/postnumre.json")
        .then((res) => res.json())
        .then((data) => {
          if (data[postCode] !== undefined) {
            setCity(data[postCode]);
            setZipcode(parseInt(postCode));
            db.collection("signUpSeller")
              .doc({ id: 1 })
              .update({
                personalInfo: {
                  firstName: firstName,
                  lastName: lastName,
                  birthday: birthday,
                  address: address,
                  phoneNumber: phoneNumber,
                  email: email,
                  city: data[postCode],
                  zipcode: postCode,
                },
              });
          } else {
            alert("Postnummer findes ikke");
          }
        }); */
    }
  }

  function correctInfo(e) {
    e.preventDefault();

    setIsCompany(false);
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
                  onBlur={(e) => {
                    setBirthday(e.target.value);
                    db.collection("signUpSeller")
                      .doc({ id: 1 })
                      .update({
                        personalInfo: {
                          birthday: e.target.value,
                          firstName: firstName,
                          lastName: lastName,
                          address: address,
                          city: city,
                          zipcode: zipcode,
                          email: email,
                          phoneNumber: phoneNumber,
                        },
                      });
                  }}
                  defaultValue={birthday}
                  type="date"
                  name="birthDate"
                />
              </div>

              <div>
                <label>Adresse</label>

                <input
                  onBlur={(e) => {
                    setAddress(e.target.value);
                    db.collection("signUpSeller")
                      .doc({ id: 1 })
                      .update({
                        personalInfo: {
                          birthday: birthday,
                          firstName: firstName,
                          lastName: lastName,
                          address: e.target.value,
                          city: city,
                          zipcode: zipcode,
                          email: email,
                          phoneNumber: phoneNumber,
                        },
                      });
                  }}
                  defaultValue={address}
                  type="text"
                  name="address"
                />

                <div>
                  <label>Postnummer</label>
                  <input
                    onChange={(e) => findCity(e)}
                    defaultValue={zipcode}
                    type="number"
                    name="postCode"
                  />
                </div>

                <div>
                  <label>By</label>
                  <input defaultValue={city} name="city" id="city" />
                </div>
              </div>

              <div>
                <label>Telefonnummer</label>
                <div>
                  <input
                    onBlur={(e) => {
                      setPhoneNumber(e.target.value);
                      db.collection("signUpSeller")
                        .doc({ id: 1 })
                        .update({
                          personalInfo: {
                            birthday: birthday,
                            firstName: firstName,
                            lastName: lastName,
                            address: address,
                            city: city,
                            zipcode: zipcode,
                            email: email,
                            phoneNumber: parseInt(e.target.value),
                          },
                        });
                    }}
                    defaultValue={phoneNumber}
                    type="number"
                    name="phoneNumber"
                  />
                </div>
              </div>

              <div>
                <label>E-mail</label>
                <input
                  onBlur={(e) => {
                    setEmail(e.target.value);
                    db.collection("signUpSeller")
                      .doc({ id: 1 })
                      .update({
                        personalInfo: {
                          birthday: birthday,
                          firstName: firstName,
                          lastName: lastName,
                          address: address,
                          city: city,
                          zipcode: zipcode,
                          email: e.target.value,
                          phoneNumber: phoneNumber,
                        },
                      });
                  }}
                  defaultValue={email}
                  type={"email"}
                  name="email"
                />
              </div>

              <div>
                <label>Adgangskode</label>
                <input type={"password"} name="password" />
              </div>
              <div>
                <label>Gentag adgangskode</label>
                <input type={"password"} name="repeat_password" />
              </div>

              <input
                style={{
                  border: "none",
                  backgroundColor: "orange",
                  color: "white",
                }}
                type={"submit"}
                value="Opret Profil"
              />
            </form>
          </div>
        </>
      )}

      <Link
        style={{
          marginTop: "1em",
          color: "black",
          textDecoration: "none",
          fontSize: "2em",
        }}
        className="linkBackArrow"
        to="/signUpSeller/stepTwo"
      >
        &lt;
      </Link>
    </div>
  );
}

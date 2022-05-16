import { Link, navigate } from "@reach/router";
import React, { useEffect } from "react";
import { useState } from "react";
import "./StepThree.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { signUpSelerDb } from "../db/SignUpSellerDb";
import { auth, db as db3 } from "../../firebase-config";

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
  const [password, setPassword] = useState("");

  useEffect(() => {
    db.collection("sellerPersonalInfo")
      .get()
      .then((item) => {
        if (item.length === 0) {
          db.collection("sellerPersonalInfo").add({
            id: 1,
            birthday: null,
            address: null,
            phoneNumber: null,
            zipcode: null,
            email: null,
            city: null,
          });
          console.log("new database");
        } else {
          setPersonalInfoDb(item[0]);
          setBirthday(item[0].birthday);
          setAddress(item[0].address);
          setCity(item[0].city);
          setZipcode(item[0].zipcode);
          setEmail(item[0].email);
          setPhoneNumber(item[0].phoneNumber);

          console.log("already exists");
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
  ]);

  function allFormInfo(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const data = {
      email: email,
      birthday: birthday,
      address: address,
      city: city,
      zipcode: zipcode,
      phoneNumber: phoneNumber,
    };
    auth.createUserWithEmailAndPassword(email, password).then((user) => {
      return db3
        .collection("users")
        .doc(user.user.uid)
        .set({
          id: user.user.uid,
          email: user.user.email,
          isSeller: true,
          isAdmin: false,
          data: data,
        })
        .then(() => {
          db.collection("signUpSeller").delete();
          navigate("/dashboard");
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

  function findCity(e) {
    const postCode = e.target.value;

    if (postCode.length === 4) {
      fetch("/postnumre.json")
        .then((res) => res.json())
        .then((data) => {
          if (data[postCode] !== undefined) {
            setCity(data[postCode]);
            db.collection("sellerPersonalInfo")
              .doc({ id: 1 })
              .update({
                city: data[postCode],
                zipcode: parseInt(postCode),
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
                    db.collection("sellerPersonalInfo").doc({ id: 1 }).update({
                      birthday: e.target.value,
                    });
                  }}
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
                  onBlur={(e) => {
                    db.collection("sellerPersonalInfo").doc({ id: 1 }).update({
                      address: e.target.value,
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

              <div id="phoneDiv">
                <label>Telefonnummer</label>
                <div>
                  <p id="phone">+45</p>
                  <input
                    onBlur={(e) => {
                      db.collection("sellerPersonalInfo")
                        .doc({ id: 1 })
                        .update({
                          phoneNumber: parseInt(e.target.value),
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
                    db.collection("sellerPersonalInfo").doc({ id: 1 }).update({
                      email: e.target.value,
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

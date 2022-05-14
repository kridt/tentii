import { navigate } from "@reach/router";
import Localbase from "localbase";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { SignUpSellerContext } from "../../contexts/SignUpSellerContext";
import { signUpSelerDb } from "../db/SignUpSellerDb";
import MiniNav from "./MiniNav";
import "./StepOne.scss";

export default function StepOne() {
  const { setSignUpSeller, signUpSeller } = useContext(SignUpSellerContext);
  const db = signUpSelerDb;
  const [currentDb, setCurrentDb] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [workLoad, setWorkLoad] = useState(1);

  useEffect(() => {
    db.collection("signUpSeller")
      .get()
      .then((item) => {
        if (item[0] !== undefined) {
          setBrandName(item[0].brandName);

          function getWorkLoad() {
            const thetest = document.querySelectorAll("input");

            thetest[item[0].workLoadNumber].checked = "checked";
          }
          getWorkLoad();

          /* theField[item[0].workLoadNumber];
          theField[item[0].workLoadNumber].checked = "checked"; */
        } else {
          db.collection("signUpSeller").add({
            id: 1,
          });
        }
        console.log(item[0].brandName);
        setCurrentDb(item);
      });
  }, [setCurrentDb, db]);

  function stepOneSignUpSeller(e) {
    e.preventDefault();

    navigate("/signUpSeller/stepTwo");
  }

  function setTheBrandName(e) {
    setBrandName(e.target.value);
    db.collection("signUpSeller").doc({ id: 1 }).update({
      brandName: e.target.value,
    });
  }

  function setTheWorkLoad(e) {
    const workLoad = e.target.value;
    const timeUsageNumber = parseInt(workLoad.split("#")[1]);
    const forTheTest1 = e.target.parentElement.firstElementChild;

    db.collection("signUpSeller").doc({ id: 1 }).update({
      workLoadNumber: timeUsageNumber,
      timeUsage: workLoad,
    });

    console.log(workLoad);
    console.log(timeUsageNumber);
    console.log(forTheTest1.value.split("#")[1]);
  }

  /*  useEffect(() => {
    console.log(theField[1]);
  }, []); */

  return (
    <div className="stepOne">
      <p
        style={{
          color: "white",
          textAlign: "center",
          marginTop: "4em",
          fontSize: "1.3em",
          fontWeight: "bold",
          wordSpacing: ".05em",
          lineHeight: "1.5em",
        }}
      >
        Lad os komme igang! <br /> Fortæl os om dig og dit brand
      </p>
      <div id="test">
        <h4 className="wordCarousel">
          <span>tentii - </span>
          <div>
            <ul className="flip5">
              <li style={{ color: "white" }}>Fordi jeg kan</li>
              <li style={{ color: "orange" }}>Fordi jeg er unik</li>
              <li style={{ color: "lightblue" }}>For ideen</li>
              <li style={{ color: "blue" }}>For noget større</li>
              <li style={{ color: "pink" }}>Fordi jeg kan</li>
            </ul>
          </div>
        </h4>
      </div>

      {/* <div id="container">
        tentii -
        <div id="flip">
          <div>
            <div>Work</div>
          </div>
          <div>
            <div>lifestyle</div>
          </div>
          <div>
            <div>Everthing</div>
          </div>
        </div>
      </div> */}

      <form
        onSubmit={(e) => stepOneSignUpSeller(e)}
        className="signUpSellerFormStepOne"
      >
        <input
          type="text"
          name="brandName"
          placeholder={"Hvad er dit brand?"}
          onBlur={(e) => setTheBrandName(e)}
          defaultValue={brandName}
        />
        <p style={{ color: "white", textAlign: "center" }}>
          Vi ser ofte at vores designere tager instiration fra deres
          kollektioner, stil, eller passion
        </p>

        <p
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.2em",
          }}
        >
          Hvad beskriver dig bedst?
        </p>

        <div onClick={(e) => setTheWorkLoad(e)} className="test">
          <div>
            <input
              type={"radio"}
              value="Jeg sælger fuldtid#1"
              name="brandOption"
            />
            <label>Jeg sælger fuldtid</label>
            <section className="borderColor"></section>
          </div>

          <div>
            <input
              type={"radio"}
              value="Jeg er sælger deltid, men har store drømme#2"
              name="brandOption"
            />
            <label>Jeg er sælger deltid, men har store drømme</label>
          </div>

          <div>
            <input
              type={"radio"}
              value={"Jeg sælger deltid og sådan kan jeg lide det#3"}
              name="brandOption"
            />
            <label>Jeg sælger deltid og sådan kan jeg lide det</label>
          </div>

          <div>
            <input
              type={"radio"}
              value="Jeg sælger når der kommer ordre - intet fast#4"
              name="brandOption"
            />
            <label>Jeg sælger når der kommer ordre - intet fast</label>
          </div>
        </div>

        <input id="nextBut1" type="submit" value="Næste" />
      </form>

      <MiniNav />
    </div>
  );
}

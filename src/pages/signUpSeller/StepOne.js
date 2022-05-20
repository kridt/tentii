import { Link, navigate } from "@reach/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { signUpSelerDb } from "../db/SignUpSellerDb";
import "./StepOne.scss";

export default function StepOne() {
  const db = signUpSelerDb;
  const [brandName, setBrandName] = useState("");
  const [workLoad, setWorkLoad] = useState("");
  const [currentDb, setCurrentDb] = useState({}); // current database

  useEffect(() => {
    db.collection("signUpSeller")
      .get()
      .then((item) => {
        if (item.length === 0) {
          db.collection("signUpSeller").add({
            id: 1,
            brandName: null,
            workLoad: null,
          });
        } else {
          setBrandName(item[0].brandName);
          setWorkLoad(item[0].workLoad);
        }

        setCurrentDb(item[0]);
      });
  }, [db, setBrandName, setWorkLoad]);

  useEffect(() => {
    db.collection("signUpSeller")
      .get()
      .then((item) => {
        document.querySelectorAll(".workLoad__item").forEach((div) => {
          if (div.innerHTML === item[0].workLoad) {
            div.classList.add("active");
          }
        });
      });
  }, [currentDb]);

  function stepOneSignUpSeller(e) {
    e.preventDefault();

    navigate("/signUpSeller/stepTwo");
  }

  function setTheWorkLoad(e) {
    const alldivs = e.target.parentElement.children;
    const textInfo = e.target.innerText;

    db.collection("signUpSeller").doc({ id: 1 }).update({
      workLoad: textInfo,
    });

    e.target.classList.add("active");
    for (let i = 0; i < alldivs.length; i++) {
      if (alldivs[i] !== e.target) {
        alldivs[i].classList.remove("active");
      }
    }
  }

  /* console.log(currentDb); */

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
              <li style={{ color: "pink" }}>Fordi jeg er speciel</li>
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
          onChange={(e) =>
            db
              .collection("signUpSeller")
              .doc({ id: 1 })
              .update({ brandName: e.target.value })
          }
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

        <div className="workLoad">
          <div onClick={(e) => setTheWorkLoad(e)} className="workLoad__item">
            Jeg sælger fuldtid
          </div>
          <div onClick={(e) => setTheWorkLoad(e)} className="workLoad__item">
            Jeg er sælger deltid, men har store drømme
          </div>
          <div onClick={(e) => setTheWorkLoad(e)} className="workLoad__item">
            Jeg sælger deltid og sådan kan jeg lide det
          </div>
          <div onClick={(e) => setTheWorkLoad(e)} className="workLoad__item">
            Jeg sælger når der kommer ordre - intet fast
          </div>
        </div>

        {/* <div onClick={(e) => setTheWorkLoad(e)} className="test">
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
        </div> */}

        <input id="nextBut1" type="submit" value="Næste" />
      </form>

      <Link
        style={{
          marginTop: "1em",
          color: "black",
          textDecoration: "none",
          fontSize: "2em",
        }}
        className="linkBackArrow"
        to="/signup"
      >
        &lt;
      </Link>
    </div>
  );
}

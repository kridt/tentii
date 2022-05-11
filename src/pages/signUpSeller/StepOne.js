import React from "react";
import MiniNav from "./MiniNav";

export default function StepOne() {
  function test(e) {
    console.log(e.target.value);
  }

  return (
    <>
      <h1>Step One</h1>
      <p>
        Lad os komme igang! <br /> Fortæl os om dit brand
      </p>

      <p>
        tenti - <span>list of lines</span>
      </p>

      <form className="signUpSellerFormStepOne">
        <input
          type="text"
          name="brandName"
          placeholder="Hvad hedder dit brand"
        />
        <p>
          Vi ser ofte at vores designere tager instiration fra deres
          kollektioner, stil, eller passion
        </p>

        <p>Hvad beskriver dig bedst?</p>

        <div className="test" onChange={(e) => test(e)}>
          <div>
            <input type={"radio"} value="fullTime" name="brandOption" />
            <label>Jeg sælger fuldtid</label>
            <section className="borderColor"></section>
          </div>

          <div>
            <input
              type={"radio"}
              value="partTime big dreams"
              name="brandOption"
            />
            <label>Jeg er sælger deltid, men har store drømme</label>
          </div>

          <div>
            <input
              type={"radio"}
              value="parTime like where i am"
              name="brandOption"
            />
            <label>Jeg sælger deltid og sådan kan jeg lide det</label>
          </div>

          <div>
            <input
              type={"radio"}
              value="partTime when order arrive"
              name="brandOption"
            />
            <label>Jeg sælger når der kommer ordre - intet fast</label>
          </div>
        </div>
      </form>

      <MiniNav />
    </>
  );
}

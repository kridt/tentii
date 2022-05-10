import React from "react";
import MiniNav from "./MiniNav";

export default function StepOne() {
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
      </form>

      <MiniNav />
    </>
  );
}

import { navigate } from "@reach/router";
import React, { useContext } from "react";
import { SignUpSellerContext } from "../../contexts/SignUpSellerContext";
import MiniNav from "./MiniNav";

export default function StepOne() {
  const { setSignUpSeller, signUpSeller } = useContext(SignUpSellerContext);

  console.log(signUpSeller);

  function stepOneSignUpSeller(e) {
    e.preventDefault();

    const brandName = e.target.brandName.value;
    const timeUsage = e.target.brandOption.value;

    setSignUpSeller({ ...signUpSeller, brandName, timeUsage });

    navigate("/signUpSeller/stepTwo");
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

      <form
        onSubmit={(e) => stepOneSignUpSeller(e)}
        className="signUpSellerFormStepOne"
      >
        <input
          type="text"
          name="brandName"
          placeholder={signUpSeller.brandName || "Hvad er dit brand?"}
        />
        <p>
          Vi ser ofte at vores designere tager instiration fra deres
          kollektioner, stil, eller passion
        </p>

        <p>Hvad beskriver dig bedst?</p>

        <div className="test">
          <div>
            <input
              type={"radio"}
              value="Jeg sælger fuldtid"
              name="brandOption"
            />
            <label>Jeg sælger fuldtid</label>
            <section className="borderColor"></section>
          </div>

          <div>
            <input
              type={"radio"}
              value="Jeg er sælger deltid, men har store drømme"
              name="brandOption"
            />
            <label>Jeg er sælger deltid, men har store drømme</label>
          </div>

          <div>
            <input
              type={"radio"}
              value="Jeg sælger deltid og sådan kan jeg lide det"
              name="brandOption"
            />
            <label>Jeg sælger deltid og sådan kan jeg lide det</label>
          </div>

          <div>
            <input
              type={"radio"}
              value="Jeg sælger når der kommer ordre - intet fast"
              name="brandOption"
            />
            <label>Jeg sælger når der kommer ordre - intet fast</label>
          </div>
        </div>

        <input type="submit" value="Næste" />
      </form>

      <MiniNav />
    </>
  );
}

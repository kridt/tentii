
import { Link } from '@reach/router';
import { Router } from '@reach/router';
import React from 'react'
import "./SignUpSeller.scss";
export default function SignUpSeller() {

 
    function StepOne() {
            function nextStep(e){
                e.preventDefault()
            }
        return (
            <div className="stepOne">

                <nav>
                    <ul>
                        <Link to='/stepOne'>Step One</Link>
                    </ul>
                </nav>

                <h1>stepOne</h1>

                <form onSubmit={(e) => nextStep(e)}>

                    <input type="submit" value={"Next"} name="name"  />
                </form>

            </div>
        )
    }



    function StepTwo() {
            
            return (
                <div className="stepTwo">
                    <h1>stepTwo</h1>
                    </div>
                    )
    }
   
  return (
    <Router className='signUpSeller'>
            
        <StepOne path='/stepOne' />
        <StepTwo path='/stepTwo' />
        
    </Router>
  )
}

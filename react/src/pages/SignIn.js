import React, { useState } from "react";
import '../assets/scss/SignIn.scss';
import { handleInputChange } from "../utils/global_func";

const SignIn = ({ clickSignIn, clickRegister }) => {

    const [state, setState] = useState({
        email: "",
        password: "",
    })

    const signIn = () => {
        clickSignIn(state)
    }

    return (
        <div className="sign-in-form-container">
            <h2 className="sign-in-title">Sign In</h2>
            <div className="sign-in-form" >
                <label className="form-label" htmlFor="email">
                    Email
                </label>
                <input className="form-input" onChange={e => handleInputChange(setState, 'email', e.target.value)} type="email" id="email" required />

                <label className="form-label" htmlFor="password">
                    Password
                </label>
                <input className="form-input" onChange={e => handleInputChange(setState, 'password', e.target.value)} type="password" id="password" required />

                <button className="form-button" onClick={signIn} >Sign In</button>
            </div>
            <p className="register-link">
                Don't have an account? <span className="anchor-like rounded" onClick={clickRegister} >Register</span>
            </p>
        </div>
    );
}

export default SignIn;
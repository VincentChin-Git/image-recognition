import React, { useState } from "react";
import '../assets/css/Register.css';
import { handleInputChange } from "../utils/global_func";

const Register = ({ clickSignIn, clickRegister }) => {

    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const register = () => {
        if (state.password === state.confirmPassword) {
            clickRegister(state);
        }
    }

    return (
        <div className="sign-in-form-container">
            <h2 className="sign-in-title">Register</h2>
            <form className="sign-in-form">
                <label className="form-label" htmlFor="name">
                    Name
                </label>
                <input className="form-input" onChange={e => handleInputChange(setState, 'name', e.target.value)} type="text" id="name" required />
                <label className="form-label" htmlFor="email">
                    Email
                </label>
                <input className="form-input" onChange={e => handleInputChange(setState, 'email', e.target.value)} type="email" id="email" required />

                <label className="form-label" htmlFor="password">
                    Password
                </label>
                <input className="form-input" onChange={e => handleInputChange(setState, 'password', e.target.value)} type="password" id="password" required />

                <label className="form-label" htmlFor="password">
                    Confirm Password
                </label>
                <input className="form-input" onChange={e => handleInputChange(setState, 'password', e.target.value)} type="password" id="confirm_password" required />

                <div>
                    <button onClick={clickSignIn} className="form-button" style={{backgroundColor: "gray"}}>Back</button>
                    &nbsp;
                    <button onClick={register} className="form-button">Register</button>
                </div>
            </form>
        </div>
    );
}

export default Register;

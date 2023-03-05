import React from "react";
import Tilt from 'react-parallax-tilt';
import '../assets/css/Logo.css'

const Logo = () => {
    return (
        <div className="m-4 mt-0">
            <Tilt className="logo">
                <div className="pt-3">
                    <img alt="logo" src="/brain.png" />
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;
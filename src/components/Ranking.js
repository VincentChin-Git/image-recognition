import React from "react";

const Ranking = ({ username, rank }) => {
    return (
        <div className="text-center my-2">
            <h3 style={h3Style} className="">Hi {username}, you are currently ranked #{rank} in using this app.</h3>
        </div>
    )
}

export default Ranking;

const h3Style = {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '1rem',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    borderBottom: '2px solid #ccc',
    paddingBottom: '0.5rem',
    fontSize: "1.5rem",
}
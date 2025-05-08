import React from "react";
import "./Contacts.css"; // Import the CSS file for styling
import "../App.css"; // Import the CSS file for styling
import "@clr/icons/clr-icons.min.css";
import { ClarityIcons, atomIcon } from "@cds/core/icon";

// Define the WhatIs component
ClarityIcons.addIcons(atomIcon);

const Contacts = () => {
  return (
    <div className="text-page">
      <header className="header">
        <h1 className="SubTitle">Contact</h1>
      </header>
        <main className="content">
            <div className="contacts-text-section">
            <h2>Coordinator</h2>
            <p>AGENZIA NAZIONALE PER LE NUOVE TECNOLOGIE, L'ENERGIA E LO SVILUPPO ECONOMICO SOSTENIBILE</p>
            <h2>Address</h2>
            <p>
            LUNGOTEVERE GRANDE AMMIRAGLIO THAON DI REVEL <br></br>66
            00196 Roma
            </p>
            <div className="flag-icon">
              <img 
                src="https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg" 
                alt="Italian Flag" 
<<<<<<< HEAD
                style={{ width: "40px", height: "auto" }}
                className="flag"
=======
                style={{ width: "40px", height: "auto" }} 
>>>>>>> 64491494059ec97f019ddbdba5d3e57905b1a249
              />
            </div>
                <br />
                <h2>Contact</h2>
                <p>Simone Gianfelici</p>
                <a className="mailto" href="mailto:simone.gianfelici@enea.it">simone.gianfelici@enea.it</a>
            
            </div>
      </main>
    </div>
  );
};

export default Contacts;

import React from "react";
import "./WhatIs.css"; // Import the CSS file for styling
import "../App.css"; // Import the CSS file for styling
import "@clr/icons/clr-icons.min.css";
import { ClarityIcons, atomIcon } from "@cds/core/icon";

// Define the WhatIs component
ClarityIcons.addIcons(atomIcon);

const WhatIs = () => {
  return (
    <div className="text-page">
      <header className="header">
        <h1 className="SubTitle">What is LESTO ?</h1>
      </header>
      <main className="content">
        <section className="text-section">
          <h2>About LESTO</h2>
          <blockquote className="quote"></blockquote>
          <ul className="WhatIs_list">
            <li></li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default WhatIs;

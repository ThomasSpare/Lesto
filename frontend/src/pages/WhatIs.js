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
          <p className="WhatIs_list">
          Lead Fast Reactors (LFRs) are a crucial technology for advancing both hydrogen energy and nuclear power solutions, offering a promising and ambitious approach. Investors are already drawn to the advantages of competitive small- to medium-sized LFRs and their potential impact on the global market. The EU-funded LESTO project aims to further develop this technology, advancing it along its established roadmap and demonstrating its safety, efficiency, and other key features. To achieve this, the project will leverage the most relevant facilities in Europe and the UK to thoroughly validate, assess, and assist in the continued development of LFR technology.
        </p>
        </section>
      </main>
    </div>
  );
};

export default WhatIs;

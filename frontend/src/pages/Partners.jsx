import React from "react";
import "./Partners.css"; 
import "../App.css"; 
import "@clr/icons/clr-icons.min.css";
import '@cds/core/select/register.js';


const Partners = () => {
return (
    <div className="text-page">
        <header className="header">
            <h1 className="SubTitle">Involved Partners</h1>
        </header>
        <main className="content">
            <section className="text-section">
            </section>
        <div className="partners">
            <div className="partner-box">
            <img id="chalmers" height={230} width={200} src="https://via.placeholder.com/200x230" alt="Partner logo" />
                <div className="partners-links">
                <a href="https://mockuplink.com">test link 1</a>
                </div >
             </div> 
             <div className="partner-box">  
            <img id="lund" height={200} width={200} src="https://via.placeholder.com/200" alt="Partner logo" />
                <div className="partners-links">
                <a href="https://mockuplink.com">test link 2</a>
                <a href="https://mockuplink.com">test link 3</a>
                </div>
            </div>
            <div className="partner-box">
            <img id="kth" height={200} width={200} src="https://via.placeholder.com/200" alt="Partner logo" />
                <div className="partners-links">
                <a href="https://mockuplink.com">test link 4</a>
                </div>
            </div>
            <div className="partner-box">
            <img height={200} src="https://via.placeholder.com/200" alt="Partner logo" />
                <div className="partners-links">
                <a href="https://mockuplink.com">test link 5</a>
                </div>
            </div>
            <div className="partner-box">
            <img id="uppsala" height={200} src="https://via.placeholder.com/200" alt="Partner logo" />
                <div className="partners-links">
                <a href="https://mockuplink.com">test link 6</a>
                <a href="https://mockuplink.com">test link 7</a>
                </div>
            </div>
            <div className="partner-box">
                <img className="kärnfull" height={40} src="https://via.placeholder.com/200x40" alt="Partner logo" />
                <div className="partners-links">
                <a href="https://mockuplink.com">test link 8</a>
                </div>
            </div>
            </div>
        </main>
    </div>
);
};

export default Partners;

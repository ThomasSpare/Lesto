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
        <div className="partners">
            <div className="partner-box">
                <div className="partners-links">
            <img id="kth" height={200} width={200} src="https://res.cloudinary.com/djunroohl/image/upload/v1746706552/PSI_kis5tq.png" alt="Partner logo" />
            <a href="https://www.raten.ro/" target="_blank" rel="noopener noreferrer">REGIA AUTONOMA TEHNOLOGII PENTRU ENERGIA NUCLEARA - RATEN</a>
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Romania.svg"
                    alt="Romanian Flag" 
                    className="flag" 
                    height={20} 
                    width={30} 
                    style={{ marginLeft: "10px" }} 
                />
                </div>
            </div>
             <div className="partner-box">  
            <img id="lund" height={200} width={200} src="https://res.cloudinary.com/djunroohl/image/upload/v1746704936/westinghouse-electric-company-seeklogo_iqypag.png" alt="Partner logo" />
                <div className="partners-links">
                <a href="https://westinghousenuclear.com/uknuclear/" target="_blank" rel="noopener noreferrer">Westinghouse Nuclear UK</a>
            <img 
                src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg" 
                alt="UK Flag"
                className="flag" 
                height={20} 
                width={30} 
                style={{ marginLeft: "10px" }} 
            />
                </div>
            </div>
            <div className="partner-box">
            <img id="chalmers" height={230} width={200} src="https://res.cloudinary.com/djunroohl/image/upload/v1746704936/westinghouse-electric-company-seeklogo_iqypag.png" alt="Partner logo" />
                <div className="partners-links">
                <a href="https://westinghousenuclear.com/" target="_blank" rel="noopener noreferrer">Westinghouse Nuclear US</a>
            <img 
                src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" 
                alt="US Flag"
                className="flag" 
                height={20} 
                width={30} 
                style={{ marginLeft: "10px" }} 
            />
                </div>
             </div> 
            </div>
        </main>
    </div>
);
};

export default Partners;

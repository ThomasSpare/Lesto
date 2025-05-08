import React from "react";
import "./Footer.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

const Footer = () => {
  return (
    <MDBFooter
      id="Footer"
      style={{
        backgroundColor: "#1a2f48",
        maxHeight: "200px",
      }}
      className="text-center text-lg-start text-muted"
    >
      <div className="Footer">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <div className="logo">
              <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                <img
                  className="footer-logo"
                  src={`${process.env.PUBLIC_URL}/enea.png`}
                  alt="ENEA logo"
                  style={{ width: "auto", height: "100%" }}
                />
              </MDBCol>
              <MDBCol md="4" lg="5" xl="5" className="mx-auto mb-4">
                <img
                  className="footer-logo"
                  src={`${process.env.PUBLIC_URL}/EN_FundedbytheEU_RGB_NEG.png`}
                  alt="Funded by EU logo"
                  style={{ width: "auto", height: "100%" }}
                />
              </MDBCol>
            </div>

            <MDBCol
              style={{ textAlign: "justify" }}
              md="4"
              lg="3"
              xl="3"
              className="mx-auto mb-md-0 mb-4"
            >
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p style={{ display: "flex", alignItems: "flex-start" }}>
                <MDBIcon color="secondary" icon="home" className="me-2" />
                <span
                  style={{
                    marginLeft: "1rem",
                    marginTop: "0rem",
                    textAlign: "left",
                  }}
                >
                  AGENZIA NAZIONALE PER LE NUOVE TECNOLOGIE, L'ENERGIA E LO
                  SVILUPPO ECONOMICO SOSTENIBILE<br></br>LUNGOTEVERE GRANDE
                  AMMIRAGLIO THAON DI REVEL <br></br>66 00196 Roma
                </span>
              </p>
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "1rem",
                }}
              >
                <MDBIcon color="secondary" icon="envelope" className="me-3" />
                <a
                  href="mailto:simone.gianfelici@enea.it"
                  style={{
                    textDecoration: "none",
                    color: "#48bffa",
                    fontSize: "1rem",
                  }}
                >
                  simone.gianfelici@enea.it
                </a>
              </p>
              {/* <p style={{ display: "flex", alignItems: "center" }}>
                <MDBIcon color="secondary" icon="phone" className="me-3" />
                <span style={{ marginLeft: "1rem" }}>031-772 1000</span>
              </p> */}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <div
          style={{
            flexDirection: "column",
            backgroundColor: "#1a2f48",
            width: "-webkit-fill-available !important",
          }}
          className="footer-bottom text-center p-4 text-white"
        >
          © 2025 Copyright:
          <a
            style={{
              margin: "auto",
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#1a2f48",
              width: "-webkit-fill-available !important",
            }}
            className="text-reset fw-bold"
            href="/"
          >
            LESTO
          </a>
        </div>
      </div>
    </MDBFooter>
  );
};

export default Footer;

import React, { useRef, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useLocation } from "react-router-dom";
import "../App.css";
import "../components/NavBar.css";
import "clarity-ui/clarity-ui.min.css";
import "clarity-icons/clarity-icons.min.css";
import "clarity-icons/shapes/technology-shapes.js";
import "@cds/core/button/register.js";
import "@cds/core/icon/register.js";
import "@cds/core/dropdown/register.js";
import "@cds/core/divider/register.js";
import {
  ClarityIcons,
  userIcon,
  bellIcon,
  cogIcon,
  homeIcon,
  vmIcon,
  searchIcon,
  thumbsUpIcon,
} from "@cds/core/icon";
import "@webcomponents/custom-elements/custom-elements.min.js";
// import { ReactComponent as LestLogo } from "../Assets/images/LestoLogo.svg";
import "@clr/icons/clr-icons.min.css";
import "@clr/icons/shapes/technology-shapes.js";
import ModalAuth from "./modal_auth.js";
import Dropdown1 from "./dropdown_1.jsx";
import Dropdown2 from "./dropdown_2.jsx";
import Dropdown3 from "./dropdown_3.jsx";

ClarityIcons.addIcons(bellIcon);
ClarityIcons.addIcons(cogIcon);
ClarityIcons.addIcons(userIcon);
ClarityIcons.addIcons(vmIcon);
ClarityIcons.addIcons(homeIcon);
ClarityIcons.addIcons(searchIcon);
ClarityIcons.addIcons(thumbsUpIcon);

function NavBar() {
  const { isLoading, user } = useAuth0();
  
  const [showLogo, setShowLogo] = useState(true);
  const location = useLocation();
  const email = user ? user.email : "Guest";
  
  
  useEffect(() => {
    if (!(location.pathname === '/' || 
      location.pathname === '/settings' || location.pathname === '/partners' || location.pathname === '/contacts'||
      location.pathname === '/public_docs' || location.pathname === '/deliverables_public' || location.pathname === '/allnews' ||
      location.pathname === '/search' || location.pathname === '/WP1' || location.pathname === '/WP2' || location.pathname === '/WP3' ||
      location.pathname === '/WP4' || location.pathname === '/WP5' || location.pathname === '/WP6' || location.pathname === '/promotion' ||
      location.pathname === '/publications' || location.pathname === '/reports' || location.pathname === '/contactlists' || location.pathname === '/deliverables' ||
     location.pathname === '/meetings' || location.pathname === '/templates' || location.pathname === '/Upload' || location.pathname === '/workstructure' ||
     location.pathname === '/What_is_Maste' || location.pathname === '/Aims' || location.pathname === '/partners' || location.pathname === '/contacts')) {
      setShowLogo(false);
    } else {
      setShowLogo(true);
    }
  }, [location]);
  
  
  const checkboxRef = useRef(null);
  
  const handleCheckboxChange = () => {
    const isDarkMode = document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
  };
  
  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode === "enabled") {
      document.body.classList.add("dark");
    }
  }, []);
      return (
        <header className="App-header">
          <div className="main">
        <header className="header header-6">
          {!isLoading && user && (
            <div className="currentUser">
          <cds-icon shape="thumbs-up"></cds-icon>
          <span className="display_email">
            Logged in as {" " + email || "Guest"}
          </span>
            </div>
          )}
            <ModalAuth isLoggedIn={isLoading} />
          <div className="branding" onClick={() => window.location.href = "/"}>
            {showLogo && (
          <img
            className="logo"
            src="https://res.cloudinary.com/djunroohl/image/upload/v1746742300/lesto-efficient-logo_j4yeuz.png"
            alt="Logo"
          />
            )}
          </div>
          <div className="settings">
            <input
          type="checkbox"
          className="checkbox"
          id="checkbox"
          ref={checkboxRef}
          onChange={handleCheckboxChange}
            />
            <label htmlFor="checkbox" className="checkbox-label">
          <i className="fas fa-moon"></i>
          <i className="fas fa-sun"></i>
          <div className="ball"></div>
            </label>
            <Link to="/" className="nav-link nav-icon">
          <cds-icon shape="home"></cds-icon>
            </Link>
            <Link to="/settings" className="nav-link nav-icon">
          <cds-icon shape="cog"></cds-icon>
            </Link>
          </div>
        </header>
        <nav className="subnav">
          <ul className="nav">
            <Dropdown1 />
            <Dropdown2 />
            <Dropdown3 isLoggedIn={!isLoading} />
            <Link to="/partners">PARTNERS</Link>
            <Link to="/contacts">CONTACTS</Link>
          </ul>
        </nav>
          </div>
        </header>
      );
}

export default NavBar;
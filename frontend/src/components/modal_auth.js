import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "@cds/core/icon/register.js";
import "@cds/core/dropdown/register.js";
import "@cds/core/divider/register.js";
import "@cds/core/modal/register.js";
import "@webcomponents/custom-elements/custom-elements.min.js";
import "@clr/icons/clr-icons.min.css";
import "@clr/icons/shapes/technology-shapes.js";
import { ClarityIcons, loginIcon } from "@cds/core/icon";
import "../App.css";
ClarityIcons.addIcons(loginIcon);

const ModalAuth = () => {
  const [isProcessingAuth, setIsProcessingAuth] = useState(false);
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    user,
  } = useAuth0();

  // Process authentication on page load - especially important after redirects
  useEffect(() => {
    // Only try to get token if authenticated and not already processing
    if (isAuthenticated && !isProcessingAuth && !isLoading) {
      setIsProcessingAuth(true);

      const getToken = async () => {
        try {
          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: process.env.REACT_APP_AUTH0_AUDIENCE,
              scope: "openid profile email read:files read:folders",
            },
          });
          console.log("Authentication successful, token retrieved");
          localStorage.setItem("auth_processed", "true");
          setIsProcessingAuth(false);
        } catch (error) {
          console.error("Error getting token:", error);
          setIsProcessingAuth(false);
        }
      };

      getToken();
    }
  }, [isAuthenticated, isLoading, getAccessTokenSilently, isProcessingAuth]);

  const handleLogin = async () => {
    try {
      // Clear any existing auth state first
      localStorage.removeItem("auth_processed");

      await loginWithRedirect({
        authorizationParams: {
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
          scope: "openid profile email read:files read:folders",
          redirect_uri: "https://maste-science-frontend.onrender.com/",
        },
      });
    } catch (error) {
      console.error("Login failed:", error);
      alert(`Login failed: ${error.message}`);
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("auth_processed");
      await logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <React.Fragment>
      <clr-modal clrModalOpen="opened" clrModalSize="sm">
        <clr-modal-footer>
          <cds-icon shape="login"></cds-icon>
          {!isAuthenticated && !isLoading && (
            <button className="btn btn-link" onClick={handleLogin}>
              Login
            </button>
          )}
          {isLoading && <span>Loading...</span>}
          {isAuthenticated && !isLoading && (
            <button className="btn btn-link" onClick={handleLogout}>
              Logout
            </button>
          )}
        </clr-modal-footer>
      </clr-modal>
    </React.Fragment>
  );
};

export default ModalAuth;

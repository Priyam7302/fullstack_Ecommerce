import React from "react";
import "../App.css";

function Home() {
  return (
    <div className="home-welcome-container" id="home-section">
      <h2 className="welcome-title" id="welcome-heading">
        🎉 Congratulations! 🎉
      </h2>

      <p className="welcome-message" id="login-register-info">
        You have successfully logged in and registered on our E-Commerce
        website.
      </p>

      <p className="welcome-message" id="shopping-info">
        Now you can browse our products and start shopping. 🛒
      </p>
    </div>
  );
}

export default Home;

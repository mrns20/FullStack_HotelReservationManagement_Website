import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css"; // Μεταφορά του style σε ξεχωριστό αρχείο

const HomePage: React.FC = () => {
  const hasVisitedLoginPage = () => {
    return localStorage.getItem("visitedLoginPage") === "true";
  };

  const openBookNowPage = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!hasVisitedLoginPage()) {
      event.preventDefault();
      alert("Please visit the Login page first.");
    } else {
      alert("Opening Book Now Form");
    }
  };

  return (
    <div>
      <header>
        <nav
          style={{
            backgroundImage:
              "linear-gradient(to bottom, MediumSlateBlue, #0ca0e7)",
          }}
        >
          <ul
            style={{
              listStyleType: "none",
              display: "flex",
              justifyContent: "flex-start",
              border: "1px solid black",
              color: "white",
            }}
          >
            <li
              style={{ width: "150px", padding: "10px", textAlign: "center" }}
            >
              <Link to="/login">Login</Link>
            </li>
            <li
              style={{ width: "150px", padding: "10px", textAlign: "center" }}
            >
              <Link to="/need-help">Need help?</Link>
            </li>
            <li
              style={{ width: "150px", padding: "10px", textAlign: "center" }}
            >
              <Link to="/about-us">About Us</Link>
            </li>
            <li
              style={{ width: "150px", padding: "10px", textAlign: "center" }}
            >
              <Link to="/rooms">Rooms</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="logo-text">Hotel Gourdo</div>
      <a
        id="BookNowButton"
        className="book-button"
        href="/book-now"
        onClick={openBookNowPage}
      >
        Book Now
      </a>
    </div>
  );
};

export default HomePage;

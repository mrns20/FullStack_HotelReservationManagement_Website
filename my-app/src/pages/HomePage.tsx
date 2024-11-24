import React from "react";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

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
    <div className={styles.pageWrapper}>
      {" "}
      {/* Added pageWrapper div */}
      <div className={styles.mainContent}>
        {" "}
        {/* Added mainContent div */}
        <header>
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <Link to="/">HomePage</Link>
              </li>
              <li className={styles.navItem}>
                <Link to="/login">Login</Link>
              </li>
              <li className={styles.navItem}>
                <Link to="/need-help">Need help?</Link>
              </li>
              <li className={styles.navItem}>
                <Link to="/about-us">About Us</Link>
              </li>
              <li className={styles.navItem}>
                <Link to="/rooms">Rooms</Link>
              </li>
            </ul>
          </nav>
        </header>
        <div className={styles.logoText}>Hotel Gourdo</div>
        <a
          id="BookNowButton"
          className={styles.bookButton}
          href="/book-now"
          onClick={openBookNowPage}
        >
          Book Now
        </a>
      </div>
      <footer className={styles.footerSection}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.ctaText}>
              <h4>Find us</h4>
              <span>Kotronas, Mani</span>
            </div>
            <img src="/pin.jpg" alt="Map Pin" className={styles.footerIcon} />
          </div>
        </div>
        <div className={styles.ctaText}>
          <h4>Call us</h4>
          <span>210-3411321</span>
        </div>
        <img src="/tel.jpg" alt="Tel" className={styles.footerIcon} />
        <div className={styles.singleCta}>
          <div className={styles.ctaText}>
            <h4>Mail us</h4>
            <span>hotelgourdo@gmail.com</span>
          </div>
          <img src="/email.jpg" alt="Email" className={styles.footerIcon} />
        </div>

        <div className={styles.footerSocialIcon}>
          <span>Follow us</span>
          <a href="#">
            <img
              src="/facebook.jpg"
              alt="Facebook"
              className={styles.socialIcon}
            />
          </a>
          <a href="#">
            <img
              src="/instagram.jpg"
              alt="Instagram"
              className={styles.socialIcon}
            />
          </a>
        </div>

        <div className={styles.copyrightArea}>
          <div className={styles.copyrightText}>
            <p>
              &copy; {new Date().getFullYear()} Hotel Gourdo. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

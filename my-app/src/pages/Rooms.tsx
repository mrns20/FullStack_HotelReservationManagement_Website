import React from "react";
import styles from "./Rooms.module.css";
import {Link} from "react-router-dom";

const Rooms: React.FC = () => {
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
      <header>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to="/">HomePage</Link>
            </li>
            <li className={styles.navItem}>
              <a href="/login">Login</a>
            </li>
            <li className={styles.navItem}>
              <a href="/need-help">Need help?</a>
            </li>
            <li className={styles.navItem}>
              <a href="/about-us">About Us</a>
            </li>
            <li className={styles.navItem}>
              <a href="/rooms">Rooms</a>
            </li>
          </ul>
        </nav>
      </header>

      <div className={styles.logoText}>Hotel Gourdo</div>

      <div className={styles.mainContent}>
        <div className={styles.infoBox}>
          The hotel offers 20 spacious rooms. Breakfast is included in the room
          value, with the possibility of in-room service.
        </div>

        <div id="box4" className={styles.gbox}>
          <ol>
            <li className={styles.discList}>Check in: From 9 AM</li>
            <li className={styles.discList}>Check out: To 12 AM</li>
            <li className={styles.discList}>Reception: From 8 AM to 10 PM</li>
          </ol>
        </div>

        <div id="box3" className={styles.gbox}>
          <div className={styles.logoText2}>Rooms</div>
          <ol>
            <li className={styles.discList}>8 2-person rooms</li>
            <li className={styles.discList}>8 3-person rooms</li>
            <li className={styles.discList}>4 4-person rooms</li>
          </ol>
        </div>

        <div className={styles.title}>Excellent hospitality facilities</div>
        <div className={styles.featureList}>
          <div className={styles.featureItem}>
            <span className={styles.featureText}>Baggage transfer service</span>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureText}>Free WiFi</span>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureText}>Private Parking</span>
          </div>
        </div>

        <div className={styles.divider}></div>
        <div className={styles.featureList}>
          <div className={styles.featureItem}>
            <span className={styles.featureText}>Netflix</span>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureText}>Pet Friendly</span>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureText}>Climate Control</span>
          </div>
        </div>

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

export default Rooms;

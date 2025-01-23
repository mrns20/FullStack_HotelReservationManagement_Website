import React from "react";
import { Link } from "react-router-dom";
import styles from "./AboutUs.module.css";



const AboutUs: React.FC = () => {
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

      <div className={styles.mainContent}>
        <div className={styles.logoText}>Hotel DMD</div>
        <div className={styles.logoText2}>About Us</div>

        <div className={styles.gbox}>
          <p>
            "Welcome to Hotel DMD! Nestled in the picturesque village of
            Kotronas, Mani, our charming hotel offers a truly unforgettable
            experience. Situated near the captivating shoreline and surrounded
            by the beauty of nature, Hotel DMD is the perfect destination for
            relaxation and exploration. Our guests not only enjoy comfortable
            accommodations but also have the convenience of being close to the
            serene sea and a variety of authentic taverns. With a commitment to
            providing exceptional service and an inviting atmosphere, we invite
            you to make Hotel Gourdo your home away from home during your visit
            to the enchanting region of Mani..."
          </p>
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
            <span>hotelDMD@gmail.com</span>
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
              &copy; {new Date().getFullYear()} Hotel DMD. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;

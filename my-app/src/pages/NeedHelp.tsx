import React, { useState } from "react";
import styles from "./NeedHelp.module.css";
import {Link} from "react-router-dom";

const NeedHelp: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, phoneNo, email, message }),
      });

      if (response.ok) {
        setConfirmationMessage(
          "Thanks for your message. An employee of the hotel will contact you shortly via email."
        );
      } else {
        setConfirmationMessage("An error has occurred.");
      }
    } catch (error) {
      console.error(error);
      setConfirmationMessage("An error has occurred.");
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

      <div className={styles.container}>
        <h3 className={styles.logoText2}>Send us your Message!</h3>
        <form onSubmit={handleSubmit} autoComplete="on">
          <div className={styles.box}>
            <label className={styles.fontLabel}>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={styles.textBox}
              required
              maxLength={15}
              placeholder="First Name"
            />
          </div>

          <div className={styles.box}>
            <label className={styles.fontLabel}>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={styles.textBox}
              required
              maxLength={15}
              placeholder="Last Name"
            />
          </div>

          <div className={styles.box}>
            <label className={styles.fontLabel}>Phone Number:</label>
            <input
              type="text"
              name="phoneNo"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              className={styles.textBox}
              required
              maxLength={10}
              placeholder="Phone Number"
            />
          </div>

          <div className={styles.box}>
            <label className={styles.fontLabel}>Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.textBox}
              required
              maxLength={20}
              placeholder="Email"
            />
          </div>

          <div className={styles.box}>
            <label className={styles.fontLabel}>Message:</label>
            <textarea
              id="textarea"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              cols={30}
              className={styles.textBox}
              placeholder="Direct communication with a hotel employee..."
            />
          </div>

          <div className={styles.submitBox}>
            <button type="submit" className={styles.submit}>
              Send
            </button>
          </div>
        </form>

        {confirmationMessage && (
          <p className={styles.message}>{confirmationMessage}</p>
        )}
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

export default NeedHelp;

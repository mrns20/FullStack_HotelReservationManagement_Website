import React, { useState } from "react";
import axios from "axios";
import styles from "./NeedHelp.module.css";
import { Link } from "react-router-dom";

const NeedHelp: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
    email: "",
    message: "",
  });

  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setConfirmationMessage(null);

    try {
      const response = await axios.post('http://127.0.0.1:8000/message/', {
        m_firstname: formData.firstName,
        m_lastname: formData.lastName,
        m_tel: formData.phoneNo,
        m_email: formData.email,
        message: formData.message,
      });

      if (response.status === 201) {
        setConfirmationMessage("Thanks for your message. An employee of the hotel will contact you shortly via email.");
      } else {
        setError("An error has occurred.");
      }
    } catch (err) {
      setError("Failed to send message. Please check your input and try again.");
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

        <div className={styles.logoText}>Hotel DMD</div>

        <div className={styles.container}>
          <h3 className={styles.logoText2}>Send us your Message!</h3>
          <form onSubmit={handleSubmit} autoComplete="on">
            <div className={styles.box}>
              <label className={styles.fontLabel}>First Name:</label>
              <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
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
                  value={formData.lastName}
                  onChange={handleChange}
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
                  value={formData.phoneNo}
                  onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.textBox}
                  required
                  maxLength={30}
                  placeholder="Email"
              />
            </div>

            <div className={styles.box}>
              <label className={styles.fontLabel}>Message:</label>
              <textarea
                  id="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  cols={30}
                  className={styles.textBox}
                  placeholder="Direct communication with a hotel employee..."
                  required
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
          {error && (
              <p className={styles.errorMessage}>{error}</p>
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

export default NeedHelp;
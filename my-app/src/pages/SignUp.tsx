import React, { useState } from "react";
import axios from "axios";
import styles from "./SignUp.module.css";
import { Link } from "react-router-dom";
import axiosInstance from "../axiosConfig";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    pass: "",
    firstName: "",
    lastName: "",
    phoneNo: "",
    terms: false,
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axiosInstance.post("/clients/", {
        username: formData.username,
        email: formData.email,
        password: formData.pass,
        firstname: formData.firstName,
        lastname: formData.lastName,
        tel: formData.phoneNo,
      });

      if (response.status === 201) {
        alert("Welcome to Hotel Gourdo!");
      } else {
        setError("An error has occurred.");
      }
    } catch (err) {
      setError("Failed to create user. Please check your input and try again.");
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
          </ul>
        </nav>
      </header>

      <div className={styles.mainContent}>
        <div className={styles.logoText}>Hotel Gourdo</div>
        <div className={styles.logoText2}>- Sign Up Page -</div>

        <form onSubmit={handleSubmit} className={styles.signUpForm}>
          <div className={styles.box}>
            <label className={styles.fontLabel}>Username:</label>
            <input
              type="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={styles.textBox}
              placeholder="Username"
              required
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
              placeholder="Email"
              required
            />
          </div>
          <div className={styles.box}>
            <label className={styles.fontLabel}>Password:</label>
            <input
              type="password"
              name="pass"
              value={formData.pass}
              onChange={handleChange}
              className={styles.textBox}
              placeholder="Password"
              required
            />
          </div>
          <div className={styles.box}>
            <label className={styles.fontLabel}>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={styles.textBox}
              placeholder="First Name"
              required
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
              placeholder="Last Name"
              required
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
              placeholder="Phone Number"
              required
            />
          </div>
          <div className={`${styles.box} ${styles.terms}`}>
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              required
            />
            &nbsp; I accept the terms and conditions
          </div>
          <div className={styles.box}>
            <button type="submit" className={styles.submitButton}>
              SIGN UP
            </button>
          </div>
        </form>
        {error && <div style={{ color: "red" }}>{error}</div>}
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

export default SignUp;

import React, { useState } from "react";
import styles from "./Login.module.css"; // Import CSS module

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "example@email.com" && password === "password123") {
      setMessage("Welcome to Hotel Gourdo!");
    } else {
      setMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <header>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
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

      <div className={styles.mainContent}>
        <div className={styles.logoText}>Hotel Gourdo</div>

        <div className={styles.form}>
          <h3>LOGIN</h3>
          <p>Please enter your credentials to login.</p>

          <form className={styles.loginForm} onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              maxLength={12}
              required
            />
            <br />
            <button type="submit" className={styles.submitButton}>
              Login
            </button>
          </form>

          <p className={styles.message}>
            Not registered? <a href="/sign-up">Create an account</a>
          </p>

          {message && <p className={styles.message}>{message}</p>}
        </div>
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

export default Login;

// Login.tsx
import React, { useState } from "react";
import "./Login.css"; // Εισαγωγή των στυλ

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Εδώ θα γίνει η επαλήθευση των στοιχείων
    // Αντικαταστήστε με το backend request
    if (email === "example@email.com" && password === "password123") {
      setMessage("Welcome to Hotel Gourdo!");
    } else {
      setMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <header>
        <nav>
          <ul>
            <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/need-help">Need help?</a>
            </li>
            <li>
              <a href="/about-us">About Us</a>
            </li>
            <li>
              <a href="/rooms">Rooms</a>
            </li>
          </ul>
        </nav>
      </header>

      <div className="logo-text">Hotel Gourdo</div>

      <div className="form">
        <h3>LOGIN</h3>
        <p>Please enter your credentials to login.</p>

        <form className="login-form" onSubmit={handleLogin}>
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
          <button type="submit">Login</button>
        </form>

        <p className="message">
          Not registered? <a href="/sign-up">Create an account</a>
        </p>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Login;

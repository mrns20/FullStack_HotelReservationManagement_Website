// Login.tsx
import React, { useState } from 'react';
import './Login.css'; // Εισαγωγή των στυλ

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

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
                        <li><a href="/my-app/src/pages/Login">Login</a></li>
                        <li><a href="/my-app/src/pages/NeedHelp">Need help?</a></li>
                        <li><a href="/my-app/src/pages/AboutUs">About Us</a></li>
                        <li><a href="/my-app/src/pages/Rooms">Rooms</a></li>
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
                    /><br />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={8}
                        maxLength={12}
                        required
                    /><br />
                    <button type="submit">Login</button>
                </form>

                <p className="message">Not registered? <a href="/my-app/src/pages/SignUp">Create an account</a></p>

                {message && <p className="message">{message}</p>}
            </div>

            <footer className="footer-section">
                <div className="cta-text">
                    <h4>Find us</h4>
                    <span>Kotronas, Mani</span>
                    <img src="pin.jpg" alt="Map Pin" style={{ width: '30px', height: 'auto' }} />
                </div>
                <div className="cta-text">
                    <h4>Call us</h4>
                    <span>210-3411321</span>
                    <img src="tel.jpg" alt="Tel" style={{ width: '30px', height: 'auto' }} />
                </div>
                <div className="cta-text">
                    <h4>Mail us</h4>
                    <span>hotelgourdo@gmail.com</span>
                    <img src="email.jpg" alt="Email" style={{ width: '30px', height: 'auto' }} />
                </div>
                <div className="footer-social-icon" style={{ marginTop: '20px' }}>
                    <span>Follow us</span>
                    <a href="#"><img src="facebook.jpg" alt="Facebook" style={{ width: '30px', height: 'auto' }} /></a>
                    <a href="#"><img src="instagram.jpg" alt="Instagram" style={{ width: '30px', height: 'auto', marginLeft: '10px' }} /></a>
                </div>
                <div className="copyright-area">
                    <div className="copyright-text">
                        <p>&copy; 2023 Hotel Gourdo | All Rights Reserved | Powered by D.Gourdo</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Login;

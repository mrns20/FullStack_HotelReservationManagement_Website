// NeedHelp.tsx
import React, { useState } from 'react';
import './NeedHelp.css'; // Εισαγωγή των στυλ

const NeedHelp: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [confirmationMessage, setConfirmationMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Εδώ θα γίνει η αποστολή των δεδομένων στον server
        // Αντικαταστήστε με το API call για την εισαγωγή στην DB
        try {
            const response = await fetch('/sendMessage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, phoneNo, email, message }),
            });

            if (response.ok) {
                setConfirmationMessage('Thanks for your message. An employee of the hotel will contact you shortly via email.');
            } else {
                setConfirmationMessage('An error has occurred.');
            }
        } catch (error) {
            console.error(error);
            setConfirmationMessage('An error has occurred.');
        }
    };

    return (
        <div>
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

            <div className="container">
                <div className="logo-text2">Send us your Message!</div>
                <form onSubmit={handleSubmit} autoComplete="on">
                    <div className="box">
                        <label className="fl fontLabel">First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="textBox"
                            required
                            maxLength={15}
                            placeholder="First Name"
                        />
                    </div>

                    <div className="box">
                        <label className="fl fontLabel">Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="textBox"
                            required
                            maxLength={15}
                            placeholder="Last Name"
                        />
                    </div>

                    <div className="box">
                        <label className="fl fontLabel">Phone Number:</label>
                        <input
                            type="text"
                            name="phoneNo"
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                            className="textBox"
                            required
                            maxLength={10}
                            placeholder="Phone Number"
                        />
                    </div>

                    <div className="box">
                        <label className="fl fontLabel">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="textBox"
                            required
                            maxLength={20}
                            placeholder="Email"
                        />
                    </div>

                    <div className="box">
                        <label className="fl fontLabel">Message:</label>
                        <textarea
                            id="textarea"
                            name="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={4}
                            cols={30}
                            placeholder="Direct communication with a hotel employee..."
                        />
                    </div>

                    <div className="box" style={{ marginBottom: '20px' }}>
                        <button type="submit" className="submit">Send</button>
                    </div>
                </form>

                {confirmationMessage && <p className="message">{confirmationMessage}</p>}
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
};

export default NeedHelp;

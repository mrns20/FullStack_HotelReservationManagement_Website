import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Μεταφορά του style σε ξεχωριστό αρχείο

const HomePage: React.FC = () => {

    const hasVisitedLoginPage = () => {
        return localStorage.getItem("visitedLoginPage") === "true";
    };

    const openBookNowPage = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (!hasVisitedLoginPage()) {
            event.preventDefault();
            alert("Please visit the Login page first.");
        } else {
            alert("Opening Book Now Form");
        }
    };

    return (
        <div>
            <header>
                <nav style={{ backgroundImage: 'linear-gradient(to bottom, MediumSlateBlue, #0ca0e7)' }}>
                    <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'flex-start', border: '1px solid black', color: 'white' }}>
                        <li style={{ width: '150px', padding: '10px', textAlign: 'center' }}><Link to="/login">Login</Link></li>
                        <li style={{ width: '150px', padding: '10px', textAlign: 'center' }}><Link to="/need-help">Need help?</Link></li>
                        <li style={{ width: '150px', padding: '10px', textAlign: 'center' }}><Link to="/about-us">About Us</Link></li>
                        <li style={{ width: '150px', padding: '10px', textAlign: 'center' }}><Link to="/rooms">Rooms</Link></li>
                    </ul>
                </nav>
            </header>
            <div className="logo-text">Hotel Gourdo</div>
            <a id="BookNowButton" className="book-button" href="/book-now" onClick={openBookNowPage}>Book Now</a>

            <footer className="footer-section">
                <div className="container">
                    <div className="row">
                        <div className="cta-text">
                            <h4>Find us</h4>
                            <span>Kotronas,Mani</span>
                        </div>
                        <img src="/pin.jpg" alt="Map Pin" style={{ width: '30px', height: 'auto' }} />
                    </div>
                </div>
                <div className="cta-text">
                    <h4>Call us</h4>
                    <span>210-3411321</span>
                </div>
                <img src="/tel.jpg" alt="Tel" style={{ width: '30px', height: 'auto' }} />
                <div className="single-cta">
                    <div className="cta-text">
                        <h4>Mail us</h4>
                        <span>hotelgourdo@gmail.com</span>
                    </div>
                    <img src="/email.jpg" alt="Email" style={{ width: '30px', height: 'auto' }} />
                </div>

                <div className="footer-social-icon" style={{ marginTop: '20px' }}>
                    <span>Follow us</span>
                    <a href="#"><img src="/facebook.jpg" alt="Facebook" style={{ width: '30px', height: 'auto', display: 'inline-block' }} /></a>
                    <a href="#"><img src="/instagram.jpg" alt="Instagram" style={{ width: '30px', height: 'auto', display: 'inline-block', marginLeft: '10px' }} /></a>
                </div>

                <div className="copyright-area">
                    <div className="copyright-text">
                        <p>&copy; 2024 Hotel Gourdo | All Rights Reserved | Powered by D.G.Gourdo</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;

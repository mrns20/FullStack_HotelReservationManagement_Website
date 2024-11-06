// front-end/pages/AboutUs.tsx
import React from 'react';
import './AboutUs.css'; // Εισαγωγή του CSS αρχείου

const AboutUs: React.FC = () => {
    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li><a href="Login.jsp">Login</a></li>
                        <li><a href="NeedHelp.jsp">Need help?</a></li>
                        <li><a href="AboutUs.html">About Us</a></li>
                        <li><a href="Rooms.html">Rooms</a></li>
                    </ul>
                </nav>
            </header>

            <div className="logo-text">Hotel Gourdo</div>

            <div className="logo-text2">About Us</div>

            <div id="box3" className="gbox">
                "Welcome to Hotel Gourdo! Nestled in the picturesque village of Kotronas, Mani, our charming hotel offers a truly unforgettable experience. Situated near the captivating shoreline and surrounded by the beauty of nature, Hotel Gourdo is the perfect destination for relaxation and exploration. Our guests not only enjoy comfortable accommodations but also have the convenience of being close to the serene sea and a variety of authentic taverns. With a commitment to providing exceptional service and an inviting atmosphere, we invite you to make Hotel Gourdo your home away from home during your visit to the enchanting region of Mani..."
            </div>

            <a id="BookNowButton" className="book-button" href="BookNow.jsp">Book Now</a>

            <footer className="footer-section">
                <div className="container">
                    <div className="row">
                        <div className="cta-text">
                            <h4>Find us</h4>
                            <span>Kotronas,Mani</span>
                        </div>
                        <img src="pin.jpg" alt="Map Pin" style={{ width: '30px', height: 'auto' }} />
                    </div>
                </div>
                <div className="cta-text">
                    <h4>Call us</h4>
                    <span>210-3411321</span>
                </div>
                <img src="tel.jpg" alt="Tel" style={{ width: '30px', height: 'auto' }} />
                <div className="single-cta">
                    <div className="cta-text">
                        <h4>Mail us</h4>
                        <span>hotelgourdo@gmail.com</span>
                    </div>
                    <img src="email.jpg" alt="Email" style={{ width: '30px', height: 'auto' }} />
                </div>

                <div className="footer-social-icon" style={{ marginTop: '20px' }}>
                    <span>Follow us</span>
                    <a href="#"><img src="facebook.jpg" alt="Facebook" style={{ width: '30px', height: 'auto', display: 'inline-block' }} /></a>
                    <a href="#"><img src="instagram.jpg" alt="Instagram" style={{ width: '30px', height: 'auto', display: 'inline-block', marginLeft: '10px' }} /></a>
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

export default AboutUs;

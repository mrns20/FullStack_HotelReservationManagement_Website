import React from 'react';
import './Rooms.css';

const Rooms: React.FC = () => {
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

            <div className="info-box">
                The hotel offers 20 spacious rooms. Breakfast is included in the room value, with the possibility of in-room service.
            </div>

            <div id="box4" className="gbox">
                <ol>
                    <li style={{ listStyleType: 'disc' }}>Check in: From 9 AM</li>
                    <li style={{ listStyleType: 'disc' }}>Check out: To 12 AM</li>
                    <li style={{ listStyleType: 'disc' }}>Reception: From 8 AM to 10 PM</li>
                </ol>
            </div>

            <div id="box3" className="gbox">
                <div className="logo-text2">Rooms</div>
                <ol>
                    <li style={{ listStyleType: 'disc' }}>8 2-persons rooms</li>
                    <li style={{ listStyleType: 'disc' }}>8 3-persons rooms</li>
                    <li style={{ listStyleType: 'disc' }}>4 4-persons rooms</li>
                </ol>
            </div>

            <div className="title">Excellent hospitality facilities</div>
            <div className="feature-list">
                <div className="feature-item">
                    <span className="feature-text">Baggage transfer service</span>
                </div>
                <div className="feature-item">
                    <span className="feature-text">Free WiFi</span>
                </div>
                <div className="feature-item">
                    <span className="feature-text">Private Parking</span>
                </div>
            </div>

            <div className="divider"></div>
            <div className="feature-list">
                <div className="feature-item">
                    <span className="feature-text">Netflix</span>
                </div>
                <div className="feature-item">
                    <span className="feature-text">Pet Friendly</span>
                </div>
                <div className="feature-item">
                    <span className="feature-text">Climate Control</span>
                </div>
            </div>

            <a id="BookNowButton" className="book-button" href="BookNow.jsp">Book Now</a>

            <footer className="footer-section">
                <div className="container">
                    <div className="row">
                        <div className="cta-text">
                            <h4>Find us</h4>
                            <span>Kotronas, Mani</span>
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
}

export default Rooms;

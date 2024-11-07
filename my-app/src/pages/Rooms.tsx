import React from "react";
import "./Rooms.css";

const Rooms: React.FC = () => {
  return (
    <div>
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

      <div className="info-box">
        The hotel offers 20 spacious rooms. Breakfast is included in the room
        value, with the possibility of in-room service.
      </div>

      <div id="box4" className="gbox">
        <ol>
          <li style={{ listStyleType: "disc" }}>Check in: From 9 AM</li>
          <li style={{ listStyleType: "disc" }}>Check out: To 12 AM</li>
          <li style={{ listStyleType: "disc" }}>
            Reception: From 8 AM to 10 PM
          </li>
        </ol>
      </div>

      <div id="box3" className="gbox">
        <div className="logo-text2">Rooms</div>
        <ol>
          <li style={{ listStyleType: "disc" }}>8 2-persons rooms</li>
          <li style={{ listStyleType: "disc" }}>8 3-persons rooms</li>
          <li style={{ listStyleType: "disc" }}>4 4-persons rooms</li>
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

      <a id="BookNowButton" className="book-button" href="/book-now">
        Book Now
      </a>
    </div>
  );
};

export default Rooms;

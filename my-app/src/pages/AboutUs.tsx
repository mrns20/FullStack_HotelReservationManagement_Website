// front-end/pages/AboutUs.tsx
import React from "react";
import "./AboutUs.css"; // Εισαγωγή του CSS αρχείου

const AboutUs: React.FC = () => {
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
              <a href="/about_us">About Us</a>
            </li>
            <li>
              <a href="/rooms">Rooms</a>
            </li>
          </ul>
        </nav>
      </header>

      <div className="logo-text">Hotel Gourdo</div>

      <div className="logo-text2">About Us</div>

      <div id="box3" className="gbox">
        "Welcome to Hotel Gourdo! Nestled in the picturesque village of
        Kotronas, Mani, our charming hotel offers a truly unforgettable
        experience. Situated near the captivating shoreline and surrounded by
        the beauty of nature, Hotel Gourdo is the perfect destination for
        relaxation and exploration. Our guests not only enjoy comfortable
        accommodations but also have the convenience of being close to the
        serene sea and a variety of authentic taverns. With a commitment to
        providing exceptional service and an inviting atmosphere, we invite you
        to make Hotel Gourdo your home away from home during your visit to the
        enchanting region of Mani..."
      </div>

      <a id="BookNowButton" className="book-button" href="/book-now">
        Book Now
      </a>
    </div>
  );
};

export default AboutUs;

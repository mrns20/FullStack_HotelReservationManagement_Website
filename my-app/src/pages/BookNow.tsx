import React, { useState } from "react";
import styles from "./BookNow.module.css";
import { Link } from "react-router-dom";
import axiosInstance from "../axiosConfig";

const BookNow: React.FC = () => {
  const [arrival, setArrival] = useState<string>(""); // Arrival date
  const [departure, setDeparture] = useState<string>(""); // Departure date
  const [rooms_needed, setRoomsNeeded] = useState<number>(1); // Rooms needed (integer)
  const [capacity, setCapacity] = useState<number>(2); // Number of guests (integer)
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Availability check
    setMessage(
      "Availability checked. Press Modify Reservation if you'd like to proceed."
    );
    setError(null);

    try {
      // Make an API call to check room availability
      const response = await axiosInstance.post(
        "/booking/check-availability/",
        {
          arrival,
          departure,
          capacity,
          rooms_needed,
        }
      );

      if (response.status === 200) {
        setMessage(
          "Rooms are available! You can proceed to modify your reservation."
        );
      } else {
        setMessage(
          "No rooms available for the selected dates. Please try again."
        );
      }
    } catch (error) {
      setMessage("Error occurred while checking availability.");
    }
  };

  const handleModifyReservation = async (event: React.FormEvent) => {
    event.preventDefault();
    const username = localStorage.getItem("username"); // Get the username from localStorage
    const token = localStorage.getItem("token"); // JWT token from localStorage
    try {
      const response = await axiosInstance.post(
        "/booking/modify-reservation/",
        {
          username,
          password: token, // Assuming you use token for authorization or get the password securely
          arrival,
          departure,
          capacity,
          rooms_needed,
        }
      );

      if (response.status === 201) {
        setMessage("Reservation modified successfully!");
      }
    } catch (err) {
      setError("Failed to modify reservation.");
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
        <div className={styles.logoText2}>- Book Now -</div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Arrival: </label>
            <input
              type="date"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Departure: </label>
            <input
              type="date"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>No. of Rooms: </label>
            <select
              value={rooms_needed}
              onChange={(e) => setRoomsNeeded(Number(e.target.value))}
            >
              <option value="one">1</option>
              <option value="two">2</option>
              <option value="three">3</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>No. of Guests: </label>
            <select
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
            >
              <option value="two">2</option>
              <option value="three">3</option>
              <option value="four">4</option>
            </select>
          </div>

          <button type="submit" className={styles.submitButton}>
            See Availability
          </button>
          <button
            onClick={handleModifyReservation}
            className={styles.modifyButton}
          >
            Modify Reservation
          </button>

          {message && <p className={styles.message}>{message}</p>}
        </form>
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

export default BookNow;

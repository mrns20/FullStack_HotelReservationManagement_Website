import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./BookNow.module.css";
import { Link, useNavigate } from "react-router-dom";


const BookNow: React.FC = () => {
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (setter: React.Dispatch<React.SetStateAction<any>>) => (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setter(e.target.value);
  };

  const checkAvailability = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/booking/check-availability/", {
        arrival,
        departure,
        capacity: guests,
        rooms_needed: rooms,
      });

      if (response.status === 200) {
        setMessage("Room(s) available. Press Confirm Reservation to proceed.");
      }
    } catch (error) {
      setMessage("Not enough rooms available.");
    } finally {
      setLoading(false);
    }
  };

  const confirmReservation = async (e: React.FormEvent) => {
      e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/booking/modify-reservation/", {
        username,
        password,
        arrival,
        departure,
        capacity: guests,
        rooms_needed: rooms,
      });

      console.log("Backend Response:", response.data);

      if (response.status === 201) {
          navigate("/payment");
      } else {
        setMessage(response.data.message || "Reservation failed.");
      }
    } catch (error) {
      setMessage("Authentication failed or other error occurred.");
    } finally {
      setLoading(false);
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
          <div className={styles.logoText}>Hotel DMD</div>
          <div className={styles.logoText2}>- Book Now -</div>

          <form onSubmit={checkAvailability}>
            <div className={styles.formGroup}>
              <label>Arrival: </label>
              <input
                  type="date"
                  name="arrival"
                  value={arrival}
                  onChange={handleChange(setArrival)}
                  required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Departure: </label>
              <input
                  type="date"
                  name="departure"
                  value={departure}
                  onChange={handleChange(setDeparture)}
                  required
              />
            </div>

            <div className={styles.formGroup}>
              <label>No. of Rooms: </label>
              <select name="rooms" value={rooms} onChange={handleChange(setRooms)}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>No. of Guests: </label>
              <select name="guests"  value={guests} onChange={handleChange(setGuests)}>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </select>
            </div>

            <button name="Submit1" type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? "Loading..." : "See Availability"}
            </button>
          </form>

          <form onSubmit={confirmReservation}>
            <div className={styles.formGroup}>
              <label>Username: </label>
              <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleChange(setUsername)}
                  required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Password: </label>
              <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange(setPassword)}
                  required
              />
            </div>

            <button
                name="Submit2"
                type="submit"
                className={styles.modifyButton}
                disabled={loading || !message.includes("available")}
            >
              {loading ? "Loading..." : "Confirm Reservation"}
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
              <span>hotelDMD@gmail.com</span>
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
                &copy; {new Date().getFullYear()} Hotel DMD. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
  );
};

export default BookNow;


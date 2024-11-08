import React, { useState } from "react";
import "./BookNow.module.css"; // Σύνδεση του εξωτερικού CSS

const BookNow: React.FC = () => {
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [rooms, setRooms] = useState("one");
  const [guests, setGuests] = useState("two");
  const [message, setMessage] = useState("");
  const [availableRooms, setAvailableRooms] = useState(0);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Εδώ προσθέστε την αίτηση για να δείτε τη διαθεσιμότητα
      const response = await fetch("/api/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ arrival, departure, rooms, guests }),
      });

      const data = await response.json();

      if (data.availableRooms >= parseInt(rooms)) {
        setMessage("Press Modify Reservation button to complete the booking.");
      } else {
        setMessage(
          "Unfortunately, the room(s) that you prefer are full for this specific time."
        );
      }
    } catch (error) {
      console.error("Error fetching availability:", error);
    }
  };

  const handleModifyReservation = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Εδώ προσθέστε την αίτηση για να κάνετε την κράτηση
      const response = await fetch("/api/book-now", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ arrival, departure, rooms, guests }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Successful Booking!");
      } else {
        setMessage("An error has occurred.");
      }
    } catch (error) {
      console.error("Error making booking:", error);
      setMessage("An error has occurred.");
    }
  };

  return (
    <div className="container">
      <div className="logo-text">Hotel Gourdo</div>
      <div className="logo-text2">-Book Now Form-</div>
      <form onSubmit={handleSubmit}>
        <div className="box">
          <label className="fl fontLabel">Arrival: </label>
          <div className="fr">
            <input
              type="date"
              name="Arrival"
              className="textBox"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              required
            />
          </div>
          <div className="clr"></div>
        </div>

        <div className="box">
          <label className="fl fontLabel">Departure: </label>
          <div className="fr">
            <input
              type="date"
              name="Departure"
              className="textBox"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              required
            />
          </div>
          <div className="clr"></div>
        </div>

        <div className="box">
          <label className="fl fontLabel">No. of Rooms: </label>
          <div className="fr">
            <select
              name="Rooms"
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
            >
              <option value="one">1</option>
              <option value="two">2</option>
              <option value="three">3</option>
            </select>
          </div>
          <div className="clr"></div>
        </div>

        <div className="box">
          <label className="fl fontLabel">No. of Guests: </label>
          <div className="fr">
            <select
              name="Guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            >
              <option value="two">2</option>
              <option value="three">3</option>
              <option value="four">4</option>
            </select>
          </div>
          <div className="clr"></div>
        </div>

        <div className="box" style={{ background: "#2d3e3f" }}>
          <button type="submit" className="submit">
            See Availability
          </button>
        </div>

        <div className="box2" style={{ background: "#2d3e3f" }}>
          <button onClick={handleModifyReservation} className="submit">
            Modify Reservation
          </button>
        </div>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default BookNow;

import React, { useState } from "react";
import "./PaymentPage.module.css";

const PaymentPage: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmitCreditCard = (event: React.FormEvent) => {
    event.preventDefault();
   // API CALL !!!
    setMessage("Successful Payment!");
  };

  return (
    <div className="container">
      <div className="logo-text">Hotel Gourdo</div>
      <div className="logo-text2">Payment Page</div>

      <form onSubmit={handleSubmitCreditCard} autoComplete="on">
          <div className="form-container" id="creditForm">
            <h2>Credit Card Payment</h2>
            <label htmlFor="creditNumber">Credit Card Number:</label>
            <input
              type="text"
              id="creditNumber"
              name="creditNumber"
              minLength={16}
              maxLength={16}
              pattern="[0-9]+"
              required
            />
            <label htmlFor="creditName">Name on Credit Card:</label>
            <input
              type="text"
              id="creditName"
              name="creditName"
              maxLength={30}
              required
            />
            <label htmlFor="expiryDate">Expiry Date:</label>
            <input type="month" id="expiryDate" name="expiryDate" required />
            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              minLength={3}
              maxLength={3}
              pattern="[0-9]+"
              required
            />
            <input type="submit" className="submit" value="Pay Now" />
          </div>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default PaymentPage;

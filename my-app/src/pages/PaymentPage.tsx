import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./PaymentPage.module.css";

const PaymentPage: React.FC = () => {
    const [creditNumber, setCreditNumber] = useState("");
    const [creditName, setCreditName] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [lastBookingId, setLastBookingId] = useState<number | null>(null);

    // Λήψη του τελευταίου `b_id` κατά το mount του component
    useEffect(() => {
        const fetchLastBookingId = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/booking/last/");
                if (response.status === 200) {
                    setLastBookingId(response.data.last_b_id);
                }
            } catch (error) {
                console.error("Error fetching last booking ID:", error);
            }
        };

        fetchLastBookingId();
    }, []);

    const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const [year, month] = value.split("-");
        const formattedExpiryDate = `${month}${year.slice(2)}`;
        setExpiryDate(formattedExpiryDate);
    };

    const formatExpiryDateForDisplay = (date: string) => {
        if (date.length === 4) {
            const month = date.slice(0, 2);
            const year = `20${date.slice(2)}`;
            return `${year}-${month}`;
        }
        return "";
    };

    const handleSubmitCreditCard = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        if (lastBookingId === null) {
            setMessage("No booking available for payment.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/payments/", {
                bookings: [lastBookingId],
                number: creditNumber,
                name: creditName,
                month_year: expiryDate,
                CVV: cvv,
            });

            if (response.status === 201) {
                setMessage("Payment Successful!");
            } else {
                setMessage("Payment failed.");
            }
        } catch (error) {
            console.error("Payment Error:", error);
            setMessage("An error occurred while processing the payment.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className={styles.container}>
            <h1>Payment Page</h1>
            <form onSubmit={handleSubmitCreditCard}>
                <div className={styles.formGroup}>
                    <label htmlFor="creditNumber">Credit Card Number:</label>
                    <input
                        type="text"
                        id="creditNumber"
                        name="creditNumber"
                        value={creditNumber}
                        onChange={(e) => setCreditNumber(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="creditName">Cardholder Name:</label>
                    <input
                        type="text"
                        id="creditName"
                        name="creditName"
                        value={creditName}
                        onChange={(e) => setCreditName(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="expiryDate">Expiry Date:</label>
                    <input
                        type="month"
                        id="expiryDate"
                        name="expiryDate"
                        value={formatExpiryDateForDisplay(expiryDate)}
                        onChange={handleExpiryDateChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="cvv">CVV:</label>
                    <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" disabled={loading} className={styles.submitButton}>
                    {loading ? "Processing..." : "Submit Payment"}
                </button>
            </form>

            {message && (
                <p
                    className={`${styles.message} ${
                        message.includes("Successful") ? styles.success : styles.error
                    }`}
                >
                    {message}
                </p>
            )}
        </div>
    );
};

export default PaymentPage;


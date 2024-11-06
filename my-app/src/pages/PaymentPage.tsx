import React, { useState } from 'react';
import './PaymentPage.css';

const PaymentPage: React.FC = () => {
    const [paymentType, setPaymentType] = useState<'credit' | 'cash' | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const handlePaymentTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentType(event.target.value as 'credit' | 'cash');
    };

    const handleSubmitCreditCard = (event: React.FormEvent) => {
        event.preventDefault();
        // Κανονικά θα κάνατε API call εδώ για να αποθηκεύσετε τα δεδομένα πληρωμής.
        // Για τώρα, ας επιστρέψουμε ένα μήνυμα επιτυχίας.
        setMessage('Successful Payment!');
    };

    const handleSubmitCash = (event: React.FormEvent) => {
        event.preventDefault();
        // Για το cash payment επίσης, θα γινόταν ένα API call.
        setMessage('Successful Temporary Payment!');
    };

    return (
        <div className="container">
            <div className="logo-text">Hotel Gourdo</div>
            <div className="logo-text2">Payment Page</div>

            <form onSubmit={paymentType === 'credit' ? handleSubmitCreditCard : handleSubmitCash} autoComplete="on">
                <div className="radio-container">
                    <label className="radio-label">
                        <input
                            type="radio"
                            className="radio paymentType"
                            name="paymentType"
                            value="credit"
                            required
                            onChange={handlePaymentTypeChange}
                        />
                        Credit Card
                    </label>
                    <label className="radio-label">
                        <input
                            type="radio"
                            className="radio paymentType"
                            name="paymentType"
                            value="cash"
                            required
                            onChange={handlePaymentTypeChange}
                        />
                        Pay in Cash
                    </label>
                </div>

                {paymentType === 'credit' && (
                    <div className="form-container" id="creditForm">
                        <h2>Credit Card Payment</h2>
                        <label htmlFor="creditNumber">Credit Card Number:</label>
                        <input type="text" id="creditNumber" name="creditNumber" minLength={16} maxLength={16} pattern="[0-9]+" required />
                        <label htmlFor="creditName">Name on Credit Card:</label>
                        <input type="text" id="creditName" name="creditName" maxLength={30} required />
                        <label htmlFor="expiryDate">Expiry Date:</label>
                        <input type="month" id="expiryDate" name="expiryDate" required />
                        <label htmlFor="cvv">CVV:</label>
                        <input type="text" id="cvv" name="cvv" minLength={3} maxLength={3} pattern="[0-9]+" required />
                        <input type="text" className="depo2" id="dep" name="dep" value="Deposit: 50€" required disabled />
                        <input type="submit" className="submit" value="Pay Now" />
                    </div>
                )}

                {paymentType === 'cash' && (
                    <div className="form-container" id="cashForm">
                        <h2>Pay in Cash</h2>
                        <label htmlFor="firstname">First Name:</label>
                        <input type="text" id="firstname" name="firstName" maxLength={20} required />
                        <label htmlFor="lastname">Last Name:</label>
                        <input type="text" id="lastname" name="lastname" maxLength={20} required />
                        <input type="text" className="depo" id="depo" name="depo" value="Advance deposit (50€) to the following bank account:" required disabled />
                        <input type="text" className="depo" id="depo2" name="depo2" value="E123 WERT OKOK 1313 4589 100P" required disabled />
                        <p>*In case of non-payment of the advance payment within 5 working days, the reservation is cancelled.</p>
                        <p>**Sending proof of advance payment by email.</p>
                        <input type="submit" className="submit" value="Pay in cash at check-in time" />
                    </div>
                )}

                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
};

export default PaymentPage;

import React, { useState } from 'react';
import './Donate.css'; // Assuming you have a CSS file for styling


const Donate = () => {
  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState('one-time');
  const [submitted, setSubmitted] = useState(false);

  const handleDonate = (e) => {
    e.preventDefault();
    if (amount && !isNaN(amount)) {
      console.log(`Donated ₹${amount} as a ${frequency} donation`);
      setSubmitted(true);
      setAmount('');
      setFrequency('one-time');
    } else {
      alert('Please enter a valid amount.');
    }
  };

  return (
    <section id="donate" className="section donate-section">
      <h2>Support Our Mission</h2>
      <p>Your donation helps students access personalized learning and empowers educators.</p>

      <form className="donate-form" onSubmit={handleDonate}>
        <label htmlFor="amount">Donation Amount (₹):</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          required
        />

        <label>Donation Frequency:</label>
        <div className="frequency-options">
          <label>
            <input
              type="radio"
              name="frequency"
              value="one-time"
              checked={frequency === 'one-time'}
              onChange={(e) => setFrequency(e.target.value)}
            />
            One-time
          </label>
          <label>
            <input
              type="radio"
              name="frequency"
              value="monthly"
              checked={frequency === 'monthly'}
              onChange={(e) => setFrequency(e.target.value)}
            />
            Monthly
          </label>
        </div>

        <button type="submit" className="btn">Donate Now</button>

        {submitted && (
          <p className="thank-you">
            🎉 Thank you for your ₹{amount} {frequency} donation!
          </p>
        )}
      </form>
    </section>
  );
};

export default Donate;

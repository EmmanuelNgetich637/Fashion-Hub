import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Optional: Replace this with an API call
    try {
      // Example: await axios.post('/api/forgot-password', { email });
      console.log(`Sending password reset link to: ${email}`);
      setSubmitted(true);
    } catch (error) {
      alert('Error sending reset link.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
      {submitted ? (
        <p className="text-green-600">
          ✅ A password reset link has been sent to <strong>{email}</strong>.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium">Email Address</label>
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded mb-4"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Send Reset Link
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;

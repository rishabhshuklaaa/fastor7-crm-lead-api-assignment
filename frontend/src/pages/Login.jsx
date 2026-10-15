import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/authApi';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleContinue = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate 10 digits
    if (!/^\d{10}$/.test(phone)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    try {
      await registerUser(phone, '+91');
      // Navigate to OTP page and pass phone number via state
      navigate('/otp', { state: { phone } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen-wrapper">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="#FF5A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div className="content-body">
        <h1 className="page-title">Sign Up to Fastor</h1>
        <p className="page-subtitle">
          Let us know your mobile number and we will send you an OTP for verification.
        </p>

        <form onSubmit={handleContinue} className="input-form">
          <div className="phone-input-wrapper">
            <span className="dial-code">+91</span>
            <div className="divider"></div>
            <input
              type="tel"
              inputMode="numeric"
              placeholder="00000"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              className="phone-input"
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? 'Sending OTP...' : 'Get OTP'}
          </button>

          <p className="terms-text">
            By clicking, I accept the{' '}
            <span className="link-bold">Terms & Conditions</span> and{' '}
            <span className="link-bold">Privacy Policy</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
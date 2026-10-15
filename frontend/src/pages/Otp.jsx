import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from '../api/authApi';
import { useAuth } from '../context/AuthContext';

const Otp = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [time, setTime] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const phone = location.state?.phone || '';

  useEffect(() => {
    if (!phone) navigate('/login');
  }, [phone, navigate]);

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [time]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, '');
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value.charAt(value.length - 1);
    setOtp(newOtp);

    if (index < 5 && value) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pastedData) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      if (newOtp.length === 6) {
        inputsRef.current[5].focus();
      }
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    setError('');

    if (otpCode.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    setLoading(true);
    try {
      const res = await loginUser(phone, otpCode, '+91');
      const token = res.data.data.token; 
      login(token); 
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP or Server Error (502). Try 123456.');
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
        <h1 className="page-title">6-digit code</h1>
        
        {/* Updated Subtitle Structure */}
        <p className="page-subtitle">
          Please enter the code we've sent to
          <span className="phone-number-bold">+91 {phone}</span>
        </p>

        <form onSubmit={handleVerify} className="input-form">
          <div className="otp-group-wrapper">
            <div className="otp-box-group">
              {otp.slice(0, 3).map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputsRef.current[idx] = el)}
                  type="tel"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  onPaste={handlePaste}
                  className={`otp-input ${digit ? 'active' : ''}`}
                />
              ))}
            </div>
            <div className="otp-divider">-</div>
            <div className="otp-box-group">
              {otp.slice(3, 6).map((digit, idx) => (
                <input
                  key={idx + 3}
                  ref={(el) => (inputsRef.current[idx + 3] = el)}
                  type="tel"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, idx + 3)}
                  onKeyDown={(e) => handleKeyDown(e, idx + 3)}
                  onPaste={handlePaste}
                  className={`otp-input ${digit ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>

          {/* Resend text placed exactly below OTP boxes */}
          <div className="resend-text">
            I didn't receive a code{' '}
            {time > 0 ? (
              <span className="timer-text">({`00:${time < 10 ? '0' + time : time}`})</span>
            ) : (
              <button type="button" className="timer-text-btn" onClick={() => setTime(30)}>
                Resend OTP
              </button>
            )}
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? 'Verifying...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Otp;
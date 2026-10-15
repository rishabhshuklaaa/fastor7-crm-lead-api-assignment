import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/authApi';

export default function Otp() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const phone = localStorage.getItem('phone');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!phone) {
      navigate('/login');
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError('Enter the 6 digit OTP');
      return;
    }

    try {
      setLoading(true);
      const res = await loginUser(phone, otp);
      console.log('Login response:', res.data);

      const token = res.data?.data?.token;
      if (!token) {
        setError('Login failed. Token not received.');
        return;
      }

      localStorage.setItem('token', token);
      navigate('/restaurants');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Invalid OTP. Try again.');
    } finally {
      setLoading(false);
    }
  };

    return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Verify OTP</h2>
        <p className="sub">OTP sent to +91 {phone}</p>
        <form onSubmit={handleSubmit}>
          <input
            type="tel"
            placeholder="Enter 6 digit OTP"
            value={otp}
            maxLength={6}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}
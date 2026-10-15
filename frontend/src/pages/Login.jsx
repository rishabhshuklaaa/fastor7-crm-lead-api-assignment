import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/authApi';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!/^\d{10}$/.test(phone)) {
      setError('Enter a valid 10 digit phone number');
      return;
    }

    try {
      setLoading(true);
      const res = await registerUser(phone);
      console.log('Register response:', res.data);
      localStorage.setItem('phone', phone);
      navigate('/otp');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

    return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome</h2>
        <p className="sub">Enter your phone number to continue</p>
        <form onSubmit={handleSubmit}>
          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            maxLength={10}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}
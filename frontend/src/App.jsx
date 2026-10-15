import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Otp from './pages/Otp';
import Restaurants from './pages/Restaurants';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/restaurants" element={<Restaurants />} />
    </Routes>
  );
}
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Actual Pages Import
import Login from './pages/Login';
import Otp from './pages/Otp';
import Home from './pages/Home';
import ItemDetail from './pages/ItemDetail'; // <-- Add this line

const RootRedirect = () => {
  const { isAuthenticated } = useAuth();
  return <Navigate to={isAuthenticated ? '/home' : '/login'} replace />;
};

function AppRoutes() {
  return (
    <div className="mobile-container">
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<Otp />} />
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/item/:id" 
          element={
            <ProtectedRoute>
              <ItemDetail /> {/* <-- Changed this */}
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
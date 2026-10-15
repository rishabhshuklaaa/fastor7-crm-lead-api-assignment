import api from './axios';

export const registerUser = (phone, dialCode = '+91') => {
  const body = new URLSearchParams({ phone, dial_code: dialCode });
  return api.post('/pwa/user/register', body);
};

export const loginUser = (phone, otp, dialCode = '+91') => {
  const body = new URLSearchParams({ phone, otp, dial_code: dialCode });
  return api.post('/pwa/user/login', body);
};
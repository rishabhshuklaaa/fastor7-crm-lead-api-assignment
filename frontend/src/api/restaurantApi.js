import api from './axios';

export const fetchRestaurants = (cityId = 118, page = 1) =>
  api.get('/m/restaurant', { params: { city_id: cityId, page } });
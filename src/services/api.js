import axios from 'axios';

/**
 * api:
 * Instancia de Axios configurada para OpenWeather.
 * - BASE_URL: https://api.openweathermap.org/data/2.5
 * - params: incluye siempre la API key leída desde .env vía Vite
 *
 * La usamos en weatherService.js para todas las peticiones:
 *   api.get('/weather',  { params: { lat, lon, units } })
 *   api.get('/forecast', { params: { lat, lon, units } })
 */
const API_KEY = import.meta.env.VITE_OWM_KEY; // tu key queda fuera del código

export const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    appid: API_KEY,
  },
});

// interceptor para manejo global de errores de API
api.interceptors.response.use(
  res => res,
  err => {
    console.error('API Error:', err.response?.data || err.message);
    return Promise.reject(err);
  }
);
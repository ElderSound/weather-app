import axios from 'axios';
import { api } from './api';

/**
 * weatherService: Funciones para consumir OpenWeather API.
 * 
 * Leemos la misma clave de entorno para endpoints fuera de la instancia `api`.
 */
const API_KEY = import.meta.env.VITE_OWM_KEY;

/**
 * getCurrent(lat, lon, units):
 *   - Obtiene el clima actual (temperatura, condición, viento, humedad, etc.).
 *   - Parámetros:
 *       • lat, lon: coordenadas geográficas.
 *       • units: 'metric' (°C) o 'imperial' (°F).
 *   - Interactúa con nuestra instancia `api` (ruta /weather).
 */
export async function getCurrent(lat, lon, units) {
  const response = await api.get('/weather', {
    params: { lat, lon, units }
  });
  return response.data;
}

/**
 * getForecast(lat, lon, units):
 *   - Obtiene el pronóstico cada 3 horas para 5 días (array de 40–48 items).
 *   - Filtraremos luego solo 5 fechas distintas.
 *   - Parámetros: iguales a getCurrent.
 *   - Interactúa con `api` en la ruta /forecast.
 */
export async function getForecast(lat, lon, units) {
  const response = await api.get('/forecast', {
    params: { lat, lon, units }
  });
  return response.data;
}

/**
 * geocodeCity(query, limit):
 *   - Busca ciudades por nombre (usado en autocompletado y “random” inicial).
 *   - Parámetros:
 *       • query: texto ingresado por el usuario.
 *       • limit: número máximo de resultados (p.ej. 5).
 *   - Usa la Geocoding API de OpenWeather (ruta https://api.openweathermap.org/geo/1.0/direct).
 */
export async function geocodeCity(query, limit = 5) {
  const url = 'https://api.openweathermap.org/geo/1.0/direct';
  const response = await axios.get(url, {
    params: {
      q: query,
      limit,
      appid: API_KEY,  // usamos la misma key del .env
    }
  });
  return response.data; // array de { name, lat, lon, country, state? }
}

/**
 * reverseGeocode(lat, lon, limit):
 *   - Obtiene hasta `limit` ciudades cercanas a las coordenadas dadas.
 *   - Usa la ruta https://api.openweathermap.org/geo/1.0/reverse.
 */
export async function reverseGeocode(lat, lon, limit = 5) {
  const url = 'https://api.openweathermap.org/geo/1.0/reverse';
  const response = await axios.get(url, {
    params: {
      lat,
      lon,
      limit,
      appid: API_KEY,  // misma fuente de la key
    },
  });
  return response.data; // array de { name, lat, lon, country, state? }
}
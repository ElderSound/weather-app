import { useState, useEffect } from 'react';
import { geocodeCity, reverseGeocode } from '../services/weatherService';

/** debounce simple… (sin cambios) */
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * useAutocomplete(coords):
 * - coords: { lat, lon } | null
 *
 * Retorna {
 *   randomCities,   // array de hasta 3 ciudades cercanas
 *   suggestions,    // array de resultados según input
 *   history,        // array de ciudades seleccionadas
 *   search,         // fn(query): dispara autocompletado (debounced)
 *   addToHistory,   // fn(city): añade ciudad a historial
 * }
 */
export default function useAutocomplete(coords) {
  const [randomCities, setRandomCities] = useState([]);
  const [suggestions, setSuggestions]   = useState([]);
  const [history, setHistory]           = useState([]);

  // Al montar / cambiar coords, obtenemos hasta 3 ciudades cercanas
  useEffect(() => {
    if (!coords) return;
    reverseGeocode(coords.lat, coords.lon, 3)
      .then(data => {
        setRandomCities(data);
        setSuggestions(data);              // ← CAmbio: sugerimos randomCities al inicio
      })
      .catch(err => console.error('reverseGeocode:', err));
  }, [coords]);

  // Llamada al geocoding directo para sugerencias
  async function fetchSuggestions(query) {
    if (!query) {
      setSuggestions(randomCities);        // ← CAmbio: siempre randomCities si query vacío
      return;
    }
    try {
      const data = await geocodeCity(query, 5);
      setSuggestions(data);
    } catch (err) {
      console.error('geocodeCity:', err);
    }
  }

  // Debounce de la búsqueda para no saturar la API
  const search = debounce(fetchSuggestions, 300);

  // Añadir al historial evitando duplicados (sin cambios)
  function addToHistory(city) {
    setHistory(prev => {
      const exists = prev.find(c =>
        c.name === city.name &&
        c.lat  === city.lat  &&
        c.lon  === city.lon
      );
      if (exists) return prev;
      return [city, ...prev];
    });
  }

  return { randomCities, suggestions, history, search, addToHistory };
}

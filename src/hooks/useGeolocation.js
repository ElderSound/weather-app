import { useState } from 'react';

/**
 * useGeolocation:
 * - coords: { lat, lon } | null
 * - error: string | null
 * - getCoords(): función que pide permiso y actualiza coords o error.
 *
 * Interactúa directamente con la API nativa `navigator.geolocation`.
 */
export default function useGeolocation() {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);

  function getCoords() {
    if (!navigator.geolocation) {
      setError('Geolocalización no soportada por este navegador.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err) => {
        setError(err.message);
      }
    );
  }

  return { coords, error, getCoords };
}
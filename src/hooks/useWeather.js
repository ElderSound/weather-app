import { useState, useEffect } from 'react';
import { getCurrent, getForecast } from '../services/weatherService';

/**
 * useWeather(lat, lon, unit):
 * - lat, lon: coordenadas
 * - unit: 'metric' (°C) | 'imperial' (°F)
 *
 * Retorna { current, forecast, loading, error }.
 * Ahora usa Promise.all para paralelizar las peticiones,
 * y calcula tempMax/tempMin reales agrupando las 8 lecturas diarias.
 */
export default function useWeather(lat, lon, unit) {
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (lat == null || lon == null) return;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        // Peticiones en paralelo para clima actual y forecast
        const [currentData, forecastData] = await Promise.all([
          getCurrent(lat, lon, unit),
          getForecast(lat, lon, unit)
        ]);
        setCurrent(currentData);

        // Agrupamos las lecturas por fecha (YYYY-MM-DD)
        const groups = forecastData.list.reduce((acc, item) => {
          const dateStr = item.dt_txt.split(' ')[0];
          if (!acc[dateStr]) acc[dateStr] = [];
          acc[dateStr].push(item);
          return acc;
        }, {});

        //  Excluimos hoy y tomamos los próximos 5 días
        const today = new Date().toISOString().split('T')[0];
        const days = Object.keys(groups)
          .filter(d => d !== today)
          .slice(0, 5);

        // Para cada día, calculamos tempMax, tempMin e icon
        const daily = days.map(dateStr => {
          const items = groups[dateStr];
          const temps = items.map(i => i.main.temp);
          return {
            date: new Date(dateStr),
            icon: items[0].weather[0].icon,
            tempMax: Math.max(...temps),
            tempMin: Math.min(...temps),
          };
        });

        setForecast(daily);
      } catch (err) {
        setError(err.message || 'Error fetching weather');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [lat, lon, unit]);

  return { current, forecast, loading, error };
}
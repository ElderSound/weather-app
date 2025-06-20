import { useContext } from 'react';
import { ThemeUnitContext } from '../context/ThemeUnitContext';

/**
 * useHighlights(current):
 *   - current: objeto con los datos del clima actual (useWeather)
 * 
 * Devuelve un array con la configuración de cada highlight.
 * Así en App.jsx solo haces:
 *   const highlights = useHighlights(current);
 *   highlights.map(cfg => <HighlightCard {...cfg} />)
 */
export default function useHighlights(current) {
  const { unit } = useContext(ThemeUnitContext);

  return [
    {
      title: 'Wind Status',
      value: current?.wind?.speed,
      unit: unit === 'metric' ? 'm/s' : 'mph',
      extra: current?.wind?.deg
    },
    {
      title: 'Humidity',
      value: current?.main?.humidity,
      unit: '%'
    },
    {
      title: 'Visibility',
      value: (current?.visibility ?? 0) / 1000,
      unit: 'km'
    },
    {
      title: 'Air Pressure',
      value: current?.main?.pressure,
      unit: 'hPa'
    }
  ];
}
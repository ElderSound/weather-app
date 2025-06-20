import React, { useContext, useEffect, useState } from 'react';
import useGeolocation from './hooks/useGeolocation';
import useWeather from './hooks/useWeather';
import useAutocomplete from './hooks/useAutocomplete';
import { ThemeUnitContext } from './context/ThemeUnitContext';
import LeftPanel from './components/LeftPanel/LeftPanel';
import UnitToggle from './components/UnitToggle/UnitToggle';
import ForecastCard from './components/ForecastCard/ForecastCard';
import HighlightCard from './components/HighlightCard/HighlightCard';
import SearchModal from './components/SearchModal/SearchModal';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import useHighlights from './hooks/useHighlights';
import Footer from './components/Footer/Footer';

export default function App() {
  // Contexto global de tema y unidad (°C/°F).
  const { theme, unit } = useContext(ThemeUnitContext);

  // Ciudad por defecto: Quito (fallback si no hay coords ni selección manual).
  const defaultCity = {
    name: 'Quito',
    country: 'EC',
    lat: -0.1807,
    lon: -78.4678
  };

  // Geolocalización: coords iniciales del usuario.
  const { coords, error: geoError, getCoords } = useGeolocation();

  // Al montar, pedimos coords automáticamente (sin esperar clic).
  useEffect(() => {
    getCoords();
  }, []);

  // Autocomplete: lista de ciudades random, sugerencias y historial.
  const {
    randomCities,
    suggestions,
    history,
    search,
    addToHistory
  } = useAutocomplete(coords);

  // Ciudad seleccionada manualmente (override de coords de geoloc).
  const [selectedCity, setSelectedCity] = useState(null);

  // Determinamos lat/lon en orden de prioridad:
  //    a) selectedCity (búsqueda manual)
  //    b) coords (geolocalización)
  //    c) defaultCity (Quito)
  const lat = selectedCity
    ? selectedCity.lat
    : coords
      ? coords.lat
      : defaultCity.lat;
  const lon = selectedCity
    ? selectedCity.lon
    : coords
      ? coords.lon
      : defaultCity.lon;

  // Clima: actual + forecast de 5 días, recargando al cambiar unidad.
  const { current, forecast, loading, error: weatherError } =
    useWeather(lat, lon, unit);

  //  Control del modal de búsqueda.
  const [isModalOpen, setIsModalOpen] = useState(false);

  //  Cuando el usuario elige una ciudad (ya sea random, sugerencia o historial):
  const handleSelectCity = city => {
    setSelectedCity(city);    // override de coords usadas por useWeather
    addToHistory(city);       // agrega al historial
    setIsModalOpen(false);    // cierra el modal
  };

  //  Al pulsar GeoButton, limpiamos override y recargamos coords:
  const handleGeoClick = () => {
    setSelectedCity(null);    // volvemos a usar geoloc en lugar de ciudad manual
    getCoords();              // recarga coords del navegador
  };

  // Clases para el contenedor principal según tema
  const containerBg = theme === 'dark' ? 'bg-[#0f0e1d]' : 'bg-white';
  const containerText = theme === 'dark' ? 'text-gray-100' : 'text-gray-900';

  // Highlights halamos desde el custome hook
  const highlights = useHighlights(current);

  return (
    <div className={`${containerBg} ${containerText} min-h-screen`}>
      {/* MODAL */}
      {isModalOpen && (
        <SearchModal
          suggestions={suggestions}
          randomCities={randomCities}
          history={history}
          onSearch={search}
          onSelectCity={handleSelectCity}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* CONTENEDOR PRINCIPAL */}

      <div className="grid grid-cols-1  md:grid-cols-3 min-h-screen">
        {/* === PANEL IZQUIERDO === */}
        <LeftPanel
          current={current}
          loading={loading}
          error={weatherError}          // solo errores de API/clima 
          onGeoClick={handleGeoClick}   //regresa a ubicación actual}
          onSearchClick={() => setIsModalOpen(true)}
        />

        {/* === PANEL DERECHO === */}
        <div className="md:col-span-2 md:px-15 m-auto lg:px-20 py-4">
          {/* Selector de unidades (°C / °F) y tema */}
          <div className="flex  justify-center md:justify-end items-center ">
            <UnitToggle />
            <ThemeToggle />
          </div>

          {/* Pronóstico a 5 días */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {forecast.map((day, idx) => (
              <ForecastCard
                key={idx}
                label={idx === 0 ? 'Tomorrow' : day.date.toLocaleDateString(undefined, { weekday: 'short' })}
                icon={day.icon}
                tempMax={day.tempMax}
                tempMin={day.tempMin}
              />
            ))}
          </div>

          {/* Today's Highlights */}
          <h2 className="mt-5 mb-4 text-2xl font-semibold">Today's Highlights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map(cfg => (
              <HighlightCard
                key={cfg.title}
                title={cfg.title}
                value={cfg.value}
                unit={cfg.unit}
                extra={cfg.extra}
              />
            ))}
          </div>

          <Footer/>
          
        </div>
      </div>
    </div>
  );
}
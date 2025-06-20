import React, { useContext } from 'react';
import { ThemeUnitContext } from '../../context/ThemeUnitContext';
import { iconMap } from '../../utils/iconMap';  // import para iconos locales

/**
 * ForecastCard
 *
 * Props:
 * - label:   string (por ejemplo 'Tomorrow' o 'Mon')
 * - icon:    string (código de icono OpenWeather, p.ej. '10d')
 * - tempMax: number (temperatura máxima)
 * - tempMin: number (temperatura mínima)
 *
 * Este componente:
 * 1. Muestra el día (label) arriba.
 * 2. Renderiza el icono del clima.
 * 3. Muestra temperaturas máximas y mínimas con sufijo.
 * 4. Usa clases Tailwind para estilo light/dark.
 */
export default function ForecastCard({ label, icon, tempMax, tempMin }) {
    // Obtenemos tema y unidad del contexto
    const { theme, unit } = useContext(ThemeUnitContext);

    // Sufijo según unidad (°C o °F)
    const suffix = unit === 'metric' ? '°C' : '°f';

    // Clases condicionales según tema
    const bg = theme === 'dark' ? 'bg-gray-800/40' : 'bg-gray-800/40';
    const txt = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
    const txtLg = theme === 'dark' ? 'text-gray-100' : 'text-gray-900';
    const txtSm = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';

    // Obtenemos ruta al PNG local del icono
    const localPng = iconMap[icon] || '/fallback.png';

    return (
        <div className={`${bg} w-full md:min-w-[77px] md:max-w-[200px] rounded-lg p-2 px-4 flex flex-col items-center justify-evenly shadow mt-5`}>
            {/* Día */}
            <p className={`text-sm font-medium ${txt}`}>
                {label}
            </p>

            {/* Icono del clima (PNG local) */}
            <img
                src={localPng}
                alt={label}
                className="w-16 my-2 md:my-10"
                onError={e => { e.currentTarget.src = '/fallback.png'; }}
            />

            {/* Temperaturas */}
            <div className="flex items-baseline gap-2">
                {/* Temperatura máxima */}
                <span className={`text-sm  ${txtLg}`}>
                    {Math.round(tempMax)}{suffix}
                </span>
                {/* Temperatura mínima */}
                <span className={`text-xs ${txtSm}`}>
                    {Math.round(tempMin)}{suffix}
                </span>
            </div>
        </div>
    );
}
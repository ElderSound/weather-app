import React, { useContext } from 'react';
import GeoButton from '../GeoButton/GeoButton';
import { ThemeUnitContext } from '../../context/ThemeUnitContext';
import { iconMap } from '../../utils/iconMap';

/**
 * LeftPanel
 * Props:
 *  - current:      datos del clima actual (o null/undefined)
 *  - loading:      boolean, true mientras carga
 *  - error:        mensaje de error si falla API
 *  - onGeoClick:   callback para pedir coords al navegador
 *  - onSearchClick:callback para abrir el SearchModal
 *
 * Aquí:
 *  • Eliminamos el botón <button> manual de geolocalización,
 *    usamos únicamente <GeoButton /> para no duplicar.
 *  • Usamos `theme` para decidir clases de fondo/texto/hover.
 */
export default function LeftPanel({
    current,
    loading,
    error,
    onGeoClick,
    onSearchClick
}) {
    // Obtenemos el tema actual del contexto
    const { theme, unit } = useContext(ThemeUnitContext);
    const suffix = unit === 'metric' ? '°C' : '°f';

    // Clases condicionales según theme
    const bgClassName = theme === 'dark' ? 'bg-gray-800/40' : 'bg-blue-500';
    const inputBg = theme === 'dark' ? 'bg-gray-700' : 'bg-white/30';
    const hoverBg = theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-white/40';
    const textColor = 'text-white';

    // Lógica de iconos del clima (safe con optional chaining)
    const iconCode = current?.weather?.[0]?.icon;
    const localPng = iconCode ? iconMap[iconCode] : '/fallback.png';

    return (
        <>
            {/* Fondo de nubes */}
            <div className="absolute inset-0 z-0 opacity-20 overflow-hidden md:w-1/3">
                <img
                    src="/Cloud-background.png"
                    alt="clouds"
                    className="object-cover overflow-hidden transform scale-150 mt-24"
                />
            </div>

            <div className={`w-full md:w-1/3 ${bgClassName} p-6 flex flex-col items-center relative`}>
                {/* Input “fake” para búsqueda */}
                <div
                    onClick={onSearchClick}
                    className={`
                        absolute top-6 left-6 w-40
                        ${inputBg} rounded-lg
                        px-4 py-2 ${textColor} cursor-pointer ${hoverBg}
                        transition
                    `}
                >
                    Search Locatios
                </div>

                {/* Botón reutilizable de geolocalización */}
                <GeoButton onClick={onGeoClick} />

                {/* Estado de carga */}
                {loading && (
                    <p className={`mt-20 text-lg ${textColor}`}>
                        Loading...
                    </p>
                )}

                {/* Error en API */}
                {error && (
                    <p className="mt-20 text-red-300">
                        {error}
                    </p>
                )}

                {/* Datos del clima: solo renderizamos cuando current.weather[0] existe */}
                {current?.weather?.[0] && (
                    <>
                        <img
                            src={localPng}
                            alt={current?.weather?.[0]?.description}
                            className="w-30  my-20"
                        />
                        <p className="text-8xl text-white my-7 flex items-center">
                            {Math.round(current.main.temp)} <span className='text-5xl text-gray-400'>{suffix}</span>
                        </p>
                        <p className="text-3xl text-white/80 my-5">
                            {current.weather[0].main}
                        </p>
                        <p className="text-xs text-gray-400 my-5">
                            Today&nbsp;&nbsp;.&nbsp;&nbsp;
                            {new Date().toLocaleDateString(undefined, {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                        <p className="text-xs text-gray-400 mt-1 flex items-center justify-center font-bold">
                            <img src="/location_on.svg" alt="location icon" className="w-4 mr-2" />
                            {current.name}, {current.sys.country}
                        </p>
                    </>
                )}
            </div>
        </>
    );
}
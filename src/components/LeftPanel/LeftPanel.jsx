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

            <div className={`w-full  ${bgClassName} p-6 flex flex-col items-center relative `}>
                {/* Fondo de nubes */}
                <div className="absolute inset-0 z-0 opacity-10 overflow-hidden ">
                    <img
                        src="/Cloud-background.png"
                        alt="clouds"
                        className="object-cover overflow-hidden transform scale-150 mt-24"
                    />
                </div>
                {/* Input “fake” para búsqueda */}
                <div
                    onClick={onSearchClick}
                    className={`
                        absolute top- left-6 w-40
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
                    
                    <p className={`absolute top-70 text-lg z-20 ${textColor}`}>
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
                            className=" w-45 md:w-30  md:my-30 my-45 "
                        />
                        <p className="text-8xl text-white mb-10 flex items-center">
                            {Math.round(current.main.temp)} <span className='text-5xl text-gray-400'>{suffix}</span>
                        </p>
                        <p className="text-3xl text-gray-300/80 my-10 font-semibold">
                            {current.weather[0].main}
                        </p>
                        <p className="text-xs text-gray-400 my-10">
                            Today&nbsp;&nbsp;.&nbsp;&nbsp;
                            {new Date().toLocaleDateString(undefined, {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1 justify-center space-x-2 font-bold">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                            {current.name}, {current.sys.country}
                        </p>
                    </>
                )}
            </div>
        </>
    );
}
import React, { useContext } from 'react';
import { ThemeUnitContext } from '../../context/ThemeUnitContext';

/**
 * HighlightCard
 *
 * Props:
 * - title:  string, el título de la métrica (p.ej. 'Wind Status', 'Humidity').
 * - value:  number, el valor principal (p.ej. velocidad de viento, % de humedad).
 * - unit:   string, la unidad que acompaña al valor (p.ej. 'm/s', '%', 'km', 'hPa').
 * - extra:  cualquier dato extra; para viento, la dirección en grados (0–360).
 *
 * Dependiendo de `title`, renderiza:
 *  • 'Wind Status': muestra la flecha rotada según `extra` (grados).  
 *  • 'Humidity': muestra una barra de progreso con ancho = `value`%.  
 *  • Otros títulos: solo muestran valor + unidad.
 */


export default function HighlightCard({ title, value, unit, extra }) {

    const { theme } = useContext(ThemeUnitContext);
    const bg = theme === 'dark' ? 'bg-gray-800/40' : 'bg-white';
    const titleC = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
    const valC = theme === 'dark' ? 'text-gray-100' : 'text-gray-900';
    const subC = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
    const barBg = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200';
    // Función auxiliar para formatear la dirección de viento
    const getWindDirection = deg => {
        // Puedes adaptar para retornar N, NE, E, etc.
        return `${Math.round(deg)}°`;
    };

    return (
        <div className={`${bg} rounded-lg p-6 flex flex-col `}>

            <h3 className={`text-sm font-medium ${titleC} mb-4 mx-auto`}>
                {title}
            </h3>

            {/* Contenido según tipo de tarjeta */}
            {title === 'Wind Status' ? (
                <div className="flex flex-col items-center justify-center gap-4">
                    {/* Valor + unidad */}
                    <div>
                        <span className={`text-3xl font-bold ${valC}`}>
                            {value}
                        </span>
                        <span className={`text-sm ${subC} ml-1`}>
                            {unit}
                        </span>
                    </div>
                    {/* Flecha rotada según grados (extra) */}
                    <div
                        className={`w-7 h-7 ${barBg} rounded-full flex items-center justify-center`}
                        style={{ transform: `rotate(${extra}deg)` }}
                    >
                        {/* flecha  */}
                        <img src="/navigation.svg" alt="arrow" className='w-4' />
                    </div>
                </div>
            ) : title === 'Humidity' ? (
                <div>
                    {/* Valor + unidad */}
                    <div className="flex items-baseline items-center justify-center  mb-2">
                        <span className={`text-3xl font-bold ${valC}`}>
                            {value}
                        </span>
                        <span className={`text-sm ${subC} ml-1`}>
                            {unit}
                        </span>
                    </div>
                    {/* Barra de progreso (0–100%) */}
                    <div>
                        <p className='flex items-center justify-between text-xs mt-5'><span>0</span><span>50</span><span>100</span></p>
                        <div className={`w-full ${barBg} rounded-full h-2 `}>

                            <div
                                className="bg-yellow-500 h-2 rounded-full"
                                style={{ width: `${value}%` }}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-baseline justify-center">
                    {/* Valor + unidad estándar */}
                    <span className={`text-3xl font-bold ${valC}`}>
                        {value}
                    </span>
                    <span className={`text-sm ${subC} ml-1`}>
                        {unit}

                    </span>
                </div>
            )}
        </div>
    );
}

import React, { useState, useEffect, useContext } from 'react';
import { ThemeUnitContext } from '../../context/ThemeUnitContext';

/**
 * SearchModal
 *
 * Props:
 * - suggestions:    Array de ciudades sugeridas por autocompletado
 * - randomCities:   Array de ciudades “random” cerca del usuario
 * - history:        Array de ciudades previamente seleccionadas
 * - onSearch:       Función(query) que dispara la búsqueda de sugerencias
 * - onSelectCity:   Función(city) al elegir una ciudad (cierra modal + carga clima)
 * - onClose:        Función() que cierra el modal
 *
 * Este componente:
 * 1. Se muestra como overlay sobre toda la app.
 * 2. Permite filtrar ciudades escribiendo en el input.
 * 3. Si hay sugerencias, muestra solo esas.
 * 4. Si no hay sugerencias, ofrece “Random Cities” y el “History”.
 */
export default function SearchModal({
    suggestions,
    randomCities,
    history,
    onSearch,
    onSelectCity,
    onClose
}) {
    // Estado local para el texto del input
    const [query, setQuery] = useState('');

    // Cada vez que query cambie, llamamos a onSearch (autocompletado)
    useEffect(() => {
        onSearch(query);
    }, [query, onSearch]);

    const { theme } = useContext(ThemeUnitContext);
    const modalBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
    const textLight = theme === 'dark' ? 'text-gray-200' : 'text-gray-700';
    const borderClr = theme === 'dark' ? 'border-gray-600' : 'border-gray-300';
    const inputBg = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100';
    const hoverDark = theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-200';

    return (
        // Overlay semitransparente que cubre toda la pantalla
        <div
            className="fixed md:w-1/3 inset-0 bg-black/80 flex items-start justify-center z-50 p-4"
            role="dialog"
            aria-modal="true"
        >
            {/* Contenedor del modal */}
            <div className={`${modalBg} rounded-lg w-full max-w-lg mt-5 p-6 relative`}>

                {/* Botón para cerrar el modal */}
                <button
                    onClick={onClose}
                    aria-label="Close search modal"
                    className={`absolute cursor-pointer top-0 right-4 ${textLight} hover:text-gray-900 text-2xl`}
                >
                    &times;
                </button>

                {/* Input de búsqueda */}
                <div className="relative w-4/5 my-4">
                    {/* SVG absolutamente posicionado */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500 pointer-events-none"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                    </svg>

                    <input
                        type="text"
                        placeholder="Search Location"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className={`w-full pl-12 px-4 py-2 border ${borderClr} rounded focus:outline-none focus:ring ${inputBg}`}
                    />
                </div>

                { /*  Si hay sugerencias activas, mostrar solo esa lista */}
                {suggestions.length > 0 ? (
                    <ul className="max-h-60 overflow-y-auto">
                        {suggestions.map((city, idx) => (
                            <li key={idx}>

                                <button
                                    className={`w-full text-left px-3 py-2 rounded ${hoverDark} flex items-center gap-2 ${textLight}`}
                                    onClick={() => onSelectCity(city)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>

                                    {city.name}, {city.country}
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <>
                        { /* Si no hay sugerencias, mostramos “Random Cities” */}
                        {randomCities.length > 0 && (
                            <>
                                <h3 className="mt-2 mb-2 font-semibold text-gray-700 dark:text-gray-200">
                                    Random Cities
                                </h3>
                                <ul className="grid grid-cols-2 gap-2 mb-4">
                                    {randomCities.map((city, idx) => (
                                        <li key={idx}>
                                            <button
                                                onClick={() => onSelectCity(city)}
                                                className={`w-full text-center px-2 py-2
                                                  bg-gray-100 dark:bg-gray-700
                                                  rounded ${hoverDark}`}
                                                  
                                                
                                            >
                                                {city.name}, {city.country}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}

                        { /* Luego mostramos el historial de búsquedas */}
                        {history.length > 0 && (
                            <>
                                <h3 className="mt-2 mb-2 font-semibold text-gray-700 dark:text-gray-200">
                                    History
                                </h3>
                                <ul className="max-h-40 overflow-y-auto">
                                    {history.map((city, idx) => (
                                        <li key={idx}>
                                            <button
                                                onClick={() => onSelectCity(city)}
                                                className={`w-full text-left px-3 py-2 flex items-center gap-2
                                                        ${hoverDark} rounded`}
                                            >

                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                                </svg>
                                                {city.name}, {city.country}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
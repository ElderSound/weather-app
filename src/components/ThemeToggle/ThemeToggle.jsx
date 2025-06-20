import React, { useContext } from 'react';
import { ThemeUnitContext } from '../../context/ThemeUnitContext';

/**
 * ThemeToggle
 *
 * — Muestra un botón con sol cuando estamos en dark (para ir a light),
 *   y Luna cuando estamos en light (para ir a dark).
 * — Consume `theme` y `toggleTheme` del contexto para alternar el modo.
 */
export default function ThemeToggle() {
    const { theme, toggleTheme } = useContext(ThemeUnitContext);
    const bg = theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700';
    const hov = theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-300';

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle light/dark mode"
            className={` ml-2 md:ml-4 p-2 px-3 md:px-2 rounded-full transition ${bg} ${hov} hover:text-yellow-500`}
        >

            {theme === 'dark' ? (

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    {/*  sol (modo light)*/}
                    <circle cx="12" cy="12" r="5" />
                    <g stroke="currentColor" strokeWidth="2" >
                        <line x1="12" y1="1" x2="12" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="23" />
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                        <line x1="1" y1="12" x2="3" y2="12" />
                        <line x1="21" y1="12" x2="23" y2="12" />
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </g>
                </svg>
            ) : (
                // icono de luna (modo oscuro)
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >

                    <path d="M21 12.79A9 9 0 0111.21 3 7 7 0 1012 21a9 9 0 009-8.21z" />
                </svg>
            )}
        </button>
    );
}
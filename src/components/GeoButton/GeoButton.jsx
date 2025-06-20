import React, { useContext } from 'react';
import { ThemeUnitContext } from '../../context/ThemeUnitContext';

/**
 * GeoButton
 *  - onClick: función que se llama al hacer clic (p. ej. getCoords)
 *
 * Por qué lo necesitamos:
 *  • Centraliza la UI y el estilo del botón de “usar mi ubicación”.
 *  • Facilita cambiar el icono o la animación en un único lugar.
 *  • Clarifica en LeftPanel u otros dónde está la lógica de geolocalización.
 *
 * Con quién interactúa:
 *  • Recibe la callback desde App.jsx (useGeolocation.getCoords).
 *  • No maneja estado propio, solo dispara el evento hacia arriba.
 */
export default function GeoButton({ onClick }) {
    const { theme } = useContext(ThemeUnitContext);
    const bg = theme === 'dark' ? 'bg-gray-500/70' : 'bg-white/30';
    const hov = theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-white/40';
    return (
        <button
            onClick={onClick}
            aria-label="Use my location"
            className={`cursor-pointer absolute top-7 right-6 w-8 ${bg} p-2 rounded-full ${hov} `}

        ><img src="/location.svg" alt="location " className=' w-6' />


        </button>
    );
}
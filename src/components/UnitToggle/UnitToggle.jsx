import React, { useContext } from 'react';
import { ThemeUnitContext } from '../../context/ThemeUnitContext';

/**
 * UnitToggle
 *
 * Muestra dos botones:  
 * — °C (unidad 'metric')  
 * — °F (unidad 'imperial')  
 *
 * Usa changeUnit para fijar la unidad elegida, y destaca
 * el botón activo. Consume unit y changeUnit del contexto.
 */
export default function UnitToggle() {
  const { theme, unit, changeUnit } = useContext(ThemeUnitContext);
 const activeBg   = 'bg-yellow-500 text-white';
 const inactiveBg = theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700';
 const hoverBg    = theme === 'dark' ? 'dark:hover:bg-gray-600' : 'hover:bg-gray-300';

  return (
    <div className="flex justify-end items-center gap-2 my-4">
      {/* Botón °C */}
      <button
        onClick={() => changeUnit('metric')}
       className={`
         px-4 py-2 rounded-full transition
         ${unit === 'metric' ? activeBg : inactiveBg} ${unit !== 'metric' ? hoverBg : ''}
       `}
      >
        °C
      </button>

      {/* Botón °F */}
      <button
        onClick={() => changeUnit('imperial')}
        className={`
          px-4 py-2 rounded-full transition
          ${unit === 'imperial' ? activeBg : inactiveBg} ${unit !== 'imperial' ? hoverBg : ''}
        `}
      >
        °F
      </button>
    </div>
  );
}
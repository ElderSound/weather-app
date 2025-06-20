import React, { createContext, useState } from 'react';

/**
 * ThemeUnitContext:
 * - theme: 'light' | 'dark'
 * - unit:  'metric' (°C) | 'imperial' (°F)
 *
 * Lo usamos para que cualquier componente pueda:
 * 1) Saber si estamos en modo claro u oscuro y aplicar clases Tailwind (.dark:...)
 * 2) Saber si mostramos temperaturas en °C o °F
 * 3) Cambiar ambos valores desde, por ejemplo, UnitToggle
 */
export const ThemeUnitContext = createContext();

export function ThemeUnitProvider({ children }) {
    // Estados
    const [theme, setTheme] = useState('dark');           // por defecto 'dark'
    const [unit, setUnit] = useState('metric');         // 'metric' => °C, 'imperial' => °F

    // Alterna entre 'light' y 'dark'
    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    // Cambia la unidad de medida

    const changeUnit = newUnit => {
        setUnit(newUnit);
    };

    return (
        <ThemeUnitContext.Provider
            value={{
                theme,
                unit,
                toggleTheme,
                changeUnit,
            }}
        >
            {children}
        </ThemeUnitContext.Provider>
    );
}
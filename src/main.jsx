import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeUnitProvider } from './context/ThemeUnitContext';
import './index.css';  // Tailwind base + utilidades (dark mode, etc.)

// Aquí envolvemos toda la app en nuestro Contexto de tema y unidad,
// de modo que cualquier componente pueda leer/cambiar theme y unit.
ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeUnitProvider>
    <App />
  </ThemeUnitProvider>
);
Weather App
Weather App es una SPA (Single‐Page Application) en React que te permite consultar el clima de tu ubicación actual o de cualquier otra ciudad del mundo, con un diseño responsive y modos claro/oscuro.

🚀 Tecnologías
React + Vite: framework moderno con arranque ultrarrápido

Tailwind CSS: para todo el estilado sin escribir CSS “a mano”

Axios: para todas las llamadas a la API de OpenWeather

Context API: para manejar tema (light/dark) y unidad (°C/°F) de forma global

Custom Hooks:

useGeolocation (Geolocation API nativa)

useWeather (OpenWeather Current + 5d/3h Forecast)

useAutocomplete (Geocoding API + reverse Geocoding + debounce)

Variables de entorno (.env): la API key vive en VITE_OWM_KEY para no dejarla en el repositorio

SVGR / public/: iconos meteorológicos locales (png) en public/weather-icons/

🎯 Funcionalidades
Carga automática según tu ubicación

Al entrar pide permiso de geolocalización y muestra el clima de tu posición

Si lo rechazas, usa una ciudad por defecto (Quito)

Buscador con autocompletado

Al abrir el modal, ya ves 3 ciudades cercanas sugeridas

Al escribir, llama a la Geocoding API y muestra resultados en tiempo real (debounced)

Guarda en memoria un historial de hasta 4 búsquedas; al borrar el texto vuelven a verse las 3 ciudades + tu historial

Visualización del clima actual

Icono grande (local) según el código OpenWeather

Temperatura redondeada con sufijo °C/°F según tu preferencia

Condición (Rain, Clouds, Clear, etc.)

Fecha formateada (“Monday, June 23”)

Ubicación (ciudad, país)

Pronóstico a 5 días

Para cada día: Tomorrow, Mon, Tue, etc.

Icono local

Temperatura máxima y mínima calculada de las 8 lecturas diarias

Sufijos °C/°F

Today’s Highlights

Wind Status: valor + unidad + flecha giratoria según dirección del viento

Humidity: % + barra de progreso rellena hasta el valor

Visibility: en kilómetros

Air Pressure: en hPa

Modo Claro / Oscuro

Con toggle en el header, aplicando clases dark: de Tailwind

Cambia background, texto y hover según el tema

Toggle de Unidades

Con botón que alterna entre °C (métrico) y °F (imperial)

Toda la app responde a este cambio

Imagen de fondo decorativa

PNG de nubes posicionado y escalado detrás del panel izquierdo

Opacidad reducida para no estorbar la legibilidad

📂 Estructura del proyecto
arduino
Copiar
Editar
weather-app/
├── public/
│   ├── Cloud-background.png
│   └── weather-icons/01d.png, 02n.png, …
├── src/
│   ├── assets/                 
│   ├── components/
│   │   ├── LeftPanel/
│   │   ├── SearchModal/
│   │   ├── ForecastCard/
│   │   ├── HighlightCard/
│   │   ├── GeoButton/
│   │   ├── ThemeToggle/
│   │   └── UnitToggle/
│   ├── context/
│   │   └── ThemeUnitContext.jsx
│   ├── hooks/
│   │   ├── useGeolocation.js
│   │   ├── useWeather.js
│   │   └── useAutocomplete.js
│   ├── services/
│   │   ├── api.js
│   │   └── weatherService.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env                        ← VITE_OWM_KEY=tu_api_key
├── tailwind.config.js
├── vite.config.js
└── package.json



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



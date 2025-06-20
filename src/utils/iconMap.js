/* const modules = import.meta.glob('../assets/weather-icons/*.svg', { eager: true, as: 'url' });

 
 //* modules tendrá unas entradas como:
 //* {
 //*   '../assets/weather-icons/01d.svg': '/src/assets/weather-icons/01d.svg',
 //*   '../assets/weather-icons/01n.svg': '/src/assets/weather-icons/01n.svg',


export const iconMap = {};
for (const path in modules) {
  const file = path.split('/').pop();        // '01d.svg'
  const code = file.replace('.svg', '');     // '01d'
  iconMap[code] = modules[path];             // url al SVG
} */

// Usamos Vite para importar todos los SVG como URLs
const modules = import.meta.glob('../assets/weather-icons/*.png', { eager: true, import: 'default' });

export const iconMap = {};
for (const path in modules) {
  // Extrae el nombre del fichero: "01d.svg"
  const file = path.split('/').pop();
  // Quita la extensión => "01d"
  const code = file.replace('.png', '');
  // asocia el código al URL que Vite nos da
  iconMap[code] = modules[path];
}
import knex from './db.js';
const productos = [
  {
    title: 'Escuadra',
    price: 123.45,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
    id: 1,
  },
  {
    title: 'Calculadora',
    price: 234.56,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
    id: 2,
  },
  {
    title: 'Globo Terráqueo',
    price: 345.67,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
    id: 3,
  },
];

(async () => {
  try {
    const response = await knex.insert(productos).from('productos');
    console.log('✔ Productos agregados');
    console.log(response);
  } catch (error) {
    console.log(error);
  } finally {
    knex.destroy();
  }
})();

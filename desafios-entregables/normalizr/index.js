const { normalize, schema, denormalize } = require('normalizr');

const holding = {
  id: '10000',
  empresas: [
    {
      id: '1000',
      nombre: 'Coderhouse',
      gerente: {
        id: '2',
        nombre: 'Pedro',
        apellido: 'Mei',
        DNI: '20442639',
        direccion: 'CABA 457',
        telefono: '1567811544',
      },
      encargado: {
        id: '3',
        nombre: 'Pablo',
        apellido: 'Blanco',
        DNI: '20442640',
        direccion: 'CABA 458',
        telefono: '1567811545',
      },
      empleados: [
        {
          id: '1',
          nombre: 'Nicole',
          apellido: 'Gonzalez',
          DNI: '20442638',
          direccion: 'CABA 456',
          telefono: '1567811543',
        },
        {
          id: '2',
          nombre: 'Pedro',
          apellido: 'Mei',
          DNI: '20442639',
          direccion: 'CABA 457',
          telefono: '1567811544',
        },
        {
          id: '3',
          nombre: 'Pablo',
          apellido: 'Blanco',
          DNI: '20442640',
          direccion: 'CABA 458',
          telefono: '1567811545',
        },
        {
          id: '4',
          nombre: 'Ana',
          apellido: 'Rojo',
          DNI: '20442641',
          direccion: 'CABA 459',
          telefono: '1567811546',
        },
        {
          id: '5',
          nombre: 'Lucia',
          apellido: 'Sorbo',
          DNI: '20442642',
          direccion: 'CABA 460',
          telefono: '1567811547',
        },
        {
          id: '6',
          nombre: 'Jose',
          apellido: 'Pieres',
          DNI: '20442643',
          direccion: 'CABA 461',
          telefono: '1567811548',
        },
        {
          id: '7',
          nombre: 'Maria',
          apellido: 'Lopez',
          DNI: '20442644',
          direccion: 'CABA 462',
          telefono: '1567811549',
        },
      ],
    },
    {
      id: '1001',
      nombre: 'Coderhouse2',
      gerente: {
        id: '6',
        nombre: 'Jose',
        apellido: 'Pieres',
        DNI: '20442643',
        direccion: 'CABA 461',
        telefono: '1567811548',
      },
      encargado: {
        id: '5',
        nombre: 'Lucia',
        apellido: 'Sorbo',
        DNI: '20442642',
        direccion: 'CABA 460',
        telefono: '1567811547',
      },
      empleados: [
        {
          id: '1',
          nombre: 'Nicole',
          apellido: 'Gonzalez',
          DNI: '20442638',
          direccion: 'CABA 456',
          telefono: '1567811543',
        },
        {
          id: '2',
          nombre: 'Pedro',
          apellido: 'Mei',
          DNI: '20442639',
          direccion: 'CABA 457',
          telefono: '1567811544',
        },
        {
          id: '5',
          nombre: 'Lucia',
          apellido: 'Sorbo',
          DNI: '20442642',
          direccion: 'CABA 460',
          telefono: '1567811547',
        },
        {
          id: '6',
          nombre: 'Jose',
          apellido: 'Pieres',
          DNI: '20442643',
          direccion: 'CABA 461',
          telefono: '1567811548',
        },
        {
          id: '7',
          nombre: 'Maria',
          apellido: 'Lopez',
          DNI: '20442644',
          direccion: 'CABA 462',
          telefono: '1567811549',
        },
        {
          id: '8',
          nombre: 'Lucio',
          apellido: 'Garcia',
          DNI: '20442645',
          direccion: 'CABA 463',
          telefono: '1567811550',
        },
      ],
    },
    {
      id: '1002',
      nombre: 'Coderhouse3',
      gerente: {
        id: '9',
        nombre: 'Diego',
        apellido: 'Sojo',
        DNI: '20442646',
        direccion: 'CABA 464',
        telefono: '1567811551',
      },
      encargado: {
        id: '8',
        nombre: 'Lucio',
        apellido: 'Garcia',
        DNI: '20442645',
        direccion: 'CABA 463',
        telefono: '1567811550',
      },
      empleados: [
        {
          id: '4',
          nombre: 'Ana',
          apellido: 'Rojo',
          DNI: '20442641',
          direccion: 'CABA 459',
          telefono: '1567811546',
        },
        {
          id: '5',
          nombre: 'Lucia',
          apellido: 'Sorbo',
          DNI: '20442642',
          direccion: 'CABA 460',
          telefono: '1567811547',
        },
        {
          id: '6',
          nombre: 'Jose',
          apellido: 'Pieres',
          DNI: '20442643',
          direccion: 'CABA 461',
          telefono: '1567811548',
        },
        {
          id: '7',
          nombre: 'Maria',
          apellido: 'Lopez',
          DNI: '20442644',
          direccion: 'CABA 462',
          telefono: '1567811549',
        },
        {
          id: '9',
          nombre: 'Diego',
          apellido: 'Sojo',
          DNI: '20442646',
          direccion: 'CABA 464',
          telefono: '1567811551',
        },
      ],
    },
  ],
};

// 1. Definir esquema de normalización.
const persona = new schema.Entity('personas');
const empleado = new schema.Entity('empleados', {
  empleados: persona,
});
const empresa = new schema.Entity('posts', {
  gerente: persona,
  encargado: persona,
  empleados: [empleado],
});
const empresas = new schema.Entity('empresas', {
  empresas: [empresa],
});

// Function para imprimir data normalizada
const util = require('util');
function print(data) {
  console.log(util.inspect(data, false, 12, true), '\n');
}

// 2. Obtener el objeto normalizado e imprimirlo por consola.
const dataNormalizada = normalize(holding, empresas);
print(dataNormalizada);

// 3. Desnormalizar el objeto obtenido en el punto anterior.
const dataDesnormalizada = denormalize(
  dataNormalizada.result,
  empresas,
  dataNormalizada.entities
);

// 4. Imprimir la longitud del el objeto original, del normalizado y del desnormalizado.
const original = JSON.stringify(holding).length;
const normalizado = JSON.stringify(dataNormalizada).length;
const desnormazado = JSON.stringify(dataDesnormalizada).length;
console.log('Original: \x1b[33m', original, '\x1b[0m');
console.log('Normalizado: \x1b[33m', normalizado, '\x1b[0m');
console.log('Desnormalizado: \x1b[33m', desnormazado, '\x1b[0m');

// 5. Imprimir porcentaje de compresión del proceso de normalización.
const compression = Math.round(100 - (normalizado * 100) / original);
const style = 'font-weight: bold; font-size: 50px;';
console.log('\x1b[1m\x1b[33m', 'Compresión ' + compression + '%');

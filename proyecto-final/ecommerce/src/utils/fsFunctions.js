import fs from 'fs';
const fsp = fs.promises; // usamos el modulo de promesas para asegurarnos que todos los metodos se corren de manera asincrona

const postProduct = async (data) => {
  try {
    // leemos el archivo productos.json y lo guardamos su contenido en una variable
    await fsp.writeFile(
      './database/productos.json',
      JSON.stringify(data),
      'utf-8',
      (error) => {
        // en caso de error en la lectura del archivo aparecerá este mensaje
        if (error) throw `error: error de escritura, ${error.toString()}`;
      }
    );
    // Retorna la respuesta objeto js como json
    return true;
  } catch (error) {
    // el bloque catch sirve para atajar cualquier error y mostrarlo en la consola
    return error;
  }
};
const getProducts = async () => {
  try {
    // leemos el archivo productos.json y lo guardamos su contenido en una variable
    const fileBuffer = await fsp.readFile(
      './database/productos.json',
      'utf8',
      (error) => {
        // en caso de error en la lectura del archivo aparecerá este mensaje
        if (error) throw `error: error de lectura, ${error.toString()}`;
      }
    );
    // Retorna la respuesta objeto js como json
    return JSON.parse(fileBuffer);
  } catch (error) {
    // el bloque catch sirve para atajar cualquier error y mostrarlo en la consola
    return error;
  }
};

const postProdCar = async (data) => {
  try {
    // leemos el archivo carrito.json y lo guardamos su contenido en una variable
    await fsp.writeFile(
      './database/carrito.json',
      JSON.stringify(data),
      'utf-8',
      (error) => {
        // en caso de error en la lectura del archivo aparecerá este mensaje
        if (error) throw `error: error de escritura, ${error.toString()}`;
      }
    );
    // Retorna la respuesta objeto js como json
    return true;
  } catch (error) {
    // el bloque catch sirve para atajar cualquier error y mostrarlo en la consola
    return error;
  }
};
const getProdCar = async () => {
  try {
    // leemos el archivo carrito.json y lo guardamos su contenido en una variable
    const fileBuffer = await fsp.readFile(
      './database/carrito.json',
      'utf8',
      (error) => {
        // en caso de error en la lectura del archivo aparecerá este mensaje
        if (error) throw `error: error de lectura, ${error.toString()}`;
      }
    );
    // Retorna la respuesta objeto js como json
    return JSON.parse(fileBuffer);
  } catch (error) {
    // el bloque catch sirve para atajar cualquier error y mostrarlo en la consola
    return error;
  }
};

export { postProduct, getProducts, postProdCar, getProdCar };

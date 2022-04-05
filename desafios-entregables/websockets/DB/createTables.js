import knex from './db.js';

(async () => {
  try {
    const mensajesExist = await knex.schema.hasTable('mensajes');
    if (!mensajesExist) {
      await knex.schema.createTable('mensajes', (table) => {
        table.increments('id').primary().notNullable(),
          table.string('email', 100).notNullable(),
          table.string('message', 100).notNullable(),
          table.string('date', 100).notNullable();
      });
      console.log('🔥 Tabla "mensajes" creada!');
    } else {
      console.log('❌ La tabla "mensajes" ya existe');
    }
    const productosExist = await knex.schema.hasTable('productos');
    if (!productosExist) {
      await knex.schema.createTable('productos', (table) => {
        table.increments('id').primary().notNullable(),
          table.string('price', 100).notNullable(),
          table.string('title', 100).notNullable(),
          table.string('thumbnail', 100).notNullable();
      });
      console.log('🔥 Tabla "productos" creada!');
    } else {
      console.log('❌ La tabla "productos" ya existe');
    }
    const ecommerceExist = await knex.schema.hasTable('ecommerce');
    if (!ecommerceExist) {
      await knex.schema.createTable('ecommerce', (table) => {
        table.increments('id').primary().notNullable(),
          table.string('price', 100).notNullable(),
          table.string('title', 100).notNullable(),
          table.string('thumbnail', 100).notNullable();
      });
      console.log('🔥 Tabla "ecommerce" creada!');
    } else {
      console.log('❌ La tabla "ecommerce" ya existe');
    }
  } catch (error) {
    console.log(error);
  } finally {
    knex.destroy();
  }
})();

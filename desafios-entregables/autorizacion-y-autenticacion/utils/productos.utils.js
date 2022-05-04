import { faker } from '@faker-js/faker';
faker.locale = 'es';

export default function generateProductos() {
  return {
    nombre: faker.commerce.product(),
    precio: faker.commerce.price(100, 5000),
    foto: faker.image.fashion(200, 150, true),
  };
}

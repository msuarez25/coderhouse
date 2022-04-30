import { faker } from '@faker-js/faker';
faker.locale = 'es';

export default function generateMensajes() {
  return {
    author: {
      id: faker.datatype.uuid(),
      nombre: faker.name.firstName(),
      apellido: faker.name.lastName(),
      edad: faker.datatype.number({ min: 18, max: 65, precision: 1 }),
      avatar: faker.image.avatar(),
      alias: faker.name.firstName(),
      email: faker.internet.email(),
    },
    date: faker.date.recent(),
    text: faker.lorem.sentence(8),
  };
}
// console.log(generateMensajes());

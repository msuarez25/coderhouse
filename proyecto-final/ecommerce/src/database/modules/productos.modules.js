import mongoose from 'mongoose';
const { Schema } = mongoose;

const productoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    max: 100,
  },
  code: {
    type: String,
    required: true,
    max: 100,
  },
  precio: {
    type: Number,
    required: true,
  },
  foto: {
    type: String,
    max: 100,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

export const ProductoModule = new mongoose.model('Producto', productoSchema);

// class {
// /**CRUD Mongoose**/
// createStudents = async () => {
//   try {
//     const response = await ProductosModel.create(productos);
//     console.log(response);
//   } catch (err) {
//     console.log(err);
//   }
// };
// // createStudents();

// readAllStudents = async () => {
//   try {
//     const response = await ProductosModel.find();
//     console.log(response);
//   } catch (err) {
//     console.log(err);
//   }
// };
// // readAllStudents();

// readOneStudent = async (obj) => {
//   try {
//     const response = await ProductosModel.findOne(obj);
//     console.log(response);
//   } catch (err) {
//     console.log(err);
//   }
// };
// // readOneStudent({ nombre: 'Daniel', apellido: 'Gallo' });

// updateStudent = async (nombre, data) => {
//   try {
//     const response = await ProductosModel.updateMany({ nombre: nombre }, data);
//     console.log(response);
//   } catch (err) {
//     console.log(err);
//   }
// };
// // updateStudent('Daniel', { nota: 10 });

// countStudent = async () => {
//   try {
//     const response = await ProductosModel.find().count();
//     console.log(response);
//   } catch (err) {
//     console.log(err);
//   }
// };
// // countStudent();

// deleteStudent = async (nombre, data) => {
//   try {
//     const response = await ProductosModel.deleteMany({ nombre: nombre }, data);
//     console.log(response);
//   } catch (err) {
//     console.log(err);
//   }
// };
// // deleteStudent({ nombre: 'Daniel', apellido: 'Gallo' });

// deleteAllStudents = async () => {
//   try {
//     const response = await ProductosModel.deleteMany({});
//     console.log(response);
//   } catch (err) {
//     console.log(err);
//   }
// };

// }

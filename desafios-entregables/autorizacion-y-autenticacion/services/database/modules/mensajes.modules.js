import mongoose from 'mongoose';
const { Schema } = mongoose;

const mensajeSchema = new Schema({
  author: {
    id: {
      type: String,
      required: true,
      max: 100,
    },
    nombre: {
      type: String,
      required: true,
      max: 100,
    },
    apellido: {
      type: String,
      required: true,
      max: 100,
    },
    edad: {
      type: Number,
      required: true,
      max: 100,
    },
    avatar: {
      type: String,
      required: false,
      max: 1000,
    },
    alias: {
      type: String,
      required: false,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 100,
    },
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  text: {
    type: String,
    required: true,
    max: 1500,
  },
});

export const MensajeModule = new mongoose.model('Mensaje', mensajeSchema);

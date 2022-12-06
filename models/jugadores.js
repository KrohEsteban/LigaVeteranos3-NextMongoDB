import { Schema, model, models } from "mongoose";

const jugadoresSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre del jugador es requerido"],
      trim: true, // elimina los espacios de mas antes y despues de la palabra
      maxlength: [40, "El nombre no puede tener mas de 40 caracteres"],
    },
    apellido: {
        type: String,
        required: [true, "El apellido del jugador es requerido"],
        trim: true, // elimina los espacios de mas antes y despues de la palabra
        maxlength: [40, "El nombre no puede tener mas de 40 caracteres"],
      },
    goles: {
        type: Number,
        required: false,
        trim: true,
      },
    fechasancion: {
        type: String,
        required: false,
        unique: true, // unico
        trim: true, // elimina los espacios de mas antes y despues de la palabra
      },
    sancion: {
        type: String,
        required: false,
        unique: true, // unico
        trim: true, // elimina los espacios de mas antes y despues de la palabra
      },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.jugadores || model("jugadores", jugadoresSchema);
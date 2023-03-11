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
    equipo: {
        type: String,
        required: [true, "El equipo del jugador es requerido"],
        trim: true, // elimina los espacios de mas antes y despues de la palabra
      }, 
    categoría: {
        type: String,
        required: [true, "La categoría del jugador es requerida"],
        trim: true, // elimina los espacios de mas antes y despues de la palabra
      }, 
    goles: {
        type: Number,
        required: false,
        trim: true,
      },
    fechasancion: {
        type: Number,
        required: false,
        trim: true, // elimina los espacios de mas antes y despues de la palabra
      },
    sancion: {
        type: Number,
        required: false,
        trim: true, // elimina los espacios de mas antes y despues de la palabra
      },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.jugadores || model("jugadores", jugadoresSchema);
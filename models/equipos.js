import { Schema, model, models } from "mongoose";

const equipoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre del equipo es requerido"],
      unique: true, // unico
      trim: true, // elimina los espacios de mas antes y despues de la palabra
      maxlength: [40, "El nombre no puede tener mas de 40 caracteres"],
    },
    categoría: {
      type: String,
      required: [true, "La categoría es requerida"],
      trim: true,
      maxlength: [40, "La categoría no puede tener mas de 40 caracteres"],
    },
    puntos: {
      type: Number,
      required: false,
      trim: true,
      default: 0,
    },
    pj: {
      type: Number,
      required: false,
      trim: true,
      default: 0,
    },
    pg: {
      type: Number,
      required: false,
      trim: true,
      default: 0,
    },
    pe: {
      type: Number,
      required: false,
      trim: true,
      default: 0,
    },
    pp: {
      type: Number,
      required: false,
      trim: true,
      default: 0,
    },
    gf: {
      type: Number, 
      required: false,
      trim: true,
      default: 0,
    },
    gc: {
      type: Number,
      required: false,
      trim: true,
      default: 0,
    },
    dg: {
      type: Number,
      required: false,
      trim: true,
      
    },

  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.equipos || model("equipos", equipoSchema);
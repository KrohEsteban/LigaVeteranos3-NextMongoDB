import { Schema, model, models } from "mongoose";

const partidosSchema = new Schema(
  {
    fecha: {
        type: Number,
        required:[true, "La fecha es requerida"],
        trim: true, // elimina los espacios de mas antes y despues de la palabra
    },
    dia: {
      type: String,
      required:false,
      trim: true, // elimina los espacios de mas antes y despues de la palabra
  },
    hora: {
      type: String,
      required:false,
      trim: true, // elimina los espacios de mas antes y despues de la palabra
  },
    lugar: {
        type: String,
        required: [true, "El lugar es requerido"],
        trim: true, // elimina los espacios de mas antes y despues de la palabra
    },
    categoría: {
        type: String,
        required: [true, "El nombre de la categoría es requerido"],
        trim: true, // elimina los espacios de mas antes y despues de la palabra
    },
    equipo1: {
      type: String,
      required: [true, "El nombre del primer equipo es requerido"],
      trim: true, // elimina los espacios de mas antes y despues de la palabra
    },
    equipo2: {
        type: String,
        required: [true, "El nombre del segundo equipo es requerido"],
        trim: true, // elimina los espacios de mas antes y despues de la palabra
    },
    golesequipo1: {
        type: Number,
        required: false,
        trim: true, 
    },
    golesequipo2: {
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

export default models.partidos || model("partidos", partidosSchema);
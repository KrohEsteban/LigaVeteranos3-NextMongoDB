import { Schema, model, models } from "mongoose";

const partidosSchema = new Schema(
  {
    title: {
        type: String,
        required: true,
        trim: true, // elimina los espacios de mas antes y despues de la palabra
    },
    fecha: {
        type: String,
        required: true,
        trim: true, // elimina los espacios de mas antes y despues de la palabra
    },
    lugar: {
        type: String,
        required: false,
        trim: true, // elimina los espacios de mas antes y despues de la palabra
    },
    categoría: {
        type: String,
        required: true,
        trim: true, // elimina los espacios de mas antes y despues de la palabra
    },
    equipo1: {
      type: String,
      required: true,
      trim: true, // elimina los espacios de mas antes y despues de la palabra
    },
    equipo2: {
        type: String,
        required: true,
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
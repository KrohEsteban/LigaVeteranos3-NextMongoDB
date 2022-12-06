import { Schema, model, models } from "mongoose";

const categoriasSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre de la categoría es requerido"],
      unique: true, // unico
      trim: true, // elimina los espacios de mas antes y despues de la palabra
      maxlength: [40, "El nombre no puede tener mas de 40 caracteres"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.categorias || model("categorias", categoriasSchema);
import { dbConnect } from "utils/mongoose";
import categorias from "models/categorias";
import { authOptions } from "../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";


dbConnect();

export default async function equipoHandler(req, res) {

  const session = await unstable_getServerSession(req, res, authOptions)
  const { method, body, query: { id }} = req;

  switch (method) {
    case "GET":
      try {
        const categoria = await categorias.findById(id);
        if (!categoria) return res.status(404).json({ msg: "Equipo no existe" });
        return res.status(200).json(categoria);
      } catch (error) {
        if (error.name === "ValidationError") {
          let errors = {};
    
          Object.keys(error.errors).forEach((item) => {
            errors[item] = error.errors[item].message;
          });
    
          return res.status(400).send(errors);
        }
        res.status(500).send("Algo salió mal...");
      }
    case "PUT":
      try {
        if (!session) {
          return res.status(401).json({ msg: "Debes estar logeado" });
        }
        const categoria = await categorias.findByIdAndUpdate(id, body, {
          new: true,
          runValidators: true,
        });
        if (!categoria) return res.status(404).json({ msg: "Equipo no existe" });
        return res.status(200).json(categoria);
      } catch (error) {
        if (error.name === "ValidationError") {
          let errors = {};
    
          Object.keys(error.errors).forEach((item) => {
            errors[item] = error.errors[item].message;
          });
    
          return res.status(400).send(errors);
        }
        res.status(500).send("Algo salió mal...");
      }
    case "DELETE":
      try {
        if (!session) {
          return res.status(401).json({ msg: "Debes estar logeado" });
        }
        const borrarcategoria = await categorias.findByIdAndDelete(id);
        if (!borrarcategoria)
          return res.status(404).json({ msg: "Equipo no existe" });
        return res.status(204).json();
      } catch (error) {
        if (error.name === "ValidationError") {
          let errors = {};
    
          Object.keys(error.errors).forEach((item) => {
            errors[item] = error.errors[item].message;
          });
    
          return res.status(400).send(errors);
        }
        res.status(500).send("Algo salió mal...");
      }
    default:
      return res.status(400).json({ msg: "Este metodo no esta soportado" });
  }
}
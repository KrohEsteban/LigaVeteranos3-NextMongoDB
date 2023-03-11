import { dbConnect } from "utils/mongoose";
import partidos from "models/partidos";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";


dbConnect();

export default async function handler(req, res) {

  const session = await getServerSession(req, res, authOptions)
  const { method, body, query: { id }} = req;

  switch (method) {
    case "GET":
      try {
        const partido = await partidos.findById(id);
        if (!partido) return res.status(404).json({ msg: "Equipo no existe" });
        return res.status(200).json(partido)
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
        const partido = await partidos.findByIdAndUpdate(id, body, {
          new: true,
          runValidators: true,
        });
        if (!partido) return res.status(404).json({ msg: "Equipo no existe" });
        return res.status(200).json(partido);
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
        const borrarpartido = await partidos.findByIdAndDelete(id);
        if (!borrarpartido)
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
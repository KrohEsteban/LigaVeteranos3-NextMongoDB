import { dbConnect } from "utils/mongoose";
import partidos from "models/partidos"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

dbConnect();

export default async function handler (req, res) {
    
    const session = await getServerSession(req, res, authOptions)

    const { method, body } = req;
  
    switch (method) {
      case "GET":
        try {
          const partido = await partidos.find();
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
      case "POST":
        try {
          if (!session) {
            return res.status(401).json({ msg: "Debes estar logeado" });
          }
          const nuevopartido = new partidos(body);
          const partidoguardado = await nuevopartido.save();
          return res.status(201).json(partidoguardado);
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
  };
  
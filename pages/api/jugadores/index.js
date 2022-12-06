import { dbConnect } from "utils/mongoose";
import jugadores from "models/jugadores"
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

dbConnect();

export default async (req, res) => {
    
    const session = await unstable_getServerSession(req, res, authOptions)

    const { method, body } = req;
  
    switch (method) {
      case "GET":
        try {
          const jugador = await jugadores.find();
          return res.status(200).json(jugador);
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
          const nuevojugador = new jugadores(body);
          const jugadorguardado = await nuevojugador.save();
          return res.status(201).json(jugadorguardado);
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
  
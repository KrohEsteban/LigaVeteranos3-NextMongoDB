import { connect, connection } from "mongoose";

const conn = {
  isConnected: false,
};

export async function dbConnect() {
  if(conn.isConnected) return;

  const db = await connect(process.env.MONGODB_URL); // conecta a la base de datos con la url en .env

  console.log(db.connection.db.databaseName); //nombre de la base de datos conectada

  conn.isConnected = db.connections[0].readyState;
}

connection.on("connected", () => console.log("Mongodb connected to db"));

connection.on("error", (err) => console.error("Mongodb Errro:", err.message));

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.MONGO_URI;

mongoose.connect(connectionString).catch( error => console.log(error));

const db = mongoose.connection;

db.on('connected' , () => console.log("mongodb connection successful"));

export default db;
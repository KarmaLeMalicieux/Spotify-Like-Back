import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT;
import mongoose from "mongoose";
import authRouter from "./routes/userRoute";
import playlistRouter from "./routes/playlistRoute";
import songRouter from "./routes/songRoute";

import { auth } from "./middlewares/auth";

import cors from "cors";
app.use(cors())

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`[📚 DATABASE ] MongoDB est connecté !!`);
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => res.send("WELCOME API SPOTIFY"));
app.use("/auth", authRouter);
app.use("/playlists", playlistRouter);
app.use("/songs", songRouter);
app.listen(port, () =>
  console.log(`[SERVER] is running on http://localhost:${port}`)
);

import { Router } from "express";
import { uploadAudio } from "../middlewares/uploadFile";
import { addSong, allSongs } from "../controllers/songController";
import { auth } from "../middlewares/auth";
const songRouter = Router();

songRouter.post("/add-song", auth, uploadAudio.single("audioFile"), addSong);
songRouter.get("/all", allSongs);

export default songRouter;

import mongoose, { Schema } from "mongoose";
const songSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  artist: String,
  genre: String,
  fileUrl: {
    type: String,
    required: true,
  },
});

const Song = mongoose.model("Song", songSchema);
export default Song;

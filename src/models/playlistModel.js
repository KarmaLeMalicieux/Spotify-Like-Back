import mongoose, { Schema } from "mongoose";
const playlistSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Playlist = mongoose.model("Playlist", playlistSchema);
export default Playlist;

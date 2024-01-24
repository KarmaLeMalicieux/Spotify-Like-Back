import Playlist from "../models/playlistModel";
import Song from "../models/songModel";

const addPlaylist = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id

  try {
    const existingPlaylist = await Playlist.findOne({
      title,
      user: userId,
    });
    console.log("Id du User créateur: ",userId);

    if (existingPlaylist) {
      return res
        .status(400)
        .json({ message: "Une playlist avec ce nom existe déjà." });
    }

    const newPlaylist = new Playlist({
      title,
      description,
      user: userId,
    });

    await newPlaylist.save();

    res.status(201).json(newPlaylist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const allPlaylist = async (req, res) => {
  try {
    const playlists = await Playlist.find().populate("songs");
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePlaylist = async (req, res) => {
  try {
  const playlistID = await Playlist.findOneAndDelete({ _id: req.params.id });
  res.json({message: "A playlist as been deleted"})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const onePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate("songs");
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addSongToPlaylist = async (req, res) => {
  const { playlistId, songId } = req.params;

  try {
    const playlist = await Playlist.findById(playlistId);
    const song = await Song.findById(songId);

    if (!playlist || !song) {
      return res
        .status(404)
        .json({ message: "Playlist ou Chanson non trouvée." });
    }
    if (!playlist.songs.includes(songId)) {
      playlist.songs.push(songId);
      await playlist.save();
      res.json(playlist);
    } else {
      res
        .status(400)
        .json({ message: "La chanson est déjà dans la playlist." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSongFromPlaylist = async (req, res) => {
  const { playlistId, songId } = req.params;

  try {
    const playlist = await Playlist.findById(playlistId);
    const song = await Song.findById(songId);
    playlist.songs.pull(song);
    await playlist.save();
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFakeData = async (req, res) => {
  let playlist;
  let song;

  playlist = new Playlist({
    title: "Reggae",
    description: "Ma playlist reggae",
    user: req.user._id,
  });

  song = new Song({
    title: "No woman no cry",
    artist: "Bob marley",
    genre: "Reggae",
    fileUrl: "http://example.com/file.mp3",
  });

  await song.save();

  playlist.songs.push(song);
  await playlist.save();

  song = new Song({
    title: "Three little birds",
    artist: "Bob marley",
    genre: "Reggae",
    fileUrl: "http://example.com/file.mp3",
  });

  await song.save();

  playlist.songs.push(song);
  await playlist.save();

  song = new Song({
    title: "Kaya",
    artist: "Bob marley",
    genre: "Reggae",
    fileUrl: "http://example.com/file.mp3",
  });

  await song.save();

  playlist.songs.push(song);
  await playlist.save();

  song = new Song({
    title: "Babylon",
    artist: "Bob marley",
    genre: "Reggae",
    fileUrl: "http://example.com/file.mp3",
  });

  await song.save();

  playlist.songs.push(song);
  await playlist.save();

  playlist = new Playlist({
    title: "Rap US",
    description: "Ma playlist RAP US",
    user: req.user._id,
  });

  song = new Song({
    title: "Candy shop",
    artist: "50 Cent",
    genre: "Reggae",
    fileUrl: "http://example.com/file.mp3",
  });

  await song.save();

  playlist.songs.push(song);
  await playlist.save();

  song = new Song({
    title: "California love",
    artist: "2PAC",
    genre: "Reggae",
    fileUrl: "http://example.com/file.mp3",
  });

  await song.save();

  playlist.songs.push(song);
  await playlist.save();

  song = new Song({
    title: "Dear mama",
    artist: "2pac",
    genre: "Reggae",
    fileUrl: "http://example.com/file.mp3",
  });

  await song.save();

  playlist.songs.push(song);
  await playlist.save();

  song = new Song({
    title: "Hold us",
    artist: "Maklemore",
    genre: "Reggae",
    fileUrl: "http://example.com/file.mp3",
  });

  await song.save();

  playlist.songs.push(song);
  await playlist.save();

  song = new Song({
    title: "La macarena",
    artist: "Philippe Poutou",
    genre: "Reggae",
    fileUrl: "http://example.com/file.mp3",
  });

  await song.save();

  playlist.songs.push(song);
  await playlist.save();

  res.json({
    message: "success",
  });
};

export {
  addPlaylist,
  allPlaylist,
  onePlaylist,
  addSongToPlaylist,
  deleteSongFromPlaylist,
  createFakeData,
  deletePlaylist
};

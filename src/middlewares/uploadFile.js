// middleware/uploadMiddleware.js
import multer from "multer";
import path from "path";

// Définir la configuration de stockage pour les images
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "..", "uploads", "images");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

// Définir la configuration de stockage pour les fichiers audio (MP3)
const audioStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "..", "uploads", "audio");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

// Fonction de filtrage des types de fichiers autorisés
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "audio/mpeg",
    "audio/mp3",
  ];

  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Type de fichier non autorisé"), false);
  }
};

// Middleware Multer pour le téléchargement d'images
const uploadImage = multer({
  storage: imageStorage,
  fileFilter: fileFilter,
});

// Middleware Multer pour le téléchargement de fichiers audio (MP3)
const uploadAudio = multer({
  storage: audioStorage,
  fileFilter: fileFilter,
});

export { uploadImage, uploadAudio };

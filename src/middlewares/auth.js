import jwt from "jsonwebtoken";
import "dotenv/config";
const auth = (req, res, next) => {
  // Récupérer le token JWT de l'en-tête Authorization
  const tokenHeader = req.headers.authorization;
  const token = tokenHeader.split(' ')[1];

  // Vérifier si le token existe
  if (!token) {
    return res
      .status(401)
      .json({ message: "Accès non autorisé. Token manquant." });
  }

  try {
    // Vérifier la validité du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Remplacez par votre clé secrète réelle
    req.user = decoded.user; // Ajouter les données utilisateur décryptées à l'objet req
    console.log(req.user)
    next(); // Passer au middleware suivant
  } catch (error) {
    // En cas d'erreur de vérification du token
    res.status(401).json({ message: "Token invalide." });
  }
};

const generateAuthToken = (user) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "7d" });
  return token;
};
export { auth, generateAuthToken };

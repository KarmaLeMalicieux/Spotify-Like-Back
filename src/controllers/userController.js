import { generateAuthToken } from "../middlewares/auth";
import User from "../models/userModel";

const saveUser = async (req, res) => {
  try {
    const newUser = await new User();
    newUser.email = req.body.email;
    newUser.password = await newUser.crypto(req.body.password);
    newUser.name = req.body.name;

    newUser.save();
    const token = generateAuthToken({
      email : newUser.email,
      name : newUser.name,
    });
    console.log("New user saved", newUser)
    res.json({ newUser, token , message: "New user saved"});
  } catch (error) {
    console.error(error);
    res.json({ message: "Error to create user"})
  }
};
const login = async (req, res) => {

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    const verify = await user.verifPass(password, user.password);
    if (!verify) {
      const error = new Error("Invalid Password");
      console.log(error)
      res.json({message: "Invalid Password", error })
      throw error 
    }
    const token = generateAuthToken({
      id : user._id,
      email : user.email,
      name : user.name,
    });
    console.log("User as been connected", user , token)
    res.json({ message: "Vous êtes connecté", token });
  } catch (error) {
    console.error(error);
  }
};

export { saveUser, login };

import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId },'abcdef', {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Secure in production
    sameSite: "strict",
    maxAge: 3600000, // 1 hour
  });
  return token
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword ,profilePicture : req.file ? `uploads/${req.file.filename}` : "" });

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({ message: "User Registered Successfully", user });
    } else {
      res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    generateToken(res, user._id);
    res.status(200).json({ message: " Logged in successfully", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ message: "Logged Out Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req,res) => {

  try{
    const {name} = req.body
    const userId = req.user.id

    const user = await User.findById(userId)
    if(!user) {
      return res.status(404).json({message: "User Not Found"})
    }

    if(name) {
      user.name = name

    }

    if(req.file) {
      user.profilePicture = req.file.path
    }

    await user.save()

    res.status(200).json({message : "Profile Updated SuccessFully"})
  }
  catch(error){
    res.status(500).json({message :error.message})
  }
}

const getUsers = async (req, res) => {
  try {
    const totalUsers = await User.find({});
    res.status(200).json({ totalUsers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId); // Use findByIdAndDelete instead
    
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { login, logout, register, getProfile,updateProfile ,deleteUser,getUsers};

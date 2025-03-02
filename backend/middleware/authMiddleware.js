import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Authorzation Failes" });
    }

    const decoded = jwt.verify(token,"abcdef");

    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Not Authorized Token Failed" });
  }
};

export default authMiddleware;

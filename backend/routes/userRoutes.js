import express from "express";
import { register, login, getProfile, logout,updateProfile,deleteUser,getUsers } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { upload,uploadToCloudinary } from "../utils/multerConfig.js";
const router = express.Router();

router.post("/register",upload.array("profilePicture", 5),uploadToCloudinary ,register);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.get("/profile", authMiddleware, getProfile);
router.get("/profile/update", authMiddleware,upload.array("profilePicture", 5),uploadToCloudinary,updateProfile);
router.delete("/delete/:userId", authMiddleware, deleteUser);
router.get("/users", getUsers);



export default router;

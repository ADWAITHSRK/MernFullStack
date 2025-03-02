import express from "express";
import { register, login, getProfile, logout,updateProfile } from "../controllers/userController.js";
import upload from "../utils/multerConfig.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", upload.single("profilePicture") ,register);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.get("/profile", authMiddleware, getProfile);
router.get("/profile/update", authMiddleware,upload.single("profilePicture"),updateProfile);


export default router;

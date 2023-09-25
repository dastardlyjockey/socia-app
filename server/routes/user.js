import { verifyToken } from "../middleware/auth.js";
import express from "express";
import { getUser, getUserFriend, addFriend } from "../controllers/user.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friend", verifyToken, getUserFriend);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addFriend);

export default router;

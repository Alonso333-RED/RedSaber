import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.post("/register",
    userController.register);

router.get("/users", userController.getAllUsers);

router.get("/users/:id", userController.getUserById);

export default router;
import express from "express";
import userController from "../app/controllers/api/userController.js";

const router = express.Router();

router.get("/users", userController.createUserAction);

export default router;

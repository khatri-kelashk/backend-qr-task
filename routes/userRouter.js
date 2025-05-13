import express from "express";
import { login, logout, register, test } from "../controllers/userController.js";

const UserRouter = express.Router();

UserRouter.post("/register", register);
UserRouter.post("/login", login);
UserRouter.get("/logout", logout);
UserRouter.get("/test", test);

export default UserRouter;
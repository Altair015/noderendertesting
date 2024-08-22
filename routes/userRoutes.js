const { signIn, signUp } = require("../controllers/userController")
const express = require("express");
const { Router } = express;

const userRouter = Router();

userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);

module.exports = { userRouter };
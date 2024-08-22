const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const { hash, compare } = bcrypt;
const { sign } = jsonwebtoken;

const dotenv = require("dotenv");
const { config } = dotenv;
config();

const { JWT_SECRET } = process.env;

const User = require('../models/userModel');

const signUp = async (req, res) => {
    console.log(req.body)
    const { username, password } = req.body;

    // Trying to create a new user record.
    try {
        const userExist = await User.findOne({ username: username })
        if (userExist) {
            return res.status(208).json({ Info: "Account already Exist." })
        }
        else {
            const newUser = new User(
                {
                    username,
                    password: await hash(password, 10),
                }
            )
            const userCreated = await newUser.save();
            if (userCreated) {
                return res.status(201).json({ Success: "Account created successfully." })
            }
            else {
                return res.status(400).json({ Failure: "Something went wrong." })
            }
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Internal Server Error." })
    }
}

// Controller for loggin in of user and return auto token.
const signIn = async (req, res) => {
    console.log(req.body)
    const { username, password } = req.body;

    // Trying to login.
    try {
        // checking if the account with the user input email exist in the DB.
        const userExist = await User.findOne({ username })

        // comparing the password input by the user and existing password in the db.
        if (userExist) {
            const passwordMatched = compare(password, userExist.password);
            if (passwordMatched) {
                const JWT_TOKEN = sign({ id: userExist._id }, JWT_SECRET, { expiresIn: 30000 })
                return res.status(201).json(
                    {
                        Success: "You have logged in successfully.",
                        auth_token: JWT_TOKEN,
                        userData: userExist.toJSON()
                    }
                )
            }
            else {
                return res.status(401).json({ Info: "Invalid Credentials." })
            }
        }
        else {
            return res.status(404).json({ Failure: "Account does not exist." })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Internal Server Error." })
    }
}

module.exports = { signIn, signUp };
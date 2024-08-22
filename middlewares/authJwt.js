const jsonwebtoken = require("jsonwebtoken");
const { verify } = jsonwebtoken;

const dotenv = require("dotenv");
const { config } = dotenv;

const User = require('../models/userModel');

config();

const { JWT_SECRET } = process.env;

function authJwt(req, res, next) {
    const token = req.headers.authorization?.split(" ");
    if (token && token[0] === "JWT") {
        verify(
            token[1],
            JWT_SECRET,
            async (err, verifiedToken) => {
                if (err) {
                    console.error("JWT verification failed:", err);
                    return res.status(401).json({ failure: "Invalid Token" });
                }
                try {
                    const user = await User.findById(verifiedToken.id);
                    if (user) {
                        req.user = user; // Attach user to the request object
                        next();
                    } else {
                        res.status(404).json({ failure: "User Not Found" });
                    }
                } catch (error) {
                    console.error("Error fetching user:", error);
                    res.status(500).json({ msg: "Server Error" });
                }
            }
        );
    } else {
        res.status(400).json({ failure: "Token Not Found or Invalid Format" });
    }
}

module.exports = authJwt;
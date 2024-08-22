const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const { json } = express;
const authJwt = require("./middlewares/authJwt");
const { config } = dotenv;
config();
app.use(json());

const { MONGODB_URL } = process.env;

const { connect, connection } = mongoose;

const { userRouter } = require("./routes/userRoutes")

try {
    const db = connect(MONGODB_URL);
    if (db) {
        connection.on('connected', () => console.log('MongoDB Server is connected'));
    }
}
catch (error) {
    console.log(error.message)
}

app.use(userRouter);

app.get("/", (req, res) => {
    res.status(200).send("Node Rendered on Render.");
})

app.get("/about", authJwt, (req, res) => {
    res.status(200).send("About");
})

app.listen(4000, () => console.log("Node is running on 4000"))
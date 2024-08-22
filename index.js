const express = require("express");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jsonwebtoken = require("jsonwebtoken");
const mongoose = require("mongoose");

const app = express();

console.log(bcrypt)
console.log(dotenv)
console.log(jsonwebtoken)
console.log(mongoose)

app.get("/", (req, res) => {
    res.status(200).send("Node Rendered on Render.");
})

app.get("/about", (req, res) => {
    res.status(200).send("About");
})

app.listen(4000, () => console.log("Node is running on 4000"))
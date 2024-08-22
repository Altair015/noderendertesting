const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.status(200).send("Node Rendered on Render.");
})

app.get("/about", (req, res) => {
    res.status(200).send("About");
})

app.listen(4000, () => console.log("Node is running on 4000"))
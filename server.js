const express = require("express");
const mongojs = require("mongojs");

const app = express();



app.listen(3000, () => {
    console.log("App running on port 3000!");
});
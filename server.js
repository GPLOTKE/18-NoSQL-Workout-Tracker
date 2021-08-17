const express = require("express");
// const mongojs = require("mongojs");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
});

app.use(require("./routes/apiRoutes.js"));

app.listen(3000, () => {
    console.log(`App running on port ${PORT}!`);
});
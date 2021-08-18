const express = require('express');
const logger = require("morgan");
// const mongojs = require("mongojs");
const mongoose = require('mongoose');
const routes = require('./routes');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    unUnifiedTopology: true
});

app.use(require("./routes/apiRoutes.js"));

app.listen(3000, () => {
    console.log(`App running on port ${PORT}!`);
});
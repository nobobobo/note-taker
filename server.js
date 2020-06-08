// import packages 
// =============================================================
const express = require("express");
const path = require("path");
const http = require("http");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 8080;
// Sets up the Express app to handle data 
app.use(express.urlencoded({ extended: true }))
app.use(express.json());


// set up path routings for HTML
// =============================================================
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// start listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
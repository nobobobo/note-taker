// import packages 
// =============================================================
const express = require("express");
const path = require("path");
const http = require("http");
const fs = require("fs");


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


// set up path routings for API
// =============================================================

app.get("/api/notes", function (req, res) {
    fs.readFile(path.join(__dirname, "db/db.json"), (err, data) => {
        if (err) throw err;
        return res.json(JSON.parse(data));
    });
});

app.post("/api/notes", function (req, res) {
    const note = req.body;
    fs.readFile(path.join(__dirname, "db/db.json"), (err, data) => {
        if (err) throw err;
        data = JSON.parse(data);
        data.push(note);
        fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(data), (err) => {
            if (err) throw err;
            return res.json(note);
        });
    });
});


// start listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
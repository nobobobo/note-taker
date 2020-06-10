// import packages 
// =============================================================
const express = require("express");
const path = require("path");
const http = require("http");
const fs = require("fs");


// Sets up the Express App
// =============================================================
let app = express();
let PORT = process.env.PORT || 8080;
// Sets up the Express app to handle data 
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// Set up the counter used as an ID of each note


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

app.delete("/api/notes/:id", function (req, res) {
    const id = req.params.id;
    fs.readFile(path.join(__dirname, "db/db.json"), (err, data) => {
        if (err) throw err;
        data = JSON.parse(data);
        for (let i = 0; i < data.length; i++){
            if (data[i].id === id){
                data.splice(i,1); 
            }
        }
        fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(data), (err) => {
            if (err) throw err;
            return res.end();
        });
    });
})


// start listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
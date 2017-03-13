const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 8080;
const router = express.Router();
const crypto = require("crypto");
const mime = require("mime");

var fs = require('fs');
var multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
        });
    }
});
var upload = multer({ storage: storage });

var Post = require("./models/Post.js");





app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
    res.sendFile('index.html');
});


app.post('/submit', upload.single('test'), function (req, res) {

    fs.stat('./uploads/' + req.file.filename, function (err, stats) {
        if (err) throw err;
        
    });

    var newPost = new Post({
        title: req.body.title,
        location: req.body.location,
        imagePath: req.file.filename,
        text: req.body.text,
        time: new Date()
    });
    newPost.save(function (err) {
        if (err) throw err;
        res.redirect("/");
    });
});

const NUMOFPOSTS = 2;
const SORTNEWEST = {_id:-1};
app.get('/posts', function (req, res) {
    Post.find().sort(SORTNEWEST).limit(NUMOFPOSTS).exec(function(err, results) {
        res.send(results);
        results.forEach(function(item){
            console.log(item);
        });
    });
});


app.use('/', router);
app.listen(port);
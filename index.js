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
        res.sendStatus(200)
    });

    var newPost = new Post({
        title: req.body.title,
        location: req.body.location,
        text: req.body.text,
        filename: req.file.filename
    });
    newPost.save(function (err) {
        if (err) throw err;
        res.redirect("/");
    });
});

app.get('/posts', function (req, res) {
    Names.find({}, function (err, posts) {
        if (err) throw err;
        if (posts.length > 1) {
            console.log(posts);
        } else {
            console.log("no data returned from DB");
        }
    });


});


app.use('/', router);
app.listen(port);
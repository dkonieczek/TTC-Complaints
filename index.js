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
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        crypto
            .pseudoRandomBytes(16, function (err, raw) {
                cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
            });
    }
});
var upload = multer({storage: storage});

var Post = require("./models/Post.js");

app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', function (req, res) {     res.sendFile('index.html'); });
const NUMOFPOSTS = 20;
const SORTNEWEST = {
    _id: -1
};

const title = 'TTC Complaints'

app.get('/', function (req, res) {

    Post.find()
        .sort(SORTNEWEST)
        .limit(NUMOFPOSTS)
        .exec(function (err, results) {
            const posts = results.map(function (item) {

                if (item.imagePath) {
                    return { 
                        "title": item.title, 
                        "location": item.location, 
                        "text": item.text, 
                        "image": "/uploads/" + item.imagePath }
                } else {
                    return { 
                        "title": item.title, 
                        "location": item.location, 
                        "text": item.text }
                }

                
            });
            res.render('index', {
                title: title,
                posts: posts
            })
        });

})

app.post('/submit', upload.single('filename'), function (req, res) {

    let newPost;

    if(req.file) {
        fs.stat('./public/uploads/' + req.file.filename, function (err, stats) {  
            if (err) { throw err; } 
        });
        newPost = new Post({
            title: req.body.title, location: req.body.location,
            imagePath: req.file.filename,
            text: req.body.text,
            time: new Date()
        });
    } else {
        newPost = new Post({
            title: req.body.title, location: req.body.location,
            text: req.body.text,
            time: new Date()
        });
    }

    newPost.save(function (err) {
        if (err) { throw err; }
        res.sendStatus(200);
    });
});

app.use('/', router);
app.listen(port);
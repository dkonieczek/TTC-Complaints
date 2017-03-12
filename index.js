const express = require('express');
const app = express();



const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 8080;
const router = express.Router();
//const formidable = require('express-formidable');
var formidable = require('formidable');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(formidable({
//   encoding: 'utf-8',
//   uploadDir: path.join(__dirname, 'uploads'),
//   multiples: false,
// }));



app.get('/', function (req, res) {
    res.sendFile('index.html');
});


app.post('/submit', function (req, res) {

    var title = req.body.title;
    var location = req.body.location;
    var image = req.body.image;
    var text = req.body.text;

    console.log(req.files);
    console.log(`
                    title: ${title}
                    location: ${location}
                    image: ${image}
                    text: ${text}`);

    res.end("success");

});

app.post('/imgupload', function (req, res) {

    var form = new formidable.IncomingForm(); //Receive form
    form.parse(req, function (err, fields, files) { //Parse form and data
        // Do form stuff, you can access the files
        console.log("Files:" + files);
    });

    // console.log(req.fields + req.files);
    // console.log(JSON.stringify(req.fields));
    // console.log(JSON.stringify(req.files));


    res.end("success");

});




app.use('/', router);
app.listen(port);
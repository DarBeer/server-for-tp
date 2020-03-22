const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    mongodbKey = require('./keys'),
    //index = require('./routes/index'),
    images = require('./routes/images'),
    articles = require('./routes/articles'),
    port = process.env.PORT || 3000,
    app = express();

// MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(mongodbKey, {useUnifiedTopology: true, useNewUrlParser: true}).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

// View Engine
app.set('views', path.join(__dirname, 'dist'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'src')));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// CORS
app.use(cors());

// Routes
//app.use('/', index);
app.use('/data/images', images);
app.use('/data/articles', articles);

// Listen to port
app.listen(port, function(){
    console.log('Listening on port ' + port);
});

module.exports = app;
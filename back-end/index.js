const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/routes.js');
const mongoose = require('mongoose');
const PORT = 3001;
const app = express();
const config = require('./config');
const passport = require('passport');

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());
app.use('/api', routes);
require('./passport')(passport);


app.listen(PORT, function(){
    console.log("Server running on port: " + PORT);
});
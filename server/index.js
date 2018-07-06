import express from 'express';
import bodyParser from 'body-parser';
import myRouter from './router/router';
import mongoose from 'mongoose';

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/test');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
    next();
});

app.use('/', myRouter);

app.listen(3001, () => {
    console.log(`listening on 3001`)
});
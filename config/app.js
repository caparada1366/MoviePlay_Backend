const express = require('express');
const cors = require('cors');
require("dotenv").config();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mainRouter = require('../Routes/index')
const morgan = require('morgan');
const server = express();

server.name = "API";

server.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
server.use(bodyParser.json({limit: '50mb'}));
server.use(cookieParser());
server.use(morgan('dev'));
server.use(cors());
server.use((req,res,next)=>{
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', '*');         //Aqui se ingresa la url del front para que unicamente acepte request de alli
    next();
})

server.use('/', mainRouter)

module.exports = server;
const express = require('express');

const apiRouter = require('./apiRouter.js'); 

const configureMiddleware = require('./configure-middleware.js');
//new code
const session = require('express-session'); 
const dbConnection = require('./data/db.config.js');
const KnexSessionStorage = require('connect-session-knex')(session)

const server = express(); 


const sessionConfig = {
    name: "harosDen", 
    secret: process.env.SESSION_SECRET || 'keep it secret keep it safe', 
    cookie:{
        maxAge: 1000 * 60 * 10, 
        secure: false, 
        httpOnly: true,
    },
    resave: false, 
    saveUninitialized: true, 
    store: new KnexSessionStorage({
        knex: dbConnection, 
        tablename: 'sessions', 
        sidfieldname: 'sid', 
        createTable: true, 
        createInterval: 6000
    })
}
configureMiddleware(server)
//new code 

server.use(session(sessionConfig))


server.use('/api', apiRouter); 

module.exports = server; 
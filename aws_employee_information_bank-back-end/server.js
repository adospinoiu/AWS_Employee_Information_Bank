import express from 'express';

// App config
const app = express();
const port = process.env.PORT || 9000

// Middleware
app.use(express.json());

//Security Warning
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE');
    next();
})
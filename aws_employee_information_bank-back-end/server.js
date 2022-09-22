import express from 'express';

// App config
const app = express();
const port = process.env.PORT || 9000

// Middleware
app.use(express.json());
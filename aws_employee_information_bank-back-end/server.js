import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv'

import { S3Client } from '@aws-sdk/client-s3';

dotenv.config()

const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

//Configure the S3 Client


// App config
const app = express();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// Middleware
app.use(express.json());

// Security Warning
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE');
    next();
})

// Basic to make sure the server is working
app.get('/', (req, res) => {
    res.status(200).send('Hello World')
})

// POST-Request tied to the 'submit button' on the client side
app.post('/api/posts', upload.single('image'), async (req, res) => {
    console.log("req.body", req.body)
    console.log("req.file", req.file)
    req.file.buffer
    res.send({})
})

// Listener
app.listen(8080, () => console.log(`Listening on port 8080`))
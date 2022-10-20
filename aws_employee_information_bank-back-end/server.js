import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import crypto from 'crypto';
import sharp from 'sharp';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

dotenv.config()

// To change the file name of the picture (in the S3 bucket) for more security
const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

// Getting the respective data from the .env file for the s3 bucket
const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

//Configure the S3 Client
const s3 = new S3Client({
    region: bucketRegion,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    }  
})

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

    // Resize the Image
    const buffer = await sharp(req.file.buffer).resize({height: 1920, width: 1080, fit: "contain"}).toBuffer()

    const params = {
        Bucket: bucketName,
        Key: randomImageName(),
        Body: buffer,
        ContentType: req.file.mimetype,
    }

    const command = new PutObjectCommand(params)
    await s3.send(command)

    res.send({})
})

// Listener
app.listen(8080, () => console.log(`Listening on port 8080`))
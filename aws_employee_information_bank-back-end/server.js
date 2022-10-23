import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import dotenv from 'dotenv';
import crypto from 'crypto';
import sharp from 'sharp';

// Import Schema that will be used to add to database
import AddNewEmployee from './dbAddNewEmployee.js'

// import { PrismaClient } from '@prisma/client';

import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

dotenv.config()

// DB Config
const mongoPassword = process.env.MONGO_PASSWORD
const mongoDatabase = process.env.MONGO_DATABASE
const connection_url = 'mongodb+srv://controller:JHzOMh9ImpBDMC6S@cluster0.xotjm.mongodb.net/EmployeeInformationBank?retryWrites=true&w=majority';

mongoose.connect(connection_url, {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

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
// const prisma = new PrismaClient()

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

// GET-Request that will pull all the data forward
// app.get('/api/posts', async(req, res) => {
//     const posts = await prisma.posts.findMany({orderBy: [{ created: 'desc'}]})

//     for (const post of posts) {
//         const getObjectParams = {
//             Bucket: bucketName,
//             Key: post.imageName
//         }
//         const command = new GetObjectCommand(getObjectParams)
//         const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
//         post.imageUrl = url
//     }

//     res.send(posts)
// })

// POST-Request tied to the 'submit button' on the client side
app.post('/api/image', upload.single('image'), async (req, res) => {
    console.log("req.body", req.body)
    console.log("req.file", req.file)

    // Resize the Image
    const buffer = await sharp(req.file.buffer).resize({ height: 1920, width: 1080, fit: "contain" }).toBuffer()

    const imageName = randomImageName()
    const params = {
        Bucket: bucketName,
        Key: imageName,
        Body: buffer,
        ContentType: req.file.mimetype,
    }

    const command = new PutObjectCommand(params)
    await s3.send(command)

    res.send({})
})

// GET-Request. This gets all the employee data from MongoDB database and passes it to App.js Component which then passes it down to the children components
app.get('/addNewEmployee/added', (req, res) => {
    const newEmployee = req.body

    AddNewEmployee.find(newEmployee, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

// POST-Request tied to the 'Add New Employee Button'. This sends the employee data to the MongoDB database
app.post('/addNewEmployee/new', (req, res) => {
    const newEmployee = req.body

    AddNewEmployee.create(newEmployee, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

// Listener
app.listen(8080, () => console.log(`Listening on port 8080`))
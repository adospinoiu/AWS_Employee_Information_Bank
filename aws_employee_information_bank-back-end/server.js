import express from 'express';
import multer from 'multer';

// App config
const app = express();
const port = process.env.PORT || 9000

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

app.get('/', (req, res) => {
    res.status(200).send('Hello World')
})

// Listener
app.listen(port, () => console.log(`Listening on localhost:${port}`))
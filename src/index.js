import express from 'express';
import router from './routes';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import './cloudinary';
import { hostname } from 'os';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/v1', router);

app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Welcome to my first Node.js application!',
        success: true
    });
});

app.all('*', (req, res) => {
    res.status(404).json({
        message: 'This route does not exist',
        success: false
    })
});

app.listen(port, hostname, () => {
    console.log(`Server running at ${hostname} on port ${port}`);
});
import express from 'express';
import router from './routes';
import bodyParser from 'body-parser';
import path from 'path';
import './cloudinary';


const app = express();
const port = process.env.PORT || 3000;

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

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});
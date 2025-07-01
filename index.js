const { default: axios} = require('axios');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const frontend = process.env.FRONTEND_URL || 'http://localhost:5173';
console.log(`Frontend URL: ${frontend}`);

const app = express();
app.use(express.json());
app.use(cors({
    origin: frontend,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/', (req, res) => {
    const formData = req.body;

    axios.post(
    process.env.FORM_URL,
        formData,
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    )
    .then(function (response) {
        res.send(response.data);
    })
    .catch(function (error) {
        res.status(500).send({ error: error.message });
    });
});

app.listen(process.env.PORT, () => {
    console.log('Server is running');
}); 
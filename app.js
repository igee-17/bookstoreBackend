require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const verificationRoutes = require('./routes/verificationRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: false }));

const accountSid = 'AC3f5721997ebf18a235f5bcb22cd98d77';
const authToken = '94fddd06b9ea6070a6886cef28f16b8b';
const client = new twilio(accountSid, authToken);

const corsOption = {
    // origin: "http://localhost:5001",
    // origin: `${process.env.FRONTEND_URL}`,
    // origin: 'http://localhost:5173',
    origin: 'https://bookstore-vite.netlify.app/',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    exposedHeaders: ["x-auth-token"],
};

app.use(cors(corsOption));

app.use(bodyParser.json());

app.use('/api/verification', verificationRoutes);
app.use('/api/books', bookRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

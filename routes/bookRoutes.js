// verificationRoutes.js
const express = require('express');
const bodyParser = require('body-parser');
const { default: axios } = require('axios');

const router = express.Router();
router.use(bodyParser.json());

router.get('/getbooks', async (req, res) => {
    try {
        // Make a request to the external API
        const response = await axios.get('https://anapioficeandfire.com/api/books');

        // Extract the books from the response
        const books = response.data;

        // Send the books as a JSON rexssponse
        console.log('books sent');
        res.json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

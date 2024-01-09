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

// Route to fetch a specific book by ID
router.get('/getbooks/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Make a request to the external API for a specific book by ID
        const response = await axios.get(`https://anapioficeandfire.com/api/books/${id}`);

        // Extract the book from the response
        const book = response.data;

        // Send the book as a JSON response
        res.json(book);
    } catch (error) {
        console.error(`Error fetching book with ID ${id}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

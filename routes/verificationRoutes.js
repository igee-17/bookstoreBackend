// verificationRoutes.js
const express = require('express');
const bodyParser = require('body-parser');
const sendchampService = require('../middleware/sendChampService');

const router = express.Router();
router.use(bodyParser.json());

router.post('/sendVerificationCode', async (req, res) => {
    const { phone } = req.body;

    console.log(phone);

    try {
        const response = await sendchampService.sendVerificationCode(phone);
        res.json(response);
        // console.log();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/verifyPhoneNumber', async (req, res) => {
    const { phone, code } = req.body;

    try {
        const response = await sendchampService.verifyPhoneNumber(phone, code);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

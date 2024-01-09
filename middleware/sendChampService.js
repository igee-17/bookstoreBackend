// sendchampService.js
const axios = require('axios');

const sendChampApiKey = `${process.env.SEND_CHAMP_API_KEY}`;
const sendChampEndpoint = 'https://api.sendchamp.com/v1/verify';

function generateVerificationCode() {
    // Generate a random 6-digit verification code
    return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendVerificationCode(phoneNumber) {
    try {
        const verificationCode = generateVerificationCode();

        const response = await axios.post(sendChampEndpoint, {
            apiKey: `${process.env.SENDCHAMP_API_KEY}`,
            phone: phoneNumber,
            message: `Your verification code is: ${verificationCode}`,
        });

        return { verificationCode, sendChampResponse: response.data };
    } catch (error) {
        console.error('Error sending verification code:', error.message);
        throw error;
    }
}

async function verifyPhoneNumber(phoneNumber, enteredCode) {
    try {
        const response = await axios.post(`${sendChampEndpoint}/verify`, {
            apiKey: `${process.env.SENDCHAMP_API_KEY}`,
            phone: phoneNumber,
            code: enteredCode,
        });

        return response.data;
    } catch (error) {
        console.error('Error verifying phone number:', error.message);
        throw error;
    }
}

module.exports = {
    sendVerificationCode,
    verifyPhoneNumber,
};

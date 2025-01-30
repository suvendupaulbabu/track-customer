require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Shopify Webhook Endpoint
app.post('/track-customer', async (req, res) => {
    try {
        console.log("Received Shopify Data:", req.body);

        // Forward data to an external server
        const response = await axios.post(process.env.EXTERNAL_SERVER_URL, req.body, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log("Data sent successfully:", response.data);
        res.status(200).send("Received and forwarded successfully");
    } catch (error) {
        console.error("Error forwarding data:", error.message);
        res.status(500).send("Error processing request");
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
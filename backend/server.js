import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import * as spauth from 'node-sp-auth';

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

app.get('/fetch-excel', async (req, res) => {
    const siteUrl = 'https://99xtech-my.sharepoint.com/:x:/g/personal/malindar_99x_io/EUrdmRtlDJZIohXoDWHa-OcBm7Yr2j7prvE_7VzxCMg_ng?e=nR0xaf';
    
    try {
        const credentials = await spauth.getAuth(siteUrl);
        const response = await fetch(siteUrl, {
            headers: {
                'Accept': 'application/octet-stream',
                ...credentials.headers
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch the Excel file');
        }

        const fileBuffer = await response.buffer();

        // Set the Content-Type header to indicate binary data
        res.header('Content-Type', 'application/octet-stream');

        // Send the downloaded data as the response
        res.send(fileBuffer);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

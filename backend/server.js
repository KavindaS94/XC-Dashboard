const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

app.get('/fetch-excel', async (req, res) => {
    const url = 'https://99xtech-my.sharepoint.com/:x:/g/personal/malindar_99x_io/EUrdmRtlDJZIohXoDWHa-OcBm7Yr2j7prvE_7VzxCMg_ng?e=GkoWCu';
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                // TODO: Add any necessary headers if required by SharePoint, e.g., authentication headers
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch from SharePoint');
        }

        const data = await response.buffer();
        res.send(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

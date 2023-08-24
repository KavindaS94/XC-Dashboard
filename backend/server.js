import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

app.get('/fetch-excel', async (req, res) => {
    const url = 'https://99xtech-my.sharepoint.com/:x:/g/personal/kavindas_99x_io/EY-5LuE5qJhNntGQxy9urEIByRKLuMHwviWk7JrzpKiymg?e=yGqLf6';
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                // TODO: Add any necessary headers if required by SharePoint, e.g., authentication headers
            }
        });

        // if (!response.ok) {
        //     throw new Error('Failed to fetch from SharePoint');
        // }

        const data = await response.buffer();
        return data;
    } catch (err) {
        console.log("err==============+>",err);
        res.status(500).send(err.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

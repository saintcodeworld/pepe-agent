const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body;

        if (!process.env.OPENAI_API_KEY) {
            return res.status(500).json({ 
                error: 'OpenAI API key not configured on server' 
            });
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: messages,
                temperature: 0.9,
                max_tokens: 500
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'API request failed');
        }

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            error: error.message || 'Internal server error' 
        });
    }
});

app.post('/api/generate-meme', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        if (!process.env.OPENAI_API_KEY) {
            return res.status(500).json({ 
                error: 'OpenAI API key not configured on server' 
            });
        }

        const memePrompt = `Create a meme image featuring Pepe the Frog (a green cartoon frog character) in a Matrix/hacker theme with green digital rain background. Pepe is wearing dark sunglasses and a black leather jacket, looking smug and cool. The scene is: ${prompt}. Style: internet meme art, vibrant green color palette, digital/cyber aesthetic, humorous and expressive.`;

        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'dall-e-3',
                prompt: memePrompt,
                n: 1,
                size: '1024x1024',
                quality: 'standard'
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Image generation failed');
        }

        const data = await response.json();
        res.json({ 
            imageUrl: data.data[0].url,
            revisedPrompt: data.data[0].revised_prompt 
        });

    } catch (error) {
        console.error('Meme generation error:', error);
        res.status(500).json({ 
            error: error.message || 'Failed to generate meme' 
        });
    }
});

app.get('/api/download-meme', async (req, res) => {
    try {
        const { url } = req.query;
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch image');

        const buffer = Buffer.from(await response.arrayBuffer());
        res.set({
            'Content-Type': 'image/png',
            'Content-Disposition': 'attachment; filename="pepe-meme.png"'
        });
        res.send(buffer);
    } catch (error) {
        console.error('Download error:', error);
        res.status(500).json({ error: 'Failed to download meme' });
    }
});

app.listen(PORT, () => {
    console.log(`🐸 Agent Pepe server running on http://localhost:${PORT}`);
    console.log('feels good man');
});

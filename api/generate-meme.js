module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

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
};

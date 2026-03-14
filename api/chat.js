module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

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
};

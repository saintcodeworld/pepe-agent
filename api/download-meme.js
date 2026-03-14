module.exports = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { url } = req.query;
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch image');

        const buffer = Buffer.from(await response.arrayBuffer());
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Disposition', 'attachment; filename="pepe-meme.png"');
        res.send(buffer);
    } catch (error) {
        console.error('Download error:', error);
        res.status(500).json({ error: 'Failed to download meme' });
    }
};

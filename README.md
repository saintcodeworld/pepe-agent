# 🐸 AGENT PEPE

The most based and comfy meme AI agent. Feels good man.

## Features

- **Terminal-style Interface**: Classic green-on-black CRT aesthetic with scanlines and Matrix rain effect
- **OpenAI Integration**: Chat with Agent Pepe powered by GPT-4
- **PEPE Personality**: Authentic meme culture responses with maximum comfy vibes
- **Local Storage**: Your API key is stored securely in your browser
- **Responsive Design**: Works on desktop and mobile

## Setup

1. **Get an OpenAI API Key**
   - Go to [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create a new API key
   - Copy the key

2. **Open the Website**
   - Simply open `index.html` in your browser
   - Or use a local server:
     ```bash
     python -m http.server 8000
     # or
     npx serve
     ```

3. **Enter Your API Key**
   - Paste your OpenAI API key in the input field
   - Click "SAVE KEY"
   - Your key is stored locally in your browser (never sent anywhere except OpenAI)

4. **Start Chatting**
   - Type your message in the terminal
   - Press Enter to send
   - Enjoy comfy conversations with Agent Pepe 🐸

## Files

- `index.html` - Main HTML structure
- `style.css` - Terminal styling with CRT effects
- `script.js` - OpenAI integration and chat logic
- `image.jpg` - Agent Pepe avatar
- `README.md` - This file

## Customization

### Change the AI Model
Edit `script.js` and modify the model parameter:
```javascript
model: 'gpt-4o-mini', // or 'gpt-4', 'gpt-3.5-turbo', etc.
```

### Adjust PEPE Personality
Edit the `PEPE_SYSTEM_PROMPT` in `script.js` to customize how Agent Pepe responds.

### Modify Colors
Edit CSS variables in `style.css`:
```css
:root {
    --terminal-green: #00ff41;
    --terminal-bg: #0a0a0a;
    --pepe-green: #7cb342;
}
```

## Tokenomics Page

The website includes a separate tokenomics page with **real-time statistics** from DexScreener API.

### Features
- **Live Price Updates** - Updates every 30 seconds
- **24H Price Change** - Shows percentage change with color coding
- **Market Cap** - Fully diluted valuation
- **Liquidity** - Current liquidity pool value
- **24H Volume** - Trading volume
- **Transaction Count** - Buys + sells in 24h

### Setup Tokenomics
1. Click `[[TOKEN]]` in the navigation
2. The default contract is already set: `3GnyTs3bj66aze6YJfUdyy2W2c5TD3jG6zEUbx6Mpump`
3. To change it, paste your Solana token contract address and click "SET"
4. Stats will auto-refresh every 30 seconds

### Direct Links
The page automatically generates links to:
- Pump.fun (buy page)
- DexScreener (chart)
- Dextools (analytics)

## Security Notes

- Your API key is stored in `localStorage` in your browser
- The key is never sent to any server except OpenAI's API
- To clear your key: Open browser console and run `localStorage.removeItem('openai_api_key')`
- Contract address is also stored locally in `localStorage`
- Never share your API key with others

## Meme Culture References

Agent Pepe speaks in authentic meme language:
- "feels good man" - Classic Pepe catchphrase
- "anon" / "fren" - How Pepe addresses users
- "based" - Approved/authentic
- "comfy" - Comfortable/chill vibes
- "kek" - Meme version of "lol"
- "wagmi" / "ngmi" - We're all gonna make it / Not gonna make it

## License

All memes reserved. Feels good man. 🐸

---

**Stay comfy, stay based. 🐸**

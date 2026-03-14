# Agent Pepe Setup Guide 🐸

## Installation

1. **Install Node.js dependencies:**
```bash
npm install
```

2. **Configure your OpenAI API key:**
   - Open the `.env` file in the root directory
   - Replace `your_openai_api_key_here` with your actual OpenAI API key:
   ```
   OPENAI_API_KEY=sk-your-actual-api-key-here
   PORT=3000
   ```

## Running the Application

**Start the server:**
```bash
npm start
```

**For development (with auto-restart):**
```bash
npm run dev
```

The application will be available at: `http://localhost:3000`

## How It Works

- The OpenAI API key is now stored securely in the `.env` file on the server
- Users can chat with Agent Pepe without needing to provide their own API key
- All API calls are made from the backend server, keeping your key secure
- The frontend communicates with the backend via the `/api/chat` endpoint

## Important Notes

- **Never commit your `.env` file to version control** - it's already in `.gitignore`
- Keep your OpenAI API key secret and secure
- The `.env.example` file shows the format without exposing your actual key

## Troubleshooting

If you get an error about missing API key:
- Make sure you've added your OpenAI API key to the `.env` file
- Restart the server after updating the `.env` file

feels good man 🐸

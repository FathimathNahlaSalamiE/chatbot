# 🤖 AI Chatbot

A full-stack AI chatbot web application built with React and powered by the Groq API (Qwen model). Features a conversation history sidebar, markdown rendering, mobile responsiveness, and a secure Node.js backend.

🔗 **Live Demo:** [fathimathnahlasalamie.github.io/chatbot](https://fathimathnahlasalamie.github.io/chatbot)

---

## Features

- 💬 Real-time AI chat powered by Groq API (`qwen/qwen3.6-27b`)
- 🗂️ Conversation history sidebar — save, switch, and delete chats
- 📝 Markdown rendering for formatted bot responses
- 📱 Fully responsive — hamburger menu on mobile
- 💾 Chat persistence using localStorage
- 🔒 API key secured on a Node.js backend (never exposed to the browser)
- ⏱️ Timestamps on each message
- ⌨️ Press Enter to send, Shift+Enter for new line

---

## Tech Stack

**Frontend**
- React 19
- Vite
- react-markdown
- dayjs
- CSS (custom, no UI library)
- Deployed on **GitHub Pages**

**Backend**
- Node.js
- Express
- Groq API
- Deployed on **Render**

---

## Screenshots

<img width="1917" height="977" alt="Screenshot 2026-08-21 125612" src="https://github.com/user-attachments/assets/a0809e61-c783-43f5-b5c3-7a0852d90696" />

<img width="1917" height="969" alt="Screenshot 2026-08-21 125906" src="https://github.com/user-attachments/assets/6ca49cdd-dfd8-4b12-becd-eca5baba50c8" />

---

## Project Structure

```
chatbot-project/
├── backend/
│   ├── server.js          # Express server — proxies requests to Groq API
│   ├── package.json
│   └── .env               # GROQ_API_KEY (not committed)
│
├── src/
│   ├── App.jsx            # Root component — conversation state management
│   ├── App.css
│   ├── main.jsx
│   └── components/
│       ├── ChatInput.jsx  # Textarea input, send/clear buttons
│       ├── ChatMessages.jsx # Scrollable message list
│       └── ChatMessage.jsx  # Single message bubble
│
├── index.html
├── vite.config.js
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- A [Groq API key](https://console.groq.com)

### 1. Clone the repository

```bash
git clone https://github.com/FathimathNahlaSalamiE/chatbot.git
cd chatbot
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```
GROQ_API_KEY=your_groq_api_key_here
```

Start the backend server:

```bash
npm start
```

The backend runs on `http://localhost:5000`.

### 3. Set up the frontend

Open a new terminal from the project root:

```bash
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

---

## Environment Variables

| Variable | Location | Description |
|---|---|---|
| `GROQ_API_KEY` | `backend/.env` | Your Groq API key |

> ⚠️ Never commit your `.env` file. It is listed in `.gitignore`.

---

## Deployment

**Frontend → GitHub Pages**
```bash
npm run build
npm run deploy
```

**Backend → Render**
- Set Root Directory to `backend`
- Build Command: `npm install`
- Start Command: `node server.js`
- Add `GROQ_API_KEY` in Render's Environment Variables

---

## How It Works

1. User types a message and hits Send
2. The frontend sends the full conversation history to the Express backend at `/api/chat`
3. The backend forwards the request to the Groq API with the API key attached server-side
4. The Groq API returns a response from the `qwen/qwen3.6-27b` model
5. The response is displayed in the chat with markdown formatting

---

## Author

**Fathimath Nahla Salami E**
- GitHub: [@FathimathNahlaSalamiE](https://github.com/FathimathNahlaSalamiE)
- LinkedIn: [linkedin.com/in/fathimath-nahla-salami](https://linkedin.com/in/fathimath-nahla-salami)

# 🤖 React Chatbot

A simple and interactive chatbot application built with **React.js** and **Vite**. This project was developed to practice modern React concepts such as reusable components, state management, event handling, side effects, and browser local storage.

## ✨ Features

- 💬 Interactive chatbot interface
- 👤 Send and display user messages
- 🤖 Automated chatbot responses
- 💾 Save chat messages using browser `localStorage`
- 🔄 Restore chat history after refreshing the page
- ⚛️ Reusable React components
- 📱 Responsive user interface
- ⚡ Fast development with Vite

## 🛠️ Technologies Used

- **React.js**
- **JavaScript (ES6+)**
- **HTML5**
- **CSS3**
- **Vite**
- **Day.js**
- **Local Storage**

## 📸 Screenshots

### Chatbot Interface

<img width="1915" height="968" alt="Screenshot 2026-08-16 175926" src="https://github.com/user-attachments/assets/1d9776ad-8231-4ee8-9c11-35f776f3e85e" />

### Chat Conversation

<img width="1918" height="970" alt="Screenshot 2026-08-16 175907" src="https://github.com/user-attachments/assets/f8ea0bb9-ab39-4260-9818-ac42c5679e77" />

## 📂 Project Structure

```text
chatbot/
│
├── public/
│
├── screenshots/
│   ├── chatbot.png
│   └── chat-conversation.png
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── ChatInput.jsx
│   │   └── ChatMessages.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

Follow the steps below to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/FathimathNahlaSalamiE/chatbot.git
```

### 2. Navigate to the project directory

```bash
cd chatbot
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

## 📜 Available Scripts

### Start the development server

```bash
npm run dev
```

### Build the project

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Run ESLint

```bash
npm run lint
```

## 🧠 React Concepts Demonstrated

This project helped demonstrate the following React and JavaScript concepts:

- JSX
- Functional Components
- Component-Based Architecture
- Reusable Components
- `useState`
- `useEffect`
- Props
- Event Handling
- Conditional Rendering
- Array Methods
- Browser `localStorage`
- JavaScript ES6+
- React project structure
- Vite development workflow

## 💾 Data Persistence

The application uses the browser's **localStorage** to save chat messages.

This allows the conversation history to remain available even when the browser page is refreshed.

## 🧩 Components

### `App.jsx`

The main application component responsible for managing the chatbot application and its state.

### `ChatInput.jsx`

Handles user input and sending messages to the chatbot.

### `ChatMessages.jsx`

Displays the conversation between the user and the chatbot.

## 🎯 Project Purpose

This project was developed as a practical **React.js learning project** to gain hands-on experience with frontend development and interactive user interfaces.

The main focus was learning how to build a React application using reusable components and manage application state and browser data.

## 🔮 Future Improvements

Possible future improvements include:

- 🔌 Integrate an AI/LLM API
- ⏳ Add chatbot typing/loading indicators
- 🕐 Add timestamps to messages
- 🗑️ Add a clear chat button
- 🌙 Add dark mode
- 📱 Improve mobile responsiveness
- 🎨 Improve UI/UX
- 💬 Add more chatbot responses
- 🚀 Deploy the application online

## 👩‍💻 Author

**Fathimath Nahla Salami E**

Python Full-Stack Developer | AI/ML Developer

### GitHub

https://github.com/FathimathNahlaSalamiE

### Project Repository

https://github.com/FathimathNahlaSalamiE/chatbot

## 📄 License

This project was developed for educational and portfolio purposes.

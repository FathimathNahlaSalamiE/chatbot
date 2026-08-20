import { useState, useRef } from 'react';
import LoadingImage from '../assets/loading-spinner.gif';
import './ChatInput.css';
import dayjs from 'dayjs';

function ChatInput({ chatMessages, setChatMessages, currentId, startNewChat}) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const textareaRef = useRef(null);

  const handleInput = (event) => {
    const textarea = event.target;

    // Reset first
    textarea.style.height = '24px';

    // Calculate content height
    const newHeight = Math.min(textarea.scrollHeight, 200);

    textarea.style.height = `${newHeight}px`;

    // Only expand when the text actually wraps / becomes multiline
    setIsExpanded(newHeight > 24);
  };

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (isLoading || inputText.trim() === '') return;

    // Create conversation ID upfront so all setChatMessages calls use the same one
    let activeId = currentId;
    if (!activeId) {
      activeId = crypto.randomUUID();
      startNewChat(activeId);
    }

    setIsLoading(true);
    const message = inputText;
    setInputText('');

    if (textareaRef.current) {
      textareaRef.current.style.height = '24px';
    }

    const newChatMessages = [
      ...chatMessages,
      {
        message: message,
        sender: 'user',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ];

    // Pass activeId to every setChatMessages call
    setChatMessages([
      ...newChatMessages,
      { message: <img src={LoadingImage} className="loading-spinner" />, sender: 'robot', id: crypto.randomUUID() }
    ], activeId);

    try {
      const conversationHistory = newChatMessages
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: typeof msg.message === 'string' ? msg.message : ''
        }))
        .filter(msg => msg.content !== '');

      const response = await fetch('https://chatbot-backend-nahla.onrender.com/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          conversationHistory
        })
      });

      const data = await response.json();

      if (!data.choices || !data.choices[0]) {
        throw new Error(data.error?.message || 'No response from Groq');
      }

      const botReply = data.choices[0].message.content
        .replace(/<think>[\s\S]*?<\/think>/g, '')
        .trim();

      setChatMessages([
        ...newChatMessages,
        { message: botReply, sender: 'robot', id: crypto.randomUUID(), time: dayjs().valueOf() }
      ], activeId);  // ← pass activeId here too

    } catch (error) {
      console.log('Error:', error.message);
      setChatMessages([
        ...newChatMessages,
        { message: `Error: ${error.message}`, sender: 'robot', id: crypto.randomUUID() }
      ], activeId);  // ← and here
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(event) {
    // Enter = send
    // Shift + Enter = new line
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }

    // Escape = clear input
    if (event.key === 'Escape') {
      setInputText('');

      if (textareaRef.current) {
        textareaRef.current.style.height = '24px';
      }
    }
  }

  function clearMessages() {
    setChatMessages([]);
  }

  return (
  // Change the container div — remove isExpanded from here
<div className="chat-input-container">

{/* // Change the textarea — add isExpanded class here */}
<textarea
  ref={textareaRef}
  placeholder="Send a message to Chatbot"
  rows={1}
  className={`chat-input ${isExpanded ? 'expanded' : ''}`}
  onChange={saveInputText}
  onInput={handleInput}
  onKeyDown={handleKeyDown}
  value={inputText}
/>

  <div className="button-container">
    <button onClick={sendMessage} className="send-button">
      Send
    </button>

    <button onClick={clearMessages} className="clear-button">
      Clear
    </button>
  </div>
</div>
  );
}

export default ChatInput;
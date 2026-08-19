import { useState } from 'react'
import LoadingImage from '../assets/loading-spinner.gif'
import './ChatInput.css';
import dayjs from 'dayjs'

function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value)
  }

  async function sendMessage() {
    if (isLoading || inputText === '') return;

    setIsLoading(true);
    setInputText('');

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ];
    setChatMessages(newChatMessages);

    setChatMessages([
      ...newChatMessages,
      { message: <img src={LoadingImage} className="loading-spinner" />, sender: 'robot', id: crypto.randomUUID() }
    ]);

    try {
      const conversationHistory = newChatMessages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: typeof msg.message === 'string' ? msg.message : ''
      })).filter(msg => msg.content !== '');

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'qwen/qwen3.6-27b',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            ...conversationHistory
          ]
        })
      });

      const data = await response.json();
      console.log('Groq response:', data);  // shows full response

      if (!data.choices || !data.choices[0]) {
        throw new Error(data.error?.message || 'No response from Groq');
      }

      const botReply = data.choices[0].message.content.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

      setChatMessages([
        ...newChatMessages,
        { message: botReply, sender: 'robot', id: crypto.randomUUID(), time: dayjs().valueOf() }
      ]);

    } catch (error) {
      console.log('Error:', error.message)
      setChatMessages([
        ...newChatMessages,
        { message: `Error: ${error.message}`, sender: 'robot', id: crypto.randomUUID() }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      sendMessage();
    } else if (event.key === 'Escape') {
      setInputText('');
    }
  }

  function clearMessages() {
    setChatMessages([]);
  }

  return (
    <div className="chat-input-container">
      <input
        className="chat-input"
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        value={inputText}
        onKeyDown={handleKeyDown}
      />
      <button onClick={sendMessage} className="send-button">Send</button>
      <button onClick={clearMessages} className="clear-button">Clear</button>
    </div>
  );
}

export default ChatInput
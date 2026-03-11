import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import LoadingImage from '../assets/loading-spinner.gif'
import './ChatInput.css';
import dayjs from 'dayjs'



function ChatInput({ chatMessages,setChatMessages }) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event){
    setInputText(event.target.value)
  }

  async function sendMessage() {

    if (isLoading || inputText === ''){
      return;
    }
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

    setChatMessages([  //won't save cuz react does not immedietly update the state. hence it replace with response 
      ...newChatMessages,
      { 
        message: <img src={LoadingImage} className="loading-spinner" />,
        sender: 'robot',
        id: crypto.randomUUID(),
      }
    ]);
    
    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages,
      { 
        message: response,
        sender: 'robot',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]);

    setIsLoading(false);
    
  }

  function handleKeyDown(event){
    if (event.key==='Enter'){
      sendMessage();
    } else if (event.key==='Escape'){
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
      <button
        onClick={sendMessage}
        className="send-button"
      >Send</button>
      <button
        onClick={clearMessages}
        className="clear-button"
      >Clear</button>
    </div>
  );
}


export default ChatInput
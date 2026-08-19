import { useState, useEffect } from 'react'
import ChatInput from './components/ChatInput'
import ChatMessages from './components/ChatMessages'
import './App.css'


      // function ChatMessages({chatMessages}) {
      //   const chatMessagesRef = React.useRef(null);
      //   React.useEffect(() => {
      //     const containerElem = chatMessagesRef.current;
      //     if (containerElem){
      //       containerElem.scrollTop = containerElem.scrollHeight;
      //     }
      //   }, [chatMessages]);




function App() {
        const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages'))||[{
          message: 'hello chatbot',
          sender: 'user',
          id: 'id1',
        }]);
        // const [chatMessages, setChatMessages] = array;  //array destructuring
        // const chatMessages = array[0];
        // const setChatMessages = array[1];

        // useEffect(() => {
        //   Chatbot.addResponses({
        //     'goodbye': 'Goodbye. Have a great day!',
        //     'give me a unique id': function() {
        //       return `Sure! Here's a unique ID: ${crypto.randomUUID()}`;
        //     }
        //   });  
        // },[])

        useEffect(() => {
          localStorage.setItem('messages',JSON.stringify(chatMessages))
        }, [chatMessages])

        return (
          <div className="app-container">

            {chatMessages.length === 0 && 
              <p className="welcome-message">
                Welcome to the chatbot project! Send a message using the textbox below.
              </p>
            }
            
            <ChatMessages
              chatMessages={chatMessages}
            />
            <ChatInput
              chatMessages={chatMessages}
              setChatMessages={setChatMessages}
            />
          </div>
        );
      }

export default App

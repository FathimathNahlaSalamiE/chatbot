import { useState, useEffect } from 'react'
import ChatInput from './components/ChatInput'
import ChatMessages from './components/ChatMessages'
import './App.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [conversations, setConversations] = useState(
    JSON.parse(localStorage.getItem('conversations')) || {}
  );
  const [currentId, setCurrentId] = useState(
    localStorage.getItem('currentId') || null
  );

  const chatMessages = currentId && conversations[currentId]
    ? conversations[currentId].messages
    : [];

  useEffect(() => {
    localStorage.setItem('conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    if (currentId) localStorage.setItem('currentId', currentId);
    else localStorage.removeItem('currentId');
  }, [currentId]);

  // Auto-update title from first user message
  useEffect(() => {
    if (!currentId || !conversations[currentId]) return;  // ← fixed crash
    const msgs = conversations[currentId].messages;
    const firstUser = msgs.find(m => m.sender === 'user');
    if (firstUser && conversations[currentId].title === 'New Chat') {
      setConversations(prev => ({
        ...prev,
        [currentId]: {
          ...prev[currentId],
          title: firstUser.message.slice(0, 30)
        }
      }));
    }
  }, [conversations, currentId]);

  function startNewChat(id) {
    const newId = id || crypto.randomUUID();
    const newConvo = { id: newId, title: 'New Chat', messages: [] };
    setConversations(prev => {
      const updated = { ...prev, [newId]: newConvo };
      localStorage.setItem('conversations', JSON.stringify(updated));
      return updated;
    });
    setCurrentId(newId);
    localStorage.setItem('currentId', newId);
    return newId;
  }

  function setChatMessages(newMessages, idOverride) {
    const activeId = idOverride || currentId;
    if (!activeId) return;

    const resolved = typeof newMessages === 'function'
      ? newMessages(conversations[activeId]?.messages || [])
      : newMessages;

    if (resolved.length === 0) {
      deleteConversation(activeId);
      return;
    }

    setConversations(prev => ({
      ...prev,
      [activeId]: {
        ...prev[activeId],
        messages: resolved
      }
    }));
  }

  function loadConversation(id) {
    setCurrentId(id);
  }

  function deleteConversation(id) {
    setConversations(prev => {
      const updated = { ...prev };
      delete updated[id];
      localStorage.setItem('conversations', JSON.stringify(updated));
      return updated;
    });
    setCurrentId(prev => {
      if (prev !== id) return prev;
      const remaining = Object.keys(conversations).filter(k => k !== id);
      const nextId = remaining.length > 0 ? remaining[0] : null;
      if (nextId) localStorage.setItem('currentId', nextId);
      else localStorage.removeItem('currentId');
      return nextId;
    });
  }

  const sortedConversations = Object.values(conversations).reverse();
  const hasActiveChat = currentId && conversations[currentId];

  return (
    <div className="app-layout">
    {/* Mobile overlay - clicking outside closes sidebar */}
    {sidebarOpen && (
      <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
    )}

    {/* Sidebar */}
    <div className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <button className="new-chat-button" onClick={() => { startNewChat(); setSidebarOpen(false); }}>+ New Chat</button>
      <div className="conversation-list">
        {sortedConversations.map(convo => (
          <div
            key={convo.id}
            className={`conversation-item ${convo.id === currentId ? 'active' : ''}`}
            onClick={() => { loadConversation(convo.id); setSidebarOpen(false); }}
          >
            <span className="conversation-title">{convo.title}</span>
            <button
              className="delete-button"
              onClick={(e) => { e.stopPropagation(); deleteConversation(convo.id); }}
            >×</button>
          </div>
        ))}
      </div>
    </div>

      {/* Main Chat */}
      <div className="app-container">
        {/* Hamburger button - only visible on mobile */}
        <button className="hamburger-button" onClick={() => setSidebarOpen(true)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
          <>
            {chatMessages.length === 0 &&
              <p className="welcome-message">
                Welcome! Send a message to start chatting.
              </p>
            }
            <ChatMessages chatMessages={chatMessages} />
            <ChatInput
              chatMessages={chatMessages}
              setChatMessages={setChatMessages}
              currentId={currentId}
              startNewChat={startNewChat}
            />
          </>
        
      </div>
    </div>
  );
}

export default App
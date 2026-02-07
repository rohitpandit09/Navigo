import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { initialChatMessages, ChatMessage, experts } from '../data/mockData';

const Chat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [inputValue, setInputValue] = useState('');
  const { bookedExpertId, isAuthenticated } = useAuth();

  const bookedExpert = bookedExpertId ? experts.find(e => e.id === bookedExpertId) || experts[0] : null;
  const isUnlocked = bookedExpertId !== null;

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now(),
      senderId: 1,
      text: inputValue,
      timestamp: new Date(),
      type: 'sent'
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // Simulate expert response
    setTimeout(() => {
      const responses = [
        "That's a great question! Let me explain...",
        "I would recommend visiting early morning for the best experience.",
        "Yes, I can arrange that for you. Let me check my schedule.",
        "The history behind this is fascinating. Shah Jahan...",
        "Don't forget to bring water and comfortable shoes!"
      ];
      
      const responseMessage: ChatMessage = {
        id: Date.now() + 1,
        senderId: 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        type: 'received'
      };

      setMessages(prev => [...prev, responseMessage]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (!isAuthenticated) return null;

  return (
    <div className="chat">
      <button
        className="chat__toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      <div className={`chat__window ${isOpen ? 'chat__window--open' : ''}`}>
        <div className="chat__header">
          {isUnlocked && bookedExpert ? (
            <>
              <img
                src={bookedExpert.avatar}
                alt={bookedExpert.name}
                className="chat__header-avatar"
              />
              <div className="chat__header-info">
                <div className="chat__header-name">{bookedExpert.name}</div>
                <div className="chat__header-status">🟢 Online</div>
              </div>
            </>
          ) : (
            <div className="chat__header-info">
              <div className="chat__header-name">Expert Chat</div>
              <div className="chat__header-status">Book an expert to chat</div>
            </div>
          )}
        </div>

        {isUnlocked ? (
          <>
            <div className="chat__messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`chat__message chat__message--${message.type}`}
                >
                  <div>{message.text}</div>
                  <div className="chat__message-time">
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              ))}
            </div>

            <div className="chat__input-area">
              <input
                type="text"
                className="chat__input"
                placeholder="Type a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button className="chat__send" onClick={handleSend}>
                ➤
              </button>
            </div>
          </>
        ) : (
          <div className="chat__locked">
            <div className="chat__locked-icon">🔒</div>
            <h4>Chat Locked</h4>
            <p style={{ marginTop: 'var(--spacing-md)' }}>
              Book an expert guide to unlock the chat feature and start your conversation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;

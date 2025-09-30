// import React, { useState, useRef, useEffect } from "react";
// import "./App.css";

// function App() {
//   const [messages, setMessages] = useState([
//     { sender: "bot", text: "Hello! I am your Campus Helpdesk Bot. How can I help you today?" }
//   ]);
//   const [input, setInput] = useState("");
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(scrollToBottom, [messages]);

//   const handleSend = async () => {
//     if (!input.trim()) return;
//     const userMessage = { sender: "user", text: input };
//     setMessages(prev => [...prev, userMessage]);
//     const response = await fetch("http://127.0.0.1:5000/api/chat", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ message: input })
//     });
//     const data = await response.json();
//     const botMessage = { sender: "bot", text: data.reply };
//     setMessages(prev => [...prev, botMessage]);
//     setInput("");
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") handleSend();
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-header">Campus Helpdesk Chatbot</div>
//       <div className="chat-messages">
//         {messages.map((msg, idx) => (
//           <div key={idx} className={msg.sender === "user" ? "message-user" : "message-bot"}>
//             <div className="bubble">{msg.text}</div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>
//       <div className="chat-input">
//         <input
//           type="text"
//           value={input}
//           placeholder="Type your message..."
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={handleKeyPress}
//         />
//         <button onClick={handleSend}>Send</button>
//       </div>
//     </div>
//   );
// }

// export default App;
//#2
// import React, { useState, useRef, useEffect } from "react";
// import "./App.css";

// function App() {
//   const [messages, setMessages] = useState([
//     { 
//       sender: "bot", 
//       text: "Hello! I'm your Campus Helpdesk Assistant. I can help you with timetables, faculty information, fees, hostel details, library hours, and more. How can I assist you today?" 
//     }
//   ]);
//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(scrollToBottom, [messages]);

//   const handleSend = async () => {
//     if (!input.trim()) return;
    
//     const userMessage = { sender: "user", text: input };
//     setMessages(prev => [...prev, userMessage]);
//     setInput("");
//     setIsTyping(true);

//     try {
//       const response = await fetch("http://127.0.0.1:5000/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: input })
//       });
//       const data = await response.json();
      
//       setTimeout(() => {
//         const botMessage = { sender: "bot", text: data.reply };
//         setMessages(prev => [...prev, botMessage]);
//         setIsTyping(false);
//       }, 500);
//     } catch (error) {
//       setTimeout(() => {
//         const errorMessage = { 
//           sender: "bot", 
//           text: "Sorry, I'm having trouble connecting. Please try again later." 
//         };
//         setMessages(prev => [...prev, errorMessage]);
//         setIsTyping(false);
//       }, 500);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   const quickActions = [
//     "View my timetable",
//     "Faculty information",
//     "Check fees",
//     "Library hours"
//   ];

//   const handleQuickAction = (action) => {
//     setInput(action);
//   };

//   return (
//     <div className="app-container">
//       <div className="chat-wrapper">
//         <div className="chat-container">
//           <div className="chat-header">
//             <div className="header-content">
//               <div className="bot-avatar">
//                 <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="currentColor"/>
//                 </svg>
//               </div>
//               <div className="header-text">
//                 <h1>Campus Helpdesk</h1>
//                 <p className="status"><span className="status-dot"></span>Online</p>
//               </div>
//             </div>
//           </div>

//           <div className="chat-messages">
//             {messages.length === 1 && (
//               <div className="quick-actions">
//                 <p className="quick-actions-title">Quick Actions:</p>
//                 <div className="action-buttons">
//                   {quickActions.map((action, idx) => (
//                     <button 
//                       key={idx} 
//                       className="action-btn"
//                       onClick={() => handleQuickAction(action)}
//                     >
//                       {action}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
            
//             {messages.map((msg, idx) => (
//               <div key={idx} className={`message ${msg.sender === "user" ? "message-user" : "message-bot"}`}>
//                 {msg.sender === "bot" && (
//                   <div className="message-avatar bot-icon">
//                     <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M20 9V7C20 5.9 19.1 5 18 5H14V3H10V5H6C4.9 5 4 5.9 4 7V9C2.9 9 2 9.9 2 11V13C2 14.1 2.9 15 4 15V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V15C21.1 15 22 14.1 22 13V11C22 9.9 21.1 9 20 9ZM18 19H6V13H18V19ZM9 11C9 10.45 9.45 10 10 10C10.55 10 11 10.45 11 11C11 11.55 10.55 12 10 12C9.45 12 9 11.55 9 11ZM13 11C13 10.45 13.45 10 14 10C14.55 10 15 10.45 15 11C15 11.55 14.55 12 14 12C13.45 12 13 11.55 13 11Z" fill="currentColor"/>
//                     </svg>
//                   </div>
//                 )}
//                 <div className="bubble">
//                   <div className="bubble-text">{msg.text}</div>
//                   <div className="message-time">
//                     {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
//                   </div>
//                 </div>
//                 {msg.sender === "user" && (
//                   <div className="message-avatar user-icon">
//                     <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
//                     </svg>
//                   </div>
//                 )}
//               </div>
//             ))}
            
//             {isTyping && (
//               <div className="message message-bot">
//                 <div className="message-avatar bot-icon">
//                   <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M20 9V7C20 5.9 19.1 5 18 5H14V3H10V5H6C4.9 5 4 5.9 4 7V9C2.9 9 2 9.9 2 11V13C2 14.1 2.9 15 4 15V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V15C21.1 15 22 14.1 22 13V11C22 9.9 21.1 9 20 9ZM18 19H6V13H18V19ZM9 11C9 10.45 9.45 10 10 10C10.55 10 11 10.45 11 11C11 11.55 10.55 12 10 12C9.45 12 9 11.55 9 11ZM13 11C13 10.45 13.45 10 14 10C14.55 10 15 10.45 15 11C15 11.55 14.55 12 14 12C13.45 12 13 11.55 13 11Z" fill="currentColor"/>
//                   </svg>
//                 </div>
//                 <div className="bubble typing-indicator">
//                   <span></span>
//                   <span></span>
//                   <span></span>
//                 </div>
//               </div>
//             )}
            
//             <div ref={messagesEndRef} />
//           </div>

//           <div className="chat-input">
//             <div className="input-wrapper">
//               <input
//                 type="text"
//                 value={input}
//                 placeholder="Type your message..."
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={handleKeyPress}
//                 disabled={isTyping}
//               />
//               <button 
//                 onClick={handleSend} 
//                 disabled={!input.trim() || isTyping}
//                 className="send-btn"
//               >
//                 <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
//@2
// import React, { useState, useRef, useEffect } from "react";
// import "./App.css";

// function App() {
//   const [messages, setMessages] = useState([
//     { 
//       sender: "bot", 
//       text: "Hello! I'm your Campus Helpdesk Assistant. I can help you with timetables, faculty information, fees, hostel details, library hours, and more. How can I assist you today?" 
//     }
//   ]);
//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(scrollToBottom, [messages]);

//   const handleSend = async () => {
//     if (!input.trim()) return;
    
//     const userMessage = { sender: "user", text: input };
//     setMessages(prev => [...prev, userMessage]);
//     setInput("");
//     setIsTyping(true);

//     try {
//       const response = await fetch("http://127.0.0.1:5000/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: input })
//       });
//       const data = await response.json();
      
//       setTimeout(() => {
//         const botMessage = { sender: "bot", text: data.reply };
//         setMessages(prev => [...prev, botMessage]);
//         setIsTyping(false);
//       }, 500);
//     } catch (error) {
//       setTimeout(() => {
//         const errorMessage = { 
//           sender: "bot", 
//           text: "Sorry, I'm having trouble connecting. Please try again later." 
//         };
//         setMessages(prev => [...prev, errorMessage]);
//         setIsTyping(false);
//       }, 500);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   const quickActions = [
//     "View my timetable",
//     "Faculty information",
//     "Check fees",
//     "Library hours"
//   ];

//   const handleQuickAction = async (action) => {
//     setInput(action);
    
//     const userMessage = { sender: "user", text: action };
//     setMessages(prev => [...prev, userMessage]);
//     setIsTyping(true);

//     try {
//       const response = await fetch("http://127.0.0.1:5000/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: action })
//       });
//       const data = await response.json();
      
//       setTimeout(() => {
//         const botMessage = { sender: "bot", text: data.reply };
//         setMessages(prev => [...prev, botMessage]);
//         setIsTyping(false);
//         setInput("");
//       }, 500);
//     } catch (error) {
//       setTimeout(() => {
//         const errorMessage = { 
//           sender: "bot", 
//           text: "Sorry, I'm having trouble connecting. Please try again later." 
//         };
//         setMessages(prev => [...prev, errorMessage]);
//         setIsTyping(false);
//         setInput("");
//       }, 500);
//     }
//   };

//   return (
//     <div className="app-container">
//       <div className="chat-wrapper">
//         <div className="chat-container">
//           <div className="chat-header">
//             <div className="header-content">
//               <div className="bot-avatar">
//                 <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="currentColor"/>
//                 </svg>
//               </div>
//               <div className="header-text">
//                 <h1>Campus Helpdesk</h1>
//                 <p className="status"><span className="status-dot"></span>Online</p>
//               </div>
//             </div>
//           </div>

//           <div className="chat-messages">
//             {messages.length === 1 && (
//               <div className="quick-actions">
//                 <p className="quick-actions-title">Quick Actions:</p>
//                 <div className="action-buttons">
//                   {quickActions.map((action, idx) => (
//                     <button 
//                       key={idx} 
//                       className="action-btn"
//                       onClick={() => handleQuickAction(action)}
//                     >
//                       {action}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
            
//             {messages.map((msg, idx) => (
//               <div key={idx} className={`message ${msg.sender === "user" ? "message-user" : "message-bot"}`}>
//                 {msg.sender === "bot" && (
//                   <div className="message-avatar bot-icon">
//                     <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M20 9V7C20 5.9 19.1 5 18 5H14V3H10V5H6C4.9 5 4 5.9 4 7V9C2.9 9 2 9.9 2 11V13C2 14.1 2.9 15 4 15V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V15C21.1 15 22 14.1 22 13V11C22 9.9 21.1 9 20 9ZM18 19H6V13H18V19ZM9 11C9 10.45 9.45 10 10 10C10.55 10 11 10.45 11 11C11 11.55 10.55 12 10 12C9.45 12 9 11.55 9 11ZM13 11C13 10.45 13.45 10 14 10C14.55 10 15 10.45 15 11C15 11.55 14.55 12 14 12C13.45 12 13 11.55 13 11Z" fill="currentColor"/>
//                     </svg>
//                   </div>
//                 )}
//                 <div className="bubble">
//                   <div className="bubble-text">{msg.text}</div>
//                   <div className="message-time">
//                     {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
//                   </div>
//                 </div>
//                 {msg.sender === "user" && (
//                   <div className="message-avatar user-icon">
//                     <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
//                     </svg>
//                   </div>
//                 )}
//               </div>
//             ))}
            
//             {isTyping && (
//               <div className="message message-bot">
//                 <div className="message-avatar bot-icon">
//                   <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M20 9V7C20 5.9 19.1 5 18 5H14V3H10V5H6C4.9 5 4 5.9 4 7V9C2.9 9 2 9.9 2 11V13C2 14.1 2.9 15 4 15V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V15C21.1 15 22 14.1 22 13V11C22 9.9 21.1 9 20 9ZM18 19H6V13H18V19ZM9 11C9 10.45 9.45 10 10 10C10.55 10 11 10.45 11 11C11 11.55 10.55 12 10 12C9.45 12 9 11.55 9 11ZM13 11C13 10.45 13.45 10 14 10C14.55 10 15 10.45 15 11C15 11.55 14.55 12 14 12C13.45 12 13 11.55 13 11Z" fill="currentColor"/>
//                   </svg>
//                 </div>
//                 <div className="bubble typing-indicator">
//                   <span></span>
//                   <span></span>
//                   <span></span>
//                 </div>
//               </div>
//             )}
            
//             <div ref={messagesEndRef} />
//           </div>

//           <div className="chat-input">
//             <div className="input-wrapper">
//               <input
//                 type="text"
//                 value={input}
//                 placeholder="Type your message..."
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={handleKeyPress}
//                 disabled={isTyping}
//               />
//               <button 
//                 onClick={handleSend} 
//                 disabled={!input.trim() || isTyping}
//                 className="send-btn"
//               >
//                 <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

// #3 - fully designed css using claude

import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([
    { 
      sender: "bot", 
      text: "Hello! I'm your Campus Helpdesk Assistant. I can help you with timetables, faculty information, fees, hostel details, library hours, and more. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const saved = localStorage.getItem('chatHistory');
    if (saved) {
      try {
        setChatHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load history');
      }
    }
    
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setDarkMode(savedTheme === 'true');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const saveToHistory = (userMsg, botMsg) => {
    const historyItem = {
      id: Date.now(),
      user: userMsg,
      bot: botMsg,
      timestamp: new Date().toISOString()
    };
    const newHistory = [historyItem, ...chatHistory].slice(0, 50);
    setChatHistory(newHistory);
    localStorage.setItem('chatHistory', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setChatHistory([]);
    localStorage.removeItem('chatHistory');
  };

  const loadHistoryItem = (item) => {
    setMessages([
      { sender: "bot", text: "Hello! I'm your Campus Helpdesk Assistant. How can I assist you today?", timestamp: new Date() },
      { sender: "user", text: item.user, timestamp: new Date(item.timestamp) },
      { sender: "bot", text: item.bot, timestamp: new Date(item.timestamp) }
    ]);
    setShowHistory(false);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { sender: "user", text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    const userText = input;
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText })
      });
      const data = await response.json();
      
      setTimeout(() => {
        const botMessage = { sender: "bot", text: data.reply, timestamp: new Date() };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
        saveToHistory(userText, data.reply);
      }, 500);
    } catch (error) {
      setTimeout(() => {
        const errorMessage = { 
          sender: "bot", 
          text: "Sorry, I'm having trouble connecting. Please try again later.",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
      }, 500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    "View my timetable",
    "Faculty information",
    "Check fees",
    "Library hours"
  ];

  const handleQuickAction = async (action) => {
    const userMessage = { sender: "user", text: action, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: action })
      });
      const data = await response.json();
      
      setTimeout(() => {
        const botMessage = { sender: "bot", text: data.reply, timestamp: new Date() };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
        saveToHistory(action, data.reply);
      }, 500);
    } catch (error) {
      setTimeout(() => {
        const errorMessage = { 
          sender: "bot", 
          text: "Sorry, I'm having trouble connecting. Please try again later.",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
      }, 500);
    }
  };

  return (
    <div className="app-container">
      <div className="chat-wrapper">
        <div className="chat-container">
          
          {/* Header */}
          <div className="chat-header">
            <div className="header-content">
              <div className="bot-avatar">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 9V7C20 5.9 19.1 5 18 5H14V3H10V5H6C4.9 5 4 5.9 4 7V9C2.9 9 2 9.9 2 11V13C2 14.1 2.9 15 4 15V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V15C21.1 15 22 14.1 22 13V11C22 9.9 21.1 9 20 9ZM18 19H6V13H18V19ZM9 11C9 10.45 9.45 10 10 10C10.55 10 11 10.45 11 11C11 11.55 10.55 12 10 12C9.45 12 9 11.55 9 11ZM13 11C13 10.45 13.45 10 14 10C14.55 10 15 10.45 15 11C15 11.55 14.55 12 14 12C13.45 12 13 11.55 13 11Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="header-text">
                <h1>IAI Capstone</h1>
                <p className="batch-info">Batch-01 • Section-14</p>
              </div>
            </div>
            
            <div className="header-actions">
              <button onClick={() => setShowHistory(!showHistory)} className="icon-btn" title="Chat History">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                  <path d="M3 3v5h5"/>
                  <path d="M12 7v5l4 2"/>
                </svg>
              </button>
              <button onClick={() => setDarkMode(!darkMode)} className="icon-btn" title="Toggle Theme">
                {darkMode ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5"/>
                    <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* History Sidebar */}
          {showHistory && (
            <div className="history-sidebar">
              <div className="history-header">
                <h3>Chat History</h3>
                <div className="history-actions">
                  {chatHistory.length > 0 && (
                    <button onClick={clearHistory} className="icon-btn-small" title="Clear History">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                      </svg>
                    </button>
                  )}
                  <button onClick={() => setShowHistory(false)} className="icon-btn-small">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6 6 18M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="history-list">
                {chatHistory.length === 0 ? (
                  <div className="history-empty">No chat history yet</div>
                ) : (
                  chatHistory.map(item => (
                    <div key={item.id} onClick={() => loadHistoryItem(item)} className="history-item">
                      <p className="history-user">{item.user}</p>
                      <p className="history-bot">{item.bot}</p>
                      <p className="history-time">{new Date(item.timestamp).toLocaleString()}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="chat-messages">
            {messages.length === 1 && (
              <div className="quick-actions">
                <p className="quick-actions-title">Quick Actions:</p>
                <div className="action-buttons">
                  {quickActions.map((action, idx) => (
                    <button key={idx} className="action-btn" onClick={() => handleQuickAction(action)}>
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.sender === "user" ? "message-user" : "message-bot"}`}>
                {msg.sender === "bot" && (
                  <div className="message-avatar bot-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 9V7C20 5.9 19.1 5 18 5H14V3H10V5H6C4.9 5 4 5.9 4 7V9C2.9 9 2 9.9 2 11V13C2 14.1 2.9 15 4 15V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V15C21.1 15 22 14.1 22 13V11C22 9.9 21.1 9 20 9ZM18 19H6V13H18V19ZM9 11C9 10.45 9.45 10 10 10C10.55 10 11 10.45 11 11C11 11.55 10.55 12 10 12C9.45 12 9 11.55 9 11ZM13 11C13 10.45 13.45 10 14 10C14.55 10 15 10.45 15 11C15 11.55 14.55 12 14 12C13.45 12 13 11.55 13 11Z" fill="currentColor"/>
                    </svg>
                  </div>
                )}
                <div className="bubble">
                  <div className="bubble-text">{msg.text}</div>
                  <div className="message-time">
                    {msg.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                {msg.sender === "user" && (
                  <div className="message-avatar user-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="message message-bot">
                <div className="message-avatar bot-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 9V7C20 5.9 19.1 5 18 5H14V3H10V5H6C4.9 5 4 5.9 4 7V9C2.9 9 2 9.9 2 11V13C2 14.1 2.9 15 4 15V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V15C21.1 15 22 14.1 22 13V11C22 9.9 21.1 9 20 9ZM18 19H6V13H18V19ZM9 11C9 10.45 9.45 10 10 10C10.55 10 11 10.45 11 11C11 11.55 10.55 12 10 12C9.45 12 9 11.55 9 11ZM13 11C13 10.45 13.45 10 14 10C14.55 10 15 10.45 15 11C15 11.55 14.55 12 14 12C13.45 12 13 11.55 13 11Z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="bubble typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chat-input">
            <div className="input-wrapper">
              <input
                type="text"
                value={input}
                placeholder="Type your message..."
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isTyping}
              />
              <button 
                onClick={handleSend} 
                disabled={!input.trim() || isTyping}
                className="send-btn"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
import { useState, useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:3001", {
  autoConnect: false, 
});

function formatTime(ts) {
  return new Date(ts).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function App() {
  const [username, setUsername] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [activeUsers, setActiveUsers] = useState([]);

  const [typingUsers, setTypingUsers] = useState(new Set());
  const typingTimeoutRef = useRef(null);
  const isTypingRef = useRef(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingUsers]);


  useEffect(() => {
  
    socket.on("connect", () => {
      console.log(" WebSocket handshake successful — socket ID:", socket.id);
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log(" Disconnected from server");
      setIsConnected(false);
    });

  
    socket.on("receive_message", (payload) => {
      setMessages((prev) => [...prev, { ...payload, type: "message" }]);
    });

    socket.on("user_joined", (payload) => {
      setMessages((prev) => [
        ...prev,
        { ...payload, id: `sys-${Date.now()}`, type: "system" },
      ]);
    });

    socket.on("user_left", (payload) => {
      setMessages((prev) => [
        ...prev,
        { ...payload, id: `sys-${Date.now()}`, type: "system" },
      ]);
    });

    socket.on("user_list", (users) => {
      setActiveUsers(users);
    });

    socket.on("user_typing", ({ username: typingUser, isTyping }) => {
      setTypingUsers((prev) => {
        const next = new Set(prev);
        if (isTyping) {
          next.add(typingUser);
        } else {
          next.delete(typingUser);
        }
        return next;
      });
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("receive_message");
      socket.off("user_joined");
      socket.off("user_left");
      socket.off("user_list");
      socket.off("user_typing");
    };
  }, []);

  const handleJoin = () => {
    const trimmed = nameInput.trim();
    if (!trimmed) return;

    setUsername(trimmed);
    socket.connect(); 

  
    socket.once("connect", () => {
      socket.emit("join", trimmed);
    });

    
    if (socket.connected) {
      socket.emit("join", trimmed);
    }
  };

  const handleSendMessage = useCallback(() => {
    const trimmed = messageInput.trim();
    if (!trimmed || !socket.connected) return;

    socket.emit("send_message", { text: trimmed });
    setMessageInput("");

    if (isTypingRef.current) {
      socket.emit("typing_stop");
      isTypingRef.current = false;
    }
    clearTimeout(typingTimeoutRef.current);
  }, [messageInput]);


  const handleInputChange = (e) => {
    setMessageInput(e.target.value);

   
    if (!isTypingRef.current && e.target.value.length > 0) {
      socket.emit("typing_start");
      isTypingRef.current = true;
    }

  
    if (e.target.value.length === 0) {
      socket.emit("typing_stop");
      isTypingRef.current = false;
      clearTimeout(typingTimeoutRef.current);
      return;
    }

  
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("typing_stop");
      isTypingRef.current = false;
    }, 2000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const typingText = () => {
    const users = Array.from(typingUsers);
    if (users.length === 0) return null;
    if (users.length === 1) return `${users[0]} is typing...`;
    if (users.length === 2) return `${users[0]} and ${users[1]} are typing...`;
    return `${users[0]} and ${users.length - 1} others are typing...`;
  };

  
  if (!username) {
    return (
      <div className="gate-screen">
        <div className="gate-card">
          <div className="gate-logo">⬡</div>
          <h1 className="gate-title">NEXUS CHAT</h1>
          <p className="gate-subtitle">Real-time communication via WebSocket</p>
          <div className="gate-input-group">
            <input
              className="gate-input"
              type="text"
              placeholder="Enter your handle..."
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleJoin()}
              maxLength={20}
              autoFocus
            />
            <button
              className="gate-btn"
              onClick={handleJoin}
              disabled={!nameInput.trim()}
            >
              CONNECT
            </button>
          </div>
          <p className="gate-hint">Phase 2: Identity is required before WebSocket handshake</p>
        </div>
      </div>
    );
  }


  return (
    <div className="app">
     
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="logo">⬡</span>
          <span className="logo-text">NEXUS</span>
        </div>

        <div className="connection-status">
          <span className={`status-dot ${isConnected ? "online" : "offline"}`} />
          <span className="status-text">
            {isConnected ? "Connected" : "Disconnected"}
          </span>
        </div>

        <div className="you-label">YOU</div>
        <div className="you-username">{username}</div>

        <div className="users-label">ONLINE — {activeUsers.length}</div>
        <ul className="users-list">
          {activeUsers.map((user) => (
            <li key={user} className={`user-item ${user === username ? "is-you" : ""}`}>
              <span className="user-avatar">{user[0].toUpperCase()}</span>
              <span className="user-name">{user}</span>
              {user === username && <span className="you-tag">you</span>}
            </li>
          ))}
        </ul>

        <div className="sidebar-footer">
          <div className="tech-tag">socket.io v4</div>
          <div className="tech-tag">express</div>
          <div className="tech-tag">react</div>
        </div>
      </aside>

   
      <main className="chat-area">
        <header className="chat-header">
          <div className="header-left">
            <span className="channel-hash">#</span>
            <span className="channel-name">general</span>
            <span className="header-desc">Real-time WebSocket channel</span>
          </div>
          <div className="header-right">
            <span className="socket-id">socket: {socket.id?.slice(0, 8)}...</span>
          </div>
        </header>

  
        <div className="messages-feed">
          {messages.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">⬡</div>
              <p>WebSocket connection established.</p>
              <p className="empty-sub">Send the first message to begin broadcasting.</p>
            </div>
          )}

          {messages.map((msg) => {
            if (msg.type === "system") {
              return (
                <div key={msg.id} className="msg-system">
                  <span className="msg-system-text">{msg.message}</span>
                  <span className="msg-time">{formatTime(msg.timestamp)}</span>
                </div>
              );
            }

            const isOwn = msg.username === username;
            return (
              <div key={msg.id} className={`msg-row ${isOwn ? "own" : "other"}`}>
                {!isOwn && (
                  <div className="msg-avatar">{msg.username[0].toUpperCase()}</div>
                )}
                <div className="msg-bubble-group">
                
                  <div className={`msg-meta ${isOwn ? "own" : ""}`}>
                    <span className="msg-author">{isOwn ? "You" : msg.username}</span>
                    <span className="msg-time">{formatTime(msg.timestamp)}</span>
                  </div>
                  <div className={`msg-bubble ${isOwn ? "own" : "other"}`}>
                    {msg.text}
                  </div>
                </div>
                {isOwn && (
                  <div className="msg-avatar own-avatar">{username[0].toUpperCase()}</div>
                )}
              </div>
            );
          })}

     
          {typingText() && (
            <div className="typing-indicator">
              <span className="typing-dots">
                <span />
                <span />
                <span />
              </span>
              <span className="typing-text">{typingText()}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="input-bar">
          <div className="input-wrapper">
            <input
              className="message-input"
                     type="text"
              placeholder={`Message as ${username}...`}
                     value={messageInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={!isConnected}
            />
            <button
              className="send-btn"
              onClick={handleSendMessage}
              disabled={!messageInput.trim() || !isConnected}
            >
              SEND ↗
            </button>
          </div>
          <p className="input-hint">
                      Emits <code>send_message</code> event → server broadcasts to all clients
          </p>
        </div>
      </main>
    </div>
  );
}

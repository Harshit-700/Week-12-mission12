

NEXUS CHAT is a real-time chat application built using React.js, Vite, Node.js, Express.js, and Socket.io.

The project demonstrates WebSocket-based bidirectional communication, session identity management, active user tracking, and real-time typing indicators.

---
---
📸 Screenshot- ![img alt]()


🔗 Live Demo frontend url:
🔗 Live Demo backend url:

## 📁 Project Structure

```txt
socketio-chat/
│
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/
│   ├── index.js
│   └── package.json
│
└── README.md
````

---

## ✨ Features

### Real-Time Messaging

Messages are delivered instantly using WebSockets.

### Socket.io Integration

Full duplex communication between client and server.

### Session Identity

Users join the chat with a custom username.

### Active User Tracking

Connected users are displayed in real time.

### Typing Indicators

Users can see when another participant is typing.

### Join/Leave Notifications

System messages announce user activity.

### Auto Scrolling Chat

Chat automatically scrolls to the newest message.

### Responsive Interface

Modern responsive chat interface.

---

## 🚀 Getting Started

### Install Server Dependencies

```bash
cd server
npm install
```

### Install Client Dependencies

```bash
cd client
npm install
```

---

## Start Backend

```bash
cd server
npm run dev
```

Expected Output:

```bash
Socket.io Chat Server running on port 3001
```

---

## Start Frontend

```bash
cd client
npm run dev
```

Expected Output:

```bash
Local: http://localhost:5173
```

---

## 🔗 Socket Events

### Client → Server

| Event        | Purpose            |
| ------------ | ------------------ |
| join         | User joins chat    |
| send_message | Send new message   |
| typing_start | User starts typing |
| typing_stop  | User stops typing  |

---

### Server → Client

| Event           | Purpose           |
| --------------- | ----------------- |
| receive_message | Broadcast message |
| user_joined     | Notify join       |
| user_left       | Notify leave      |
| user_typing     | Typing indicator  |
| user_list       | Active users list |

---

## 🧪 Testing

Verified Functionalities:

| Feature              | Status  |
| -------------------- | ------- |
| WebSocket Connection | Working |
| Real-Time Messaging  | Working |
| User Join System     | Working |
| User Leave System    | Working |
| Active User List     | Working |
| Typing Indicator     | Working |
| Multi-Client Chat    | Working |

---

## 🧩 Backend Functionalities

| Functionality      | Description               |
| ------------------ | ------------------------- |
| Express Server     | Handles HTTP requests     |
| Socket.io Server   | WebSocket communication   |
| User Management    | Tracks connected users    |
| Event Broadcasting | Real-time event delivery  |
| Typing Events      | Live typing notifications |

---

## 🎨 Frontend Functionalities

| Functionality    | Description             |
| ---------------- | ----------------------- |
| React Components | Modular UI              |
| Socket Client    | Server communication    |
| Chat Window      | Displays messages       |
| User List        | Active participants     |
| Typing Indicator | Real-time typing status |

---

## ⚡ Technologies Used

| Technology | Purpose                 |
| ---------- | ----------------------- |
| React.js   | Frontend                |
| Vite       | Build Tool              |
| Node.js    | Runtime                 |
| Express.js | Backend                 |
| Socket.io  | Real-Time Communication |
| CSS3       | Styling                 |

---

## 💡 Future Improvements

* Private Messaging
* Chat Rooms
* JWT Authentication
* Message Persistence
* MongoDB Storage
* File Sharing
* Voice Messages
* Online Status
* Message Reactions
* Read Receipts

---

## 🌍 Deployment

Frontend:

* Vercel

Backend:

* Render

---

## 📄 License

MIT License

````


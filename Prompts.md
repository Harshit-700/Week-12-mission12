
---

# Prompts.md

```md
# NEXUS CHAT – Prompts Documentation

This document contains the complete collection of structured prompts used during the development of the Socket.io Real-Time Chat Application.

---

## 1. Real-Time Chat Application Architecture

Create a real-time chat application using React.js, Node.js, Express.js, and Socket.io.

The application should:
- Support bidirectional communication
- Handle multiple concurrent users
- Maintain scalable architecture
- Separate frontend and backend logic

---

## 2. React Frontend Development

Build a React frontend using Vite.

The frontend should:
- Use reusable components
- Display messages dynamically
- Support real-time updates
- Maintain responsive UI
- Handle socket events cleanly

---

## 3. Express Backend Configuration

Create an Express server.

The backend should:
- Initialize successfully
- Support Socket.io integration
- Manage client connections
- Handle event routing
- Provide server status endpoints

---

## 4. Socket.io Server Integration

Configure Socket.io.

The server should:
- Accept WebSocket connections
- Handle multiple clients
- Broadcast messages
- Manage event lifecycle
- Support scalable communication

---

## 5. Session Identity System

Implement username-based session identity.

The application should:
- Allow users to enter usernames
- Associate usernames with socket IDs
- Display usernames in messages
- Maintain active user tracking

---

## 6. Real-Time Messaging Workflow

Develop real-time messaging.

The application should:
- Send messages instantly
- Broadcast messages to all users
- Display timestamps
- Maintain message ordering

---

## 7. Typing Indicator System

Implement typing indicators.

The application should:
- Detect typing activity
- Notify other connected users
- Hide indicators when typing stops
- Avoid showing self-typing status

---

## 8. Active User Management

Track active participants.

The backend should:
- Maintain connected user list
- Update user count dynamically
- Notify clients of user changes
- Remove disconnected users

---

## 9. Join and Leave Notifications

Implement system notifications.

The application should:
- Notify when users join
- Notify when users leave
- Display system messages separately
- Maintain chat activity visibility

---

## 10. Error Handling and Stability

Implement robust error handling.

The system should:
- Handle connection failures
- Handle unexpected disconnects
- Prevent invalid message submissions
- Maintain stable communication

---

## 11. Multi-Client Testing

Verify functionality.

Testing should validate:
- Multiple browser sessions
- Concurrent messaging
- Typing events
- User tracking
- Join/leave events

---

## 12. Future Scalability Planning

Prepare the project for growth.

Future enhancements may include:
- Authentication
- Chat Rooms
- MongoDB Integration
- Private Messaging
- File Sharing
- Voice Chat
- Read Receipts

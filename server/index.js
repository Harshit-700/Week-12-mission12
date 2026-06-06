const express = require("express");
        const http = require("http");
     const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const httpServer = http.createServer(app);


const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", 
          methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Socket.io Chat Server is live ");
});

const activeUsers = new Map();

io.on("connection", (socket) => {
  console.log(` Client connected: ${socket.id}`);

  socket.on("join", (username) => {
    activeUsers.set(socket.id, username);
           console.log(` [${username}] joined — socket: ${socket.id}`);
 

    socket.broadcast.emit("user_joined", {
      username,
      message: `${username} joined the room`,
      timestamp: Date.now(),
    });

    
    io.emit("user_list", Array.from(activeUsers.values()));
  });


  socket.on("send_message", (payload) => {
             const username = activeUsers.get(socket.id) || "Anonymous";
    console.log(`💬 [${username}]: ${payload.text}`);

  
    io.emit("receive_message", {
      id: `${socket.id}-${Date.now()}`,
          username,
      text: payload.text,
          timestamp: Date.now(),
    });
  });

 
  socket.on("typing_start", () => {
    const username = activeUsers.get(socket.id);
            if (username) {
      
      socket.broadcast.emit("user_typing", { username, isTyping: true });
    }
  });

                    socket.on("typing_stop", () => {
            const username = activeUsers.get(socket.id);
    if (username) {
      socket.broadcast.emit("user_typing", { username, isTyping: false });
    }
  });

  
  
  socket.on("disconnect", () => {
    const username = activeUsers.get(socket.id);
    if (username) {
      console.log(` [${username}] disconnected — socket: ${socket.id}`);
      activeUsers.delete(socket.id);

  
      
      io.emit("user_left", {
        username,
        message: `${username} left the room`,
        timestamp: Date.now(),


      });
      io.emit("user_list", Array.from(activeUsers.values()));
    }
  });
});


const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {   

           
       console.log(`\n Socket.io server running on http://localhost:${PORT}`);
  console.log(` WebSocket endpoint ready — awaiting client handshakes...\n`);
});

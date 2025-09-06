const Message = require('../models/MessageModel');
const {sendSMS}=require('../controllers/smsService');
const { disconnect } = require('mongoose');
let onlineUsers = [];

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("New socket connected:", socket.id);

    // User login
    socket.on("login", (user) => {
      const userId = user._id;
      const userEmail = user.email;
      socket.userId = userId;
      socket.userName = userEmail;
      sendSMS(`🔔Notification: ${userEmail} is now online!`);
      console.log("User logged in:", userId, userEmail);

      if (!onlineUsers.find(u => u._id === userId)) {
        onlineUsers.push({ _id: userId, email: userEmail, socketId: socket.id });
      }

      io.emit("onlineUsers", onlineUsers);
    });

    // Chat message
    socket.on("chatMessage", async ({ to, message }) => {
      try {
        const msg = new Message({
          message,
          sender: socket.userId,
          receiver: to
        });
        await msg.save();
        console.log("Message saved:", msg);

        // Send to receiver if online
        const target = onlineUsers.find(u => u._id === to);
        if (target) {
          io.to(target.socketId).emit("chatMessage", {
            from: socket.userId,
            message,
            timestamp: msg.timestamp,
            name: socket.userName || "Friend"
          });
        }

        // Optionally, you can send to sender for acknowledgment
        socket.emit("chatMessage", {
          from: socket.userId,
          message,
          timestamp: msg.timestamp,
          name: "You"
        });
      } catch (err) {
        console.error("Error saving message:", err);
      }
    });

    // Disconnect
    socket.on("disconnect", () => {
      const disconnctedUser=onlineUsers.find(u=>u.socketId === socket.id)
      onlineUsers = onlineUsers.filter(u => u.socketId !== socket.id);
      io.emit("onlineUsers", onlineUsers);
     sendSMS(`🔔Notification: ${disconnctedUser.email} is logged out!`);
      console.log("Socket disconnected:", socket.id);
    });
  });
};

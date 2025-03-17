const express = require("express");
const { Server } = require("ws");

const app = express();
const port = process.env.PORT || 443; // Render yêu cầu PORT từ biến môi trường

// Tạo server HTTP
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Tạo server WebSocket
const wss = new Server({ server, path: "/anhtu" });

// Xử lý kết nối WebSocket
wss.on("connection", (ws) => {
  console.log("Client connected to /anhtu");

  // Gửi tin nhắn chào khi kết nối
  ws.send("Welcome to WebSocket server at /anhtu");

  // Nhận tin nhắn từ client
  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
    ws.send(`Echo: ${message}`); // Gửi lại tin nhắn
  });

  // Xử lý khi client ngắt kết nối
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

// Phản hồi HTTP cho các yêu cầu ngoài WebSocket
app.get("*", (req, res) => {
  res.send(
    "vmess://eyJ2IjoiMiIsInBzIjoiTXlWTWVzcyIsImFkZCI6IndzLWVjdzAub25yZW5kZXIuY29tIiwicG9ydCI6IjQ0MyIsImlkIjoiMzZjZmMzZGUtZWNmZC00NzUyLWFlNmYtOGYwZjkyMDM1MTQzIiwiYWlkIjoiMCIsInNjeSI6ImF1dG8iLCJuZXQiOiJ3cyIsInR5cGUiOiJub25lIiwiaG9zdCI6Im0ueW91dHViZS5jb20iLCJwYXRoIjoiL2FuaHR1IiwidGxzIjoidGxzIn0="
  );
});

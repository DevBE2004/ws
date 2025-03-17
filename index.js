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
    "vmess://eyJ2IjoiMiIsInBzIjoiTXlWTWVzcyIsImFkZCI6InYycmF5LXZtZXNzLm9ucmVuZGVyLmNvbSIsInBvcnQiOiI0NDMiLCJpZCI6IjM2Y2ZjM2RlLWVjZmQtNDc1Mi1hZTZmLThmMGY5MjAzNTE0MyIsImFpZCI6IjAiLCJzY3kiOiJhdXRvIiwibmV0Ijoid3MiLCJ0eXBlIjoibm9uZSIsImhvc3QiOiJtLnlvdXR1YmUuY29tIiwicGF0aCI6Ii9hbmh0dSIsInRscyI6InRscyJ9"
  );
});

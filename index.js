const express = require("express");
const { Server } = require("ws");

const app = express();
const port = process.env.PORT || 443;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const wss = new Server({ server, path: "/anhtu" });

wss.on("connection", (ws) => {
  console.log("Client connected to /anhtu");
  ws.send("Welcome to WebSocket server at /anhtu");
  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
    ws.send(`Echo: ${message}`);
  });
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

app.get("*", (req, res) => {
  res.send(
    "vmess://eyJ2IjoiMiIsInBzIjoiTXlWTWVzcyIsImFkZCI6IndzLWVjdzAub25yZW5kZXIuY29tIiwicG9ydCI6IjQ0MyIsImlkIjoiMzZjZmMzZGUtZWNmZC00NzUyLWFlNmYtOGYwZjkyMDM1MTQzIiwiYWlkIjoiMCIsInNjeSI6ImF1dG8iLCJuZXQiOiJ3cyIsInR5cGUiOiJub25lIiwiaG9zdCI6Im0ueW91dHViZS5jb20iLCJwYXRoIjoiL2FuaHR1IiwidGxzIjoidGxzIn0="
  );
});

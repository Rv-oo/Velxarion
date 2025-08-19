const express = require("express");
const fetch = require("node-fetch");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const BOT_API_URL = process.env.BOT_API_URL;

app.use(express.static(path.join(__dirname, "public"))); // serve frontend files

// Proxy bot status
app.get("/api/bot-stats", async (req, res) => {
  try {
    const response = await fetch(`${BOT_API_URL}/api/bot`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("❌ Gagal fetch bot-stats:", err);
    res.status(500).json({ error: "Gagal ambil data bot" });
  }
});

// Proxy server stats
app.get("/api/server-stats", async (req, res) => {
  try {
    const response = await fetch(`${BOT_API_URL}/api/server-stats`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("❌ Gagal fetch server-stats:", err);
    res.status(500).json({ error: "Gagal ambil data server" });
  }
});

app.listen(PORT, () => {
  console.log(`🌐 Web server berjalan di http://localhost:${PORT}`);
});


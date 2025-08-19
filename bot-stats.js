export default async function handler(req, res) {
  try {
    const response = await fetch(`${process.env.BOT_API_URL}/api/bot`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Gagal fetch bot-stats:", err);
    res.status(500).json({ error: "Gagal ambil data bot" });
  }
}

export default async function handler(req, res) {
  try {
    if (!process.env.BOT_API_URL) {
      throw new Error("❌ BOT_API_URL tidak terdefinisi di Vercel");
    }

    const response = await fetch(`${process.env.BOT_API_URL}/api/bot`);
    
    if (!response.ok) {
      throw new Error(`❌ API target error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json(data);

  } catch (err) {
    console.error("API Error:", err.message);
    res.status(500).json({ error: err.message });
  }
}

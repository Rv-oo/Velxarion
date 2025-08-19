export default async function handler(req, res) {
  try {
    const response = await fetch(`http://uk-01.rrhosting.eu:1299/api/server-stats`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Gagal fetch server-stats:", err);
    res.status(500).json({ error: "Gagal ambil data server" });
  }
}



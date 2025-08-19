export default async function handler(req, res) {
  try {
    // Ambil dari API asli (HTTP)
    const response = await fetch("http://uk-01.rrhosting.eu:1299/api/server-stats");
    const data = await response.json();

    // Kirim balik ke browser lewat HTTPS
    res.status(200).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Failed to fetch server stats" });
  }
}

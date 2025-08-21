async function fetchServerStats() {
  try {
    const res = await fetch("/api/server-stats"); // API route vercel
    if (!res.ok) throw new Error("API error");

    const data = await res.json();

    document.getElementById("server-total").textContent =
      typeof data.totalMembers === "number" ? data.totalMembers.toLocaleString() : "-";

    document.getElementById("server-online").textContent =
      typeof data.onlineMembers === "number" ? data.onlineMembers.toLocaleString() : "-";

    document.getElementById("server-channels").textContent =
      typeof data.totalChannels === "number" ? data.totalChannels.toLocaleString() : "-";

  } catch (err) {
    console.error("❌ Gagal ambil data server:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchServerStats();           // langsung load pertama kali
  setInterval(fetchServerStats, 10000); // refresh tiap 10 detik
});

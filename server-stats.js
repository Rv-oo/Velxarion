async function fetchServerStats() {
  try {
    const res = await fetch("/api/server-stats"); // API route vercel
    if (!res.ok) throw new Error("API error");

    const data = await res.json();

    // langsung isi dari API, tidak parse isi lama
    document.getElementById("server-total").textContent =
      typeof data.totalMembers === "number" ? data.totalMembers.toLocaleString() : "N/A";

    document.getElementById("server-online").textContent =
      typeof data.onlineMembers === "number" ? data.onlineMembers.toLocaleString() : "N/A";

    document.getElementById("server-channels").textContent =
      typeof data.totalChannels === "number" ? data.totalChannels.toLocaleString() : "N/A";

  } catch (err) {
    console.error("❌ Gagal ambil data server:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchServerStats();                // load pertama kali
  setInterval(fetchServerStats, 1000); // refresh tiap 10 detik
});


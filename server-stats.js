async function fetchServerStats() {
  try {
    const res = await fetch("/api/server-stats");
    if (!res.ok) throw new Error("API error");

    const data = await res.json();

    if (typeof data.totalMembers === "number") {
      document.getElementById("server-total").textContent = data.totalMembers.toLocaleString();
    }
    if (typeof data.onlineMembers === "number") {
      document.getElementById("server-online").textContent = data.onlineMembers.toLocaleString();
    }
    if (typeof data.totalChannels === "number") {
      document.getElementById("server-channels").textContent = data.totalChannels.toLocaleString();
    }

  } catch (err) {
    console.error("❌ Gagal ambil data server:", err);
    // biarin tetap "Loading..."
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchServerStats();                 // load pertama kali
  setInterval(fetchServerStats, 1000); // refresh tiap 10 detik
});

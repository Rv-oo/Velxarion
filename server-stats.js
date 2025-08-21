async function fetchServerStats() {
  try {
    const res = await fetch("/api/server-stats"); // ke API route vercel
    const data = await res.json();

    const totalEl = document.getElementById("server-total");
    const onlineEl = document.getElementById("server-online");
    const channelsEl = document.getElementById("server-channels");

    if (typeof data.totalMembers === "number") {
      totalEl.textContent = data.totalMembers.toLocaleString();
    }
    if (typeof data.onlineMembers === "number") {
      onlineEl.textContent = data.onlineMembers.toLocaleString();
    }
    if (typeof data.totalChannels === "number") {
      channelsEl.textContent = data.totalChannels.toLocaleString();
    }
  } catch (err) {
    console.error("❌ Gagal ambil data server:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchServerStats(); // langsung muncul saat page siap
  setInterval(fetchServerStats, 10000); // update tiap 10 detik
});

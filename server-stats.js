let firstLoad = true;

async function fetchServerStats() {
  try {
    const res = await fetch("/api/server-stats");
    const data = await res.json();

    const totalEl = document.getElementById("server-total");
    const onlineEl = document.getElementById("server-online");
    const channelsEl = document.getElementById("server-channels");

    if (firstLoad) {
      // isi langsung tanpa animasi
      if (typeof data.totalMembers === "number") {
        totalEl.textContent = data.totalMembers.toLocaleString();
      }
      if (typeof data.onlineMembers === "number") {
        onlineEl.textContent = data.onlineMembers.toLocaleString();
      }
      if (typeof data.totalChannels === "number") {
        channelsEl.textContent = data.totalChannels.toLocaleString();
      }
      firstLoad = false;
    } else {
      // baru pakai animasi untuk update berikutnya
      const getNumber = (el) => {
        const num = parseInt((el?.textContent || "0").replace(/[^\d]/g, ""));
        return isNaN(num) ? 0 : num;
      };

      animateCounter("server-total", getNumber(totalEl), data.totalMembers);
      animateCounter("server-online", getNumber(onlineEl), data.onlineMembers);
      animateCounter("server-channels", getNumber(channelsEl), data.totalChannels);
    }
  } catch (err) {
    console.error("❌ Gagal ambil data server:", err);
  }
}

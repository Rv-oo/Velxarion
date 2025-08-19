function animateCounter(id, start, end, duration = 1000) {
  const el = document.getElementById(id);
  if (!el) return;

  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(start + (end - start) * eased);

    el.textContent = value.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

async function fetchServerStats() {
  try {
    const res = await fetch("/api/server-stats"); // ke API route vercel
    const data = await res.json();

    const totalEl = document.getElementById("server-total");
    const onlineEl = document.getElementById("server-online");
    const channelsEl = document.getElementById("server-channels");

    const getNumber = (el) => {
      const num = parseInt((el?.textContent || "0").replace(/[^\d]/g, ""));
      return isNaN(num) ? 0 : num;
    };

    const currentTotal = getNumber(totalEl);
    const currentOnline = getNumber(onlineEl);
    const currentChannels = getNumber(channelsEl);

    if (typeof data.totalMembers === "number") {
      animateCounter("server-total", currentTotal, data.totalMembers);
    }
    if (typeof data.onlineMembers === "number") {
      animateCounter("server-online", currentOnline, data.onlineMembers);
    }
    if (typeof data.totalChannels === "number") {
      animateCounter("server-channels", currentChannels, data.totalChannels);
    }
  } catch (err) {
    console.error("❌ Gagal ambil data server:", err);
  }
}

fetchServerStats();
setInterval(fetchServerStats, 30000);




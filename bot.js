async function fetchBotStats() {
  try {
    const res = await fetch("/bot-stats"); // ini ke API route vercel
    const data = await res.json();

    const statusEl = document.getElementById("status");
    const serverEl = document.getElementById("servers");
    const userEl = document.getElementById("users");
    const uptimeEl = document.getElementById("uptime");

    if (statusEl) statusEl.textContent = data.status || "offline";
    if (uptimeEl) uptimeEl.textContent = data.uptime ?? "0";

    function animateCounter(el, newValue) {
      const current = parseInt(el.textContent.replace(/\D/g, "")) || 0;
      const target = parseInt(newValue) || 0;
      const duration = 800;
      const stepTime = Math.max(20, Math.floor(duration / Math.abs(target - current)));
      let currentVal = current;

      if (current === target) return;

      const interval = setInterval(() => {
        currentVal += current < target ? 1 : -1;
        el.textContent = currentVal.toLocaleString();
        if (currentVal === target) clearInterval(interval);
      }, stepTime);
    }

    if (serverEl) animateCounter(serverEl, data.servers ?? 0);
    if (userEl) animateCounter(userEl, data.users ?? 0);

    const boxes = document.querySelectorAll("#statistik .stat-box");
    boxes.forEach(
      (box) => (box.style.opacity = data.status === "online" ? "1" : "0.5")
    );
  } catch (err) {
    console.error("❌ Gagal fetch stats:", err);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  fetchBotStats();
  setInterval(fetchBotStats, 10000);
});

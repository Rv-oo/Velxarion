
  document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");

    // jalanin preloader kalau reload / pertama kali buka
    if (performance.getEntriesByType("navigation")[0]?.type === "reload" 
        || !window.location.hash) {
      runPreloader(preloader);
    } else {
      preloader.style.display = "none";
    }

    // FIX untuk link Home → biar nggak reload
    document.querySelectorAll('a[href="#home"]').forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault(); // cegah reload
        document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
      });
    });
  });

  function runPreloader(preloader) {
    if (!preloader) return;
    setTimeout(() => {
      preloader.classList.add("fade-out");
      setTimeout(() => preloader.remove(), 800);
    }, 1200);
  }

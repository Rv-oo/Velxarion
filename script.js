


// ==== Mobile Navbar Toggle ====
const hamburger = document.getElementById('hamburger-btn');
const navLinks = document.getElementById('nav-links');

hamburger?.addEventListener('click', () => {
  navLinks?.classList.toggle('show');
});

// Auto-close nav when link clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('show');
  });
});

// ==== Sidebar Toggle (if exists) ====
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('closeSidebar');

if (hamburger && sidebar && closeBtn) {
  hamburger.addEventListener('click', () => {
    sidebar.classList.add('active');
  });

  closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
  });
}

// ==== Section Switch for Servers ====
function openSection(sectionId) {
  document.querySelectorAll('.section').forEach(section => {
    section.classList.add('hidden');
  });

  const detailSection = document.getElementById(sectionId);
  if (detailSection) {
    detailSection.classList.remove('hidden');
    detailSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function backToHome() {
  document.querySelectorAll('.section').forEach(section => {
    section.classList.add('hidden');
  });

  const homeSection = document.getElementById('home');
  if (homeSection) {
    homeSection.classList.remove('hidden');
    homeSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function goToIndex() {
  window.location.href = 'index.html';
}



// ==== Modal Developer ====
function openModal() {
  document.getElementById("devModal").style.display = "block";
}

function closeModal() {
  document.getElementById("devModal").style.display = "none";
}

window.onclick = function (event) {
  const modal = document.getElementById("devModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// ==== Fade-up Animation for .stat-box ====
const statBoxes = document.querySelectorAll('.stat-box');
const statBoxObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Jalankan animasi counter jika ada di dalam stat-box
      const counter = entry.target.querySelector('.counter');
      if (counter && !counter.classList.contains('counted')) {
        const target = +counter.getAttribute('data-target');
        const suffix = counter.getAttribute('data-suffix') || '';
        let count = 0;
        const increment = target / 150;

        const updateCount = () => {
          count += increment;
          if (count < target) {
            counter.textContent = Math.ceil(count).toLocaleString() + suffix;
            requestAnimationFrame(updateCount);
          } else {
            counter.textContent = target.toLocaleString() + suffix;
          }
        };

        updateCount();
        counter.classList.add('counted');
      }

      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

statBoxes.forEach(box => {
  box.classList.add('fade-up'); // initial state
  statBoxObserver.observe(box);
});


// ==== Animated Counters for Server Stats ====
const serverCounters = document.querySelectorAll('.server-counter');
let serverAnimated = false;

function animateServerCounters() {
  if (serverAnimated) return;

  serverCounters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const suffix = counter.getAttribute('data-suffix') || '';
    let count = 0;
    const increment = target / 150;

    const updateCount = () => {
      count += increment;
      if (count < target) {
        counter.textContent = Math.ceil(count).toLocaleString() + suffix;
        requestAnimationFrame(updateCount);
      } else {
        counter.textContent = target.toLocaleString() + suffix;
      }
    };

    updateCount();
  });

  serverAnimated = true;
}

const serverSection = document.getElementById('servers');
if (serverSection) {
  const serverObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateServerCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  serverObserver.observe(serverSection);
}

// ==== Fade-up Animation for Stats Grid ====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-up');
      }
    });
  });

  document.querySelectorAll('.stats-grid').forEach(el => {
    observer.observe(el);
  });

const joinMemberModal = document.querySelector('.joinMemberModal');
const joinNowBtn = document.querySelector('.membership-btn');
const cancelBtn = joinMemberModal?.querySelector('.cancel-btn');

// Buka modal
joinNowBtn?.addEventListener('click', (e) => {
  e.preventDefault();
  joinMemberModal.style.display = 'flex';
});

// Tutup modal via cancel
cancelBtn?.addEventListener('click', () => {
  joinMemberModal.style.display = 'none';
});

// Tutup modal saat klik area luar
window.addEventListener('click', (e) => {
  if (e.target === joinMemberModal) {
    joinMemberModal.style.display = 'none';
  }
});


// ==== Mobile Topbar Toggle ====
const topbar = document.getElementById('topbar');

if (hamburger && topbar) {
  hamburger.addEventListener('click', () => {
    topbar.classList.toggle('active');

    if (topbar.classList.contains('active')) {
      hamburger.textContent = "✕"; // X
    } else {
      hamburger.textContent = "☰"; // hamburger
    }
  });
}

// Auto close menu saat klik link
document.querySelectorAll('.topbar-menu a').forEach(link => {
  link.addEventListener('click', () => {
    topbar.classList.remove('active');
    hamburger.textContent = "☰";
  });
});

// ==== Smooth Scroll for Anchor Links ====


const form = document.getElementById("contactForm");
const statusText = document.getElementById("formStatus");
const sendBtn = document.getElementById("sendBtn");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  // reset status
  statusText.textContent = "";
  statusText.style.color = "#fff";

  // disable button + show loading
  sendBtn.disabled = true;
  sendBtn.textContent = "Sending...";

  const formData = new FormData(this);

  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { "Accept": "application/json" },
    });

    if (res.ok) {
      statusText.textContent = "Pesan berhasil dikirim!";
      statusText.style.color = "lightgreen";
      form.reset();
    } else {
      statusText.textContent = "Gagal mengirim pesan.";
      statusText.style.color = "red";
    }
  } catch (err) {
    statusText.textContent = "Error koneksi.";
    statusText.style.color = "orange";
  }

  // re-enable button
  sendBtn.disabled = false;
  sendBtn.textContent = "Send Now →";
});




/* ============================================================
   MOBILE NAV
   ============================================================ */
const navToggle = document.getElementById("navToggle");
const primaryNav = document.getElementById("primaryNav");

if (navToggle && primaryNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

/* ============================================================
   EVENT FILTERS (events.html)
   ============================================================ */
const filterButtons = document.querySelectorAll(".chip");
const eventCards = document.querySelectorAll(".event-card");

if (filterButtons.length && eventCards.length) {
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const type = btn.getAttribute("data-filter");

      eventCards.forEach((card) => {
        const match = type === "all" || card.getAttribute("data-type") === type;
        card.style.display = match ? "" : "none";
      });
    });
  });
}

/* ============================================================
   SIMPLE LIGHTBOX
   ============================================================ */
document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();

    const url = item.getAttribute("href");

    const overlay = document.createElement("div");
    overlay.style.cssText =
      "position:fixed;inset:0;background:rgba(0,0,0,.85);display:flex;align-items:center;justify-content:center;z-index:1000;padding:20px;cursor:zoom-out;";

    const img = document.createElement("img");
    img.src = url;
    img.style.maxWidth = "95%";
    img.style.maxHeight = "90%";

    overlay.appendChild(img);
    overlay.addEventListener("click", () => overlay.remove());
    document.body.appendChild(overlay);
  });
});

/* ============================================================
   FOOTER CONTACT FORM
   ============================================================ */
const footerForm = document.getElementById("footerContact");
const footerStatus = document.getElementById("footerStatus");

if (footerForm) {
  footerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    footerStatus.textContent = "Sending...";
    await new Promise((r) => setTimeout(r, 900));

    footerStatus.textContent = "Thanks! We will reach out soon.";
    footerForm.reset();

    setTimeout(() => (footerStatus.textContent = ""), 3000);
  });
}

/* ============================================================
   FOOTER YEAR
   ============================================================ */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ============================================================
   ANIMATION HELPER — STAGGER
   ============================================================ */
function staggerAdd(elements, delay = 120) {
  elements.forEach((el, i) => {
    setTimeout(() => el.classList.add("in"), i * delay);
  });
}

/* ============================================================
   INTERSECTION OBSERVER (All Scroll Animations)
   ============================================================ */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const section = entry.target;

      /* =============================
         HERO ANIMATION
         ============================= */
      if (section.classList.contains("hero-section")) {
        document.querySelectorAll(".hero-line").forEach((el, i) => {
          setTimeout(() => el.classList.add("in"), i * 160);
        });
        setTimeout(() => {
          document.querySelector(".hero-sub")?.classList.add("in");
        }, 500);
        setTimeout(() => {
          document.querySelector(".hero-buttons")?.classList.add("in");
        }, 720);
      }

      /* =============================
         NUMBERS
         ============================= */
      if (section.classList.contains("numbers")) {
        staggerAdd([...document.querySelectorAll(".num-card")], 180);
      }

      /* =============================
         TESTIMONIALS
         ============================= */
      if (section.classList.contains("testimonials")) {
        staggerAdd([...document.querySelectorAll(".testimonial")], 180);
      }

      /* =====================================================
         ABOUT + FLAGSHIP — WIX STYLE
         LEFT → RIGHT (text)
         RIGHT STACK → vertical card rise
         ===================================================== */
      if (section.classList.contains("about-flagship")) {
        // ABOUT TEXT — each line stagger like Ignite
        const aboutLines = document.querySelectorAll(".about-line");
        aboutLines.forEach((el, i) => {
          setTimeout(() => el.classList.add("in"), i * 180);
        });

        // FLAGSHIP CARDS — bottom-up stagger
        const flagCards = document.querySelectorAll(".flag-card");
        flagCards.forEach((el, i) => {
          setTimeout(() => el.classList.add("in"), i * 160);
        });
      }

      observer.unobserve(section);
    });
  },
  { threshold: 0.12 }
);

/* Observe all animated sections */
[
  "hero-section",
  "numbers",
  "testimonials",
  "about-flagship"
].forEach((cls) => {
  const el = document.querySelector("." + cls);
  if (el) observer.observe(el);
});

/* ============================================================
   GENTLE PARALLAX (Hero Panel)
   ============================================================ */
const heroPanel = document.querySelector(".hero-panel");

if (heroPanel) {
  window.addEventListener(
    "scroll",
    () => {
      const rect = heroPanel.getBoundingClientRect();
      const winH = window.innerHeight;

      if (rect.top < winH && rect.bottom > 0) {
        const pct = (winH - rect.top) / (winH + rect.height);
        heroPanel.style.transform = `translateY(${Math.min(
          18,
          (1 - pct) * 24
        )}px)`;
      }
    },
    { passive: true }
  );
}


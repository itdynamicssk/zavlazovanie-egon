/* ============================================================
   EGON — interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Generate water droplets for every sprinkler ---------- */
  function buildSprinkler(el) {
    if (el.dataset.built) return;
    el.dataset.built = "1";
    const riser = document.createElement("div");
    riser.className = "sprinkler__riser";
    riser.innerHTML = '<span class="sprinkler__cap"></span>';
    const spray = document.createElement("div");
    spray.className = "spray";
    spray.innerHTML = '<span class="spray__arc"></span>';

    const n = 16;
    for (let i = 0; i < n; i++) {
      const d = document.createElement("span");
      d.className = "drop";
      // fan spread from -55deg to +55deg
      const t = i / (n - 1);
      const ang = (-55 + t * 110) * Math.PI / 180;
      const reach = 70 + Math.random() * 40;
      d.style.setProperty("--dx", Math.sin(ang) * reach + "px");
      d.style.setProperty("--dy", (-Math.cos(ang) * reach * 1.1 - 30) + "px");
      d.style.setProperty("--fall", (90 + Math.random() * 60) + "px");
      d.style.setProperty("--dur", (1.3 + Math.random() * 0.9).toFixed(2) + "s");
      d.style.setProperty("--delay", (Math.random() * 1.6).toFixed(2) + "s");
      spray.appendChild(d);
    }
    el.appendChild(spray);
    el.appendChild(riser);
  }

  document.querySelectorAll(".sprinkler").forEach(buildSprinkler);

  /* ---------- Hero video: normal speed, desktop only ---------- */
  (function heroVideo() {
    const v = document.getElementById("heroVideo");
    if (!v) return;
    const isMobile = window.matchMedia("(max-width: 760px)").matches;
    if (isMobile) {
      // don't load or play the video on mobile — the static image is shown instead
      v.removeAttribute("autoplay");
      try { v.pause(); } catch (e) {}
      return;
    }
    // šetrenie dát: na pomalom/úspornom pripojení video vôbec nesťahujeme
    const conn = navigator.connection;
    if (conn && (conn.saveData || /^([23]g|slow-2g)$/.test(conn.effectiveType || ""))) return;

    const tryPlay = () => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
    // video sa načíta až po dokončení načítania stránky — nesúťaží s LCP obrázkom
    let started = false;
    const startVideo = () => {
      if (started) return;
      started = true;
      v.setAttribute("preload", "auto");
      v.addEventListener("canplay", tryPlay);
      try { v.load(); } catch (e) {}
      tryPlay();
      document.addEventListener("visibilitychange", () => { if (!document.hidden) tryPlay(); });
    };
    // malé oneskorenie po `load` – prehliadač najprv dokončí obrázky a vykreslenie
    const schedule = () => window.setTimeout(startVideo, 400);
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
  })();

  /* ---------- IntersectionObserver: reveals ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".reveal, .step").forEach((el) => io.observe(el));

  /* ---------- Showcase sprinklers pop when in view ---------- */
  const showcaseIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const sps = e.target.querySelectorAll(".sprinkler");
      if (e.isIntersecting) {
        sps.forEach((s, i) => setTimeout(() => s.classList.add("up"), i * 320));
      } else {
        sps.forEach((s) => s.classList.remove("up"));
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll(".showcase__stage").forEach((el) => showcaseIO.observe(el));

  /* ---------- Statement: light up words on scroll ---------- */
  const statements = document.querySelectorAll(".statement .big");
  statements.forEach((stmt) => {
    const txt = stmt.dataset.split;
    if (!txt) return;
  });
  function lightWords() {
    document.querySelectorAll(".statement").forEach((stmt) => {
      const rect = stmt.getBoundingClientRect();
      const vh = window.innerHeight;
      const words = stmt.querySelectorAll(".word");
      // progress: 0 when top hits middle, 1 when bottom passes middle
      const start = vh * 0.85, end = vh * 0.2;
      const p = Math.min(1, Math.max(0, (start - rect.top) / (start - end + rect.height * 0.4)));
      const lit = Math.floor(p * words.length);
      words.forEach((w, i) => w.classList.toggle("lit", i < lit));
    });
  }

  /* ---------- Counters ---------- */
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const dec = (el.dataset.dec | 0);
    const dur = 1600;
    const t0 = performance.now();
    function tick(now) {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = target * eased;
      el.textContent = dec ? v.toFixed(dec) : Math.round(v).toString();
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = dec ? target.toFixed(dec) : target;
    }
    requestAnimationFrame(tick);
  }
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { animateCount(e.target); countIO.unobserve(e.target); }
    });
  }, { threshold: 0.6 });
  document.querySelectorAll("[data-count]").forEach((el) => countIO.observe(el));

  /* ---------- Parallax on scroll ---------- */
  const parallaxEls = document.querySelectorAll("[data-parallax]");
  const heroInner = document.querySelector(".hero__inner");
  const heroEl = document.querySelector(".hero");
  const progressFill = document.querySelector(".scrollbar__fill");
  let ticking = false;
  function onScroll() {
    const nav = document.querySelector(".nav");
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 40);
    if (!ticking) {
      requestAnimationFrame(() => {
        const vh = window.innerHeight;
        const sy = window.scrollY;

        // scroll progress bar
        if (progressFill) {
          const max = document.documentElement.scrollHeight - vh;
          progressFill.style.transform = "scaleX(" + (max > 0 ? Math.min(1, sy / max) : 0).toFixed(4) + ")";
        }

        // hero text drift + fade
        if (heroEl && heroInner) {
          const hh = heroEl.offsetHeight;
          if (sy < hh) {
            const p = sy / hh;
            heroInner.style.transform = "translate3d(0," + (sy * 0.28).toFixed(1) + "px,0)";
            heroInner.style.opacity = Math.max(0, 1 - p * 1.35).toFixed(3);
          }
        }

        parallaxEls.forEach((el) => {
          const speed = parseFloat(el.dataset.parallax) || 0.15;
          const rect = el.getBoundingClientRect();
          const center = rect.top + rect.height / 2 - vh / 2;
          el.style.transform = `translate3d(0, ${(-center * speed).toFixed(1)}px, 0)`;
        });
        // gallery zoom
        document.querySelectorAll(".shot__zoom").forEach((el) => {
          const r = el.parentElement.getBoundingClientRect();
          const p = (r.top + r.height / 2 - vh / 2) / vh; // -..+
          el.style.transform = `scale(${(1.12 - Math.abs(p) * 0.06).toFixed(3)})`;
        });
        lightWords();
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
  lightWords();

  /* ---------- Mobile nav ---------- */
  const burger = document.querySelector(".nav__burger");
  const mobile = document.querySelector(".nav__mobile");
  if (burger && mobile) {
    burger.addEventListener("click", () => {
      const open = mobile.classList.toggle("open");
      burger.classList.toggle("is-open", open);
    });
    mobile.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
      mobile.classList.remove("open");
      burger.classList.remove("is-open");
    }));
  }

  /* ---------- Cookie consent (Google Consent Mode v2) ---------- */
  (function cookies() {
    const KEY = "cookie_consent"; // hodnoty: "all" | "essential"
    const banner = document.getElementById("cookie");

    function gtagFn() { window.dataLayer = window.dataLayer || []; window.dataLayer.push(arguments); }

    function updateGCM(type, isInitialLoad) {
      const granted = type === "all";
      gtagFn("consent", "update", {
        "ad_storage": granted ? "granted" : "denied",
        "ad_user_data": granted ? "granted" : "denied",
        "ad_personalization": granted ? "granted" : "denied",
        "analytics_storage": granted ? "granted" : "denied"
      });
      // vlastný event len pri manuálnom súhlase (nie pri načítaní) — aby sa v GTM nezdvojil
      if (granted && !isInitialLoad) {
        window.dataLayer.push({ event: "consent_updated", timestamp: Date.now() });
      }
    }

    // pri opätovnej návšteve aplikuj uložený súhlas hneď
    const stored = localStorage.getItem(KEY);
    if (stored === "all" || stored === "essential") updateGCM(stored, true);

    if (!banner) return;
    function show() { banner.classList.add("show"); }
    function hide() { banner.classList.remove("show"); }

    function accept(type) {
      localStorage.setItem(KEY, type);
      updateGCM(type, false);
      hide();
    }

    const params = new URLSearchParams(location.search);
    if (!stored) setTimeout(show, 900);
    if (params.get("cookies") === "open") setTimeout(show, 350);

    document.addEventListener("click", (e) => {
      const t = e.target.closest("[data-cookie]");
      if (!t) return;
      const act = t.getAttribute("data-cookie");
      if (act === "accept") accept("all");
      else if (act === "reject") accept("essential");
      else if (act === "open") { e.preventDefault(); show(); }
    });
  })();
})();

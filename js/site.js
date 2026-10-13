const tickerItems = [
  "Research",
  "Positioning",
  "Proposition",
  "Brand narrative",
  "Clinic identity",
  "Patient journey",
  "Service principles",
  "Touchpoints",
  "Specialist team leadership",
  "Quality review",
];

const faqs = [
  [
    "What happens on the 30-minute call?",
    "We talk through what you are trying to build and where you are today, and whether Zerone is the right fit. If it is, we agree the next step together.",
  ],
  [
    "Who does Zerone work with?",
    "Doctors building a name, founders opening a new clinic, and business owners whose existing clinic needs a stronger brand and patient experience.",
  ],
  [
    "Why does brand matter for a clinic?",
    "Patients can choose from many qualified doctors and clinics. Clinical expertise earns trust in the doctor. A clear position, a recognisable brand and a consistent experience build trust beyond the individual.",
  ],
  [
    "How does an engagement work?",
    "Four steps: diagnose the business and the problem, define strategy and priorities, create the brand and experience system, then deliver with a specialist team under one accountable lead.",
  ],
  [
    "Do you offer training?",
    "Yes. Positioning, communication and reputation workshops for professionals, and patient experience and frontline training for clinic teams. Delivered within projects or standalone.",
  ],
  [
    "What does it cost?",
    "Scope is tailored to each engagement, so pricing is set after we understand your goals. Book a 30-minute call and we'll take it from there.",
  ],
  [
    "Where are you based?",
    "Ho Chi Minh City, Vietnam.",
  ],
];

function nav(active) {
  const links = [
    ["approach.html", "Approach"],
    ["about.html", "About"],
    ["faq.html", "FAQ"],
  ];
  return `
    <nav class="site-nav" aria-label="Main navigation">
      <a class="brand" href="index.html" aria-label="Zerone home">
        <img class="b-mark" src="assets/logo-rings.svg" alt="" /><img class="b-word" src="assets/wordmark-ink.svg" alt="Zerone" />
      </a>
      ${links
        .map(
          ([href, label]) =>
            `<a class="nav-link ${active === label ? "is-active" : ""}" href="${href}">${label}</a>`
        )
        .join("")}
      <a class="nav-cta" href="contact.html">Contact</a>
      <button class="nav-menu" type="button" aria-label="Menu" aria-expanded="false" aria-controls="nav-panel"><span class="bars" aria-hidden="true"><i></i><i></i><i></i></span></button>
      <div class="nav-panel" id="nav-panel" role="menu">
        <a href="approach.html">Approach</a>
        <a href="work.html">Case study</a>
        <a href="about.html">About</a>
        <a href="faq.html">FAQ</a>
        <a href="contact.html">Contact</a>
        <a class="btn" href="contact.html">Book a 30-minute call</a>
      </div>
    </nav>
  `;
}

function footer() {
  return `
    <footer class="footer3">
      <div class="f3-card">
        <div class="f3-top">
          <div class="f3-brand">
            <img class="f3-logo" src="assets/logo.svg" alt="Zerone" />
            <p>Healthcare brand and patient experience consultancy.</p>
            <a class="f3-mail" href="mailto:nguyentranlinhthao@zerone.vn">nguyentranlinhthao@zerone.vn</a>
          </div>
          <div class="f3-col">
            <b>Explore</b>
            <a href="approach.html">Approach</a>
            <a href="work.html">Case study</a>
            <a href="about.html">About</a>
            <a href="faq.html">FAQ</a>
          </div>
          <div class="f3-col">
            <b>Get in touch</b>
            <a href="contact.html">Book a 30-minute call</a>
            <a href="contact.html">Contact</a>
            <span>Ho Chi Minh City, Vietnam</span>
          </div>
        </div>
        <div class="f3-bottom">
          <span>&copy; ${new Date().getFullYear()} Zerone. All rights reserved.</span>
          <span class="f3-legal"><a href="privacy.html">Privacy</a><a href="terms.html">Terms</a></span>
        </div>
      </div>
      <div class="f3-ghost" aria-hidden="true"><img src="assets/wordmark-burgundy.svg" alt="" /></div>
    </footer>
  `;
}

function mountChrome(active) {
  const top = document.getElementById("chrome-top");
  const bottom = document.getElementById("chrome-bottom");
  if (top) top.innerHTML = nav(active);
  if (bottom) bottom.innerHTML = footer();
}

function bindForms() {
  document.querySelectorAll("form[data-signup]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = form.getAttribute("data-signup");
      const notice = document.querySelector(`[data-notice="${id}"]`);
      if (notice) notice.style.display = "block";
      form.reset();
    });
  });
}

function renderTicker() {
  const el = document.getElementById("ticker-track");
  if (!el) return;
  el.innerHTML = [...tickerItems, ...tickerItems]
    .map((t) => `<span>${t}</span>`)
    .join("");
}

function renderFaq() {
  const el = document.getElementById("faq-list");
  if (!el) return;
  el.innerHTML = faqs
    .map(
      ([q, a], i) => `
      <div class="faq-item" data-faq="${i}">
        <button type="button" aria-expanded="false">${q}<span>+</span></button>
        <p>${a}</p>
      </div>`
    )
    .join("");
  el.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const item = btn.parentElement;
    const open = item.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
    btn.querySelector("span").textContent = open ? "–" : "+";
  });
}

function quotes() {
  const slides = [...document.querySelectorAll(".quote-slide")];
  if (!slides.length) return;
  let i = 0;
  const show = (n) => {
    slides.forEach((s, idx) => s.classList.toggle("is-on", idx === n));
  };
  show(0);
  if (slides.length > 1) {
    setInterval(() => {
      i = (i + 1) % slides.length;
      show(i);
    }, 6000);
  }
}

function reveal() {
  const els = document.querySelectorAll(
    ".card, .work-card, .cap, .stat, .split, .display, .story-card, .ui-card, .faq-item, .cta-band h2"
  );
  els.forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  mountChrome(document.body.dataset.page || "");
  bindForms();
  renderTicker();
  renderFaq();
  quotes();
  reveal();
});

/* Nav: collapse the wordmark on scroll down, bring it back on scroll up */
(function () {
  var last = window.scrollY, ticking = false;
  function update() {
    var y = window.scrollY, n = document.querySelector(".site-nav");
    if (n) {
      if (y < 60 || y < last - 4) n.classList.remove("is-compact");
      else if (y > last + 4) n.classList.add("is-compact");
    }
    last = y; ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
})();

/* Mobile menu */
(function () {
  function close() {
    var n = document.querySelector(".site-nav");
    if (!n) return;
    n.classList.remove("menu-open");
    var b = n.querySelector(".nav-menu");
    if (b) b.setAttribute("aria-expanded", "false");
  }
  document.addEventListener("click", function (e) {
    var n = document.querySelector(".site-nav");
    if (!n) return;
    var btn = e.target.closest ? e.target.closest(".nav-menu") : null;
    if (btn) {
      var open = n.classList.toggle("menu-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) n.classList.remove("is-compact");
      return;
    }
    if (!n.contains(e.target)) close();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
})();

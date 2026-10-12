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
        <img src="assets/logo.svg" alt="" />
        Zerone
      </a>
      ${links
        .map(
          ([href, label]) =>
            `<a class="nav-link ${active === label ? "is-active" : ""}" href="${href}">${label}</a>`
        )
        .join("")}
      <a class="nav-cta" href="contact.html">Contact</a>
    </nav>
  `;
}

function footer() {
  return `
    <footer class="footer">
      <div>
        <h3>Healthcare brand and patient experience</h3>
        <a class="btn" href="contact.html">Book a 30-minute call</a>
      </div>
      <div class="footer-cols">
        <div>
          <b>Zerone</b>
          <a href="approach.html">Approach</a>
          <a href="work.html">Case study</a>
          <a href="about.html">About</a>
          <a href="faq.html">FAQ</a>
          <a href="contact.html">Contact</a>
        </div>
        <div>
          <b>More</b>
          <a href="join.html">Join us</a>
          <a href="refer.html">Refer</a>
          <a href="privacy.html">Privacy</a>
          <a href="terms.html">Terms</a>
        </div>
      </div>
      <div>
        <div class="footer-photo" role="img" aria-label="Zerone blue field"></div>
        <p style="margin: 12px 0 0; font-size: 14px">Ho Chi Minh City, Vietnam</p>
      </div>
      <p class="legal">© ${new Date().getFullYear()} Zerone. Healthcare Brand &amp; Patient Experience Consultancy.</p>
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

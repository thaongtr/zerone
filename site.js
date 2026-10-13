/* ---------- Language ---------- */
/* Set to false to hide the language switch until the Vietnamese pages are published */
const VI_READY = true;
const LANG = document.documentElement.lang === "vi" ? "vi" : "en";
const P = LANG === "vi" ? "../" : "";          /* prefix to reach shared assets from /vi/ */
const OTHER = LANG === "vi" ? "en" : "vi";

const T = {
  en: {
    ticker: ["Research", "Positioning", "Proposition", "Brand narrative", "Clinic identity", "Patient journey", "Service principles", "Touchpoints", "Specialist team leadership", "Quality review"],
    nav: { Approach: "Approach", About: "About", FAQ: "FAQ", Contact: "Contact" },
    panel: { approach: "Approach", work: "Case study", about: "About", faq: "FAQ", contact: "Contact" },
    book: "Book a 30-minute call",
    langBtn: "VI", langRow: "Tiếng Việt", langTitle: "Xem bằng tiếng Việt",
    home: "Zerone home", menu: "Menu",
    foot: {
      desc: "Healthcare brand and patient experience consultancy.",
      explore: "Explore", touch: "Get in touch", legal: "Privacy", terms: "Terms",
      city: "Ho Chi Minh City, Vietnam",
      rights: "All rights reserved.",
      approach: "Approach", work: "Case study", about: "About", faq: "FAQ", contact: "Contact",
    },
    faqs: [
      ["What happens on the 30-minute call?", "We talk through what you are trying to build and where you are today, and whether Zerone is the right fit. If it is, we agree the next step together."],
      ["Who does Zerone work with?", "Doctors building a name, founders opening a new clinic, and business owners whose existing clinic needs a stronger brand and patient experience."],
      ["Why does brand matter for a clinic?", "Patients can choose from many qualified doctors and clinics. Clinical expertise earns trust in the doctor. A clear position, a recognisable brand and a consistent experience build trust beyond the individual."],
      ["How does an engagement work?", "Four steps: diagnose the business and the problem, define strategy and priorities, create the brand and experience system, then deliver with a specialist team under one accountable lead."],
      ["Do you offer training?", "Yes. Positioning, communication and reputation workshops for professionals, and patient experience and frontline training for clinic teams. Delivered within projects or standalone."],
      ["What does it cost?", "Scope is tailored to each engagement, so pricing is set after we understand your goals. Book a 30-minute call and we'll take it from there."],
      ["Where are you based?", "Ho Chi Minh City, Vietnam."],
    ],
  },
  vi: {
    ticker: ["Nghiên cứu", "Định vị", "Đề xuất giá trị", "Câu chuyện thương hiệu", "Nhận diện phòng khám", "Hành trình người bệnh", "Nguyên tắc dịch vụ", "Điểm chạm", "Điều phối đội ngũ chuyên gia", "Kiểm soát chất lượng"],
    nav: { Approach: "Phương pháp", About: "Giới thiệu", FAQ: "Câu hỏi thường gặp", Contact: "Liên hệ" },
    panel: { approach: "Phương pháp", work: "Dự án điển hình", about: "Giới thiệu", faq: "Câu hỏi thường gặp", contact: "Liên hệ" },
    book: "Đặt lịch trao đổi 30 phút",
    langBtn: "EN", langRow: "English", langTitle: "View in English",
    home: "Trang chủ Zerone", menu: "Menu",
    foot: {
      desc: "Tư vấn thương hiệu y tế và trải nghiệm người bệnh.",
      explore: "Khám phá", touch: "Kết nối", legal: "Chính sách bảo mật", terms: "Điều khoản sử dụng",
      city: "Thành phố Hồ Chí Minh, Việt Nam",
      rights: "Bảo lưu mọi quyền.",
      approach: "Phương pháp", work: "Dự án điển hình", about: "Giới thiệu", faq: "Câu hỏi thường gặp", contact: "Liên hệ",
    },
    faqs: [
      ["Cuộc trao đổi 30 phút sẽ diễn ra như thế nào?", "Chúng ta sẽ trao đổi về điều bạn muốn xây dựng, tình hình hiện tại và xem Zerone có phù hợp hay không. Nếu phù hợp, hai bên sẽ cùng thống nhất bước tiếp theo."],
      ["Zerone làm việc với ai?", "Bác sĩ muốn xây dựng tên tuổi chuyên môn, nhà sáng lập chuẩn bị mở phòng khám và chủ phòng khám muốn củng cố thương hiệu cùng trải nghiệm người bệnh."],
      ["Vì sao thương hiệu quan trọng với phòng khám?", "Người bệnh có nhiều lựa chọn giữa các bác sĩ và phòng khám có chuyên môn. Năng lực chuyên môn tạo niềm tin vào bác sĩ; định vị rõ ràng, thương hiệu dễ nhận biết và trải nghiệm nhất quán giúp niềm tin vượt ra ngoài một cá nhân."],
      ["Một dự án được triển khai như thế nào?", "Dự án gồm bốn bước: thấu hiểu hoạt động và vấn đề, xác định chiến lược cùng ưu tiên, xây dựng hệ thống thương hiệu và trải nghiệm, sau đó triển khai với đội ngũ chuyên gia do một đầu mối chịu trách nhiệm."],
      ["Zerone có cung cấp chương trình đào tạo không?", "Có. Zerone tổ chức workshop về định vị, truyền thông và thương hiệu cá nhân cho bác sĩ; đồng thời đào tạo trải nghiệm người bệnh và giao tiếp dịch vụ cho đội ngũ phòng khám. Chương trình có thể nằm trong dự án hoặc được triển khai độc lập."],
      ["Chi phí được tính như thế nào?", "Phạm vi và chi phí được xác định sau khi Zerone hiểu rõ mục tiêu của bạn. Hãy đặt lịch trao đổi 30 phút để cùng bắt đầu."],
      ["Zerone hoạt động tại đâu?", "Thành phố Hồ Chí Minh, Việt Nam."],
    ],
  },
};
const L = T[LANG];
const tickerItems = L.ticker;
const faqs = L.faqs;

/* ---------- Language switch: map this page to its twin ---------- */
function twinHref() {
  var file = (location.pathname.split("/").pop() || "index.html");
  if (file.indexOf(".") === -1) file = "index.html";
  return LANG === "vi" ? "../" + file : "vi/" + file;
}

/* First visit only: Vietnamese browsers land on the Vietnamese pages */
(function () {
  try {
    if (LANG !== "en" || !VI_READY) return;
    if (localStorage.getItem("zlang")) return;
    var nl = (navigator.language || "").toLowerCase();
    if (nl.indexOf("vi") === 0) {
      localStorage.setItem("zlang", "vi");
      location.replace(twinHref() + location.hash);
    }
  } catch (e) {}
})();

function nav(active) {
  const links = [
    ["approach.html", "Approach"],
    ["about.html", "About"],
    ["faq.html", "FAQ"],
  ];
  const p = L.panel;
  return `
    <nav class="site-nav" aria-label="Main navigation">
      <a class="brand" href="index.html" aria-label="${L.home}">
        <img class="b-mark" src="${P}assets/logo-rings.svg" alt="" /><img class="b-word" src="${P}assets/wordmark-ink.svg" alt="Zerone" />
      </a>
      ${links
        .map(
          ([href, key]) =>
            `<a class="nav-link ${active === key ? "is-active" : ""}" href="${href}">${L.nav[key]}</a>`
        )
        .join("")}
      <a class="nav-cta" href="contact.html">${L.nav.Contact}</a>
      ${VI_READY ? `<a class="nav-lang" href="${twinHref()}" data-lang="${OTHER}" hreflang="${OTHER}" lang="${OTHER}" title="${L.langTitle}">${L.langBtn}</a>` : ""}
      <button class="nav-menu" type="button" aria-label="${L.menu}" aria-expanded="false" aria-controls="nav-panel"><span class="bars" aria-hidden="true"><i></i><i></i><i></i></span></button>
      <div class="nav-panel" id="nav-panel" role="menu">
        <a href="approach.html">${p.approach}</a>
        <a href="work.html">${p.work}</a>
        <a href="about.html">${p.about}</a>
        <a href="faq.html">${p.faq}</a>
        <a href="contact.html">${p.contact}</a>
        <a class="btn" href="contact.html">${L.book}</a>
        ${VI_READY ? `<a class="nav-lang-row" href="${twinHref()}" data-lang="${OTHER}" hreflang="${OTHER}" lang="${OTHER}">${L.langRow}</a>` : ""}
      </div>
    </nav>
  `;
}

function footer() {
  const f = L.foot;
  return `
    <footer class="footer3">
      <div class="f3-card">
        <div class="f3-top">
          <div class="f3-brand">
            <img class="f3-logo" src="${P}assets/logo.svg" alt="Zerone" />
            <p>${f.desc}</p>
            <a class="f3-mail" href="mailto:nguyentranlinhthao@zerone.vn">nguyentranlinhthao@zerone.vn</a>
          </div>
          <div class="f3-col">
            <b>${f.explore}</b>
            <a href="approach.html">${f.approach}</a>
            <a href="work.html">${f.work}</a>
            <a href="about.html">${f.about}</a>
            <a href="faq.html">${f.faq}</a>
          </div>
          <div class="f3-col">
            <b>${f.touch}</b>
            <a href="contact.html">${L.book}</a>
            <a href="contact.html">${f.contact}</a>
            <span>${f.city}</span>
          </div>
        </div>
        <div class="f3-bottom">
          <span>&copy; ${new Date().getFullYear()} Zerone. ${f.rights}</span>
          <span class="f3-legal"><a href="privacy.html">${f.legal}</a><a href="terms.html">${f.terms}</a></span>
        </div>
      </div>
      <div class="f3-ghost" aria-hidden="true"><img src="${P}assets/wordmark-burgundy.svg" alt="" /></div>
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

/* Remember the visitor's language choice */
document.addEventListener("click", function (e) {
  var a = e.target.closest ? e.target.closest("a[data-lang]") : null;
  if (!a) return;
  try { localStorage.setItem("zlang", a.getAttribute("data-lang")); } catch (err) {}
});

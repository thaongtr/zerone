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
      desc: "Healthcare Experience & Innovation.",
      explore: "Explore", touch: "Get in touch", legal: "Privacy", terms: "Terms",
      city: "Ho Chi Minh City, Vietnam",
      addr: "L18 Vincom Center Đồng Khởi, 72 Lê Thánh Tôn, Phường Bến Nghé, Quận 1, Ho Chi Minh City, Vietnam, 70000",
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
    nav: { Approach: "Approach", About: "About", FAQ: "FAQ", Contact: "Contact" },
    panel: { approach: "Approach", work: "Case study", about: "About", faq: "FAQ", contact: "Contact" },
    book: "Đặt lịch trao đổi 30 phút",
    langBtn: "EN", langRow: "English", langTitle: "View in English",
    home: "Trang chủ Zerone", menu: "Menu",
    foot: {
      desc: "Trải nghiệm & Đổi mới trong chăm sóc sức khỏe.",
      explore: "Khám phá", touch: "Kết nối", legal: "Chính sách bảo mật", terms: "Điều khoản sử dụng",
      city: "Thành phố Hồ Chí Minh, Việt Nam",
      addr: "L18 Vincom Center Đồng Khởi, 72 Lê Thánh Tôn, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh, Việt Nam, 70000",
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

/* Official social channels, in footer order.
   Add a channel by appending one object — this list is the only place
   that needs editing. Leave href as "" until the official URL exists:
   the icon still shows, as a non-link labelled "coming soon". Filling
   in href is the only change needed to make it a real link.
   icon: an SVG using fill="currentColor" for the glyph, with no <title>
   (the item's aria-label is the accessible name). */
const SOCIAL_CHANNELS = [
  {
    id: "linkedin",
    href: "https://www.linkedin.com/company/zerone-vietnam-consulting/",
    label: { en: "Zerone on LinkedIn", vi: "Zerone trên LinkedIn" },
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>',
  },
  {
    id: "instagram",
    href: "",
    name: "Instagram",
    label: { en: "Zerone on Instagram", vi: "Zerone trên Instagram" },
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/></svg>',
  },
  {
    id: "tiktok",
    href: "",
    name: "TikTok",
    label: { en: "Zerone on TikTok", vi: "Zerone trên TikTok" },
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
  },
  {
    id: "youtube",
    href: "https://www.youtube.com/@zerone_vn",
    label: { en: "Zerone on YouTube", vi: "Zerone trên YouTube" },
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
  },
  {
    id: "zalo",
    href: "https://zalo.me/1458646250790074597",
    label: { en: "Zerone on Zalo", vi: "Zerone trên Zalo" },
    /* Zalo wordmark, cropped to the letters. The burgundy square comes from .f3-social-mark. */
    icon: '<svg viewBox="-0.4 7.5 24.8 9" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12.49 10.2722v-.4496h1.3467v6.3218h-.7704a.576.576 0 01-.5763-.5729l-.0006.0005a3.273 3.273 0 01-1.9372.6321c-1.8138 0-3.2844-1.4697-3.2844-3.2823 0-1.8125 1.4706-3.2822 3.2844-3.2822a3.273 3.273 0 011.9372.6321l.0006.0005zM6.9188 7.7896v.205c0 .3823-.051.6944-.2995 1.0605l-.03.0343c-.0542.0615-.1815.206-.2421.2843L2.024 14.8h4.8948v.7682a.5764.5764 0 01-.5767.5761H0v-.3622c0-.4436.1102-.6414.2495-.8476L4.8582 9.23H.1922V7.7896h6.7266zm8.5513 8.3548a.4805.4805 0 01-.4803-.4798v-7.875h1.4416v8.3548H15.47zM20.6934 9.6C22.52 9.6 24 11.0807 24 12.9044c0 1.8252-1.4801 3.306-3.3066 3.306-1.8264 0-3.3066-1.4808-3.3066-3.306 0-1.8237 1.4802-3.3044 3.3066-3.3044zm-10.1412 5.253c1.0675 0 1.9324-.8645 1.9324-1.9312 0-1.065-.865-1.9295-1.9324-1.9295s-1.9324.8644-1.9324 1.9295c0 1.0667.865 1.9312 1.9324 1.9312zm10.1412-.0033c1.0737 0 1.945-.8707 1.945-1.9453 0-1.073-.8713-1.9436-1.945-1.9436-1.0753 0-1.945.8706-1.945 1.9436 0 1.0746.8697 1.9453 1.945 1.9453z"/></svg>',
  },
];

function socialLinks() {
  if (!SOCIAL_CHANNELS.length) return "";
  const soon = LANG === "vi" ? "sắp ra mắt" : "coming soon";
  const groupLabel = LANG === "vi" ? "Zerone trên mạng xã hội" : "Zerone on social media";
  const items = SOCIAL_CHANNELS.map((ch) => {
    const href = ch.href && String(ch.href).trim();
    const name = href
      ? (ch.label[LANG] || ch.label.en)
      : `${ch.name || ch.id} – ${soon}`;
    const mark = `<span class="f3-social-mark">${ch.icon}</span>`;
    if (href) {
      return `<li><a class="f3-social-item" data-channel="${ch.id}" href="${href}" target="_blank" rel="noopener noreferrer" aria-label="${name}">${mark}</a></li>`;
    }
    return `<li><span class="f3-social-item is-soon" data-channel="${ch.id}" role="img" aria-label="${name}" title="${name}">${mark}</span></li>`;
  }).join("");
  return `<nav class="f3-social" aria-label="${groupLabel}"><ul>${items}</ul></nav>`;
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
            <a class="f3-addr" href="https://www.google.com/maps/search/?api=1&query=Vincom+Center+Dong+Khoi+72+Le+Thanh+Ton+Ho+Chi+Minh+City" target="_blank" rel="noopener">${f.addr}</a>
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
          </div>
        </div>
        ${socialLinks()}
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

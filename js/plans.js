/* Plan selection -> checkout -> order. One page, two views, so choosing a plan and going back never resets progress.
   Amounts here are display fallbacks; when the API is configured the server quote (quote_subscription) is what the
   buyer is shown and charged. Direct entry: ?plan=monthly|6m|12m  (no personal data ever goes in a URL). */
(function () {
  var LANG = document.documentElement.lang === "vi" ? "vi" : "en";
  var API = window.ZERONE_API || {};
  var PAY = window.ZERONE_PAY || {};   /* online methods that are registered and switched on; card (AppotaPay) and recurring stay off until Zerone enables them */
  var MONTHLY = 500000;   /* listed prices exclude VAT; VAT is added at checkout (founder decision 2026-11-10) */
  var VAT_PCT = Number((window.ZERONE_PRICING || {}).vat_rate_pct); if (!(VAT_PCT >= 0)) VAT_PCT = 8;
  /* The versions of the documents this page links to (docs/legal, built by scripts/build-legal-site.mjs). The server refuses an order
     made against any other version, so what is shown and what is recorded cannot drift apart. */
  var TERMS_VERSION = "terms-ds-2026-11-10-v2", PRIVACY_VERSION = "privacy-ds-2026-11-09-v1";
  var PLANS = {
    monthly: { months: 1, periods: 1, price: MONTHLY, committed: false },
    term_6m: { months: 6, periods: 1, price: 2700000, committed: true },   /* 10% off six monthly payments */
    annual: { months: 12, periods: 1, price: 4500000, committed: true }   /* three months free: 9 x 500.000 */
  };
  var T = {
    vi: {
      title: "Chọn gói phù hợp", exVat: "Chưa gồm VAT",
      pmTitle: "Phương thức thanh toán", pmOn: "Khả dụng", pmOff: "Chưa khả dụng",
      pmMail: "Gửi yêu cầu qua email",
      pmOrder: "Đặt đơn, Zerone hướng dẫn thanh toán",
      pmBank: "Chuyển khoản ngân hàng / quét mã QR",
      pmCard: "Thẻ Visa/Mastercard (cổng AppotaPay)",
      pmRec: "Thanh toán định kỳ tự động",
      policiesMore: "Xem thêm: <a href=\"chinh-sach-gia.html\" target=\"_blank\" rel=\"noopener\">Chính sách về giá</a> · <a href=\"chinh-sach-thanh-toan.html\" target=\"_blank\" rel=\"noopener\">Chính sách thanh toán</a> · <a href=\"cung-cap-dich-vu-cham-dut-hoan-tien.html\" target=\"_blank\" rel=\"noopener\">Chấm dứt & hoàn tiền</a> · <a href=\"giai-quyet-khieu-nai.html\" target=\"_blank\" rel=\"noopener\">Giải quyết khiếu nại</a>", cont: "Tiếp tục", back: "Quay lại chọn gói",
      monthly: "Theo tháng", monthlyPer: "tháng", monthlyNote: "Thanh toán theo từng tháng. Dừng gia hạn bất kỳ lúc nào.",
      six: "6 tháng", sixPer: "6 tháng",
      sixNote: function (pm, sv, pct) { return "Tiết kiệm " + pct + "% so với gói tháng."; },
      annual: "12 tháng", annualPer: "năm",
      annualNote: function (pm, sv, pct) { return "Tiết kiệm " + pct + "% so với gói tháng."; },
      included: "Bao gồm:",
      feats: ["Hồ sơ chuyên môn", "QR & đường dẫn riêng", "Tiếp nhận yêu cầu đặt lịch (mở khi Zerone thông báo sẵn sàng)", "Workspace quản lý lịch hẹn", "Cập nhật hồ sơ & thông tin dịch vụ", "Duy trì nền tảng & hỗ trợ kỹ thuật"],
      coTitle: "Xác nhận đăng ký", sumPlan: "Gói đăng ký", sumSchedule: "Lịch thanh toán", sumPeriod: "Giá mỗi kỳ (chưa gồm VAT)", sumSetup: "Phí thiết lập",
      sumSetupFree: "Miễn phí", sumVat: "VAT", sumVatIncl: function (p) { return "đã gồm trong giá (" + p + "%)"; },
      sumVatAdd: function (p) { return p + "% cộng thêm"; }, sumVatNone: "Không cộng thêm", finalPrice: "Giá niêm yết chưa gồm VAT. VAT được cộng thêm ở bước thanh toán; số tiền thanh toán và mã QR là tổng đã gồm VAT.", sumTotal: "Tổng số tiền thanh toán (đã gồm VAT)",
      sumCommit: function (m) { return "Tổng giá gói " + m + " tháng (chưa gồm VAT)"; }, sumNext: "Kỳ thanh toán tiếp theo", nextNone: function (m) { return "Không có kỳ nào trong " + m + " tháng. Khi hết hạn, bạn gia hạn nếu muốn."; },
      nextMonthly: "Sau mỗi tháng, khi bạn chủ động thanh toán", sumTerm: "Thời hạn gói",
      termMonths: function (m) { return m + " tháng"; },
      termNote: function (m) { return "Thời hạn " + m + " tháng, tính từ ngày Zerone ghi nhận đã nhận đủ tiền."; },
      renewNote: "Không tự động trừ tiền. Muốn tiếp tục, bạn thanh toán thời hạn tiếp theo trước ngày hết hạn. Bạn có thể dừng gia hạn bất cứ lúc nào và dùng đến hết thời hạn đã thanh toán.",
      monthlyTerms: "Theo tháng, không cam kết năm.", onceTerms: function (m) { return m + " tháng, thanh toán một lần."; },
      preview: "Thanh toán trực tuyến chưa mở. Gửi yêu cầu qua email, Zerone sẽ liên hệ hướng dẫn thanh toán và kích hoạt.",
      fVertical: "Lĩnh vực", vHealth: "Y khoa", vMental: "Sức khỏe tinh thần", vVet: "Thú y", fName: "Họ và tên", fPractice: "Phòng khám / tên hành nghề (không bắt buộc)",
      fMethod: "Liên hệ qua", mEmail: "Email", mPhone: "Điện thoại", mZalo: "Zalo", fContact: "Thông tin liên hệ",
      cAccept: "Tôi đăng ký cho mục đích hành nghề hoặc kinh doanh của mình, đã đọc và đồng ý với <a href=\"doctor-space-terms.html\" target=\"_blank\" rel=\"noopener\">Điều khoản Doctor Space</a> và <a href=\"doctor-space-privacy.html\" target=\"_blank\" rel=\"noopener\">Chính sách quyền riêng tư</a>, và đồng ý để Zerone liên hệ với tôi về đơn này.",
      errOutdated: "Điều khoản vừa được cập nhật. Vui lòng tải lại trang rồi thử lại.",
      place: "Tạo đơn đăng ký", placing: "Đang tạo đơn…", mailBtn: "Gửi yêu cầu qua email",
      errGeneric: "Chưa tạo được đơn. Vui lòng thử lại hoặc liên hệ contact@zerone.vn.", errRate: "Bạn thao tác quá nhanh. Vui lòng thử lại sau ít phút.", errFields: "Vui lòng điền họ tên, thông tin liên hệ và đánh dấu ô đồng ý.",
      doneTitle: "Đơn đăng ký đã được tạo", doneRef: "Mã thanh toán của bạn",
      donePending: "Đơn đang chờ thanh toán. Gói chỉ được kích hoạt sau khi Zerone xác nhận đã nhận tiền. Zerone sẽ liên hệ với bạn để hướng dẫn thanh toán.",
      donePaid: "Đã nhận thanh toán. Cảm ơn bạn. Zerone sẽ liên hệ để kích hoạt Professional Space của bạn.",
      doneExpired: "Đơn đã hết hạn. Bạn có thể tạo đơn mới.", doneNew: "Chọn lại gói",
      payTitle: "Chuyển khoản để hoàn tất", payBank: "Ngân hàng", payAcct: "Số tài khoản", payName: "Chủ tài khoản", payAmount: "Số tiền", payRef: "Nội dung chuyển khoản",
      payNote: "Vui lòng nhập đúng số tiền và nội dung chuyển khoản. Gói được kích hoạt khi Zerone xác nhận đã nhận tiền; trang này tự cập nhật.", copy: "Sao chép", copied: "Đã chép", qrAlt: "Mã QR chuyển khoản",
      retry: "Thử lại", offline: "Chưa kết nối được. Kiểm tra mạng rồi thử lại.",
      due: "Hạn thanh toán các kỳ", mailSubject: "Đăng ký Professional Space", currency: "đ"
    },
    en: {
      title: "Find the plan for you", exVat: "Excl. VAT",
      pmTitle: "Payment method", pmOn: "Available", pmOff: "Not available",
      pmMail: "Send a request by email",
      pmOrder: "Place the order; Zerone sends payment instructions",
      pmBank: "Bank transfer / QR code",
      pmCard: "Visa/Mastercard (AppotaPay gateway)",
      pmRec: "Automatic recurring payment",
      policiesMore: "See also (Vietnamese): <a href=\"vi/chinh-sach-gia.html\" target=\"_blank\" rel=\"noopener\">Pricing</a> · <a href=\"vi/chinh-sach-thanh-toan.html\" target=\"_blank\" rel=\"noopener\">Payment</a> · <a href=\"vi/cung-cap-dich-vu-cham-dut-hoan-tien.html\" target=\"_blank\" rel=\"noopener\">Termination &amp; refunds</a> · <a href=\"vi/giai-quyet-khieu-nai.html\" target=\"_blank\" rel=\"noopener\">Complaints</a>", cont: "Continue", back: "Back to plans",
      monthly: "Monthly", monthlyPer: "month", monthlyNote: "Pay monthly. Stop renewing any time.",
      six: "6 months", sixPer: "6 months",
      sixNote: function (pm, sv, pct) { return "Save " + pct + "% compared with the monthly plan."; },
      annual: "12 months", annualPer: "year",
      annualNote: function (pm, sv, pct) { return "Save " + pct + "% compared with the monthly plan."; },
      included: "Includes:",
      feats: ["Professional profile", "Your own QR & link", "Appointment-request intake (switched on when Zerone announces it is ready)", "Workspace to manage appointments", "Profile & service updates", "Platform upkeep & technical support"],
      coTitle: "Confirm your subscription", sumPlan: "Plan", sumSchedule: "Payment schedule", sumPeriod: "Price per period (excl. VAT)", sumSetup: "Setup fee",
      sumSetupFree: "Free", sumVat: "VAT", sumVatIncl: function (p) { return "included in the price (" + p + "%)"; },
      sumVatAdd: function (p) { return p + "% added"; }, sumVatNone: "None added", finalPrice: "Listed prices exclude VAT. VAT is added at checkout; the amount you pay and the QR code show the total including VAT.", sumTotal: "Total to pay (incl. VAT)",
      sumCommit: function (m) { return m + "-month plan price (excl. VAT)"; }, sumNext: "Next payment", nextNone: function (m) { return "None within the " + m + " months. At the end you renew only if you wish."; },
      nextMonthly: "After each month, when you choose to pay", sumTerm: "Plan term",
      termMonths: function (m) { return m + (m === 1 ? " month" : " months"); },
      termNote: function (m) { return m + "-month term, counted from the day Zerone records full receipt of your payment."; },
      renewNote: "No automatic charge. To continue, you pay the next term before the end date. You can stop renewing at any time and keep using the service until the end of the term you paid.",
      monthlyTerms: "Monthly, no annual commitment.", onceTerms: function (m) { return m + " months, paid once."; },
      preview: "Online payment is not open yet. Send your request by email and Zerone will contact you with payment and activation steps.",
      fVertical: "Field", vHealth: "Healthcare", vMental: "Mental health", vVet: "Veterinary", fName: "Full name", fPractice: "Practice name (optional)",
      fMethod: "Contact via", mEmail: "Email", mPhone: "Phone", mZalo: "Zalo", fContact: "Contact details",
      cAccept: "I subscribe for my own professional or business purposes, I have read and accept the <a href=\"doctor-space-terms.html\" target=\"_blank\" rel=\"noopener\">Doctor Space Terms</a> and the <a href=\"doctor-space-privacy.html\" target=\"_blank\" rel=\"noopener\">Privacy Policy</a>, and I agree that Zerone may contact me about this order.",
      errOutdated: "The terms were just updated. Please reload the page and try again.",
      place: "Create subscription order", placing: "Creating order…", mailBtn: "Send request by email",
      errGeneric: "We could not create the order. Please try again or contact contact@zerone.vn.", errRate: "Too many attempts. Please try again in a few minutes.", errFields: "Please fill in your name and contact details and tick the agreement box.",
      doneTitle: "Your order has been created", doneRef: "Your payment reference",
      donePending: "Your order is awaiting payment. The plan activates only after Zerone confirms the payment was received. Zerone will contact you with payment instructions.",
      donePaid: "Payment received. Thank you. Zerone will contact you to activate your Professional Space.",
      doneExpired: "This order has expired. You can start a new one.", doneNew: "Choose a plan again",
      payTitle: "Pay by bank transfer", payBank: "Bank", payAcct: "Account number", payName: "Account name", payAmount: "Amount", payRef: "Transfer reference",
      payNote: "Please transfer the exact amount with the reference. The plan activates when Zerone confirms the money was received; this page updates by itself.", copy: "Copy", copied: "Copied", qrAlt: "Bank transfer QR code",
      retry: "Try again", offline: "Could not connect. Check your connection and try again.",
      due: "Instalment due dates", mailSubject: "Professional Space subscription", currency: "đ"
    }
  };
  var L = T[LANG];

  function vnd(n) { return Math.round(n).toLocaleString("vi-VN") + L.currency; }
  function addMonths(d, m) { var x = new Date(d.getTime()); x.setMonth(x.getMonth() + m); return x; }
  function fmtDate(d) { return d.toLocaleDateString(LANG === "vi" ? "vi-VN" : "en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }); }
  function el(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c]; }); }

  /* Same formula as the server (private.quote_plan), used until the server quote arrives or when no API is set. */
  function localQuote(code) {
    var p = PLANS[code];
    return { plan: code, months_per_period: p.months, periods: p.periods, committed: p.committed, period_price_vnd: p.price, setup_fee_vnd: 0,
      setup_fee_waived: false, vat_rate_pct: VAT_PCT, prices_include_vat: false, vat_vnd: Math.round(p.price * VAT_PCT / 100), payable_now_vnd: p.price + Math.round(p.price * VAT_PCT / 100),
      commitment_months: p.committed ? p.months * p.periods : null, commitment_total_vnd: p.committed ? p.price * p.periods : null, per_month_vnd: Math.round(p.price / p.months), saving_vs_monthly_vnd: p.committed ? saving(code) : null, approved: false };
  }
  function saving(code) { var p = PLANS[code]; return MONTHLY * p.months * p.periods - p.price * p.periods; }
  function savingPct(code) { var p = PLANS[code]; return Math.round(saving(code) / (MONTHLY * p.months * p.periods) * 100); }   /* share saved against paying monthly, on listed prices */
  function perMonth(code) { var p = PLANS[code]; return Math.round(p.price / p.months); }

  /* ---------- state (kept for the session so Back never loses the choice or the typed details) ---------- */
  var state = { plan: "term_6m", view: "plans", form: {}, order: null };
  try { var saved = JSON.parse(sessionStorage.getItem("zplan") || "null"); if (saved) { state.plan = PLANS[saved.plan] ? saved.plan : state.plan; state.form = saved.form || {}; state.order = saved.order || null; } } catch (e) {}
  (function fromUrl() {
    var p = new URLSearchParams(location.search).get("plan");
    if (p === "monthly") state.plan = "monthly";
    else if (p === "6m" || p === "term_6m" || p === "term" || p === "term_3m") state.plan = "term_6m";
    else if (p === "12m" || p === "annual") state.plan = "annual";
  })();
  function persist() { try { sessionStorage.setItem("zplan", JSON.stringify({ plan: state.plan, form: state.form, order: state.order })); } catch (e) {} }
  function planCode() { return state.plan; }

  var root = el("plans-root");

  /* Funnel steps go to the same anonymous website ledger as the rest of the journey: no personal data, once per step per visit. */
  var SID = (function () { try { var s = sessionStorage.getItem("zplan_sid"); if (!s) { s = ""; for (var i = 0; i < 24; i++) s += Math.floor(Math.random() * 16).toString(16); sessionStorage.setItem("zplan_sid", s); } return s; } catch (e) { return "0123456789abcdef01234567"; } })();
  var SRC = (function () { var s = new URLSearchParams(location.search).get("src"); return s && /^[a-z0-9_-]{1,40}$/.test(s) ? s : "site-plans"; })();
  function track(kind) {
    if (!API.url) return;
    try { fetch(API.url + "/rest/v1/rpc/track_preview_event", { method: "POST", keepalive: true, referrerPolicy: "no-referrer", headers: { "Content-Type": "application/json", apikey: API.key, Authorization: "Bearer " + API.key }, body: JSON.stringify({ p_kind: kind, p_session: SID, p_source: SRC }) }).catch(function () {}); } catch (e) {}
  }
  var BASE_TITLE = document.title;
  function entered(title) {   /* a view change: new title, focus on the heading so keyboard and screen-reader users land at the top */
    document.title = title ? title + " — Zerone" : BASE_TITLE;
    var h = root.querySelector("h1"); if (h) { h.setAttribute("tabindex", "-1"); try { h.focus({ preventScroll: true }); } catch (e) {} }
  }

  /* ---------- plan selection ---------- */
  function renderPlans() {
    state.view = "plans"; document.title = BASE_TITLE;
    var feats = "<p class=\"plan-feat-h\">" + L.included + "</p><ul class=\"plan-feat\">" + L.feats.map(function (f) { return "<li>" + f + "</li>"; }).join("") + "</ul>";
    function card(key, name, sub, price, per, note, extra) {
      var sel = state.plan === key;
      return "<div class=\"plan-card" + (sel ? " is-selected" : "") + "\" data-plan=\"" + key + "\">" +
        "<input class=\"plan-radio\" type=\"radio\" name=\"plan\" value=\"" + key + "\" id=\"plan-" + key + "\" aria-labelledby=\"pn-" + key + "\"" + (sel ? " checked" : "") + ">" +
        "<span class=\"plan-mark\" aria-hidden=\"true\"></span>" +
        "<h2 class=\"plan-name\" id=\"pn-" + key + "\">" + name + "</h2>" + (sub ? "<p class=\"plan-sub\">" + sub + "</p>" : "") +
        "<p class=\"plan-price\">" + vnd(price) + " <small>/ " + per + "</small><small class=\"plan-vat\">" + L.exVat + "</small></p>" +
        "<p class=\"plan-period" + (key === "annual" ? " plan-save" : "") + "\" id=\"pp-" + key + "\">" + note + "</p>" + (extra || "<div class=\"plan-slot\"></div>") + feats + "</div>";
    }
    root.innerHTML = "<h1>" + L.title + "</h1>" +
      "<fieldset class=\"plan-grid\" aria-label=\"" + L.title + "\">" +
      card("monthly", L.monthly, "", PLANS.monthly.price, L.monthlyPer, L.monthlyNote) +
      card("term_6m", L.six, "", PLANS.term_6m.price, L.sixPer, L.sixNote(vnd(perMonth("term_6m")), vnd(saving("term_6m")), savingPct("term_6m"))) +
      card("annual", L.annual, "", PLANS.annual.price, L.annualPer, L.annualNote(vnd(perMonth("annual")), vnd(saving("annual")), savingPct("annual"))) +
      "</fieldset><div class=\"plans-cta\"><button class=\"btn\" type=\"button\" id=\"plan-continue\">" + L.cont + "</button></div>";
    root.querySelectorAll(".plan-card").forEach(function (c) {
      c.addEventListener("click", function (e) { select(c.getAttribute("data-plan")); });
    });
    root.querySelectorAll("input[name=plan]").forEach(function (r) { r.addEventListener("change", function () { select(r.value); }); });
    if (!renderPlans.seen) { renderPlans.seen = true; track("plans_viewed"); }
    el("plan-continue").addEventListener("click", function () { track("plan_selected"); persist(); history.pushState({ v: "checkout" }, "", "#checkout"); renderCheckout(); window.scrollTo(0, 0); });
  }
  function select(key) {
    if (state.plan === key) return;
    state.plan = key; persist(); renderPlans();
    var r = el("plan-" + key); if (r) r.focus();
  }

  /* ---------- checkout ---------- */
  var serverQuote = {}, currentQuote = null;
  function getQuote(code) {
    if (serverQuote[code]) return Promise.resolve(serverQuote[code]);
    if (!API.url) return Promise.resolve(localQuote(code));
    return rpc("quote_subscription", { p_plan: code }).then(function (q) { serverQuote[code] = q; return q; }).catch(function () { return localQuote(code); });
  }
  function rpc(fn, body) {
    return fetch(API.url + "/rest/v1/rpc/" + fn, { method: "POST", headers: { "Content-Type": "application/json", apikey: API.key, Authorization: "Bearer " + API.key }, body: JSON.stringify(body) })
      .then(function (r) { return r.json().then(function (j) { if (!r.ok) { var e = new Error((j && (j.message || j.hint)) || "error"); e.status = r.status; throw e; } return j; }); });
  }
  function laterPayable(q) { return q.period_price_vnd + (q.prices_include_vat ? 0 : Math.round(q.period_price_vnd * q.vat_rate_pct / 100)); }
  function planName(q) { return q.plan === "monthly" ? L.monthly : q.plan === "annual" ? L.annual : L.six; }
  function renderCheckout() {
    state.view = "checkout"; state.order = null; persist();   /* a new purchase starts here: an older order amount is never shown */
    track("checkout_started");
    root.innerHTML = "<h1>" + L.coTitle + "</h1>" + stepper(2) + "<div class=\"co-wrap\"><div class=\"co-card\" id=\"co-summary\"></div><div class=\"co-card\" id=\"co-formbox\"></div></div>";
    entered(L.coTitle);
    var code = planCode();
    getQuote(code).then(function (q) { if (state.view === "checkout" && q.plan === planCode()) fillCheckout(q); });
    fillCheckout(localQuote(code));
  }
  function fillCheckout(q) {
    var now = new Date(), months = q.months_per_period * q.periods;
    var rows = [[L.sumPlan, planName(q)], [L.sumSchedule, q.plan === "monthly" ? (LANG === "vi" ? "Hàng tháng" : "Monthly") : (LANG === "vi" ? "Một lần" : "Once")],
      [L.sumPeriod, vnd(q.period_price_vnd)], [L.sumTerm, L.termMonths(months)],
      [L.sumSetup, q.setup_fee_vnd > 0 ? vnd(q.setup_fee_vnd) : q.setup_fee_waived ? L.sumSetupFree : vnd(0)],
      [L.sumVat, q.vat_rate_pct > 0 ? vnd(q.vat_vnd) + " · " + (q.prices_include_vat ? L.sumVatIncl(q.vat_rate_pct) : L.sumVatAdd(q.vat_rate_pct)) : L.sumVatNone]];
    var html = "<button type=\"button\" class=\"co-back\" id=\"co-back\">← " + L.back + "</button><dl class=\"co-rows\">" +
      rows.map(function (r) { return "<div class=\"co-row\"><dt>" + r[0] + "</dt><dd>" + esc(r[1]) + "</dd></div>"; }).join("") +
      "<div class=\"co-row is-total\"><dt>" + L.sumTotal + "</dt><dd>" + vnd(q.payable_now_vnd) + "</dd></div>";
    if (q.commitment_total_vnd) html += "<div class=\"co-row\"><dt>" + L.sumCommit(q.commitment_months) + "</dt><dd>" + vnd(q.commitment_total_vnd) + "</dd></div>";
    if (q.plan === "monthly") html += "<div class=\"co-row\"><dt>" + L.sumNext + "</dt><dd>" + fmtDate(addMonths(now, 1)) + " · " + vnd(laterPayable(q)) + "<br><small>" + L.nextMonthly + "</small></dd></div>";
    html += "</dl><p class=\"co-note\">" + L.finalPrice + " " + L.termNote(months) + " " + L.renewNote + "</p>";
    el("co-summary").innerHTML = html;
    el("co-back").addEventListener("click", function () { history.back(); });
    if (!el("co-form")) renderForm(q);
    var bn = el("co-banner"); if (bn) bn.hidden = !!q.approved;
    currentQuote = q;
  }
  /* Every method Zerone plans to offer is listed; only those that really work can be chosen, the rest show their status. */
  function methodsHtml(q, api) {
    var bankOn = !!(api && q.approved);
    var rows = [
      !bankOn ? ["assisted", api ? L.pmOrder : L.pmMail, true] : null,
      ["bank", L.pmBank, bankOn],
      ["card", L.pmCard, !!PAY.card],
      ["recurring", L.pmRec, !!PAY.recurring]
    ].filter(Boolean);
    var firstOn = rows.filter(function (r) { return r[2]; })[0];
    return "<fieldset class=\"co-pay\"><legend>" + L.pmTitle + "</legend>" + rows.map(function (r) {
      return "<label class=\"pm" + (r[2] ? "" : " is-off") + "\"><input type=\"radio\" name=\"pay\" value=\"" + r[0] + "\"" + (r[2] ? "" : " disabled") + (firstOn && firstOn[0] === r[0] ? " checked" : "") + "><span class=\"pm-main\"><b>" + r[1] + "</b></span><span class=\"pm-status " + (r[2] ? "s-on" : "s-off") + "\">" + (r[2] ? L.pmOn : L.pmOff) + "</span></label>";
    }).join("") + "</fieldset>";
  }
  function renderForm(q) {
    var f = state.form, box = el("co-formbox"), api = !!API.url;
    var banner = "<p id=\"co-banner\"" + (q.approved ? " hidden" : "") + " class=\"co-note\" style=\"margin:0 0 14px;padding:10px 12px;border:1px solid #d9c9a3;background:#fbf6e8;border-radius:10px;color:#5b4a1a\">" + L.preview + "</p>";
    box.innerHTML = banner + "<form class=\"co-form\" id=\"co-form\" novalidate>" +
      "<label class=\"f\">" + L.fVertical + "<select name=\"vertical\"><option value=\"health\">" + L.vHealth + "</option><option value=\"mental_health\">" + L.vMental + "</option><option value=\"veterinary\">" + L.vVet + "</option></select></label>" +
      "<label class=\"f\">" + L.fName + "<input type=\"text\" name=\"name\" autocomplete=\"name\" maxlength=\"80\"></label>" +
      "<label class=\"f\">" + L.fPractice + "<input type=\"text\" name=\"practice\" autocomplete=\"organization\" maxlength=\"120\"></label>" +
      "<div class=\"co-two\"><label class=\"f\">" + L.fMethod + "<select name=\"method\"><option value=\"email\">" + L.mEmail + "</option><option value=\"phone\">" + L.mPhone + "</option><option value=\"zalo\">" + L.mZalo + "</option></select></label>" +
      "<label class=\"f\">" + L.fContact + "<input type=\"text\" name=\"contact\" autocomplete=\"email\" maxlength=\"120\"></label></div>" +
      methodsHtml(q, api) +
      "<label class=\"chk\"><input type=\"checkbox\" name=\"accept\"><span>" + L.cAccept + "</span></label>" +
      "<p class=\"co-note\">" + L.policiesMore + "</p>" +
      "<p class=\"co-err\" id=\"co-err\" role=\"alert\"></p>" +
      "<button class=\"btn\" type=\"submit\" id=\"co-submit\">" + (api ? L.place : L.mailBtn) + "</button></form>";
    var form = el("co-form");
    ["vertical", "name", "practice", "method", "contact"].forEach(function (k) { if (f[k] != null) form.elements[k].value = f[k]; });
    form.addEventListener("input", function () { ["vertical", "name", "practice", "method", "contact"].forEach(function (k) { state.form[k] = form.elements[k].value; }); persist(); });
    form.addEventListener("submit", function (e) { e.preventDefault(); submit(form, currentQuote || q, api); });
  }
  function submit(form, q, api) {
    var v = function (k) { return (form.elements[k].value || "").trim(); }, err = el("co-err");
    if (v("name").length < 2 || v("contact").length < 5 || !form.elements.accept.checked) { err.textContent = L.errFields; return; }
    err.textContent = "";
    if (!api) {   /* no payment backend configured: the existing email path */
      var body = [planName(q) + " · " + vnd(q.payable_now_vnd), v("name"), v("practice"), v("method") + ": " + v("contact"), (SRC !== "site-plans" ? "src: " + SRC : "")].filter(Boolean).join("\n");
      location.href = "mailto:contact@zerone.vn?subject=" + encodeURIComponent(L.mailSubject) + "&body=" + encodeURIComponent(body);
      return;
    }
    var btn = el("co-submit"); btn.disabled = true; btn.textContent = L.placing;
    rpc("create_subscription_order", { p_plan: q.plan, p_vertical: v("vertical"), p_name: v("name"), p_practice: v("practice") || null,
      p_contact_method: v("method"), p_contact: v("contact"), p_accepted: true, p_terms_version: TERMS_VERSION,
      p_privacy_version: PRIVACY_VERSION, p_locale: LANG, p_business_use: true })
      .then(function (r) { track("order_created"); state.order = r.order_id; persist(); history.replaceState({ v: "done" }, "", "#order/" + r.order_id); renderDone(r.order_id); })
      .catch(function (e) { btn.disabled = false; btn.textContent = L.place; err.textContent = (e.name === "TypeError") ? L.offline : /terms_outdated|privacy_outdated/.test(e.message) ? L.errOutdated : (e.status === 429 || /rate_limited/.test(e.message)) ? L.errRate : L.errGeneric; });
  }

  /* ---------- payment screen, waiting state and receipt (the order id in the URL makes the page resumable from any device) ---------- */
  var X = {
    vi: {
      s1: "Chọn gói", s2: "Thanh toán", s3: "Hoàn tất", stepsLabel: "Các bước đăng ký",
      issueMismatch: function (a) { return "Zerone đã nhận khoản chuyển " + a + " nhưng không khớp số tiền của đơn nên chưa được ghi nhận. Vui lòng liên hệ contact@zerone.vn kèm mã thanh toán để được hỗ trợ."; },
      issueFailed: "Giao dịch gần nhất chưa thành công, đơn chưa được ghi nhận thanh toán. Bạn có thể chuyển khoản lại hoặc liên hệ contact@zerone.vn.",
      payH1: "Thanh toán", payTitle: "Quét mã hoặc chuyển khoản",
      payLead: function (a) { return "Chuyển đúng " + a + " và giữ nguyên nội dung chuyển khoản. Gói được xác nhận khi Zerone nhận được tiền."; },
      waiting: "Đang chờ nhận tiền…", checkNow: "Kiểm tra ngay", holdUntil: function (t) { return "Đơn được giữ đến " + t; },
      noBankH1: "Đơn đã được ghi nhận", noBank: "Zerone sẽ liên hệ với bạn để hướng dẫn thanh toán. Gói chỉ được kích hoạt sau khi Zerone xác nhận đã nhận tiền.",
      okH1: "Thanh toán thành công", okLead: "Zerone đã nhận được tiền. Cảm ơn bạn đã tin tưởng.",
      rPlan: "Gói đăng ký", rAmt: "Số tiền", rRef: "Mã thanh toán", rPaid: "Thanh toán lúc", rThru: "Có hiệu lực đến", rNext: "Kỳ thanh toán tiếp theo",
      nextH: "Bước tiếp theo", nextTxt: "Zerone sẽ liên hệ để kích hoạt Professional Space của bạn. Chứng từ thanh toán sẽ được gửi riêng.",
      print: "In biên nhận", home: "Về trang chủ",
      expH1: "Đơn đã hết hạn", expTxt: "Đơn này không còn được giữ. Nếu bạn đã chuyển khoản, hãy liên hệ contact@zerone.vn kèm mã thanh toán. Nếu chưa, bạn có thể chọn gói lại.",
      again: "Chọn lại gói"
    },
    en: {
      s1: "Choose plan", s2: "Payment", s3: "Done", stepsLabel: "Subscription steps",
      issueMismatch: function (a) { return "Zerone received a transfer of " + a + " but it does not match the order amount, so it was not recorded. Please contact contact@zerone.vn with your payment reference."; },
      issueFailed: "The latest transaction did not succeed and no payment was recorded for this order. You can transfer again or contact contact@zerone.vn.",
      payH1: "Payment", payTitle: "Scan the code or transfer",
      payLead: function (a) { return "Transfer exactly " + a + " and keep the transfer content unchanged. Your plan is confirmed when Zerone receives the money."; },
      waiting: "Waiting for your payment…", checkNow: "Check now", holdUntil: function (t) { return "Order held until " + t; },
      noBankH1: "Your order is recorded", noBank: "Zerone will contact you with payment instructions. The plan activates only after Zerone confirms the money was received.",
      okH1: "Payment successful", okLead: "Zerone has received your payment. Thank you for your trust.",
      rPlan: "Plan", rAmt: "Amount", rRef: "Payment reference", rPaid: "Paid at", rThru: "Valid until", rNext: "Next payment",
      nextH: "What happens next", nextTxt: "Zerone will contact you to activate your Professional Space. Payment documents will be sent separately.",
      print: "Print receipt", home: "Back to home",
      expH1: "This order has expired", expTxt: "This order is no longer held. If you already transferred the money, contact contact@zerone.vn with your payment reference. If not, you can choose a plan again.",
      again: "Choose a plan again"
    }
  }[LANG];

  function stepper(active) {
    var names = [X.s1, X.s2, X.s3];
    return "<ol class=\"co-steps\" aria-label=\"" + X.stepsLabel + "\">" + names.map(function (n, i) {
      var cls = i + 1 < active ? "is-done" : i + 1 === active ? "is-active" : "";
      return "<li class=\"" + cls + "\"" + (i + 1 === active ? " aria-current=\"step\"" : "") + "><span class=\"n\">" + (i + 1 < active ? "✓" : i + 1) + "</span><span class=\"t\">" + n + "</span></li>";
    }).join("") + "</ol>";
  }
  var BANKS = { VPB: "VPBank", VCB: "Vietcombank", TCB: "Techcombank", MB: "MB Bank", ACB: "ACB", BIDV: "BIDV", CTG: "VietinBank" };
  function planLabel(c) { return c === "monthly" ? L.monthly : c === "annual" ? L.annual : L.six; }
  function row(k, v, copy) { return "<div class=\"co-row\"><dt>" + k + "</dt><dd>" + esc(v) + (copy ? " <button type=\"button\" class=\"co-copy\" data-copy=\"" + esc(copy) + "\">" + L.copy + "</button>" : "") + "</dd></div>"; }
  function whenText(iso) { var d = new Date(iso); return d.toLocaleTimeString(LANG === "vi" ? "vi-VN" : "en-GB", { hour: "2-digit", minute: "2-digit" }) + " " + fmtDate(d); }

  function payScreen(s) {
    var b = s.bank, amt = s.pay_now.amount_vnd;
    var qr = "https://img.vietqr.io/image/" + encodeURIComponent(b.code) + "-" + encodeURIComponent(b.account_no) + "-compact2.png?amount=" + amt +
      "&addInfo=" + encodeURIComponent(s.payment_reference) + "&accountName=" + encodeURIComponent(b.account_name);
    var is = s.payment_issue;
    var issue = is ? "<div class=\"co-issue\" role=\"alert\">" + (is.outcome === "amount_mismatch" ? X.issueMismatch(vnd(is.amount_vnd)) : X.issueFailed) + "</div>" : "";
    return "<h1>" + X.payH1 + "</h1>" + stepper(2) + issue +
      "<div class=\"pay-wrap\"><div class=\"co-card pay-qr\"><img class=\"co-qr\" src=\"" + qr + "\" alt=\"" + L.qrAlt + "\" width=\"240\" height=\"240\" referrerpolicy=\"no-referrer\">" +
      "<p class=\"pay-wait\"><span class=\"spin\" aria-hidden=\"true\"></span>" + X.waiting + "</p>" +
      "<p class=\"pay-hold\">" + X.holdUntil(whenText(s.expires_at)) + "</p>" +
      "<button type=\"button\" class=\"btn-ghost\" id=\"pay-check\">" + X.checkNow + "</button></div>" +
      "<div class=\"co-card pay-details\"><h2>" + X.payTitle + "</h2><p class=\"co-note\" style=\"margin:0 0 8px\">" + X.payLead(vnd(amt)) + "</p>" +
      "<dl class=\"co-rows\">" + row(L.sumPlan, planLabel(s.plan)) + row(L.payBank, BANKS[b.code] || b.code) + row(L.payAcct, b.account_no, b.account_no) + row(L.payName, b.account_name) +
      row(L.payAmount, vnd(amt), String(amt)) + row(L.payRef, s.payment_reference, s.payment_reference) + "</dl></div></div>";
  }
  function receiptScreen(s) {
    var inst = s.instalments || [], paid = inst.filter(function (i) { return i.status === "paid"; }), last = paid[paid.length - 1] || {};
    var nextDue = inst.filter(function (i) { return i.status === "due"; })[0];
    return "<div class=\"co-done ok\"><div class=\"ok-mark\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" width=\"34\" height=\"34\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M5 12.5l4.2 4.2L19 7\"/></svg></div>" +
      "<h1>" + X.okH1 + "</h1><p class=\"ok-lead\">" + X.okLead + "</p>" + stepper(3) +
      "<div class=\"co-card receipt\"><dl class=\"co-rows\">" + row(L.sumPlan, planLabel(s.plan)) + row(X.rAmt, vnd(last.amount_vnd || 0)) + row(X.rRef, s.payment_reference) +
      (last.paid_at ? row(X.rPaid, whenText(last.paid_at)) : "") + (last.covers_to ? row(X.rThru, fmtDate(new Date(last.covers_to))) : "") +
      (nextDue ? row(X.rNext, fmtDate(new Date(nextDue.due_on)) + " · " + vnd(nextDue.amount_vnd)) : "") + "</dl></div>" +
      "<div class=\"co-next\"><h2>" + X.nextH + "</h2><p>" + X.nextTxt + "</p></div>" +
      "<div class=\"co-actions\"><button type=\"button\" class=\"btn\" id=\"rec-print\">" + X.print + "</button><a class=\"btn-ghost\" href=\"index.html\">" + X.home + "</a></div></div>";
  }
  function bindCopy() {
    document.querySelectorAll(".co-copy").forEach(function (b) {
      b.addEventListener("click", function () {
        var v = b.getAttribute("data-copy");
        function done() { b.textContent = L.copied; setTimeout(function () { b.textContent = L.copy; }, 1500); }
        try { navigator.clipboard.writeText(v).then(done, function () {}); } catch (e) {}
      });
    });
  }

  function renderDone(orderId) {
    state.view = "done"; state.order = orderId; persist();
    root.innerHTML = "<h1>" + X.payH1 + "</h1><p class=\"co-loading\" aria-live=\"polite\">…</p>";
    var last = null, timer = null;
    function again() { return state.view === "done" && state.order === orderId; }
    function load() {
      clearTimeout(timer);
      rpc("get_order_status", { p_order: orderId }).then(function (s) {
        if (!again()) return;
        if (!s) { state.order = null; persist(); history.replaceState(null, "", location.pathname); renderPlans(); return; }
        var kind = s.status === "paid" ? "paid" : s.status === "expired" ? "expired" : (s.bank && s.pay_now) ? (s.payment_issue ? "pay!" + s.payment_issue.at : "pay") : "nobank";
        if (kind !== last) {
          last = kind;
          if (kind === "paid") root.innerHTML = receiptScreen(s);
          else if (kind.indexOf("pay") === 0) root.innerHTML = payScreen(s);
          else if (kind === "expired") root.innerHTML = "<div class=\"co-done\"><h1>" + X.expH1 + "</h1><p>" + X.expTxt + "</p><p><a class=\"btn\" href=\"plans.html\" id=\"co-new\">" + X.again + "</a></p></div>";
          else root.innerHTML = "<div class=\"co-done\"><h1>" + X.noBankH1 + "</h1>" + stepper(2) + "<p>" + L.doneRef + "</p><div class=\"ref\">" + esc(s.payment_reference) + "</div><p>" + X.noBank + "</p></div>";
          entered(kind === "paid" ? X.okH1 : kind === "expired" ? X.expH1 : kind.indexOf("pay") === 0 ? X.payH1 : X.noBankH1);
          bindCopy();
          var nb = el("co-new"); if (nb) nb.addEventListener("click", function () { state.order = null; persist(); });
          var pr = el("rec-print"); if (pr) pr.addEventListener("click", function () { window.print(); });
          var ck = el("pay-check"); if (ck) ck.addEventListener("click", function () { ck.disabled = true; setTimeout(function () { ck.disabled = false; }, 1500); load(); });
        }
        if (kind.indexOf("pay") === 0 || kind === "nobank") timer = setTimeout(load, kind.indexOf("pay") === 0 ? 4000 : 10000);
      }).catch(function () {
        if (!again()) return;
        if (!last) root.innerHTML = "<h1>" + X.payH1 + "</h1><p>" + L.offline + "</p><p><button class=\"btn\" type=\"button\" id=\"co-retry\">" + L.retry + "</button></p>";
        var rb = el("co-retry"); if (rb) rb.addEventListener("click", load);
        timer = setTimeout(load, 8000);
      });
    }
    load();
  }

  function orderFromHash() {
    var m = location.hash.match(/^#order\/([0-9a-f-]{36})$/i);
    return m ? m[1] : (location.hash === "#order" ? state.order : null);
  }
  window.addEventListener("popstate", function () {
    window.scrollTo(0, 0);
    if (location.hash === "#checkout") renderCheckout();
    else if (orderFromHash() && API.url) renderDone(orderFromHash());
    else renderPlans();
  });
  if (orderFromHash() && API.url) renderDone(orderFromHash());
  else if (location.hash === "#checkout") renderCheckout();
  else renderPlans();
})();

/* Plan selection -> checkout -> order. One page, two views, so choosing a plan and going back never resets progress.
   Amounts here are display fallbacks; when the API is configured the server quote (quote_subscription) is what the
   buyer is shown and charged. Direct entry: ?plan=monthly|term|annual&term=3|6  (no personal data ever goes in a URL). */
(function () {
  var LANG = document.documentElement.lang === "vi" ? "vi" : "en";
  var API = window.ZERONE_API || {};
  var MONTHLY = 590000;
  var PLANS = {
    monthly: { months: 1, periods: 1, price: MONTHLY, committed: false },
    term_3m: { months: 3, periods: 4, price: 1590000, committed: true },
    term_6m: { months: 6, periods: 2, price: 2950000, committed: true },
    annual: { months: 12, periods: 1, price: 5310000, committed: true }
  };
  var T = {
    vi: {
      title: "Chọn gói phù hợp", cont: "Tiếp tục", back: "Quay lại chọn gói",
      monthly: "Theo tháng", monthlyPer: "tháng", monthlyNote: "Thanh toán hàng tháng. Không cam kết năm.",
      term: "12 tháng · Thanh toán theo kỳ", termLabel: "Chu kỳ thanh toán", every3: "Mỗi 3 tháng", every6: "Mỗi 6 tháng",
      per3: "mỗi 3 tháng", per6: "mỗi 6 tháng", termNote: "Cam kết 12 tháng.",
      saveAmt: function (a, p) { return "Tiết kiệm " + a + " (" + p + "%) so với thanh toán hàng tháng."; },
      annual: "12 tháng · Thanh toán một lần", annualPer: "năm", annualNote: "Tiết kiệm 25% so với thanh toán hàng tháng.",
      included: "Bao gồm:",
      feats: ["Hồ sơ chuyên môn", "QR & đường dẫn riêng", "Tiếp nhận yêu cầu đặt lịch", "Workspace quản lý lịch hẹn", "Cập nhật hồ sơ & thông tin dịch vụ", "Duy trì nền tảng & hỗ trợ kỹ thuật"],
      coTitle: "Xác nhận đăng ký", sumPlan: "Gói đăng ký", sumSchedule: "Lịch thanh toán", sumPeriod: "Giá mỗi kỳ", sumSetup: "Phí thiết lập",
      sumSetupFree: "Miễn phí", sumVat: "VAT", sumVatIncl: function (p) { return "đã gồm trong giá (" + p + "%)"; },
      sumVatAdd: function (p) { return p + "% cộng thêm"; }, sumVatNone: "Chưa áp dụng", sumTotal: "Thanh toán hôm nay",
      sumCommit: "Tổng cam kết 12 tháng", sumNext: "Kỳ thanh toán tiếp theo", nextNone: "Không có kỳ nào trong 12 tháng. Khi hết hạn, bạn gia hạn nếu muốn.",
      nextMonthly: "Sau mỗi tháng, khi bạn chủ động thanh toán", noAuto: "Zerone không tự động trừ tiền. Mỗi kỳ tiếp theo bạn tự thanh toán trước ngày đến hạn; Zerone nhắc bạn trước hạn.",
      monthlyTerms: "Theo tháng, không cam kết năm.", termTerms: function (n) { return "12 tháng, " + n + " kỳ thanh toán."; },
      annualTerms: "12 tháng, thanh toán một lần.",
      preview: "Bản xem trước: giá và điều khoản chưa được phê duyệt chính thức và chưa nhận thanh toán thật.",
      fVertical: "Lĩnh vực", vHealth: "Y khoa", vMental: "Sức khỏe tinh thần", vVet: "Thú y", fName: "Họ và tên", fPractice: "Phòng khám / tên hành nghề (không bắt buộc)",
      fMethod: "Liên hệ qua", mEmail: "Email", mPhone: "Điện thoại", mZalo: "Zalo", fContact: "Thông tin liên hệ",
      cConsent: "Tôi đồng ý để Zerone liên hệ với tôi về đơn đăng ký này.",
      cTerms: "Tôi đã đọc và đồng ý với <a href=\"terms.html\" target=\"_blank\" rel=\"noopener\">Điều khoản</a> và <a href=\"privacy.html\" target=\"_blank\" rel=\"noopener\">Chính sách riêng tư</a>.",
      place: "Tạo đơn đăng ký", placing: "Đang tạo đơn…", mailBtn: "Gửi yêu cầu qua email",
      errGeneric: "Chưa tạo được đơn. Vui lòng thử lại hoặc liên hệ contact@zerone.vn.", errRate: "Bạn thao tác quá nhanh. Vui lòng thử lại sau ít phút.", errFields: "Vui lòng điền họ tên, thông tin liên hệ và đồng ý hai ô bên dưới.",
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
      title: "Find the plan for you", cont: "Continue", back: "Back to plans",
      monthly: "Monthly", monthlyPer: "month", monthlyNote: "Billed monthly. No annual commitment.",
      term: "12 months · Pay in instalments", termLabel: "Billing cycle", every3: "Every 3 months", every6: "Every 6 months",
      per3: "every 3 months", per6: "every 6 months", termNote: "12-month commitment.",
      saveAmt: function (a, p) { return "Save " + a + " (" + p + "%) compared with paying monthly."; },
      annual: "12 months · Pay once", annualPer: "year", annualNote: "Save 25% compared with paying monthly.",
      included: "Includes:",
      feats: ["Professional profile", "Your own QR & link", "Appointment-request intake", "Workspace to manage appointments", "Profile & service updates", "Platform upkeep & technical support"],
      coTitle: "Confirm your subscription", sumPlan: "Plan", sumSchedule: "Payment schedule", sumPeriod: "Price per period", sumSetup: "Setup fee",
      sumSetupFree: "Free", sumVat: "VAT", sumVatIncl: function (p) { return "included in the price (" + p + "%)"; },
      sumVatAdd: function (p) { return p + "% added"; }, sumVatNone: "Not applied", sumTotal: "Due today",
      sumCommit: "12-month commitment total", sumNext: "Next payment", nextNone: "None within the 12 months. At the end you renew only if you wish.",
      nextMonthly: "After each month, when you choose to pay", noAuto: "Zerone never charges you automatically. You pay each later instalment yourself before its due date, and Zerone reminds you beforehand.",
      monthlyTerms: "Monthly, no annual commitment.", termTerms: function (n) { return "12 months, " + n + " payments."; },
      annualTerms: "12 months, paid once.",
      preview: "Preview: prices and terms are not yet officially approved and no real payment is taken.",
      fVertical: "Field", vHealth: "Healthcare", vMental: "Mental health", vVet: "Veterinary", fName: "Full name", fPractice: "Practice name (optional)",
      fMethod: "Contact via", mEmail: "Email", mPhone: "Phone", mZalo: "Zalo", fContact: "Contact details",
      cConsent: "I agree that Zerone may contact me about this subscription.",
      cTerms: "I have read and accept the <a href=\"terms.html\" target=\"_blank\" rel=\"noopener\">Terms</a> and <a href=\"privacy.html\" target=\"_blank\" rel=\"noopener\">Privacy Policy</a>.",
      place: "Create subscription order", placing: "Creating order…", mailBtn: "Send request by email",
      errGeneric: "We could not create the order. Please try again or contact contact@zerone.vn.", errRate: "Too many attempts. Please try again in a few minutes.", errFields: "Please fill in your name and contact details and tick both boxes.",
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
      setup_fee_waived: false, vat_rate_pct: 0, prices_include_vat: true, vat_vnd: 0, payable_now_vnd: p.price,
      commitment_total_vnd: p.committed ? p.price * p.periods : null, saving_vs_monthly_vnd: p.committed ? MONTHLY * 12 - p.price * p.periods : null, approved: false };
  }
  function saving(code) { var p = PLANS[code]; var s = MONTHLY * 12 - p.price * p.periods; return { amt: s, pct: Math.round(s / (MONTHLY * 12) * 100) }; }

  /* ---------- state (kept for the session so Back never loses the choice or the typed details) ---------- */
  var state = { plan: "term", term: 6, view: "plans", form: {}, order: null };
  try { var saved = JSON.parse(sessionStorage.getItem("zplan") || "null"); if (saved) { state.plan = saved.plan || state.plan; state.term = saved.term || state.term; state.form = saved.form || {}; state.order = saved.order || null; } } catch (e) {}
  (function fromUrl() {
    var q = new URLSearchParams(location.search), p = q.get("plan"), t = parseInt(q.get("term"), 10);
    if (p === "monthly" || p === "annual" || p === "term") state.plan = p;
    if (t === 3 || t === 6) { state.term = t; if (!p) state.plan = "term"; }
    if (q.get("plan") === "term_3m") { state.plan = "term"; state.term = 3; }
    if (q.get("plan") === "term_6m") { state.plan = "term"; state.term = 6; }
  })();
  function persist() { try { sessionStorage.setItem("zplan", JSON.stringify({ plan: state.plan, term: state.term, form: state.form, order: state.order })); } catch (e) {} }
  function planCode() { return state.plan === "term" ? (state.term === 3 ? "term_3m" : "term_6m") : state.plan; }

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
    var tp = PLANS["term_" + state.term + "m"], sv = saving("term_" + state.term + "m");
    function card(key, name, sub, price, per, note, extra) {
      var sel = state.plan === key;
      return "<div class=\"plan-card" + (sel ? " is-selected" : "") + "\" data-plan=\"" + key + "\">" +
        "<input class=\"plan-radio\" type=\"radio\" name=\"plan\" value=\"" + key + "\" id=\"plan-" + key + "\" aria-labelledby=\"pn-" + key + "\"" + (sel ? " checked" : "") + ">" +
        "<span class=\"plan-mark\" aria-hidden=\"true\"></span>" +
        "<h2 class=\"plan-name\" id=\"pn-" + key + "\">" + name + "</h2>" + (sub ? "<p class=\"plan-sub\">" + sub + "</p>" : "") +
        "<p class=\"plan-price\">" + vnd(price) + " <small>/ " + per + "</small></p>" +
        "<p class=\"plan-period\" id=\"pp-" + key + "\">" + note + "</p>" + (extra || "<div class=\"plan-slot\"></div>") + feats + "</div>";
    }
    var terms = "<fieldset class=\"plan-terms\"><legend class=\"sr-only\" style=\"position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)\">" + L.termLabel + "</legend>" +
      [3, 6].map(function (n) {
        return "<label class=\"plan-term\"><input type=\"radio\" name=\"term\" value=\"" + n + "\"" + (state.term === n ? " checked" : "") + "><span>" + (n === 3 ? L.every3 : L.every6) + "</span></label>";
      }).join("") + "</fieldset>";
    root.innerHTML = "<h1>" + L.title + "</h1>" +
      "<fieldset class=\"plan-grid\" aria-label=\"" + L.title + "\">" +
      card("monthly", L.monthly, "", PLANS.monthly.price, L.monthlyPer, L.monthlyNote) +
      card("term", L.term, "", tp.price, state.term === 3 ? L.per3 : L.per6, L.termNote + " " + L.saveAmt(vnd(sv.amt), sv.pct), terms) +
      card("annual", L.annual, "", PLANS.annual.price, L.annualPer, L.annualNote) +
      "</fieldset><div class=\"plans-cta\"><button class=\"btn\" type=\"button\" id=\"plan-continue\">" + L.cont + "</button></div>";
    root.querySelectorAll(".plan-card").forEach(function (c) {
      c.addEventListener("click", function (e) { if (e.target.closest(".plan-terms")) return; select(c.getAttribute("data-plan")); });
    });
    root.querySelectorAll("input[name=plan]").forEach(function (r) { r.addEventListener("change", function () { select(r.value); }); });
    root.querySelectorAll("input[name=term]").forEach(function (r) {
      r.addEventListener("change", function () { state.term = parseInt(r.value, 10); state.plan = "term"; persist(); renderPlans(); var n = root.querySelector("input[name=term]:checked"); if (n) n.focus(); });
    });
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
  function planName(q) {
    if (q.plan === "monthly") return L.monthly;
    if (q.plan === "annual") return L.annual;
    return L.term;
  }
  function renderCheckout() {
    state.view = "checkout"; state.order = null; persist();   /* a new purchase starts here: an older order amount is never shown */
    track("checkout_started");
    root.innerHTML = "<h1>" + L.coTitle + "</h1><div class=\"co-wrap\"><div class=\"co-card\" id=\"co-summary\"></div><div class=\"co-card\" id=\"co-formbox\"></div></div>";
    entered(L.coTitle);
    var code = planCode();
    getQuote(code).then(function (q) { if (state.view === "checkout" && q.plan === planCode()) fillCheckout(q); });
    fillCheckout(localQuote(code));
  }
  function fillCheckout(q) {
    var now = new Date(), perLabel = q.plan === "monthly" ? L.monthlyTerms : q.plan === "annual" ? L.annualTerms : L.termTerms(q.periods);
    var rows = [[L.sumPlan, planName(q)], [L.sumSchedule, q.plan === "term_3m" ? L.every3 : q.plan === "term_6m" ? L.every6 : q.plan === "annual" ? (LANG === "vi" ? "Một lần" : "Once") : (LANG === "vi" ? "Hàng tháng" : "Monthly")],
      [L.sumPeriod, vnd(q.period_price_vnd)],
      [L.sumSetup, q.setup_fee_vnd > 0 ? vnd(q.setup_fee_vnd) : q.setup_fee_waived ? L.sumSetupFree : vnd(0)],
      [L.sumVat, q.vat_rate_pct > 0 ? vnd(q.vat_vnd) + " · " + (q.prices_include_vat ? L.sumVatIncl(q.vat_rate_pct) : L.sumVatAdd(q.vat_rate_pct)) : L.sumVatNone]];
    var html = "<button type=\"button\" class=\"co-back\" id=\"co-back\">← " + L.back + "</button><dl class=\"co-rows\">" +
      rows.map(function (r) { return "<div class=\"co-row\"><dt>" + r[0] + "</dt><dd>" + esc(r[1]) + "</dd></div>"; }).join("") +
      "<div class=\"co-row is-total\"><dt>" + L.sumTotal + "</dt><dd>" + vnd(q.payable_now_vnd) + "</dd></div>";
    if (q.commitment_total_vnd) html += "<div class=\"co-row\"><dt>" + L.sumCommit + "</dt><dd>" + vnd(q.commitment_total_vnd) + "</dd></div>";
    var next;
    if (q.plan === "monthly") next = fmtDate(addMonths(now, 1)) + " · " + vnd(q.period_price_vnd) + "<br><small>" + L.nextMonthly + "</small>";
    else if (q.periods > 1) next = fmtDate(addMonths(now, q.months_per_period)) + " · " + vnd(q.period_price_vnd * (q.prices_include_vat ? 1 : 1 + q.vat_rate_pct / 100));
    else next = L.nextNone;
    html += "<div class=\"co-row\"><dt>" + L.sumNext + "</dt><dd>" + next + "</dd></div></dl>" +
      "<p class=\"co-note\">" + perLabel + " " + L.noAuto + "</p>";
    el("co-summary").innerHTML = html;
    el("co-back").addEventListener("click", function () { history.back(); });
    if (!el("co-form")) renderForm(q);
    var bn = el("co-banner"); if (bn) bn.hidden = !!q.approved;
    currentQuote = q;
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
      "<label class=\"chk\"><input type=\"checkbox\" name=\"consent\"><span>" + L.cConsent + "</span></label>" +
      "<label class=\"chk\"><input type=\"checkbox\" name=\"terms\"><span>" + L.cTerms + "</span></label>" +
      "<p class=\"co-err\" id=\"co-err\" role=\"alert\"></p>" +
      "<button class=\"btn\" type=\"submit\" id=\"co-submit\">" + (api ? L.place : L.mailBtn) + "</button></form>";
    var form = el("co-form");
    ["vertical", "name", "practice", "method", "contact"].forEach(function (k) { if (f[k] != null) form.elements[k].value = f[k]; });
    form.addEventListener("input", function () { ["vertical", "name", "practice", "method", "contact"].forEach(function (k) { state.form[k] = form.elements[k].value; }); persist(); });
    form.addEventListener("submit", function (e) { e.preventDefault(); submit(form, currentQuote || q, api); });
  }
  function submit(form, q, api) {
    var v = function (k) { return (form.elements[k].value || "").trim(); }, err = el("co-err");
    if (v("name").length < 2 || v("contact").length < 5 || !form.elements.consent.checked || !form.elements.terms.checked) { err.textContent = L.errFields; return; }
    err.textContent = "";
    if (!api) {   /* no payment backend configured: the existing email path */
      var body = [planName(q) + " · " + vnd(q.payable_now_vnd), v("name"), v("practice"), v("method") + ": " + v("contact")].join("\n");
      location.href = "mailto:contact@zerone.vn?subject=" + encodeURIComponent(L.mailSubject) + "&body=" + encodeURIComponent(body);
      return;
    }
    var btn = el("co-submit"); btn.disabled = true; btn.textContent = L.placing;
    rpc("create_subscription_order", { p_plan: q.plan, p_vertical: v("vertical"), p_name: v("name"), p_practice: v("practice") || null,
      p_contact_method: v("method"), p_contact: v("contact"), p_consent: true, p_notice: null, p_terms_accepted: true })
      .then(function (r) { track("order_created"); state.order = r.order_id; persist(); history.replaceState({ v: "done" }, "", "#order"); renderDone(r.order_id); })
      .catch(function (e) { btn.disabled = false; btn.textContent = L.place; err.textContent = (e.name === "TypeError") ? L.offline : (e.status === 429 || /rate_limited/.test(e.message)) ? L.errRate : L.errGeneric; });
  }

  /* ---------- order status (also the page an interrupted buyer returns to) ---------- */
  function planLabel(c) { return c === "monthly" ? L.monthly : c === "annual" ? L.annual : L.term + " · " + (c === "term_3m" ? L.every3 : L.every6); }
  function payBox(s) {
    var b = s.bank, amt = s.pay_now.amount_vnd;
    var qr = "https://img.vietqr.io/image/" + encodeURIComponent(b.code) + "-" + encodeURIComponent(b.account_no) + "-compact2.png?amount=" + amt +
      "&addInfo=" + encodeURIComponent(s.payment_reference) + "&accountName=" + encodeURIComponent(b.account_name);
    function row(k, v, copy) { return "<div class=\"co-row\"><dt>" + k + "</dt><dd>" + esc(v) + (copy ? " <button type=\"button\" class=\"co-copy\" data-copy=\"" + esc(copy) + "\">" + L.copy + "</button>" : "") + "</dd></div>"; }
    return "<h2>" + L.payTitle + "</h2><img class=\"co-qr\" src=\"" + qr + "\" alt=\"" + L.qrAlt + "\" width=\"220\" height=\"220\" referrerpolicy=\"no-referrer\">" +
      "<dl class=\"co-rows\" style=\"text-align:left\">" + row(L.sumPlan, planLabel(s.plan)) + row(L.payBank, b.code) + row(L.payAcct, b.account_no, b.account_no) + row(L.payName, b.account_name) +
      row(L.payAmount, vnd(amt), String(amt)) + row(L.payRef, s.payment_reference, s.payment_reference) + "</dl><p class=\"co-note\">" + L.payNote + "</p>";
  }
  function bindCopy() {
    document.querySelectorAll(".co-copy").forEach(function (b) {
      b.addEventListener("click", function () {
        var v = b.getAttribute("data-copy");
        function done() { var t = b.textContent; b.textContent = L.copied; setTimeout(function () { b.textContent = L.copy; }, 1500); }
        try { navigator.clipboard.writeText(v).then(done, function () {}); } catch (e) {}
      });
    });
  }
  function renderDone(orderId) {
    state.view = "done";
    root.innerHTML = "<div class=\"co-done\"><h1>" + L.doneTitle + "</h1><div id=\"co-status\" aria-live=\"polite\"></div></div>";
    entered(L.doneTitle);
    function load() {
      rpc("get_order_status", { p_order: orderId }).then(function (s) {
        if (!s) { state.order = null; persist(); renderPlans(); return; }
        var msg = s.status === "paid" ? L.donePaid : s.status === "expired" ? L.doneExpired : L.donePending;
        var due = (s.instalments || []).filter(function (i) { return i.status === "due"; });
        var html;
        if (s.status === "pending" && s.bank && s.pay_now) html = payBox(s);
        else html = "<p>" + L.doneRef + "</p><div class=\"ref\">" + esc(s.payment_reference) + "</div><p>" + msg + "</p>";
        if (s.status === "paid" && due.length) html += "<p><strong>" + L.due + "</strong><br>" + due.map(function (i) { return fmtDate(new Date(i.due_on)) + " · " + vnd(i.amount_vnd); }).join("<br>") + "</p>";
        if (s.status === "expired") html += "<p><a class=\"btn\" href=\"plans.html\" id=\"co-new\">" + L.doneNew + "</a></p>";
        el("co-status").innerHTML = html;
        bindCopy();
        var nb = el("co-new"); if (nb) nb.addEventListener("click", function () { state.order = null; persist(); });
        if (s.status === "pending") setTimeout(function () { if (state.view === "done") load(); }, 8000);
      }).catch(function () { el("co-status").innerHTML = "<p>" + L.offline + "</p><p><button class=\"btn\" type=\"button\" id=\"co-retry\">" + L.retry + "</button></p>"; var rb = el("co-retry"); if (rb) rb.addEventListener("click", load); });
    }
    load();
  }

  window.addEventListener("popstate", function () { window.scrollTo(0, 0); if (location.hash === "#checkout") renderCheckout(); else if (location.hash === "#order" && state.order) renderDone(state.order); else renderPlans(); });
  if (location.hash === "#order" && state.order && API.url) renderDone(state.order);
  else if (location.hash === "#checkout") renderCheckout();
  else renderPlans();
})();

/*! Zerone website measurement: anonymous counts on the existing event ledger (no cookies, no visitor id, no personal data; visitors' browsers store nothing).
 *  page_view  : one per page load (page path, language, referrer CATEGORY such as search/social/direct, the referring SITE NAME only such as www.linkedin.com, campaign source code from ?src= or ?utm_source=)
 *  page_leave : the seconds the page was actually in view (tab visible), sent when the tab is hidden or closed, never more than 30 minutes per event
 *  Team switch: opening any page with ?internal=1 marks THAT browser as internal (a flag in its local storage) so nothing from it is counted; ?internal=0 removes the flag.
 *  cta_click  : one per click on a button or call-to-action (page path + a CTA id: data-cta, or section + button text)
 *  Legacy     : explore_clicked / try_clicked for the Doctor Space Preview funnel (unchanged).
 *  Respects Do Not Track. Production (zerone.vn) uses the lite migration (site_events); the Preview counts stay off there. */
(function () {
  var host = location.hostname, OFFICIAL = host === "zerone.vn" || host === "www.zerone.vn";
  var LIVE = true, LEGACY = !OFFICIAL; /* LEGACY = Doctor Space Preview counts: production has no migration 48/49 yet */
  if (navigator.doNotTrack === "1" || window.doNotTrack === "1") LIVE = false;
  /* internal switch for the team: only a deliberate ?internal=1 sets the flag; ordinary visitors never write anything */
  try {
    var iq = new URLSearchParams(location.search).get("internal");
    if (iq === "1") localStorage.setItem("zerone_internal", "1"); else if (iq === "0") localStorage.removeItem("zerone_internal");
    if (localStorage.getItem("zerone_internal") === "1") LIVE = false;
  } catch (e) { /* storage unavailable: count normally */ }
  var DEV = { url: "https://ahqeigxzfrdqrpzpjhgd.supabase.co", key: "sb_publishable_xJJY7Y-q6bT0WZ3wU_N7iw_-AHjyj1m" };
  var PROD = { url: "https://wbosrucppdmuypspyyhe.supabase.co", key: "sb_publishable_I1pa7lh5MWtApaNUkJ3hIQ_FvK1HwmV" }; /* publishable keys are public by design */
  var CFG = OFFICIAL ? PROD : DEV;
  function post(fn, body) {
    if (!LIVE) return;
    try {
      fetch(CFG.url + "/rest/v1/rpc/" + fn, { method: "POST", keepalive: true, referrerPolicy: "no-referrer",
        headers: { "Content-Type": "application/json", apikey: CFG.key, Authorization: "Bearer " + CFG.key }, body: JSON.stringify(body) }).catch(function () {});
    } catch (e) { /* counting must never get in the way of the visitor */ }
  }
  function id() { var a = new Uint8Array(12); (window.crypto || window.msCrypto).getRandomValues(a); return Array.prototype.map.call(a, function (b) { return ("0" + b.toString(16)).slice(-2); }).join(""); }
  function send(kind, src) { if (!LEGACY) return; post("track_preview_event", { p_kind: kind, p_session: id(), p_source: /^[a-z0-9_-]{1,40}$/.test(src || "") ? src : null }); }

  var page = (function () { var p = location.pathname.toLowerCase().replace(/\/+$/, ""); if (!p || /\/(vi|en)$/.test(p)) p += "/index.html"; else if (!/\.[a-z]+$/.test(p)) p += ".html"; return p.slice(0, 80); })();
  var lang = /^\/vi\//.test(page) ? "vi" : "en";
  var q = new URLSearchParams(location.search), srcRaw = (q.get("src") || q.get("utm_source") || "").toLowerCase();
  var src = /^[a-z0-9_-]{1,40}$/.test(srcRaw) ? srcRaw : null;
  function refCategory() {
    var r = document.referrer, h = ""; if (!r) return "direct";
    try { h = new URL(r).hostname.toLowerCase(); } catch (e) { return "other"; }
    if (h === host || h === "www." + host) return "internal";
    if (/(^|\.)(google|bing|coccoc|duckduckgo|yahoo)\./.test(h)) return "search";
    if (/(^|\.)(facebook|fb|instagram|linkedin|tiktok|youtube|t)\.(com|me|co)$|^l\.facebook|lnkd\.in/.test(h)) return "social";
    if (/zalo\./.test(h)) return "zalo";
    if (/mail\./.test(h)) return "email";
    return "other";
  }
  function slug(s) { return (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/gi, "d").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 28); }
  function ctaId(el) {
    var d = el.getAttribute("data-cta"); if (d && /^[a-z0-9_.-]{1,60}$/.test(d)) return d;
    var href = el.getAttribute("href") || "", kind = /^mailto:/.test(href) ? "email" : /^tel:/.test(href) ? "phone" : /zalo\.me/.test(href) ? "zalo" : "";
    var sec = el.closest("[id]"), where = sec && /^[a-z0-9_-]{1,24}$/i.test(sec.id) ? sec.id.toLowerCase() : (el.closest("header,nav") ? "nav" : el.closest("footer") ? "footer" : "page");
    return (kind ? kind + "." : "") + where + "." + (slug(el.textContent) || slug(href.split("?")[0].split("/").pop()) || "btn");
  }
  function refHost() {
    var r = document.referrer; if (!r) return null;
    try { var h = new URL(r).hostname.toLowerCase(); if (h === host || h === "www." + host) return null; return /^[a-z0-9][a-z0-9.-]{1,58}[a-z0-9]$/.test(h) && h.indexOf("..") < 0 ? h : null; } catch (e) { return null; }
  }
  var ref = refCategory();
  post("track_site_event", { p_kind: "page_view", p_page: page, p_cta: null, p_lang: lang, p_ref: ref, p_src: src, p_host: refHost() });

  /* time in view: add up only the stretches the tab is visible, report the seconds when it is hidden or closed */
  var shownAt = document.visibilityState === "hidden" ? 0 : Date.now(), seen = 0;
  function flush() {
    if (shownAt) { seen += Date.now() - shownAt; shownAt = 0; }
    var secs = Math.min(1800, Math.round(seen / 1000)); seen = 0;
    if (secs >= 1) post("track_site_event", { p_kind: "page_leave", p_page: page, p_cta: null, p_lang: lang, p_ref: ref, p_src: src, p_dur: secs });
  }
  document.addEventListener("visibilitychange", function () { if (document.visibilityState === "hidden") flush(); else if (!shownAt) shownAt = Date.now(); });
  window.addEventListener("pagehide", flush);

  document.addEventListener("click", function (e) {
    var t = e.target && e.target.closest && e.target.closest("[data-journey-try],[data-zerone-demo]");
    if (t) { if (t.hasAttribute("data-journey-try")) send("try_clicked", t.getAttribute("data-journey-src")); else send("explore_clicked", "site-home"); }
    var c = e.target && e.target.closest && e.target.closest("a.btn,button.btn,[data-cta],a[href^='mailto:'],a[href^='tel:'],a[href*='zalo.me'],.hero-btn-main,.hero-btn-ghost,.space-try");
    if (c) post("track_site_event", { p_kind: "cta_click", p_page: page, p_cta: ctaId(c), p_lang: lang, p_ref: ref, p_src: src });
  }, true);
})();

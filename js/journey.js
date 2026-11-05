/*! Zerone website journey: two anonymous counts on the existing event ledger (no personal data, no cookies, no storage).
 *  explore_clicked  : "Khám phá Zerone Space" / "Explore Zerone Space"
 *  try_clicked      : "Tạo thử Doctor Space" (the link carries a website source code: site-zerone-space, site-demo)
 *  Each call sends only the kind, a random one-time id and that source code. On the official domain nothing is sent until the
 *  production backend has the event function (migration 49), so a visit to zerone.vn makes no data request for now. */
(function () {
  var host = location.hostname, OFFICIAL = host === "zerone.vn" || host === "www.zerone.vn";
  var LIVE = !OFFICIAL; /* set to true for production only after migration 49 is applied there and the founder approves */
  var CFG = { url: "https://ahqeigxzfrdqrpzpjhgd.supabase.co", key: "sb_publishable_xJJY7Y-q6bT0WZ3wU_N7iw_-AHjyj1m" };
  function id() { var a = new Uint8Array(12); (window.crypto || window.msCrypto).getRandomValues(a); return Array.prototype.map.call(a, function (b) { return ("0" + b.toString(16)).slice(-2); }).join(""); }
  function send(kind, src) {
    if (!LIVE) return;
    try {
      fetch(CFG.url + "/rest/v1/rpc/track_preview_event", { method: "POST", keepalive: true, referrerPolicy: "no-referrer",
        headers: { "Content-Type": "application/json", apikey: CFG.key, Authorization: "Bearer " + CFG.key },
        body: JSON.stringify({ p_kind: kind, p_session: id(), p_source: /^[a-z0-9_-]{1,40}$/.test(src || "") ? src : null }) }).catch(function () {});
    } catch (e) { /* counting must never get in the way of the visitor */ }
  }
  document.addEventListener("click", function (e) {
    var t = e.target && e.target.closest && e.target.closest("[data-journey-try],[data-zerone-demo]");
    if (!t) return;
    if (t.hasAttribute("data-journey-try")) send("try_clicked", t.getAttribute("data-journey-src"));
    else send("explore_clicked", "site-home");
  }, true);
})();

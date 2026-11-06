/*! Zerone Space demo: opens the demo video in a phone-frame dialog from the landing page's
 *  "Explore Zerone Space" / "Khám phá Zerone Space" button.
 *
 *  Add to the landing page (video files live in the same folder as this script):
 *    <script src="/demo/zerone-demo.js" defer></script>
 *
 *  The button needs no change: it is found by its text, or mark any element with data-zerone-demo.
 *  Also: window.ZeroneDemo.open() / .close(), and the link #demo opens it. If the script does not load, a button
 *  that is a link can point to /demo/ (the same video on its own page). No dependencies, no tracking. */
(function () {
  var script = document.currentScript;
  var base = script && script.src ? script.src.replace(/[^/?#]*([?#].*)?$/, "") : "/demo/";

  var TEXT = {
    vi: { close: "Đóng", label: "Bản demo Zerone Space", toggle: "Phát hoặc dừng video", note: "Hình ảnh, bác sĩ và dữ liệu trong video là minh họa.", flow: "Khám phá → Đặt lịch → Quay lại", flowNote: "Tìm bác sĩ, gửi yêu cầu đặt lịch, theo dõi để quay lại.", invite: "Đã hình dung trải nghiệm? Hãy xem Doctor Space của chính bạn.", inviteCta: "Tạo thử Doctor Space" },
    en: { flow: "Discover → Book → Return", flowNote: "Find a doctor, send a booking request, follow to come back.", close: "Close", label: "Zerone Space demo", toggle: "Play or pause the video", note: "Images, doctors and data in the video are illustrative." },
  };
  var LABEL = /^\s*(explore|khám phá)\s+zerone\s+space\s*$/i;

  var CSS =
    ".zd-root{position:fixed;inset:0;z-index:2147483000;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;" +
    "padding:max(16px,env(safe-area-inset-top,0px)) max(16px,env(safe-area-inset-right,0px)) max(16px,env(safe-area-inset-bottom,0px)) max(16px,env(safe-area-inset-left,0px));" +
    "box-sizing:border-box;background:rgba(14,18,26,.58);-webkit-backdrop-filter:blur(16px) saturate(1.1);backdrop-filter:blur(16px) saturate(1.1);" +
    "opacity:0;transition:opacity .22s ease;font-family:'Be Vietnam Pro',system-ui,-apple-system,'Segoe UI',sans-serif}" +
    ".zd-root.zd-open{opacity:1}" +
    ".zd-phone{--sw:min(390px,calc(100vw - 32px - 22px),calc((100dvh - 190px) * 390 / 844));--r:calc(var(--sw) * .118);position:relative;padding:11px;" +
    "border-radius:calc(var(--r) + 11px);background:linear-gradient(145deg,#3a3e47,#1a1c21 28%,#1a1c21 72%,#3a3e47);" +
    "box-shadow:0 0 0 1.5px rgba(255,255,255,.07) inset,0 50px 100px -20px rgba(0,0,0,.7),0 16px 36px -12px rgba(0,0,0,.5);" +
    "transform:translateY(14px) scale(.97);transition:transform .3s cubic-bezier(.2,.8,.2,1)}" +
    ".zd-open .zd-phone{transform:none}" +
    ".zd-phone:before,.zd-phone:after{content:'';position:absolute;width:3px;background:#3a3e47;border-radius:2px}" +
    ".zd-phone:before{left:-3px;top:17%;height:7%;box-shadow:0 calc(var(--sw) * .2) 0 #3a3e47,0 calc(var(--sw) * .36) 0 #3a3e47}" +
    ".zd-phone:after{right:-3px;top:25%;height:13%}" +
    ".zd-screen{position:relative;width:var(--sw);aspect-ratio:390/844;border-radius:var(--r);overflow:hidden;background:#eef3f8}" +
    ".zd-screen video{display:block;width:100%;height:100%;object-fit:cover}" +
    ".zd-island{position:absolute;z-index:2;left:50%;top:calc(var(--sw) * .03);transform:translateX(-50%);width:calc(var(--sw) * .29);height:calc(var(--sw) * .085);border-radius:999px;background:#000;pointer-events:none}" +
    ".zd-toggle{position:absolute;inset:0;z-index:1;width:100%;border:0;padding:0;background:transparent;cursor:pointer;display:grid;place-items:center}" +
    ".zd-toggle:focus-visible,.zd-close:focus-visible{outline:3px solid #fff;outline-offset:3px}" +
    ".zd-play{width:64px;height:64px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.85);box-shadow:0 10px 30px rgba(0,0,0,.25);opacity:0;transform:scale(.9);transition:opacity .2s,transform .2s}" +
    ".zd-paused .zd-play{opacity:1;transform:none}" +
    ".zd-close{position:absolute;top:max(14px,env(safe-area-inset-top,0px));right:max(14px,env(safe-area-inset-right,0px));width:44px;height:44px;border-radius:50%;border:1px solid rgba(255,255,255,.28);" +
    "background:rgba(255,255,255,.14);color:#fff;cursor:pointer;display:grid;place-items:center;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);transition:background .15s}" +
    ".zd-close:hover{background:rgba(255,255,255,.26)}" +
    ".zd-invite{margin:0;max-width:30em;text-align:center;font-size:14.5px;line-height:1.5;color:rgba(255,255,255,.92)}.zd-try{color:#fff;font-weight:600;text-decoration:underline;text-underline-offset:3px;white-space:nowrap}.zd-try:focus-visible{outline:3px solid #fff;outline-offset:3px;border-radius:4px}" +
    ".zd-flow{margin:0;max-width:32em;text-align:center;font-size:13.5px;line-height:1.45;color:rgba(255,255,255,.9)}.zd-flow b{display:block;font-size:15px;font-weight:600;letter-spacing:.02em;color:#fff}.zd-note{margin:0;max-width:30em;text-align:center;font-size:12.5px;line-height:1.5;color:rgba(255,255,255,.72)}" +
    "@media (max-width:520px){.zd-flow span{display:none}.zd-phone{--sw:min(390px,calc(100vw - 54px),calc((100dvh - 215px) * 390 / 844))}}" +
    "@media (max-height:640px){.zd-note{display:none}.zd-phone{--sw:min(390px,calc(100vw - 54px),calc((100dvh - 56px) * 390 / 844))}}" +
    "@media (prefers-reduced-motion:reduce){.zd-root,.zd-phone,.zd-play{transition:none}}";

  var root, lastFocus, closeTimer, prefetched, calm = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)");

  function el(html) { var d = document.createElement("div"); d.innerHTML = html; return d.firstChild; }

  function lang(trigger) {
    var t = trigger && trigger.textContent || "";
    if (/explore/i.test(t)) return "en";
    if (/khám phá/i.test(t)) return "vi";
    return /^en/i.test(document.documentElement.lang || "") ? "en" : "vi";
  }

  function open(trigger) {
    if (root) return;
    if (!document.getElementById("zd-style")) {
      var s = document.createElement("style"); s.id = "zd-style"; s.textContent = CSS; document.head.appendChild(s);
    }
    var tx = TEXT[lang(trigger)];
    lastFocus = document.activeElement;
    root = el(
      '<div class="zd-root" role="dialog" aria-modal="true" aria-label="' + tx.label + '">' +
        '<button class="zd-close" type="button" aria-label="' + tx.close + '">' +
          '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 4l10 10M14 4L4 14"/></svg></button>' +
        '<div class="zd-phone"><div class="zd-screen zd-paused">' +
          '<span class="zd-island" aria-hidden="true"></span>' +
          '<video muted loop playsinline poster="' + base + 'zerone-space-demo-poster.jpg">' +
            '<source src="' + base + 'zerone-space-demo.mp4" type="video/mp4">' +
            '<source src="' + base + 'zerone-space-demo.webm" type="video/webm"></video>' +
          '<button class="zd-toggle" type="button" aria-label="' + tx.toggle + '"><span class="zd-play" aria-hidden="true">' +
            '<svg width="22" height="22" viewBox="0 0 24 24" fill="#1f2b3d"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5z"/></svg></span></button>' +
        '</div></div>' +
        '<p class="zd-flow"><b>' + tx.flow + '</b><span>' + tx.flowNote + '</span></p>' +
        (tx.invite ? '<p class="zd-invite">' + tx.invite + ' <a class="zd-try" href="' + base + '../vi/xem-truoc.html?src=site-demo" data-journey-try data-journey-src="site-demo">' + tx.inviteCta + ' →</a></p>' : '') +
        '<p class="zd-note">' + tx.note + '</p>' +
      '</div>');
    var screen = root.querySelector(".zd-screen"), video = root.querySelector("video"), toggle = root.querySelector(".zd-toggle"), close = root.querySelector(".zd-close");
    var sync = function () { screen.classList.toggle("zd-paused", video.paused); };
    video.addEventListener("play", sync); video.addEventListener("pause", sync);
    toggle.addEventListener("click", function () { if (video.paused) { video.play().catch(sync); } else { video.pause(); } });
    close.addEventListener("click", closeDialog);
    root.addEventListener("click", function (e) { if (e.target === root) closeDialog(); });
    root.addEventListener("keydown", trap);
    document.documentElement.style.overflow = "hidden";
    document.body.appendChild(root);
    requestAnimationFrame(function () { requestAnimationFrame(function () { root.classList.add("zd-open"); }); });
    close.focus();
    if (!(calm && calm.matches)) { var p = video.play(); if (p && p.catch) p.catch(sync); }
    sync();
  }

  function closeDialog() {
    if (!root) return;
    var r = root; root = null;
    var v = r.querySelector("video"); if (v) v.pause();
    r.classList.remove("zd-open");
    document.documentElement.style.overflow = "";
    clearTimeout(closeTimer);
    closeTimer = setTimeout(function () { if (r.parentNode) r.parentNode.removeChild(r); }, calm && calm.matches ? 0 : 240);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    if (location.hash === "#demo") history.replaceState(null, "", location.pathname + location.search);
  }

  function trap(e) {
    if (e.key === "Escape") { e.preventDefault(); closeDialog(); return; }
    if (e.key !== "Tab") return;
    var items = root.querySelectorAll("button, a[href]"), first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function triggerFrom(node) {
    var t = node && node.closest && node.closest("[data-zerone-demo],a,button,[role=button]");
    if (!t) return null;
    return t.hasAttribute("data-zerone-demo") || LABEL.test(t.textContent || "") ? t : null;
  }

  // fetch the video once the visitor shows interest, so it starts at once when the dialog opens
  function warm(e) {
    if (prefetched || !triggerFrom(e.target)) return;
    prefetched = true;
    var l = document.createElement("link"); l.rel = "prefetch"; l.as = "video"; l.href = base + "zerone-space-demo.mp4"; document.head.appendChild(l);
  }

  document.addEventListener("pointerover", warm, { passive: true });
  document.addEventListener("focusin", warm);
  document.addEventListener("click", function (e) {
    var t = triggerFrom(e.target);
    if (!t || e.defaultPrevented || e.button > 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    open(t);
  }, true);
  window.addEventListener("hashchange", function () { if (location.hash === "#demo") open(); });
  if (location.hash === "#demo") window.addEventListener("load", function () { open(); });

  window.ZeroneDemo = { open: function () { open(); }, close: closeDialog };
})();

/* Approach page: the red thread grows with the scroll, from the journey drawing down through the page.
   The four words appear as the thread reaches them. Without scripting, or with reduced motion, everything is shown. */
(function () {
  var box = document.querySelector(".tt3");
  if (!box || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var root = document.documentElement;
  var dots = [].slice.call(box.querySelectorAll(".tt3-dot"));
  var words = [].slice.call(box.querySelectorAll(".tt3-s"));
  var tails = [].slice.call(document.querySelectorAll(".tt3-drop, .ap2-fork, .ap2-merge, .ap2-out"));
  var path, length = 0, stops = [], waiting = false;

  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

  /* The drawing is stretched to its box and the stroke is not scaled, so lengths are measured in screen pixels. */
  function measure() {
    var narrow = matchMedia("(max-width: 720px)").matches;
    path = box.querySelector(narrow ? ".tt3-curve-m path" : ".tt3-curve-d path");
    var size = path.ownerSVGElement.getBoundingClientRect();
    var total = path.getTotalLength(), points = [], last = null, run = 0;
    for (var i = 0; i <= 400; i++) {
      var q = path.getPointAtLength(total * i / 400);
      var x = q.x * size.width / 100, y = q.y * size.height / 100;
      if (last) run += Math.hypot(x - last.x, y - last.y);
      last = { x: x, y: y, at: run };
      points.push(last);
    }
    length = run + 2;
    stops = dots.map(function (dot) {
      var x = parseFloat(dot.style.getPropertyValue(narrow ? "--mx" : "--dx")) * size.width / 100;
      var y = parseFloat(dot.style.getPropertyValue(narrow ? "--my" : "--dy")) * size.height / 100;
      var best = points[0], far = Infinity;
      points.forEach(function (p) { var d = Math.hypot(p.x - x, p.y - y); if (d < far) { far = d; best = p; } });
      return best.at;
    });
    path.style.strokeDasharray = length + " " + length;
  }

  function draw() {
    waiting = false;
    var vh = window.innerHeight, r = box.getBoundingClientRect();
    /* drawing starts when its top passes a little below mid-screen and is complete after three quarters of its height */
    var p = clamp((vh * 0.55 - r.top) / (r.height * 0.75));
    path.style.visibility = p > 0 ? "visible" : "hidden";
    path.style.strokeDashoffset = (length * (1 - p)).toFixed(1);
    stops.forEach(function (at, i) {
      var on = p > 0 && length * p >= at - 4;
      if (dots[i]) dots[i].classList.toggle("on", on);
      if (words[i]) words[i].classList.toggle("on", on);
    });
    var atEnd = vh + window.scrollY >= root.scrollHeight - 2;
    tails.forEach(function (el) {
      var b = el.getBoundingClientRect();
      var q = atEnd ? 1 : clamp((vh * 0.72 - b.top) / b.height);
      if (el.classList.contains("tt3-drop") && p < 1) q = 0; /* the thread leaves the picture only after crossing it */
      el.style.clipPath = q >= 1 ? "" : "inset(-14px -14px " + (b.height + 14 - q * (b.height + 28)).toFixed(1) + "px -14px)";
    });
  }

  function ask() { if (!waiting) { waiting = true; window.requestAnimationFrame(draw); } }

  root.classList.add("tt3-js");
  measure();
  draw();
  window.addEventListener("scroll", ask, { passive: true });
  window.addEventListener("resize", function () { measure(); ask(); });
  window.addEventListener("load", function () { measure(); ask(); });
})();

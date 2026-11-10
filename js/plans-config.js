/* Payment backend for the plan page. Empty = no backend: checkout falls back to the email path (public production default; online payment is closed).
   Staging and the controlled real-money test use other configs (see plans-config.prod.js, kept aside, never public until the founder's final go). */
window.ZERONE_API = {};

/* Listed prices exclude VAT; this rate is only the display fallback (the server quote carries the real one). */
window.ZERONE_PRICING = { vat_rate_pct: 8 };

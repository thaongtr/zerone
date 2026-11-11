/* Payment backend for the plan page. Connected to production (Go 2026-11-10). Orders are recorded; bank transfer / QR opens by itself only when the database approves billing. If the backend is unreachable the page falls back to the email path.
   Staging and the controlled real-money test use other configs (see plans-config.prod.js, kept aside, never public until the founder's final go). */
window.ZERONE_API = { url: "https://wbosrucppdmuypspyyhe.supabase.co", key: "sb_publishable_I1pa7lh5MWtApaNUkJ3hIQ_FvK1HwmV" };   /* production backend, connected with the founder's Go on 2026-11-10; the key is the publishable one, public by design */

/* Listed prices exclude VAT; this rate is only the display fallback (the server quote carries the real one). */
window.ZERONE_PRICING = { vat_rate_pct: 8 };

/* Payment methods on the checkout: bank transfer / QR and card. Bank transfer / QR opens by itself when the database approves billing.
   card = Visa/Mastercard through AppotaPay (automatic recurring charging, when offered, is an opt-in inside this method). false = listed as "not available". */
window.ZERONE_PAY = { card: false };

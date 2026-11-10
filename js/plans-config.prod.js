/* Production backend for the plan page. NEVER deployed as plans-config.js on a public page until the founder gives the final go.
   The real-money test copies this file over plans-config.js in a temporary export that goes to the unlisted "prod-test" preview alias only.
   The key is the project's publishable (anon) key, public by design: all protection is in the database. */
window.ZERONE_API = { url: "https://wbosrucppdmuypspyyhe.supabase.co", key: "sb_publishable_I1pa7lh5MWtApaNUkJ3hIQ_FvK1HwmV" };

/* Listed prices exclude VAT; this rate is only the display fallback (the server quote carries the real one). */
window.ZERONE_PRICING = { vat_rate_pct: 8 };

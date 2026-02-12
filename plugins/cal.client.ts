export default defineNuxtPlugin(() => {
  // Only run on client
  if (import.meta.server) return;

  // Initialize Cal queue function
  (window as any).Cal =
    (window as any).Cal ||
    function () {
      let cal = (window as any).Cal;
      let ar = arguments;
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        document.head.appendChild(document.createElement("script")).src =
          "https://app.cal.com/embed/embed.js";
        cal.loaded = true;
      }
      if (ar[0] === "init") {
        const api = function () {
          api.q.push(arguments);
        };
        const namespace = ar[1];
        (api as any).q = (api as any).q || [];
        if (typeof namespace === "string") {
          cal.ns[namespace] = api;
          cal.q.push(ar);
        } else {
          cal.q.push(ar);
        }
        return;
      }
      cal.q.push(ar);
    };

  // Initialize
  (window as any).Cal("init", { origin: "https://app.cal.com" });
  (window as any).Cal("ui", {
    styles: { branding: { brandColor: "#0ea5e9" } },
    hideEventTypeDetails: false,
    layout: "month_view",
  });
});

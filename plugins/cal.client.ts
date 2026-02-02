export default defineNuxtPlugin(() => {
  // Only run on client
  if (import.meta.server) return;

  // Load Cal.com embed script
  const script = document.createElement("script");
  script.src = "https://app.cal.com/embed/embed.js";
  script.async = true;
  script.onload = () => {
    // Initialize Cal after script loads
    (window as any).Cal?.("init", { origin: "https://app.cal.com" });
    (window as any).Cal?.("ui", {
      styles: { branding: { brandColor: "#0ea5e9" } },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  };
  document.head.appendChild(script);
});

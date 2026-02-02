export const useCal = () => {
    // Replace with your actual Cal.com username and event type
    const CAL_LINK = "mcjoseph/30min";

    const openCalPopup = () => {
        if (import.meta.server) return;

        const Cal = (window as any).Cal;
        if (Cal) {
            Cal("openModal", {
                calLink: CAL_LINK,
                config: {
                    layout: "month_view",
                },
            });
        } else {
            // Fallback: open Cal.com in new tab if embed fails
            window.open(`https://cal.com/${CAL_LINK}`, "_blank");
        }
    };

    return {
        CAL_LINK,
        openCalPopup,
    };
};

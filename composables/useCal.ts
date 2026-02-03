export const useCal = () => {
    // Replace with your actual Cal.com username and event type
    const CAL_LINK = "mcjoseph/30min";

    const openCalPopup = () => {
        if (import.meta.server) return;

        // Simply open Cal.com booking page in a new tab
        // This is more reliable than the embed which has initialization issues
        window.open(`https://cal.com/${CAL_LINK}`, "_blank");
    };

    return {
        CAL_LINK,
        openCalPopup,
    };
};

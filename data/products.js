/* ==========================================================
   STORE LINKS for the app sites. Paste each Gumroad product link here.
   Leave a link "" and every Buy button for that app shows
   "Coming soon" instead (nothing else needs editing).
   ========================================================== */
window.PRODUCTS = {
  // buy:  Gumroad product link.   demo: the YouTube video ID of the demo (the part after watch?v=).
  "queens-court":  { name: "Queens Court",  price: "$19.99", buy: "https://madteaparty.gumroad.com/l/queens-court", demo: "e2aQhTt1J4c" },   // e.g. buy: "https://yourname.gumroad.com/l/queens-court"
  "looking-glass": { name: "Looking Glass", price: "$14.99", buy: "https://madteaparty.gumroad.com/l/looking-glass", demo: "oR9c80A1LQQ",
    // Free demo download (3 streams). Paste the download link when it's live; until then the button says "available <demoDate>".
    demoDownload: "https://madteaparty.gumroad.com/l/looking-glass", demoDate: "Nov 9" },   // e.g. demo: "dQw4w9WgXcQ"
  // Price left blank until decided: buttons then read "Coming soon".
  "revenue-simulator": { name: "Mobile Game Revenue Simulator", price: "$14.99", buy: "https://madteaparty.gumroad.com/l/mobile-game-revenue-simulator", demo: "2qgQ1qNfoq0" },
  // Game Dev Kits (Unity plugins): paste each store link; "" shows "Coming soon" on that button.
  devkits: {
    "levelplay":    { name: "LevelPlay for Unity",    fab: "", unity: "", gumroad: "" },
    "appodeal":     { name: "Appodeal for Unity",     fab: "", unity: "", gumroad: "" },
    "admob":        { name: "Google AdMob for Unity", fab: "", unity: "", gumroad: "" },
    "localization": { name: "Localization for Unity", fab: "", unity: "", gumroad: "" }
  },
  // Affiliate application: your Google Form link (affiliates.html). "" = the Apply button emails you instead.
  affiliateForm: "https://forms.gle/Jr7dZND9wVxVWv1y8",
  // Tutorials page: the ID of the Google Sheet (Share > Anyone with the link > Viewer).
  tutorialsSheet: "1WIG4TNC7g5jkqZRRL2mv1S7tsvN3gOjGLMNoiHyuWP4",
  // Affiliate top 10: the "Leaderboard" tab of the same Sheet (columns Name | Link | Sales). Add only people who said yes.
  leaderboardSheet: "",
  leaderboardTab: "Leaderboard",
  // Founding Members: how many buyers get a spot on the wall.
  foundingSpots: 50,
  supportForm: "https://forms.gle/2CixqjeG1XYBWkGUA",
  supportEmail: "madteapartydevelopment@outlook.com"
};

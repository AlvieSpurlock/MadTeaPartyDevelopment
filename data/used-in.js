/* ==========================================================
   USED IN / USED BY: the games and projects built with each tool and kit.
   Shows on each product's landing page (a few cards) and on its "Used In" page (all of them).

   To add a project, copy one { ... } line into the right list:
     name:  the project's name
     by:    who made it (studio or person)
     url:   a link to it ("" for no link). Local pages start with ../ (e.g. "../scorchlet/index.html")
     logo:  an image ("" for none). Local images start with assets/ (e.g. "assets/logos/scorchlet.webp")
     how:   one short line on what the tool does in that project
   An empty list shows a friendly "be the first" note instead.
   ========================================================== */
window.USED_IN = {
  /* ---- Dev tools ---- */
  "queens-court": [
    { name: "Mimic Masters", by: "March Hare Games", url: "../mimic-masters/index.html", logo: "assets/logos/mimic-masters.webp",
      how: "Pitches outlets and creators, and emails new stores to carry the flier." },
    { name: "Mad Tea Party Development", by: "The whole studio", url: "../index.html", logo: "assets/logos/mad-tea-party.webp",
      how: "Runs the outreach and posting for every Mad Tea Party and March Hare release." }
  ],
  "looking-glass": [
    { name: "Mimic Masters", by: "March Hare Games", url: "../mimic-masters/index.html", logo: "assets/logos/mimic-masters.webp",
      how: "Turns stream recordings into captioned vertical clips and posts them across socials." },
    { name: "Mad Tea Party Development", by: "The whole studio", url: "../index.html", logo: "assets/logos/mad-tea-party.webp",
      how: "Clips and posts for every Mad Tea Party and March Hare release." }
  ],
  "revenue-simulator": [],
  "asset-logger": [],

  /* ---- Game Dev Kits ---- */
  "appodeal": [
    { name: "Mimic Masters", by: "March Hare Games", url: "../mimic-masters/index.html", logo: "assets/logos/mimic-masters.webp",
      how: "Serves the ads players can tune or turn off." }
  ],
  "levelplay": [],
  "admob": [],
  "localization": []
};

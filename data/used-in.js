/* ==========================================================
   USED IN / USED BY: the games and apps built or marketed with each tool and kit.
   Shows on each product's landing page (first 3) and on its "Used In" page (all of them).

   To add a project, copy one { ... } line into the right list:
     name:  the project's name
     by:    who made it
     url:   a link to it ("" for no link). Local pages start with ../ (e.g. "../scorchlet/index.html")
     logo:  an image ("" for none). Local images start with assets/ (e.g. "assets/logos/scorchlet.webp")
     how:   one short line on what the tool does for that project
   An empty list shows a friendly "be the first" note instead.
   ========================================================== */
(function () {
  var MM  = { name: "Mimic Masters", by: "March Hare Games", url: "../mimic-masters/index.html", logo: "assets/logos/mimic-masters.webp" };
  var SC  = { name: "Scorchlet", by: "March Hare Games", url: "../scorchlet/index.html", logo: "assets/logos/scorchlet.webp" };
  var DND = { name: "D&D Combat Balancer", by: "Mad Tea Party Development", url: "../dnd-combat-balancer/index.html", logo: "assets/covers/dnd-combat-balancer.webp" };
  var AL  = { name: "Asset Logger", by: "Mad Tea Party Development", url: "../asset-logger/index.html", logo: "assets/covers/asset-logger.webp" };
  var SIM = { name: "Mobile Game Revenue Simulator", by: "Mad Tea Party Development", url: "../revenue-simulator/index.html", logo: "assets/icons/coins_pouch.webp" };
  var QC  = { name: "Queens Court", by: "Mad Tea Party Development", url: "../queens-court/index.html", logo: "assets/icons/crown.webp" };
  var LG  = { name: "Looking Glass", by: "Mad Tea Party Development", url: "../looking-glass/index.html", logo: "assets/icons/looking_glass.webp" };
  var use = function (p, how) { return Object.assign({}, p, { how: how }); };

  window.USED_IN = {
    /* ---- Dev tools ---- */
    "queens-court": [
      use(MM,  "Pitches outlets and creators, and emails new stores to carry the flier."),
      use(SC,  "Pitches cozy-game creators, streamers and outlets."),
      use(DND, "Finds and pitches tabletop creators, blogs and communities."),
      use(AL,  "Pitches indie dev creators and blogs."),
      use(SIM, "Pitches indie mobile developer creators and blogs."),
      use(LG,  "Pitches streamer-tool creators and communities."),
      use(QC,  "Runs its own launch: pitches, posts and follow-ups.")
    ],
    "looking-glass": [
      use(MM,  "Turns stream recordings into captioned vertical clips and posts them across socials."),
      { name: "Mad Tea Party Development", by: "The studio's social accounts", url: "../socials.html", logo: "assets/logos/mad-tea-party.webp",
        how: "Clips and posts for the studio and its social accounts." }
    ],
    "asset-logger": [
      use(SC,  "Documented every third-party asset in Scorchlet.")
    ],

    /* ---- Game Dev Kits ---- */
    "appodeal": [
      use(MM,  "Serves the ads players can tune or turn off.")
    ],
    "localization": [
      Object.assign({}, MM, { name: "Mimic Masters (earlier version)", how: "Translated an earlier version of the game." })
    ],
    "levelplay": [],
    "admob": []
  };
})();

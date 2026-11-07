/* ==========================================================
   TrafficReceiver.gs  ·  page-view counter for Mad Tea Party Development, March Hare Games
   and the standalone Mimic Masters site. Lives in your private Google Sheet's Apps Script project
   (Extensions → Apps Script). Follows the Traffic Tracking blueprint.

   - doPost: receives p = page and s = source from the websites, validates them, and adds 1 to the
     row for today + page + source in the raw "Traffic" tab (one row per day/page/source).
   - doGet: answers "ok", so opening the web app URL in a browser confirms it is live.
   - setup(): builds the report tabs:
       Overview                   the three brands side by side
       Mad Tea Party Development  software shop, studio pages, every software landing page, demo download clicks
       March Hare Games           games home and every game's landing page
       Mimic Masters              every page of the standalone site
     Each brand tab: a page table (today / 7 days / all time), a most-viewed-this-week ranking,
     where visits came from, and views per day. Run setup() once, and again after editing BRANDS.
     It never touches the raw Traffic tab.

   After changing this code: Deploy → Manage deployments → pencil (edit) → Version: New version →
   Deploy. Editing the existing deployment keeps the same /exec URL, so the websites keep working.
   ========================================================== */

var TZ = 'America/Chicago';
var MAX_ROWS = 40000;      // flood guard: no new rows past this
var TRAFFIC = 'Traffic';

/* Which pages belong to which brand, with the name to show for each.
   The studio sites only send their landing pages; the standalone Mimic Masters site sends every page. */
var BRANDS = [
  { tab: 'Mad Tea Party Development', color: '#3a2463', sections: [
    ['Studio', [
      ['Software Shop (home)', 'studio.index.html'],
      ['Transparency', 'studio.transparency.html'],
      ['Ethical Indie Dev Coalition', 'studio.coalition.html'],
      ['Socials', 'studio.socials.html'],
      ['Founding Members', 'studio.founding-members.html'],
      ['Become an Affiliate', 'studio.affiliates.html'],
      ['Tutorials', 'studio.tutorials.html']
    ]],
    ['Software', [
      ['Queens Court', 'queens-court.index.html'],
      ['Looking Glass', 'looking-glass.index.html'],
      ['Mobile Game Revenue Simulator', 'revenue-simulator.index.html'],
      ['Asset Logger', 'asset-logger.index.html'],
      ['D&D Combat Balancer', 'dnd-combat-balancer.index.html']
    ]],
    ['Clicks', [
      ['Looking Glass demo downloads (button clicks)', 'looking-glass.demo-download.html'],
      ['Affiliate applications (Apply button clicks)', 'studio.affiliate-apply.html']
    ]]
  ]},
  { tab: 'March Hare Games', color: '#5b2a86', sections: [
    ['Studio', [
      ['March Hare Games (home)', 'studio.games.html']
    ]],
    ['Games', [
      ['Mimic Masters (on the studio site)', 'mimic-masters.index.html'],
      ['Scorchlet', 'scorchlet.index.html'],
      ['Hero Impervious', 'hero-impervious.index.html'],
      ['We Built This City', 'we-built-this-city.index.html']
    ]]
  ]},
  { tab: 'Mimic Masters', color: '#240a45', sections: [
    ['Standalone site', [
      ['Home', 'index.html'],
      ['Free Demo', 'play.html'],
      ['About Creator', 'about-creator.html'],
      ['Accessibility', 'accessibility.html'],
      ['Adjustable Ads', 'adjustable-ads.html'],
      ['Android Tester', 'android-tester.html'],
      ['Battle For Time', 'battle-for-time.html'],
      ['Cadence Tracker', 'cadence-tracker.html'],
      ['Charity', 'charity.html'],
      ['Classic', 'classic.html'],
      ['Community', 'community.html'],
      ['Contact', 'contact.html'],
      ['Coverage', 'coverage.html'],
      ['Customization', 'customization.html'],
      ['Elemental Bash', 'elemental-bash.html'],
      ['Ethical Indie Dev Coalition', 'ethical-indie-dev-coalition.html'],
      ['In-Depth Feedback', 'feedback-in-depth.html'],
      ['Quick Feedback', 'feedback-short.html'],
      ['iOS Tester', 'ios-tester.html'],
      ['Join Android', 'join-android.html'],
      ['Join iOS', 'join-ios.html'],
      ['Parry Madness', 'parry-madness.html'],
      ['Press', 'press.html'],
      ['Privacy', 'privacy.html'],
      ['Quantum Overload', 'quantum-overload.html'],
      ['Recommend Indie Dev', 'recommend-indie-dev.html'],
      ['Recommend Store', 'recommend-store.html'],
      ['Shuffle Board', 'shuffle-board.html'],
      ['Signup Indie Dev', 'signup-indie-dev.html'],
      ['Signup Store', 'signup-store.html'],
      ['Store Network', 'store-network.html'],
      ['Support', 'support.html'],
      ['Transparency', 'transparency.html'],
    ]]
  ]}
];

/* ---------------- receiver ---------------- */
function doGet() {
  return ContentService.createTextOutput('ok');
}

function doPost(e) {
  var prm = (e && e.parameter) || {};
  var p = String(prm.p || '').toLowerCase();
  if (!/^[a-z0-9._-]{1,60}\.html$/.test(p)) return ContentService.createTextOutput('bad');
  var s = String(prm.s || 'direct').toLowerCase().replace(/[^a-z0-9:._-]/g, '').slice(0, 40) || 'direct';

  var lock = LockService.getScriptLock();
  if (!lock.tryLock(8000)) return ContentService.createTextOutput('busy');
  try {
    var sh = trafficSheet_();
    var day = Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd');
    var key = day + '|' + p + '|' + s;
    var last = sh.getLastRow();
    var hit = last > 1 ? sh.getRange(2, 5, last - 1, 1).createTextFinder(key).matchEntireCell(true).findNext() : null;
    if (hit) {
      var cell = sh.getRange(hit.getRow(), 4);
      cell.setValue((Number(cell.getValue()) || 0) + 1);
    } else if (last < MAX_ROWS) {
      sh.appendRow([day, p, s, 1, key]);
    }
    return ContentService.createTextOutput('ok');
  } finally {
    lock.releaseLock();
  }
}

function trafficSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(TRAFFIC) || ss.insertSheet(TRAFFIC);
  if (sh.getLastRow() === 0) {
    sh.appendRow(['Date', 'Page', 'Source', 'Views', 'Key']);
    sh.setFrozenRows(1);
    sh.getRange('1:1').setFontWeight('bold');
  }
  return sh;
}

/* ---------------- report tabs ---------------- */
var RD = 'Traffic!$A$2:$A', RP = 'Traffic!$B$2:$B', RS = 'Traffic!$C$2:$C', RV = 'Traffic!$D$2:$D';
var DAY = 'TEXT(' + RD + ',"yyyy-mm-dd")';
var WHEN = {
  today: '*(' + DAY + '=TEXT(TODAY(),"yyyy-mm-dd"))',
  week:  '*(' + DAY + '>=TEXT(TODAY()-6,"yyyy-mm-dd"))',
  all:   ''
};
function sumFor_(pageExpr, when) { return '=SUMPRODUCT((' + RP + '=' + pageExpr + ')' + WHEN[when] + '*' + RV + ')'; }
function regexEscape_(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function pagesOf_(brand) {
  var out = [];
  brand.sections.forEach(function (sec) { sec[1].forEach(function (pg) { out.push(pg); }); });
  return out;
}

function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  trafficSheet_();
  ['Totals', 'Sources', 'Daily'].forEach(function (old) {   // tabs from the earlier version of this script
    var sh = ss.getSheetByName(old); if (sh) ss.deleteSheet(sh);
  });
  var totals = [];
  BRANDS.forEach(function (b, i) { totals.push(buildBrand_(ss, b, i + 1)); });
  buildOverview_(ss, totals);
  ss.setActiveSheet(ss.getSheetByName('Overview'));
}

function fresh_(ss, name, index) {
  var sh = ss.getSheetByName(name);
  if (sh) { sh.clear(); sh.getCharts().forEach(function (c) { sh.removeChart(c); }); }
  else sh = ss.insertSheet(name, index);
  return sh;
}

function buildBrand_(ss, brand, index) {
  var sh = fresh_(ss, brand.tab, index);
  var rows = [[brand.tab, '', '', '', ''], ['Page', 'Today', 'Last 7 days', 'All time', 'page id']];
  var sectionRows = [], pageRows = [];
  var r = 3;
  brand.sections.forEach(function (sec) {
    var first = r + 1, last = r + sec[1].length;
    rows.push([sec[0], '=SUM(B' + first + ':B' + last + ')', '=SUM(C' + first + ':C' + last + ')', '=SUM(D' + first + ':D' + last + ')', '']);
    sectionRows.push(r); r++;
    sec[1].forEach(function (pg) {
      rows.push(['   ' + pg[0], sumFor_('$E' + r, 'today'), sumFor_('$E' + r, 'week'), sumFor_('$E' + r, 'all'), pg[1]]);
      pageRows.push(r); r++;
    });
  });
  var totalRow = r;
  rows.push(['TOTAL',
    '=' + sectionRows.map(function (x) { return 'B' + x; }).join('+'),
    '=' + sectionRows.map(function (x) { return 'C' + x; }).join('+'),
    '=' + sectionRows.map(function (x) { return 'D' + x; }).join('+'), '']);
  sh.getRange(1, 1, rows.length, 5).setValues(rows);

  // Look
  sh.getRange('A1:E1').merge().setFontSize(14).setFontWeight('bold').setFontColor('#ffffff').setBackground(brand.color);
  sh.getRange('A2:E2').setFontWeight('bold').setBackground('#efe7ff');
  sectionRows.forEach(function (x) { sh.getRange(x, 1, 1, 4).setFontWeight('bold').setBackground('#f6f1ff'); });
  sh.getRange(totalRow, 1, 1, 4).setFontWeight('bold').setBackground('#ffd23f');
  sh.getRange(3, 5, rows.length, 1).setFontColor('#9a92a8');
  sh.setColumnWidth(1, 280); sh.setColumnWidths(2, 3, 100); sh.setColumnWidth(5, 220);
  sh.setFrozenRows(2);

  // Most viewed this week (right side): ranks this tab's pages
  sh.getRange('G1').setValue('Most viewed, last 7 days').setFontWeight('bold');
  sh.getRange('G2:H2').setValues([['Page', 'Views']]).setFontWeight('bold').setBackground('#efe7ff');
  var f = pageRows[0], l = pageRows[pageRows.length - 1];
  sh.getRange('G3').setFormula('=IFERROR(QUERY({ARRAYFORMULA(TRIM(A' + f + ':A' + l + ')),C' + f + ':C' + l + ',E' + f + ':E' + l + '},"select Col1, Col2 where Col2 > 0 and Col3 <> \'\' order by Col2 desc",0),"No views yet this week")');
  sh.setColumnWidth(7, 260);

  // Where visits came from (this tab's pages only)
  var ids = pagesOf_(brand).map(function (pg) { return regexEscape_(pg[1]); }).join('|');
  var srcRow = Math.max(rows.length, pageRows.length + 4) + 3;
  sh.getRange('A' + srcRow).setValue('Where visits came from (all time)').setFontWeight('bold');
  sh.getRange('A' + (srcRow + 1)).setFormula('=IFERROR(QUERY(Traffic!A:D,"select C, sum(D) where B matches \'' + ids + '\' group by C order by sum(D) desc label C \'Source\', sum(D) \'Views\'",1),"No visits yet")');
  sh.getRange('G' + srcRow).setValue('Views per day, last 30 days').setFontWeight('bold');
  sh.getRange('G' + (srcRow + 1)).setFormula('=IFERROR(QUERY({ARRAYFORMULA(TEXT(Traffic!A2:A,"yyyy-mm-dd")),Traffic!B2:B,Traffic!D2:D},"select Col1, sum(Col3) where Col2 matches \'' + ids + '\' group by Col1 order by Col1 desc limit 30 label Col1 \'Date\', sum(Col3) \'Views\'",0),"No visits yet")');

  return { tab: brand.tab, row: totalRow };
}

function buildOverview_(ss, totals) {
  var sh = fresh_(ss, 'Overview', 0);
  var rows = [['Traffic overview', '', '', ''], ['Brand', 'Today', 'Last 7 days', 'All time']];
  totals.forEach(function (t) {
    var ref = "'" + t.tab + "'!";
    rows.push([t.tab, '=' + ref + 'B' + t.row, '=' + ref + 'C' + t.row, '=' + ref + 'D' + t.row]);
  });
  var n = totals.length;
  rows.push(['ALL', '=SUM(B3:B' + (2 + n) + ')', '=SUM(C3:C' + (2 + n) + ')', '=SUM(D3:D' + (2 + n) + ')']);
  sh.getRange(1, 1, rows.length, 4).setValues(rows);
  sh.getRange('A1:D1').merge().setFontSize(14).setFontWeight('bold').setFontColor('#ffffff').setBackground('#240a45');
  sh.getRange('A2:D2').setFontWeight('bold').setBackground('#efe7ff');
  sh.getRange(rows.length, 1, 1, 4).setFontWeight('bold').setBackground('#ffd23f');
  sh.setColumnWidth(1, 260); sh.setColumnWidths(2, 3, 110);
  sh.getRange('A' + (rows.length + 2)).setValue('Open a brand tab for its pages, a most-viewed ranking, sources and views per day. Raw counts are in the Traffic tab.').setFontColor('#6b6478');
}

/**
 * Main.gs — Web app entry point.
 *
 * doGet() serves the SPA. include() is a helper for HTML templating.
 */

/**
 * Serve the web app.
 */
function doGet(e) {
  var html = HtmlService.createTemplateFromFile('client/index')
    .evaluate()
    .setTitle('SmartLedger')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  return html;
}

/**
 * Include an HTML file (used in templates with <?!= include('filename') ?>).
 * Uses evaluate() instead of createHtmlOutputFromFile() to avoid CAJA
 * sanitizer issues with Alpine.js directives and complex JS in templates.
 */
function include(filename) {
  return HtmlService.createTemplateFromFile(filename).evaluate().getContent();
}

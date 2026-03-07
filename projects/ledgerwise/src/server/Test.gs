/**
 * Temporary test function to trigger OAuth re-authorization.
 * Delete this file after authorizing.
 */
function testFetch() {
  var response = UrlFetchApp.fetch('https://httpbin.org/get');
  Logger.log('Status: ' + response.getResponseCode());
  Logger.log('UrlFetchApp authorized successfully!');
}

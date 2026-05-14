const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + __dirname + '/index.html');
  await page.waitForTimeout(3500); // Wait for animation
  await page.screenshot({ path: 'verify_blob.png' });
  await browser.close();
})();

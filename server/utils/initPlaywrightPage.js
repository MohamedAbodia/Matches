export async function initPlaywrightPage(browser) {
  const page = await browser.newPage();
  await blockPageRequests(page);

  return page;
}

async function blockPageRequests(page) {
  const RESOURCE_EXCLUSTIONS = ['image', 'media', 'font', 'other'];

  await page.route('**/*', (route) => {
    RESOURCE_EXCLUSTIONS.includes(route.request().resourceType()) || // Blocking Unneeded Resources
    route.request().url().startsWith('https://googleads.') // Blocking Google Ads
      ? route.abort()
      : route.continue();

    return;
  });
}

import { test, expect } from '@playwright/test';

test('view space member listing', async ({ page, baseURL }) => {
  await page.goto(`${baseURL}?mock=base`);

  await page.click('text=🔎');

  const spaceMemberListingItems = await page.$$(
    'data-testid=SpaceMemberListingItem'
  );

  expect(spaceMemberListingItems).toHaveLength(3);
});

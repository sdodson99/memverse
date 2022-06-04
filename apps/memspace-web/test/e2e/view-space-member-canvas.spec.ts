import { test, expect } from '@playwright/test';

test('view space member canvas', async ({ page, baseURL }) => {
  await page.goto(`${baseURL}?mock=base`);

  const spaceCanvas = await page.$('data-testid=SpaceCanvs');

  expect(spaceCanvas).toBeDefined();
});

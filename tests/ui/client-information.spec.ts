import { test } from '@playwright/test';

[
  {
    param: '#1',
  },
].forEach(({ param }) => {
  test(
    `Scenario Name ${param}`,
    {
      tag: ['@bankerBG', '@sanity', '@regression'],
      annotation: [
        { type: 'Scenario Name', description: `Scenario Name ${param}` },
        { type: 'Scenario Info', description: 'info about scenario, link to story etc.' },
        { type: 'param', description: `${param}` },
      ],
    },
    async ({ page }) => {
      await page.goto('https://st2016.inv.bg/');
    },
  );
});

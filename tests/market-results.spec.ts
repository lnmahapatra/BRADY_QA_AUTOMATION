import { test, expect } from '@playwright/test';

import { MarketResultsPage } from '../src/pages/MarketResultsPage';
import { RetryHelper } from '../src/utils/RetryHelper';
import { CsvWriterUtil } from '../src/utils/CsvWriter';

test.describe('EPEX Spot Market Results', () => {

  test('Extract Low, High, Last and Weight Avg values', async ({ page }) => {

    const marketPage = new MarketResultsPage(page);

    await RetryHelper.retry(async () => {

      await marketPage.navigate();
      await marketPage.waitForTable();

    }, 3);

    const marketData = await marketPage.getMarketData();

    expect(marketData.length).toBeGreaterThan(0);

    await CsvWriterUtil.write(
      'outputfile/market-results.csv',
      marketData
    );

    console.log(marketData);
  });

});
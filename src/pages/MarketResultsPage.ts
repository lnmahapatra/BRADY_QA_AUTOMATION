import { Page, expect } from '@playwright/test';
import { MarketData } from '../types/MarketData';

export class MarketResultsPage {

  constructor(private readonly page: Page) {}

  async navigate(): Promise<void> {

    await this.page.goto(
      'https://www.epexspot.com/en/market-results?market_area=GB&auction=&delivery_date=2026-06-03&underlying_year=&modality=Continuous&sub_modality=&technology=&data_mode=table&period=&production_period=&product=30',
      {
        waitUntil: 'networkidle',
        timeout: 60000
      }
      
    );
    const promoPopup = this.page.getByRole('button', { name: 'Allow all cookies' });
          if (await promoPopup.isVisible()) {
            await this.page.getByRole('button', { name: 'Allow all cookies' }).click();
            console.log('Popup handled successfully.');
             } else {
             console.log('Popup did not appear, proceeding with main flow.');
        }
  }

  async waitForTable(): Promise<void> {

    await expect(
      this.page.locator('table tbody tr').first()
    ).toBeVisible({
      timeout: 30000
    });
  }

  async getMarketData(): Promise<MarketData[]> {

    const rows = this.page.locator('table tbody tr');

    const rowCount = await rows.count();

    const results: MarketData[] = [];

    for (let i = 0; i < rowCount; i++) {

      const row = rows.nth(i);

      const cells = row.locator('td');

      results.push({
        low: (await cells.nth(1).textContent())?.trim() || '',
        high: (await cells.nth(2).textContent())?.trim() || '',
        last: (await cells.nth(3).textContent())?.trim() || '',
        weightAvg: (await cells.nth(4).textContent())?.trim() || ''
      });
    }

    return results;
  }
}
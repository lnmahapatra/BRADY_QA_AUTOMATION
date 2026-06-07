import { createObjectCsvWriter } from 'csv-writer';
import { MarketData } from '../types/MarketData';

export class CsvWriterUtil {

  static async write(
    filePath: string,
    data: MarketData[]
  ): Promise<void> {

    const csvWriter = createObjectCsvWriter({
      path: filePath,
      header: [
        { id: 'low', title: 'LOW' },
        { id: 'high', title: 'HIGH' },
        { id: 'last', title: 'LAST' },
        { id: 'weightAvg', title: 'WEIGHT_AVG' }
      ]
    });

    await csvWriter.writeRecords(data);

    console.log(`CSV written to ${filePath}`);
  }
}
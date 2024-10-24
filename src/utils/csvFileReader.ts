import * as fs from 'fs';
import * as path from 'path';
import csvParser from 'csv-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const importCsvFile = async () => {

    const csvFilePath = path.join(__dirname, 'data', '../../utils/contracts.csv');

    const results: Array<any> = [];

    return new Promise<Array<any>>((resolve, reject) => {
        fs.createReadStream(csvFilePath)
            .pipe(csvParser({
                separator: ';'
            }))
            .on('data', (data) => {
                results.push(data)
            })
            .on('end', () => {
                resolve(results);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

importCsvFile().catch(console.error);

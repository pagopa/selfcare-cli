import * as fs from 'fs';
import * as path from 'path';
import csvParser from 'csv-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const importCsvFile = async () => {

    const csvFilePath = path.join(__dirname, 'data', '../../utils/contracts.csv');

    const results: any[] = [];

    return new Promise<void>((resolve, reject) => {
        fs.createReadStream(csvFilePath)
            .pipe(csvParser({
                separator: ';'
            }))
            // Analizza il CSV e convertilo in oggetti
            .on('data', (data) => {
                console.log('data', data);
                results.push(data)
            })
            // Aggiunge ogni riga al risultato
            .on('end', () => {
                console.log('Risultato', results);
                // I dati del CSV come array di oggetti
                resolve();
            })
            .on('error', (error) => {
                reject(error); // Gestione errori
            });
    });
};

importCsvFile().catch(console.error);

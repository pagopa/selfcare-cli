import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { parse } from "csv-parse";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const importCsvFile = async () => {
  const csvFilePath = path.join(__dirname, "data", "../../utils/contracts.csv");

  const results: Array<any> = [];

  const parser = parse({
    delimiter: [";", "\t", ","],
    columns: true,
    skip_empty_lines: true,
    trim: true,
    bom: true,
    relax_column_count: true
  });

  return new Promise<Array<any>>((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(parser)
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

importCsvFile().catch(console.error);

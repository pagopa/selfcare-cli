import { importCsvFile } from "../utils/csvFileReader.js";
export const Import = async () => {
    await importCsvFile();
};
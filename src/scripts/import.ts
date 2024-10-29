import { OnboardingImportProductDto } from "../model.js";
import { pspImportService } from "../services/pspImportService.js";
import { importCsvFile } from "../utils/csvFileReader.js";
import { pspMapper } from "../utils/utilsFunctions.js";

export const Import = async () => {
    const pspList = await importCsvFile();
    const newPspArray: Array<OnboardingImportProductDto> = [];
    pspList.map((psp) => {
        newPspArray.push(pspMapper(psp));
    });

    newPspArray.forEach((psp) => {
        pspImportService(psp)
            .then((res) => {
                console.log("Response:", res);
            })
            .catch((err) => {
                console.log("Error:", err);
            })
    })
};
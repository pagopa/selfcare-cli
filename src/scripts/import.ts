import { OnboardingImportProductDto } from "../model.js";
import { importCsvFile } from "../utils/csvFileReader.js";
import { pspMapper } from "../utils/pspMapper.js";
export const Import = async () => {
    const pspList = await importCsvFile();
    const newPspArray: Array<OnboardingImportProductDto> = []; 
    // console.log("PSP LIST:", pspList);
    pspList.map((psp) => {
        newPspArray.push(pspMapper(psp));
    });
    console.log("NEW PSP ARRAY:", newPspArray[0]);
};
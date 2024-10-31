import { OnboardingImportProductDto } from "../model.js";
import { pspImportService } from "../services/pspImportService.js";
import { API } from "../utils/constants.js";
import { importCsvFile } from "../utils/csvFileReader.js";
import { pspMapper } from "../utils/utilsFunctions.js";
import cliProgress from "cli-progress";

export const Import = async (progressBar: cliProgress.SingleBar) => {
    const url = API.IMPORT_PSP.URL;
    const pspList = await importCsvFile("../../../export/contract_crm_execution.csv");
    const newPspArray: Array<OnboardingImportProductDto> = [];

    pspList.forEach((psp) => {
        newPspArray.push(pspMapper(psp));
    });

    // Configura la barra di progresso con il numero totale di elementi
    progressBar.start(newPspArray.length, 0);

    // Utilizza `Promise.all` per eseguire tutte le promesse in parallelo e aggiornare la barra di progresso
    await Promise.all(newPspArray.map(async (psp) => {
        try {
            const res = await pspImportService(url, psp);
            console.log("Response:", res);
            console.log('Onboarding compleated!');
        } catch (err) {
            console.log("Error:", err);
        } finally {
            progressBar.increment(); // Incrementa la barra di progresso dopo ogni richiesta
        }
    }));

    progressBar.stop(); // Ferma la barra di progresso alla fine
};

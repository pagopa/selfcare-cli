import { OnboardingImportProductDto } from "../model.js";
import { pspImportService } from "../services/pspImportService.js";
import { API } from "../utils/constants.js";
import { importCsvFile } from "../utils/csvFileReader.js";
import { pspMapper } from "../utils/utilsFunctions.js";
import cliProgress from "cli-progress";

export const Import = async () => {
  const url = API.IMPORT_PSP.URL;
  const pspList = await importCsvFile(
    "../../../export/contract_crm_execution.csv"
  );
  const newPspArray: Array<OnboardingImportProductDto> = [];

  pspList.map((psp) => {
    if (psp.status === "OK") {
      newPspArray.push(pspMapper(psp));
    }
  });

  newPspArray.forEach((psp) => {
    pspImportService(url, psp)
      .then(() => {
        console.log(
          `onboarding psp con codice fiscale ${psp.taxCode} completato`
        );
      })
      .catch((err) => {
        console.log(`Errore sul codice fiscale ${psp.taxCode}: ${err}`);
      });
  });
};

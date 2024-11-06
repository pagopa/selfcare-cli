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
  const results: Array<any> = [];
  const errors: Array<any> = [];

  let progressBar = new cliProgress.SingleBar(
    {
      format: "Progress |{bar}| {percentage}% | {value}/{total} Contratti",
      hideCursor: true,
      clearOnComplete: false,
      barCompleteChar: "\u2588",
      barIncompleteChar: "\u2591",
    },
    cliProgress.Presets.shades_classic
  );

  progressBar.start(pspList.length, 0);

  pspList.map((psp) => {
    if (psp.status === "OK") {
      newPspArray.push(pspMapper(psp));
    }
  });

  for (const [index, psp] of newPspArray.entries()) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      await pspImportService(url, psp);
      results.push(psp.taxCode);
    } catch (error) {
      errors.push(`${psp.taxCode} - ${error}`);
    }

    progressBar.update(index + 1);
  }

  progressBar.stop();

  if (results.length != 0) {
    console.log("Enti importati correttamente: ", results.length);
  }

  if (errors.length != 0) {
    console.log("Enti il cui import non ha avuto successo: ", [...errors]);
  }
};

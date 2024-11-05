import { ContractOutput } from "../model";
import { pspVerifyService } from "../services/pspVerifyService";
import { importCsvFile } from "../utils/csvFileReader";
import { csvFileWriter, pspOutputMapper } from "../utils/utilsFunctions";
import cliProgress from "cli-progress";

export const Validation = async () => {
  const contracts = await importCsvFile("../../utils/contracts.csv");
  let contracts_size = contracts.length;
  console.log(
    `Sono stati letti ${contracts_size} contratti dal file contracts_crm \n`
  );

  const results: Array<ContractOutput> = [];
  const errors: Array<ContractOutput> = [];
  const exceptions: Array<String> = [];

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

  progressBar.start(contracts_size, 0);

  for (const [index, contract] of contracts.entries()) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    let tax_code = contract.tax_code;
    let esito = false;

    try {
      // chiamata API
      const res: any = await pspVerifyService(tax_code);

      if (res.digitalAddress === undefined) {
        contract.infocamere_pec = "NON PRESENTE SU INFOCAMERE";
      } else {
        contract.infocamere_pec = res.digitalAddress;
      }
      contract.zip_code = res.zipCode;
      contract.county = res.county;
      contract.city = res.city;
      contract.country = "IT";
      contract.registered_office = res.address;
      contract.infocamere_name = res.businessName;
      contract.institution_type = "PSP";
      contract.product_id = "prod-pagopa";
      contract.business_register_number = tax_code;
      esito = true;
    } catch (err) {
      contract.infocamere_name = "ERRORE 404";
      contract.infocamere_pec = "ERRORE 404";
      contract.country = "-";
      exceptions.push(`${err}`);
      //[...exceptions, `Errore per il codice fiscale ${tax_code}: ${err}`];
      errors.push(pspOutputMapper(contract));
    } finally {
      if (esito) {
        //console.debug(`Ente ${contract.tax_code} verificato`);
        results.push(pspOutputMapper(contract));
      }
    }
    progressBar.update(index + 1);
  }

  progressBar.stop();

  if (results.length != 0) {
    csvFileWriter(results);
    console.log(
      "Enti processati OK",
      results.filter((res) => res.status === "OK").length
    );
    console.log(
      "Enti processati KO - email-infocamere non congrue",
      results.filter(
        (res) => res.status === "ERROR" && res.pec_mail != res.infocamere_pec
      ).length
    );
    console.log(
      "Enti processati KO - di cui l'email non è presente su infocamere",
      results.filter(
        (res) =>
          res.status === "ERROR" &&
          res.infocamere_pec === "NON PRESENTE SU INFOCAMERE"
      ).length
    );
  } else {
    console.log("Non ci enti da validare");
  }

  if (errors.length != 0) {
    console.log("Enti in cui le chiamate vanno in eccezione ", errors.length);
    console.log(
      errors.map((err, i) => `${err.tax_code} - ${err.name}, ${exceptions[i]}`)
    );
  }
};

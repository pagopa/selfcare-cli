import { ContractOutput } from "../model";
import { importCsvFile } from "../utils/csvFileReader";
import { csvFileReader, pspOutputMapper } from "../utils/utilsFunctions";

export const Validation = async () => {
  const contracts = await importCsvFile();
  console.log(
    `Sono stati letti ${contracts.length} contratti dal file contracts_crm`
  );

  const results: Array<ContractOutput> = [];

  contracts.forEach((contract, index) => {
    const tax_code = contract[index].tax_code;
    const infocamere_name = "";
    const infocamere_pec = "";

    // call api

    results.push(pspOutputMapper(contract));
  });

  if (results.length != 0) {
    console.log(`Sono stati processati ${results.length} enti`);
    csvFileReader(results);
  } else {
    console.log("Non ci sono contratti da validare");
  }
};

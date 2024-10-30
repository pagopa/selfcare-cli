import { ContractOutput } from "../model";
import { pspVerifyService } from "../services/pspVerifyService";
import { importCsvFile } from "../utils/csvFileReader";
import { csvFileWriter, pspOutputMapper } from "../utils/utilsFunctions";

export const Validation = async () => {
  const contracts = await importCsvFile();
  console.log(
    `Sono stati letti ${contracts.length} contratti dal file contracts_crm`
  );

  const results: Array<ContractOutput> = [];

  contracts.forEach((contract) => {
    const tax_code = contract.tax_code;

    // call api
    pspVerifyService(tax_code)
      .then((res: any) => {
        console.log("Response:", res);
        contract.infocamere_pec = res.digitalAddress;
        contract.infocamere_name = res.businessName;
      })
      .catch((err) => {
        console.log("Error:", err);
      });

    results.push(pspOutputMapper(contract));
  });

  if (results.length != 0) {
    console.log(`Sono stati processati ${results.length} enti`);
    csvFileWriter(results);
  } else {
    console.log("Non ci sono contratti da validare");
  }
};

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
        if (res.digitalAddress === undefined) {
          contract.infocamere_pec = "NON PRESENTE SU INFOCAMERE";
        } else {
          contract.infocamere_pec = res.digitalAddress;
        }
        contract.infocamere_name = res.businessName;

        results.push(pspOutputMapper(contract));
      })
      .catch((err) => {
        console.log("Error:", err);
        contract.infocamere_name = "ERRORE 404";
        contract.infocamere_pec = "ERRORE 404";
        results.push(pspOutputMapper(contract));
      })
      .finally(() => {
        if (results.length != 0) {
          console.log(`Ente ${contract.tax_code} verificato`);
          csvFileWriter(results);
        } else {
          console.log("Non ci sono contratti da validare");
        }
      });
  });
};

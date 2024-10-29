import { ContractOutput } from "../model";
import { pspVerifyService } from "../services/pspVerifyService";
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
    var infocamere_name = "";
    var infocamere_pec = "";

    // call api
    pspVerifyService(tax_code)
      .then((res) => {
        console.log("Response:", res);
        //andare ad aggiungere il campo che scende dal servizio
          infocamere_name = "";
          infocamere_pec = "";
      })
      .catch((err) => {
        console.log("Error:", err);
      });

    results.push(pspOutputMapper(contract));
  });

  if (results.length != 0) {
    console.log(`Sono stati processati ${results.length} enti`);
    csvFileReader(results);
  } else {
    console.log("Non ci sono contratti da validare");
  }
};

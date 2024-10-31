import { ContractOutput } from "../model";
import { pspVerifyService } from "../services/pspVerifyService";
import { importCsvFile } from "../utils/csvFileReader";
import { csvFileWriter, pspOutputMapper } from "../utils/utilsFunctions";
import cliProgress from "cli-progress";

export const Validation = async (progressBar: cliProgress.SingleBar) => {
  const contracts = await importCsvFile("../../utils/contracts.csv");
  
  console.log(
    `Sono stati letti ${contracts.length} contratti dal file contracts_crm`
  );

  const results: Array<ContractOutput> = [];

  // Inizializza la barra di progresso con il numero totale di contratti
  progressBar.start(contracts.length, 0);

  // Utilizza Promise.all per gestire le richieste API in parallelo
  await Promise.all(contracts.map(async (contract) => {
    const tax_code = contract.tax_code;

    try {
      // Call API
      const res: any = await pspVerifyService(tax_code);
      
      // Controlla la risposta e aggiorna il contratto
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

      results.push(pspOutputMapper(contract));
      console.log(`Ente ${contract.tax_code} verificato`);
    } catch (err) {
      console.log("Errore:", err);
      contract.infocamere_name = "ERRORE 404";
      contract.infocamere_pec = "ERRORE 404";
      contract.country = "-";
      results.push(pspOutputMapper(contract));
    } finally {
      // Incrementa la barra di progresso dopo ogni richiesta
      if (results.length != 0) {
        console.log(`Ente ${contract.tax_code} verificato`);
        csvFileWriter(results);
      } else {
        console.log("Non ci sono contratti da validare");
      }
      progressBar.increment();
    }
  }));

  progressBar.stop(); // Ferma la barra di progresso alla fine
};

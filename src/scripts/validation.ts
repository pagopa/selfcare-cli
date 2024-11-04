import { ContractOutput } from "../model";
import { pspVerifyService } from "../services/pspVerifyService";
import { importCsvFile } from "../utils/csvFileReader";
import { csvFileWriter, pspOutputMapper } from "../utils/utilsFunctions";

export const Validation = async () => {
  const contracts = await importCsvFile("../../utils/contracts.csv");
  let contracts_size = contracts.length;
  console.log(
    `Sono stati letti ${contracts_size} contratti dal file contracts_crm`
  );

  const results: Array<ContractOutput> = [];

  let esito = false;
  const errors: Array<ContractOutput> = [];

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
      })
      .catch((err) => {
        console.log(`Errore per il codice fiscale ${tax_code}: ${err}`);
        contract.infocamere_name = "ERRORE 404";
        contract.infocamere_pec = "ERRORE 404";
        contract.country = "-";
        esito = false;
        errors.push(pspOutputMapper(contract));
        results.push(pspOutputMapper(contract));
      })
      .finally(() => {
        if (esito) {
          console.log(`Ente ${contract.tax_code} verificato`);
          results.push(pspOutputMapper(contract));
        } else {
          console.log("Non ci sono enti da validare");
        }

        if (contracts_size === results.length) {
          if (results.length != 0) {
            csvFileWriter(results);
          } else {
            console.log("Non ci enti da validare");
          }

          if (errors.length != 0) {
            console.log("Enti in cui le chiamate vanno in eccezione", errors.map((err) => `${err.tax_code} ${err.name}`));
          } else {
            console.log("Enti non in errore.");
          }
        }
      });
  });
};

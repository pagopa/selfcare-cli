import { ContractOutput } from "../model";
import { importCsvFile } from "../utils/csvFileReader";
import { csvFileReader, verifyStatus } from "../utils/utilsFunctions";

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

    const contractOutput: ContractOutput = {
      contract_id: contract[index].name,
      document_name: contract[index].document_name,
      provider_names: contract[index].provider_names,
      signed_date: contract[index].signed_date,
      contract_type: contract[index].contract_type,
      name: contract[index].name,
      abi: contract[index].abi,
      tax_code: tax_code,
      vat_code: contract[index].vat_code,
      vat_group: contract[index].vat_group,
      pec_mail: contract[index].pec_mail,
      courtesy_mail: contract[index].courtesy_mail,
      referente_fattura_mail: contract[index].referente_fattura_mail,
      sdd: contract[index].sdd,
      sdi_code: contract[index].sdi_code,
      membership_id: contract[index].membership_id,
      infocamere_pec: infocamere_pec,
      infocamere_name: infocamere_name,
      status: verifyStatus(
        contract[index].pec_mail,
        contract[index].mail,
        contract[index].infocamere_pec,
        contract[index].infocamere_name
      ),
    };

    results.push(contractOutput);
  });

  if (results.length != 0) {
    console.log(`Sono stati processati ${results.length} enti`);
    csvFileReader(results);
  } else {
    console.log("Non ci sono contratti da validare");
  }
};

import { ContractOutput } from "../model";
import { importCsvFile } from "../utils/csvFileReader";
import { csvFileReader } from "../utils/csvFileWriter";
import { genericFetch } from "../utils/genericFetch";

export const Validation = async () => {
  const contracts = await importCsvFile();

  console.log(
    "Sono stati letti " + contracts.length + " contratti dal file contracts_crm"
  );

  const results: Array<ContractOutput> = [];

  for (let i = 0; i < contracts.length; i++) {

    const tax_code = contracts[i].tax_code;
    const infocamere_name = "";
    const infocamere_pec = "";

    //aggiungere chiamata api

    const contractOutput: ContractOutput = {
      contract_id: contracts[i].name,
      document_name: contracts[i].document_name,
      provider_names: contracts[i].provider_names,
      signed_date: contracts[i].signed_date,
      contract_type: contracts[i].contract_type,
      name: contracts[i].name,
      abi: contracts[i].abi,
      tax_code: tax_code,
      vat_code: contracts[i].vat_code,
      vat_group: contracts[i].vat_group,
      pec_mail: contracts[i].pec_mail,
      courtesy_mail: contracts[i].courtesy_mail,
      referente_fattura_mail: contracts[i].referente_fattura_mail,
      sdd: contracts[i].sdd,
      sdi_code: contracts[i].sdi_code,
      membership_id: contracts[i].membership_id,
      infocamere_pec: infocamere_pec,
      infocamere_name: infocamere_name,
      status: verifyStatus(
        contracts[i].pec_mail,
        contracts[i].mail,
        contracts[i].infocamere_pec,
        contracts[i].infocamere_name
      ),
    };

    //console.log(contractOutput);
    results.push(contractOutput);

  }

  createFinalCSV(results);

/* utils */
function createFinalCSV(results: string | any[]){
  
  if(results.length != 0){
    console.log(
      "Sono stati processati " + results.length + " enti"
    );
    csvFileReader(results);
  } else {
    "Sono stati processati " + results.length + " enti"
  }

}

  function verifyStatus(
    pec_mail: string,
    name: string,
    infocamere_pec: string,
    infocamere_name: string
  ) {
    var status = "OK";

    if (infocamere_pec != pec_mail || infocamere_name != name) {
      status = "ERROR";
    }

    return status;
  }

};

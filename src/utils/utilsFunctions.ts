import ObjectsToCsv from "objects-to-csv";
import { parse } from "date-fns";
import { ContractOutput, OnboardingImportProductDto } from "../model";
import fs from "fs";

export const pspMapper = (psp: any): OnboardingImportProductDto => {
  return {
    billingData: {
      businessName: psp.name,
      digitalAddress: psp.pec_mail,
      recipientCode: psp.sdi_code,
      registeredOffice: psp.registered_office,
      taxCode: psp.tax_code,
      vatNumber: psp.vat_code,
      zipCode: psp.zip_code,
    },
    institutionType: psp.institution_type,
    geographicTaxonomies: [],
    origin: psp.origin,
    originId: psp.tax_code,
    pspData: {
      abiCode: psp.abi,
      businessRegisterNumber: psp.business_register_number,
      legalRegisterNumber: "N/A",
      legalRegisterName: "N/A",
      dpoData: {
        address: "N/A",
        pec: psp.infocamere_pec,
        email: psp.infocamere_pec,
      },
      providerNames: [psp.provider_names],
      contractType: psp.contract_type,
      contractId: psp.contract_id,
      vatNumberGroup: psp.vat_group,
    },
    institutionLocationData: {
      city: psp.city,
      country: psp.country,
      county: psp.county,
    },
    contractSigned: `parties/docs/psp/${psp.document_name}/${psp.document_name}.pdf`,
    productId: psp.product_id,
    taxCode: psp.tax_code,
    activatedAt: parse(psp.signed_date, "dd/MM/yyyy", new Date()),
  };
};

export const pspOutputMapper = (contract: any): ContractOutput => {
  return {
    contract_id: contract.contract_id,
    document_name: contract.document_name,
    provider_names: contract.provider_names,
    signed_date: contract.signed_date,
    contract_type: contract.contract_type,
    name: contract.name,
    abi: contract.abi,
    tax_code: contract.tax_code,
    vat_code: contract.vat_code,
    vat_group: contract.vat_group,
    pec_mail: contract.pec_mail,
    courtesy_mail: contract.courtesy_mail,
    referente_fattura_mail: contract.referente_fattura_mail,
    sdd: contract.sdd,
    sdi_code: contract.sdi_code,
    membership_id: contract.membership_id,
    product_id: contract.product_id,
    institution_type: contract.institution_type,
    business_register_number: contract.business_register_number,
    registered_office: contract.registered_office,
    zip_code: contract.zip_code,
    county: contract.county,
    country: contract.country,
    city: contract.city,
    infocamere_pec: contract.infocamere_pec,
    infocamere_name: contract.infocamere_name,
    status: verifyStatus(contract.pec_mail, contract.infocamere_pec),
  };
};

export const genericFetch = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
    });

    // Controlla se la risposta non è OK
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Log delle informazioni sulla risposta
    console.log("Response Status:", response.status);
    console.log("Response statusText:", response.statusText);

    // Recupera il corpo della risposta come testo
    const text = await response.text();

    // Se il corpo non è vuoto, prova a fare il parsing come JSON
    if (text) {
      return JSON.parse(text) as T; // Parsing del corpo
    } else {
      throw new Error("Response body is empty.");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const csvFileWriter = async (results: any) => {
  const csv = new ObjectsToCsv(results);
  const path = "./export";

  prepareFolder(path);

  await csv.toDisk(path + "/contract_crm_execution.csv");
  console.log("Scrittura eseguita correttamente.");
};

export const verifyStatus = (pec_mail: string, infocamere_pec: string) => {
  return infocamere_pec.toLowerCase() === pec_mail.toLowerCase()
    ? "OK"
    : "ERROR";
};

export const prepareFolder = (path: string) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
    console.log("ho creato la folder");
  }
};

import ObjectsToCsv from "objects-to-csv";
import { parse } from "date-fns";
import { ContractOutput, OnboardingImportProductDto } from "../model";

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
      businessRegisterNumber: psp.businessRegisterNumber,
      providerNames: psp.provider_names.split(","),
      contractType: psp.contract_type,
      contractId: psp.contractId,
      vatNumberGroup: psp.vat_group,
    },
    institutionLocationData: {
      city: psp.city,
      country: psp.country,
      county: psp.county,
    },
    contractSigned: psp.document_name,
    productId: psp.product_id,
    taxCode: psp.tax_code,
    activatedAt: parse(psp.signed_date, "dd/MM/yyyy", new Date()),
  };
};

export const pspOutputMapper = (contract: any): ContractOutput => {
  return {
    contract_id: contract.name,
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
    infocamere_pec: contract.infocamere_pec,
    infocamere_name: contract.infocamere_name,
    status: verifyStatus(
      contract.pec_mail,
      contract.mail,
      contract.infocamere_pec,
      contract.infocamere_name
    ),
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

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const csvFileReader = async (results: any) => {
  const csv = new ObjectsToCsv(results);
  await csv.toDisk("./export/test.csv");
  console.log("Scrittura eseguita correttamente.");
};

export const verifyStatus = (
  pec_mail: string,
  name: string,
  infocamere_pec: string,
  infocamere_name: string
) => {
  if (infocamere_pec != pec_mail || infocamere_name != name) {
    return "ERROR";
  } else {
    return "OK";
  }
};

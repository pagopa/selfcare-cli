import ObjectsToCsv from "objects-to-csv";
import { parse } from "date-fns";
import { OnboardingImportProductDto } from "../model";

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

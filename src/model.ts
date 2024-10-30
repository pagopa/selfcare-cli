export type OnboardingImportProductDto = {
    billingData: BillingData;
    institutionType: string;
    geographicTaxonomies: GeographicTaxonomy[];
    origin: string;
    originId: string;
    pspData: PspData;
    institutionLocationData: InstitutionLocationData;
    contractSigned: string;
    productId: string;
    taxCode: string;
    activatedAt: Date;
};

type GeographicTaxonomy = {
  code: string;
  desc: string;
};

type BillingData = {
  businessName: string;
  digitalAddress: string;
  recipientCode: string;
  registeredOffice: string;
  taxCode: string;
  vatNumber: string;
  zipCode: string;
};

type PspData = {
  abiCode: string;
  businessRegisterNumber: string;
  providerNames: string[];
  contractType: string;
  contractId: string;
  vatNumberGroup: boolean;
};

type InstitutionLocationData = {
  city: string;
  country: string;
  county: string;
};

export type ContractOutput = {
  contract_id: string;
  product_id: string;
  document_name: string;
  provider_names: string;
  signed_date: string;
  contract_type: string;
  name: string;
  abi: string;
  tax_code: string;
  vat_code: string;
  vat_group: string;
  pec_mail: string;
  courtesy_mail: string;
  referente_fattura_mail: string;
  sdd: string;
  sdi_code: string;
  registered_office: string;
  institution_type: string;
  business_register_number: string;
  city: string;
  county: string;
  country: string;
  zip_code: string;
  membership_id: string;
  infocamere_pec: string;
  infocamere_name: string;
  status: string;
};
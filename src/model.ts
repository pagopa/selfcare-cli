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
    signed_date: string; // per 'activatedAt' convertito a 'signed_date'
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

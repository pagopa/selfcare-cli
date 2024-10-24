import { OnboardingImportProductDto } from "../model"

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
        taxCode:  psp.tax_code,
        activatedAt: psp.signed_date,
    }
}
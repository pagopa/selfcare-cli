import { OnboardingImportProductDto } from "../model";
import { API } from "../utils/constants";
import { genericFetch } from "../utils/utilsFunctions";

export const pspImportService = async (pspBody: OnboardingImportProductDto) => {
    await genericFetch(API.IMPORT_PSP.URL, {
        headers: {
            'Ocp-Apim-Subscription-Key': process.env.EXTERNAL_DEV_API_KEY,
        },
        body: JSON.stringify(pspBody)
    })
};
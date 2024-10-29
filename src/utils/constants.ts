import { ENV } from "../env";

export const API = {
    IMPORT_PSP: {
        URL: ENV.URL_API.EXTERNAL + '/onboarding/psp/import',
    },
    VERIFY_INFOCAMERE: {
        URL: ENV.URL_API.EXTERNAL + '/infocamere-pdnd/institution/',
    }
};
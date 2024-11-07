import { ENV } from "../env";

export const API = {
  IMPORT_PSP: {
    URL: ENV.URL_API.EXTERNAL + "/onboarding/import",
  },
  VERIFY_INFOCAMERE: {
    getUrl: (taxCode: string) =>
      `${ENV.URL_API.EXTERNAL}/infocamere-pdnd/institution/${taxCode}`,
  },
};
import { OnboardingImportProductDto } from "../model";
import { API } from "../utils/constants";
import { genericFetch } from "../utils/utilsFunctions";

export const pspVerifyService = async (pspBody: any) => {
  await genericFetch(API.VERIFY_INFOCAMERE.URL, {
    headers: {
      "Ocp-Apim-Subscription-Key": process.env.EXTERNAL_DEV_API_KEY,
    },
    body: JSON.stringify(pspBody),
  });
};
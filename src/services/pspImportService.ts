import { OnboardingImportProductDto } from "../model";
import { genericFetch } from "../utils/utilsFunctions";

export const pspImportService = async (
  url: string,
  pspBody: OnboardingImportProductDto
) => {
  await genericFetch(url, {
    headers: {
      "Ocp-Apim-Subscription-Key": process.env.EXTERNAL_DEV_SUB_KEY,
    },
    body: JSON.stringify(pspBody),
    method: "POST",
  });
};

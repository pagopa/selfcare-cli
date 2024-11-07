// import { OnboardingImportProductDto } from "../model";
import { ENV } from "../env";
import { API } from "../utils/constants";
import { genericFetch } from "../utils/utilsFunctions";

export const pspVerifyService = async (tax_code: any) => {
  return await genericFetch(API.VERIFY_INFOCAMERE.getUrl(tax_code), {
   
    headers: {
      "Ocp-Apim-Subscription-Key": process.env.EXTERNAL_SUB_KEY,
    },
    
    method: "GET",
  });
};

// import { OnboardingImportProductDto } from "../model";
import { API } from "../utils/constants";
import { genericFetch } from "../utils/utilsFunctions";

export const pspVerifyService = async (tax_code: any) => {
  return await genericFetch(API.VERIFY_INFOCAMERE.getUrl(tax_code), {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imp3dF9hMjo3YTo0NjozYjoyYTo2MDo1Njo0MDo4ODphMDo1ZDphNDpmODowMToxZTozZSJ9.eyJmYW1pbHlfbmFtZSI6InNpc3RpIiwiZmlzY2FsX251bWJlciI6IlNTVE1UVDgwQTAxRjIwNUMiLCJuYW1lIjoibWF0dGlhIiwic3BpZF9sZXZlbCI6Imh0dHBzOi8vd3d3LnNwaWQuZ292Lml0L1NwaWRMMiIsImZyb21fYWEiOmZhbHNlLCJ1aWQiOiJkZWE1ZDJjNC05YzNiLTQ3YzEtYmQ5YS0zZTM4YTIwMzcwMDkiLCJsZXZlbCI6IkwyIiwiaWF0IjoxNzMwMzY3Mzg5LCJleHAiOjE3MzAzOTk3ODksImF1ZCI6ImFwaS5kZXYuc2VsZmNhcmUucGFnb3BhLml0IiwiaXNzIjoiU1BJRCIsImp0aSI6Il9kNjFhOGM2YmE3MjkyNGRiMWUxZCJ9.ZOYQ9oTRc4O1yojjuGrsdBn_RZ5cHH-Jcu314htMwtpZsBGBKzLBNRFC_oYV8qp7G7eGNq6xkd5TDMKAo3_GMwHb1v8xmSwvEQt-ejesEwUq3Xa3vwUsbS0O5PYOMnHiud5k63rtmZ3sixceLEKy7q6ARRwsNy0EbLIrrep0nfog29pnjR5qGirpzABymAJdNzY7bwd-1x0rC_h-bU2ERCGZY6yn3VqStSARH8TufpRyacsQ0nkHJE4M2vz1z2SA0WzETNIYjfswgaSxbEaiYCrPIoBgd7JmUCEXG9XZ3ojtZq0Evx6JjhXJ231E3d8nbfeQczRBUL7mII4l0iBLmA",
    },
    method: "GET",
  });
};

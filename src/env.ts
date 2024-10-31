import env from 'env-var';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.ENV}` });

export const ENV = {
  URL_API: {
    EXTERNAL: env.get('EXTERNAL_BASE_PATH').asString(),
    PDND_INFOCAMERE: env.get('PDND_INFOCAMERE_BASE_PATH').asString(),
  },

}
import * as env from 'env-var';

export const ENV = {
    URL_API: {
        EXTERNAL: env.get('EXTERNAL_BASE_PATH').required().asString(),
      },
}
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const skipValidation =
  !!process.env.SKIP_ENV_VALIDATION &&
  process.env.SKIP_ENV_VALIDATION !== 'false' &&
  process.env.SKIP_ENV_VALIDATION !== '0';

export const env = createEnv({
  skipValidation,
  server: {},
  client: {
    NEXT_PUBLIC_SITE_URL: z.string().url()
  },
  runtimeEnv: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL
  }
});

import * as Joi from 'joi';

export const envDbSchema = Joi.object({
  DB_HOST: Joi.string().default('localhost'),
  DB_NAME: Joi.string().default('identity-services'),
  DB_PASSWORD: Joi.string().default('postgres'),
  DB_PORT: Joi.number().default(3302),
  DB_USERNAME: Joi.string().default('postgres'),
});

export const configEnvSchema = Joi.object({
  LOG_LEVEL: Joi.string().optional().default('info'),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  API_PORT: Joi.number().optional().default(3301),
  WORKER_PORT: Joi.number().optional().default(3303),
  WORKER_QUEUE_URL: Joi.string()
    .optional()
    .default(
      'http://sqs.eu-central-1.localhost.localstack.cloud:4566/000000000000/IncomingIdentityEvents',
    ),
}).concat(envDbSchema);

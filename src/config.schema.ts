import * as joi from '@hapi/joi';

export const configValidationSchema = joi.object({
  DB_NAME: joi.string().required(),
  DB_HOST: joi.string().required(),
  DB_PORT: joi.string().required(),
  DB_DIALECT: joi.string().required(),
  DB_USERNAME: joi.string().required(),
  DB_PASSWORD: joi.string().required(),
  JWT_KEY: joi.string().required(),
});

import Joi from 'joi';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config(path.resolve(__dirname, '../../.env'));

const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .allow('development', 'production', 'test', 'provision')
        .default('development'),
    PORT: Joi.number()
        .default(3000),
    CRYPT_KEY:Joi.string().required(),
    AUTH_KEY:Joi.string().required(),
}).unknown()
    .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    cryptKey: envVars.CRYPT_KEY,
    authKey: envVars.AUTH_KEY,
    mysql: {
        database: envVars.SQL_DB,
        port: envVars.SQL_PORT,
        host: envVars.SQL_HOST,
        username: envVars.SQL_USER,
        password: envVars.SQL_PASSWD,
        dialect: "mysql", //can be any db
        operatorsAliases: false
    },

};

export default config;

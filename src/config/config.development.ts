export const config = () => ({
  DATABASE_USERNAME: process.env.DATABASE_USERNAME || 'root',
  SQL_PASSWORD: process.env.SQL_PASSWORD,
  JWT_KEY: process.env.JWT_KEY,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
  DATABASE_PORT: process.env.DATABASE_PORT || 3306,
});

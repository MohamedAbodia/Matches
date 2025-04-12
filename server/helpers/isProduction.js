export function isProduction() {
  return process.env.IS_PRODUCTION === 'true' ? true : false;
}

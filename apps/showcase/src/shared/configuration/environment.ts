export function isProductionClient() {
  return process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';
}

export function isProductionServer() {
  return process.env.VERCEL_ENV === 'production';
}

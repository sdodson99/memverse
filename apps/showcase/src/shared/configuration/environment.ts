export function IsProductionClient() {
  return process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';
}

export function IsProductionServer() {
  return process.env.VERCEL_ENV === 'production';
}

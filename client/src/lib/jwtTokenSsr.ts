export function parseJwtSsr(token: any) {
  if (!token) { return null; }

  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  const decoded = Buffer.from(base64, 'base64').toString('utf-8');
  
  return JSON.parse(decoded);
}
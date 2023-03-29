export const getDatabaseSlug = () => {
  if (typeof window === 'undefined') return 'myra-prod';

  const slug = process.env['NX_SLUG'] || window.location.host.split('.')[0];
  if (slug.includes('localhost')) return process.env['NX_SLUG'] || 'myra-prod';
  return slug;
};

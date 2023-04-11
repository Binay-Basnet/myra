export const getDatabaseSlug = () => {
  if (typeof window === 'undefined') return 'nefscun-eodtest3';

  const slug = process.env['NX_SLUG'] || window.location.host.split('.')[0];
  if (slug.includes('localhost')) return process.env['NX_SLUG'] || 'nefscun-eodtest3';
  return slug;
};

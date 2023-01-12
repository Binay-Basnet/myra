export const getDatabaseSlug = () => {
  if (typeof window === 'undefined') return 'myra-dev';

  const slug = window.location.host.split('.')[0];
  if (slug.includes('localhost')) return 'myra-dev';
  return slug;
};

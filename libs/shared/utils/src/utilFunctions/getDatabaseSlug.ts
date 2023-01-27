export const getDatabaseSlug = () => {
  if (typeof window === 'undefined') return 'myra-prod';

  const slug = window.location.host.split('.')[0];
  if (slug.includes('localhost')) return 'myra';
  return slug;
};

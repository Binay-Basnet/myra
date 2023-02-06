import { useRouter } from 'next/router';

export const useIsCbs = () => {
  const router = useRouter();
  const isCbs = router?.pathname?.includes('cbs');
  return { isCbs };
};

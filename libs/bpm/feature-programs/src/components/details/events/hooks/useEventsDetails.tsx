import { useRouter } from 'next/router';

import { useGetEventsDetailsQuery } from '@coop/cbs/data-access';

export const useEventsDetailsHook = () => {
  const router = useRouter();

  const { id } = router.query;
  const { data } = useGetEventsDetailsQuery({ id: id as string });

  const detailData = data?.bpm?.programs?.eventDetails;

  return {
    detailData,
  };
};

import { useRouter } from 'next/router';

import { useGetMeetingsEditDataQuery } from '@coop/cbs/data-access';

export const useMeetingDetailsHook = () => {
  const router = useRouter();

  const { id } = router.query;
  const { data } = useGetMeetingsEditDataQuery({ id: id as string });

  const detailData = data?.bpm?.programs?.meetingDetail;

  return {
    detailData,
  };
};

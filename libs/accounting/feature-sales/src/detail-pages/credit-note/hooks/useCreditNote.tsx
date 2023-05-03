import { useRouter } from 'next/router';

import { useGetCreditNoteDetailsQuery } from '@coop/cbs/data-access';

export const useCreditNoteDetailsHook = () => {
  const router = useRouter();

  const { id } = router.query;
  const { data } = useGetCreditNoteDetailsQuery({ id: id as string });

  const detailData = data?.accounting?.sales?.detailCreditNote?.data;

  return {
    detailData,
  };
};

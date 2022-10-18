import {useRouter} from 'next/router';

import {useGetLoanPreviewQuery} from '@coop/cbs/data-access';

export const useLoanDetails = () => {
  const router = useRouter();

  const {id} = router.query;

  const {data: loanPreviewData} = useGetLoanPreviewQuery({id: id as string}, {staleTime: 0, enabled: !!id});


  const loanPreview = loanPreviewData?.loanAccount?.loanPreview?.data

  return {
    loanPreview
  };
};

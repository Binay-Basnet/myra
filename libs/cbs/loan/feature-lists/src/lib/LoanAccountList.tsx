import { useRouter } from 'next/router';

import { LoanObjState, useGetLoanListQuery } from '@coop/cbs/data-access';
import { PageHeader } from '@coop/shared/ui';
import { getRouterQuery } from '@coop/shared/utils';

import { LoanTable } from '../components/LoanTable';

export const LoanAccountList = () => {
  const router = useRouter();

  const { data, isFetching } = useGetLoanListQuery({
    paginate: getRouterQuery({ type: ['PAGINATION'], query: router.query }),
    filter: {
      objectState: LoanObjState.Disbursed,
    },
  });
  return (
    <>
      <PageHeader heading="Loan Account" />
      <LoanTable
        data={data}
        isLoading={isFetching}
        type={LoanObjState.Disbursed}
        viewLink="/loan/accounts/view"
      />
    </>
  );
};

import { useRouter } from 'next/router';

import { PageHeader } from '@myra-ui';

import { LoanObjState, useGetLoanListQuery } from '@coop/cbs/data-access';
import { featureCode, getRouterQuery } from '@coop/shared/utils';

import { LoanTable } from '../components/LoanTable';

export const DeclinedLoanList = () => {
  const router = useRouter();

  const { data, isFetching } = useGetLoanListQuery({
    paginate: getRouterQuery({ type: ['PAGINATION'], query: router.query }),
    filter: {
      objectState: LoanObjState.Cancelled,
    },
  });
  return (
    <>
      <PageHeader heading={`Declined Loan - ${featureCode.loanDeclined}`} />
      <LoanTable
        data={data}
        isLoading={isFetching}
        type={LoanObjState.Cancelled}
        viewLink="/loan/declined/view"
      />
    </>
  );
};

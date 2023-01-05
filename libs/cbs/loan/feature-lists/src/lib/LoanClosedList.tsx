import { useRouter } from 'next/router';

import { PageHeader } from '@myra-ui';

import { LoanObjState, useGetLoanListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { getRouterQuery } from '@coop/shared/utils';

import { LoanTable } from '../components/LoanTable';

export const ClosedLoanList = () => {
  const router = useRouter();

  const { data, isFetching } = useGetLoanListQuery({
    paginate: getRouterQuery({ type: ['PAGINATION'], query: router.query }),
    filter: {
      objectState: LoanObjState.Completed,
    },
  });
  return (
    <>
      <PageHeader heading="Closed Account List " />
      <LoanTable
        data={data}
        isLoading={isFetching}
        type={LoanObjState.Completed}
        viewLink={ROUTES.CBS_LOAN_ACCOUNTS_DETAILS}
        isClosed
      />
    </>
  );
};

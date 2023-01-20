import { useRouter } from 'next/router';

import { PageHeader } from '@myra-ui';

import { Filter_Mode, LoanObjState, useGetLoanListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { featureCode, getRouterQuery } from '@coop/shared/utils';

import { LoanClosedAccountTable } from '../components/LoanTable';

export const ClosedLoanList = () => {
  const router = useRouter();
  const searchTerm = router?.query['search'] as string;

  const { data, isFetching } = useGetLoanListQuery({
    paginate: getRouterQuery({ type: ['PAGINATION'], query: router.query }),
    filter: {
      objectState: LoanObjState.Completed,
      id: searchTerm,
      query: searchTerm,
      productID: searchTerm,
      accountName: searchTerm,
      productName: searchTerm,
      memberName: searchTerm,
      filterMode: Filter_Mode.Or,
    },
  });
  return (
    <>
      <PageHeader heading={`Closed Account List - ${featureCode?.loanClosedAccountList}`} />
      <LoanClosedAccountTable
        data={data}
        isLoading={isFetching}
        type={LoanObjState.Completed}
        viewLink={ROUTES.CBS_LOAN_ACCOUNT_CLOSED_DETAILS}
      />
    </>
  );
};

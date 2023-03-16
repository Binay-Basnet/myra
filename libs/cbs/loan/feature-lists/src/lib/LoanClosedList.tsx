import { PageHeader } from '@myra-ui';

import { LoanObjState, useGetLoanListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { featureCode, getFilterQuery, getPaginationQuery } from '@coop/shared/utils';

import { LoanClosedAccountTable } from '../components/LoanTable';

export const ClosedLoanList = () => {
  const { data, isFetching } = useGetLoanListQuery({
    paginate: getPaginationQuery(),
    filter: getFilterQuery({ objState: { value: LoanObjState.Completed, compare: '=' } }),
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

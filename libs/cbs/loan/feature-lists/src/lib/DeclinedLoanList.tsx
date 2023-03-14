import { PageHeader } from '@myra-ui';

import { LoanObjState, useGetLoanListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { featureCode, getFilterQuery, getPaginationQuery } from '@coop/shared/utils';

import { LoanDeclinedTable } from '../components/LoanTable';

export const DeclinedLoanList = () => {
  const { data, isFetching } = useGetLoanListQuery({
    paginate: getPaginationQuery(),
    filter: getFilterQuery({ objState: { value: LoanObjState.Cancelled, compare: '=' } }),
  });
  
  return (
    <>
      <PageHeader heading={`Declined Loan - ${featureCode.declinedLoanList}`} />
      <LoanDeclinedTable
        data={data}
        isLoading={isFetching}
        type={LoanObjState.Cancelled}
        viewLink={ROUTES.CBS_LOAN_DECLINED_DETAILS}
      />
    </>
  );
};

import { useRouter } from 'next/router';

import { PageHeader } from '@myra-ui';

import { LoanObjState, useGetLoanListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { featureCode, getPaginationQuery } from '@coop/shared/utils';

import { LoanDeclinedTable } from '../components/LoanTable';

export const DeclinedLoanList = () => {
  const router = useRouter();

  const { data, isFetching } = useGetLoanListQuery({
    paginate: getPaginationQuery(),

    filter: {
      objectState: LoanObjState.Cancelled,
    },
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

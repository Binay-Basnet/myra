import { PageHeader } from '@myra-ui';

import { LoanObjState, useGetLoanListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { getFilterQuery, getPaginationQuery } from '@coop/shared/utils';

import { LoanAppTable } from '../components/LoanTable';

export const LoanWriteOffList = () => {
  const { data, isFetching } = useGetLoanListQuery({
    paginate: getPaginationQuery(),
    filter: getFilterQuery({ objState: { value: 'WRITE_OFF', compare: '=' } }),
  });

  return (
    <>
      <PageHeader heading="Loan Write Off" />

      <LoanAppTable
        data={data}
        viewLink={ROUTES.CBS_LOAN_APPLICATION_DETAILS}
        isLoading={isFetching}
        type={LoanObjState.Completed}
      />
    </>
  );
};

export default LoanWriteOffList;

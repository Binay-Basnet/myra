import { PageHeader } from '@myra-ui';

import { LoanObjState, useAppSelector, useGetLoanListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { featureCode, getFilterQuery, getPaginationQuery } from '@coop/shared/utils';

import { LoanAccTable } from '../components/LoanTable';

export const LoanAccountList = () => {
  const branchId = useAppSelector((state) => state?.auth?.user?.currentBranch?.id);

  const { data, isFetching } = useGetLoanListQuery({
    paginate: getPaginationQuery(),
    filter: getFilterQuery({
      objState: { value: LoanObjState.Disbursed, compare: '=' },
      branchId: { value: branchId as string, compare: '=' },
    }),
  });

  return (
    <>
      <PageHeader heading={`Loan Account - ${featureCode.loanAccountList} `} />
      <LoanAccTable
        data={data}
        isLoading={isFetching}
        type={LoanObjState.Disbursed}
        viewLink={ROUTES.CBS_LOAN_ACCOUNT_DETAILS}
      />
    </>
  );
};

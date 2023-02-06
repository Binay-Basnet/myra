import { useRouter } from 'next/router';

import { PageHeader } from '@myra-ui';

import { Filter_Mode, LoanObjState, useGetLoanListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { featureCode, getRouterQuery } from '@coop/shared/utils';

import { LoanAccTable } from '../components/LoanTable';

export const LoanAccountList = () => {
  const router = useRouter();
  const searchTerm = router?.query['search'] as string;

  const { data, isFetching } = useGetLoanListQuery({
    paginate: getRouterQuery({ type: ['PAGINATION'], query: router.query }),
    filter: {
      objectState: LoanObjState.Disbursed,
      id: searchTerm,
      query: searchTerm,
      productID: searchTerm,
      accountName: searchTerm,
      productName: searchTerm,
      memberName: searchTerm,
      memberCode: searchTerm,
      memberId: searchTerm,
      filterMode: Filter_Mode.Or,
    },
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

import { useRouter } from 'next/router';

import { PageHeader } from '@myra-ui';

import { LoanObjState, ObjState, useGetLoanListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { featureCode, getPaginationQuery } from '@coop/shared/utils';

import { LoanAppTable } from '../components/LoanTable';

export const LOAN_LIST_TAB_ITEMS = [
  {
    title: 'memberNavApproved',
    key: 'APPROVED',
  },
  {
    title: 'memberNavInactive',
    key: 'SUBMITTED',
  },
];

export const LoanList = () => {
  const router = useRouter();
  const searchTerm = router?.query['search'] as string;

  const { data, isFetching } = useGetLoanListQuery({
    paginate: getPaginationQuery(),

    filter: {
      objectState: (router.query['objState'] ?? ObjState.Approved) as LoanObjState,
      query: searchTerm,
    },
  });

  return (
    <>
      <PageHeader
        heading={`Loan Application - ${featureCode.loanApplicationList}`}
        tabItems={LOAN_LIST_TAB_ITEMS}
      />
      <LoanAppTable
        data={data}
        viewLink={ROUTES.CBS_LOAN_APPLICATION_DETAILS}
        isLoading={isFetching}
        type={(router.query['objState'] ?? ObjState.Approved) as LoanObjState}
      />
    </>
  );
};

export default LoanList;

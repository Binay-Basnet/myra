import { useRouter } from 'next/router';

import { PageHeader } from '@myra-ui';

import { LoanObjState, ObjState, useGetLoanListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { featureCode, getRouterQuery } from '@coop/shared/utils';

import { LoanTable } from '../components/LoanTable';

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

  const { data, isFetching } = useGetLoanListQuery({
    paginate: getRouterQuery({ type: ['PAGINATION'], query: router.query }),
    filter: {
      objectState: (router.query['objState'] ?? ObjState.Approved) as LoanObjState,
    },
  });

  return (
    <>
      <PageHeader
        heading={`Loan Application - ${featureCode.loanApplication}`}
        tabItems={LOAN_LIST_TAB_ITEMS}
      />
      <LoanTable
        data={data}
        viewLink={ROUTES.CBS_LOAN_APPLICATION_DETAILS}
        isLoading={isFetching}
        type={(router.query['objState'] ?? ObjState.Approved) as LoanObjState}
      />
    </>
  );
};

export default LoanList;

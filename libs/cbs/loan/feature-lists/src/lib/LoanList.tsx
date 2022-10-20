import { useRouter } from 'next/router';

import { LoanObjState, ObjState, useGetLoanListQuery } from '@coop/cbs/data-access';
import { Box, PageHeader } from '@coop/shared/ui';
import { getRouterQuery } from '@coop/shared/utils';

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
      <PageHeader heading="Loan Application List" tabItems={LOAN_LIST_TAB_ITEMS} />
      <Box mt="60px">
        <LoanTable
          data={data}
          viewLink="/loan/applications/view"
          isLoading={isFetching}
          type={(router.query['objState'] ?? ObjState.Approved) as LoanObjState}
        />
      </Box>
    </>
  );
};

export default LoanList;

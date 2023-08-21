import { useRouter } from 'next/router';

import { PageHeader } from '@myra-ui';

import { LoanObjState, ObjState, useAppSelector, useGetLoanListQuery } from '@coop/cbs/data-access';
import {
  featureCode,
  getFilter,
  getFilterQuery,
  getPaginationQuery,
  getUrl,
} from '@coop/shared/utils';

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
  const branchId = useAppSelector((state) => state?.auth?.user?.currentBranch?.id);

  const objState = getFilter('objState');
  const { data, isFetching } = useGetLoanListQuery({
    paginate: getPaginationQuery(),
    filter: getFilterQuery({
      objState: { value: 'APPROVED', compare: '=' },
      branchId: { value: branchId as string, compare: '=' },
    }),
  });

  return (
    <>
      <PageHeader
        heading={`Loan Application - ${featureCode.loanApplicationList}`}
        tabItems={LOAN_LIST_TAB_ITEMS}
        showTabsInFilter
      />
      <LoanAppTable
        data={data}
        viewLink={`/${getUrl(router.pathname, 3)}/details`}
        isLoading={isFetching}
        type={(objState ?? ObjState.Approved) as LoanObjState}
      />
    </>
  );
};

export default LoanList;

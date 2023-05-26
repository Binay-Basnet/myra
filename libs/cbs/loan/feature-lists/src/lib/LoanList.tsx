import { PageHeader } from '@myra-ui';

import { LoanObjState, ObjState, useGetLoanListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { featureCode, getFilter, getFilterQuery, getPaginationQuery } from '@coop/shared/utils';

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
  const objState = getFilter('objState');
  const { data, isFetching } = useGetLoanListQuery({
    paginate: getPaginationQuery(),
    filter: getFilterQuery({ objState: { value: 'APPROVED', compare: '=' } }),
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
        viewLink={ROUTES.CBS_LOAN_APPLICATION_DETAILS}
        isLoading={isFetching}
        type={(objState ?? ObjState.Approved) as LoanObjState}
      />
    </>
  );
};

export default LoanList;

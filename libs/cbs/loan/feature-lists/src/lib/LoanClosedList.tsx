import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import qs from 'qs';

import { PageHeader } from '@myra-ui';

import { LoanObjState, useAppSelector, useGetLoanListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { featureCode, getFilterQuery, getPaginationQuery } from '@coop/shared/utils';

import { LoanClosedAccountTable } from '../components/LoanTable';

export const ClosedLoanList = () => {
  const [triggerQuery, setTriggerQuery] = useState(false);

  const router = useRouter();

  const { data, isFetching } = useGetLoanListQuery(
    {
      paginate: getPaginationQuery(),
      filter: getFilterQuery({ objState: { value: LoanObjState.Completed, compare: '=' } }),
    },
    { enabled: triggerQuery }
  );

  const user = useAppSelector((state) => state.auth?.user);

  useEffect(() => {
    const queryString = qs.stringify(
      {
        branchId: {
          value: user?.currentBranch?.id,
          compare: '=',
        },
      },
      { allowDots: true, arrayFormat: 'brackets', encode: false }
    );

    router
      .push(
        {
          query: {
            ...router.query,
            filter: queryString,
          },
        },
        undefined,
        { shallow: true }
      )
      .then(() => setTriggerQuery(true));
  }, []);

  return (
    <>
      <PageHeader heading={`Closed Account List - ${featureCode?.loanClosedAccountList}`} />
      <LoanClosedAccountTable
        data={data}
        isLoading={triggerQuery ? isFetching : true}
        type={LoanObjState.Completed}
        viewLink={ROUTES.CBS_LOAN_ACCOUNT_CLOSED_DETAILS}
      />
    </>
  );
};

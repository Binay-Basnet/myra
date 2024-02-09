import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import qs from 'qs';

import { PageHeader, toast } from '@myra-ui';

import {
  LoanObjState,
  useAppSelector,
  useGetLoanListExportQuery,
  useGetLoanListQuery,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { featureCode, getFilterQuery, getPaginationQuery } from '@coop/shared/utils';

import { LoanAccTable } from '../components/LoanTable';

export const LoanAccountList = () => {
  const [triggerExport, setTriggerExport] = useState(false);
  const [isExportPDF, setIsExportPDF] = useState(false);
  const [isExportExcel, setIsExportExcel] = useState(false);

  const [triggerQuery, setTriggerQuery] = useState(false);

  const router = useRouter();

  const filterParams = {
    filter: getFilterQuery({
      objState: { value: LoanObjState.Disbursed, compare: '=' },
    }),
  };

  const sortParams = router.query['sort'] as string;

  const { data, isFetching } = useGetLoanListQuery(
    {
      ...filterParams,
      paginate: sortParams
        ? getPaginationQuery()
        : { ...getPaginationQuery(), order: { column: 'approvedDate', arrange: 'DESC' } },
    },
    { enabled: triggerQuery }
  );

  useGetLoanListExportQuery(
    { ...filterParams, paginate: { after: '', first: -1 }, isExportExcel, isExportPDF },
    {
      enabled: triggerExport,
      staleTime: 0,
      onSettled: () => setTriggerExport(false),
      onSuccess: (res) => {
        setTriggerExport(false);
        toast({
          id: 'export',
          type: 'success',
          message: res?.loanAccount?.list?.success?.message as string,
        });
      },
    }
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
      <PageHeader heading={`Loan Account - ${featureCode.loanAccountList} `} />
      <LoanAccTable
        data={data}
        isLoading={triggerQuery ? isFetching : true}
        type={LoanObjState.Disbursed}
        viewLink={ROUTES.CBS_LOAN_ACCOUNT_DETAILS}
        canExport
        handleExportPDF={() => {
          setTriggerExport(true);
          setIsExportPDF(true);
          setIsExportExcel(false);
        }}
        handleExportCSV={() => {
          setTriggerExport(true);
          setIsExportPDF(false);
          setIsExportExcel(true);
        }}
      />
    </>
  );
};

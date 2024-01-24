import { useState } from 'react';

import { PageHeader, toast } from '@myra-ui';

import {
  LoanObjState,
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

  const filterParams = {
    filter: getFilterQuery({
      objState: { value: LoanObjState.Disbursed, compare: '=' },
    }),
  };

  const { data, isFetching } = useGetLoanListQuery({
    ...filterParams,
    paginate: getPaginationQuery(),
  });

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

  return (
    <>
      <PageHeader heading={`Loan Account - ${featureCode.loanAccountList} `} />
      <LoanAccTable
        data={data}
        isLoading={isFetching}
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

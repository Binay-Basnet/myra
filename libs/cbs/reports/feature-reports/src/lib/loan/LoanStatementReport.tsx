import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  LoanAccReportDetails,
  LoanStatement,
  LoanStatementReportSettings,
  ReportPeriodType,
  useGetLoanStatementReportQuery,
} from '@coop/cbs/data-access';
import {
  LoanReportInputs,
  LoanReportMember,
  LoanStatementReportTable,
  ReportHeader,
  ReportOrganization,
  ReportOrganizationHeader,
} from '@coop/cbs/reports/components';
import { Report } from '@coop/cbs/reports/list';
import { Box, Divider, Loader, NoDataState } from '@coop/shared/ui';

type ReportFilterType = {
  memberId: string;
  accountId: string;
  periodType: ReportPeriodType;
  customPeriod?: {
    from: string;
    to: string;
  };
};

export const LoanStatementReport = () => {
  const methods = useForm<ReportFilterType>({
    defaultValues: {},
  });

  const [filter, setFilter] = useState<LoanStatementReportSettings | null>(null);

  const { watch } = methods;

  const memberId = watch('memberId');
  const periodType = watch('periodType');
  const accountId = watch('accountId');

  const [hasShownFilter, setHasShownFilter] = useState(false);

  const { data: savingStatementData, isFetching: reportLoading } = useGetLoanStatementReportQuery(
    {
      data: filter as LoanStatementReportSettings,
    },
    { enabled: !!filter }
  );
  const loanStatement = savingStatementData?.report?.loanStatementReport?.statement;

  return (
    <FormProvider {...methods}>
      <Box bg="white" minH="calc(100vh - 110px)" w="100%" display="flex" flexDir="column">
        <ReportHeader
          hasSave={!!memberId && !!periodType && !!accountId}
          paths={[
            { label: 'Loan Reports', link: '/reports/cbs/loan' },
            {
              label: 'New Report',
              link: '/reports/cbs/savings/new',
            },
          ]}
        />
        <LoanReportInputs
          setFilter={setFilter}
          hasShownFilter={hasShownFilter}
          setHasShownFilter={setHasShownFilter}
        />
        <Box display="flex" minH="calc(100vh - 260.5px)" w="100%" overflowX="auto">
          <Box w="100%">
            {(() => {
              if (reportLoading) {
                return (
                  <Box
                    h="200px"
                    w="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Loader />
                  </Box>
                );
              }

              if (
                loanStatement &&
                'loanStatement' in loanStatement &&
                loanStatement.loanStatement
              ) {
                return (
                  <Box display="flex" flexDir="column" w="100%">
                    <ReportOrganizationHeader reportType={Report.LOAN_INDIVIDUAL_STATEMENT} />
                    <ReportOrganization statementDate={filter?.periodType} />
                    <Box px="s32">
                      <Divider />
                    </Box>
                    <LoanReportMember
                      account={loanStatement.loanAccDetails as LoanAccReportDetails}
                      member={savingStatementData.report.loanStatementReport?.member}
                    />
                    <LoanStatementReportTable
                      loanReport={loanStatement.loanStatement as LoanStatement[]}
                    />
                  </Box>
                );
              }

              if (filter) {
                return (
                  <NoDataState
                    custom={{
                      title: 'No Reports Found',
                      subtitle:
                        'Please select a different member or a different filter to get reports',
                    }}
                  />
                );
              }

              return null;
            })()}
          </Box>
        </Box>
      </Box>
    </FormProvider>
  );
};

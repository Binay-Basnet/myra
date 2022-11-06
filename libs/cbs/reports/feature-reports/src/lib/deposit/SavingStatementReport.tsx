import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  ReportPeriodType,
  SavingAmountRange,
  SavingServiceType,
  SavingStatement,
  SavingStatementReportSettings,
  SavingTotalReport,
  SavingTransactionType,
  useGetSavingStatementQuery,
} from '@coop/cbs/data-access';
import {
  ReportHeader,
  ReportMember,
  ReportOrganization,
  ReportOrganizationHeader,
  SavingReportFilters,
  SavingReportInputs,
  SavingStatementReportTable,
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
  filter?: {
    transactionType: SavingTransactionType;
    service: SavingServiceType;
    amountRange: SavingAmountRange;
  };
};

export const SavingStatementReport = () => {
  const methods = useForm<ReportFilterType>({
    defaultValues: {
      filter: {
        service: SavingServiceType.Charges,
        transactionType: SavingTransactionType.All,
      },
    },
  });

  const [filter, setFilter] = useState<SavingStatementReportSettings | null>(null);

  const { watch } = methods;

  const memberId = watch('memberId');
  const periodType = watch('periodType');
  const accountId = watch('accountId');

  const [hasShownFilter, setHasShownFilter] = useState(false);

  const { data: savingStatementData, isFetching: reportLoading } = useGetSavingStatementQuery(
    {
      data: filter as SavingStatementReportSettings,
    },
    { enabled: !!filter }
  );
  const savingStatement = savingStatementData?.report?.savingStatementReport?.statement;

  return (
    <FormProvider {...methods}>
      <Box bg="white" minH="calc(100vh - 110px)" w="100%" display="flex" flexDir="column">
        <ReportHeader
          hasSave={!!memberId && !!periodType && !!accountId}
          paths={[
            { label: 'All Reports', link: '/reports/cbs/savings' },
            { label: 'Saving Statement', link: '/reports/cbs/savings' },
            {
              label: 'New Report',
              link: '/reports/cbs/savings/new',
            },
          ]}
        />
        <SavingReportInputs
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
                savingStatement &&
                'savingStatement' in savingStatement &&
                savingStatement.savingStatement
              ) {
                return (
                  <Box display="flex" flexDir="column" w="100%">
                    <ReportOrganizationHeader reportType={Report.SAVING_STATEMENT} />
                    <ReportOrganization statementDate={filter?.periodType} />
                    <Box px="s32">
                      <Divider />
                    </Box>
                    <ReportMember
                      member={savingStatementData.report.savingStatementReport?.member}
                    />
                    <SavingStatementReportTable
                      savingReport={savingStatement.savingStatement as SavingStatement[]}
                      savingTotal={savingStatement.totals as SavingTotalReport}
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
          <SavingReportFilters setFilter={setFilter} hasShownFilter={hasShownFilter} />
        </Box>
      </Box>
    </FormProvider>
  );
};

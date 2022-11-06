import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  ReportPeriodType,
  SavingAmountRange,
  SavingServiceType,
  SavingStatement,
  SavingTotalReport,
  SavingTransactionType,
  useGetSavingStatementQuery,
} from '@coop/cbs/data-access';
import {
  ReportHeader,
  ReportMember,
  ReportOrganization,
  SavingReportFilters,
  SavingReportInputs,
  SavingStatementReportTable,
} from '@coop/cbs/reports/components';
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
  const [triggerQuery, setTriggerQuery] = useState(false);
  const methods = useForm<ReportFilterType>({
    defaultValues: {
      filter: {
        service: SavingServiceType.Charges,
        transactionType: SavingTransactionType.All,
      },
    },
  });

  const [hasShownFilter, setHasShownFilter] = useState(false);

  const { data: savingStatementData, isFetching: reportLoading } = useGetSavingStatementQuery(
    {
      data: methods.getValues(),
    },
    {
      enabled: triggerQuery,
      onSuccess: () => setTriggerQuery(false),
    }
  );
  const savingStatement = savingStatementData?.report?.savingStatementReport?.statement;

  return (
    <FormProvider {...methods}>
      <Box bg="white" minH="calc(100vh - 110px)" w="100%" display="flex" flexDir="column">
        <ReportHeader
          filters={null}
          paths={[
            { label: 'All Reports', link: '/reports/cbs/saving-report' },
            { label: 'Saving Statement', link: '/reports/cbs/saving-report' },
            {
              label: 'New Report',
              link: '/reports/cbs/share-report/new',
            },
          ]}
        />
        <SavingReportInputs
          setTriggerQuery={setTriggerQuery}
          hasShownFilter={hasShownFilter}
          setHasShownFilter={setHasShownFilter}
        />
        <Box display="flex" minH="calc(100vh - 260.5px)" w="100%" overflowX="auto">
          <Box w="100%">
            {reportLoading ? (
              <Box h="200px" w="100%" display="flex" alignItems="center" justifyContent="center">
                {' '}
                <Loader />{' '}
              </Box>
            ) : !savingStatement ||
              !savingStatementData ||
              !('savingStatement' in savingStatement && savingStatement.savingStatement) ? (
              triggerQuery ? (
                <NoDataState
                  custom={{
                    title: 'No Reports Found',
                    subtitle:
                      'Please select a different member or a different filter to get reports',
                  }}
                />
              ) : (
                <Box
                  h="200px"
                  w="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                />
              )
            ) : (
              <Box display="flex" flexDir="column" w="100%">
                <>
                  {' '}
                  <ReportOrganization
                    filter={{
                      memberId: methods.getValues().memberId,
                      period: methods.getValues().customPeriod,
                      predefinedPeriod: methods.getValues().periodType,
                    }}
                  />
                  <Box px="s32">
                    <Divider />
                  </Box>
                  <ReportMember member={savingStatementData.report.savingStatementReport?.member} />
                  <SavingStatementReportTable
                    savingReport={savingStatement.savingStatement as SavingStatement[]}
                    savingTotal={savingStatement.totals as SavingTotalReport}
                  />
                </>
              </Box>
            )}
          </Box>
          <SavingReportFilters setTriggerQuery={setTriggerQuery} hasShownFilter={hasShownFilter} />
        </Box>
      </Box>
    </FormProvider>
  );
};

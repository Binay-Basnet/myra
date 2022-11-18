import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  InterestPostingReportEntry,
  ReportPeriodType,
  useGetInterestPostingReportQuery,
} from '@coop/cbs/data-access';
import {
  InterestStatementInputs,
  InterestStatementReportTable,
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

export const InterestPostingReport = () => {
  const methods = useForm<ReportFilterType>({
    defaultValues: {},
  });

  const [filter, setFilter] = useState<ReportFilterType | null>(null);

  const { watch } = methods;

  const memberId = watch('memberId');
  const periodType = watch('periodType');
  const accountId = watch('accountId');

  const [hasShownFilter, setHasShownFilter] = useState(false);

  const { data: savingStatementData, isFetching: reportLoading } = useGetInterestPostingReportQuery(
    {
      period: filter?.periodType,
      accountId: filter?.accountId as string,
    },
    { enabled: !!filter }
  );
  const interestStatement = savingStatementData?.report?.interestPostingReport?.data;

  return (
    <FormProvider {...methods}>
      <Box bg="white" minH="calc(100vh - 110px)" w="100%" display="flex" flexDir="column">
        <ReportHeader
          hasSave={!!memberId && !!periodType && !!accountId}
          paths={[
            { label: 'Saving Statement', link: '/reports/cbs/savings' },
            {
              label: 'Interest Statement',
              link: '/reports/cbs/interest-statement/new',
            },
          ]}
        />
        <InterestStatementInputs
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

              if (interestStatement && interestStatement.length !== 0) {
                return (
                  <Box display="flex" flexDir="column" w="100%">
                    <ReportOrganizationHeader reportType={Report.DEPOSIT_INTEREST_REPORT} />
                    <ReportOrganization statementDate={filter?.periodType} />
                    <Box px="s32">
                      <Divider />
                    </Box>
                    {/* <ReportMember */}
                    {/*  member={savingStatementData.report.savingStatementReport?.member} */}
                    {/* /> */}
                    <InterestStatementReportTable
                      interestReport={interestStatement as InterestPostingReportEntry[]}
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
          {/* <SavingReportFilters setFilter={setFilter} hasShownFilter={hasShownFilter} /> */}
        </Box>
      </Box>
    </FormProvider>
  );
};

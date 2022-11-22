import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  ActiveInactiveMemberReportData,
  ActiveInactiveMemberStatement,
  useGetActiveInactiveMemberReportQuery,
} from '@coop/cbs/data-access';
import {
  MemberActivationReportInputs,
  MemberActivationsReportTable,
  ReportHeader,
  ReportOrganization,
  ReportOrganizationHeader,
} from '@coop/cbs/reports/components';
import { Report } from '@coop/cbs/reports/list';
import { Box, Divider, Loader, NoDataState } from '@coop/shared/ui';

export const MemberActiveInactiveReport = () => {
  const methods = useForm<ActiveInactiveMemberReportData>({
    defaultValues: {},
  });

  const [hasShownFilter, setHasShownFilter] = useState(false);
  const [filter, setFilter] = useState<ActiveInactiveMemberReportData | null>(null);

  const { watch } = methods;

  const taxDeductDatePeriod = watch('periodType');

  const { data: memberActiveInactiveReportData, isFetching: reportLoading } =
    useGetActiveInactiveMemberReportQuery(
      {
        data: filter as ActiveInactiveMemberReportData,
      },
      { enabled: !!filter }
    );
  const memberActiveInactiveReport =
    memberActiveInactiveReportData?.report?.activeInactiveMemberReport?.statement;

  return (
    <FormProvider {...methods}>
      <Box bg="white" minH="calc(100vh - 110px)" w="100%" display="flex" flexDir="column">
        <ReportHeader
          hasSave={!!taxDeductDatePeriod}
          paths={[
            { label: 'Member Reports', link: '/reports/cbs/members' },
            {
              label: 'Mobile Banking Registration Report',
              link: '/reports/cbs/members/activations/new',
            },
          ]}
        />
        <MemberActivationReportInputs
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
                memberActiveInactiveReport &&
                'reportStatement' in memberActiveInactiveReport &&
                memberActiveInactiveReport.reportStatement
              ) {
                return (
                  <Box display="flex" flexDir="column" w="100%">
                    <ReportOrganizationHeader reportType={Report.SERVICE_CENTER_LIST_REPORT} />
                    {filter?.periodType && (
                      <ReportOrganization statementDate={filter?.periodType} />
                    )}
                    <Box px="s32">
                      <Divider />
                    </Box>
                    {/* <ReportMember */}
                    {/*  member={savingStatementData.report.savingStatementReport?.member} */}
                    {/* /> */}
                    <MemberActivationsReportTable
                      report={
                        memberActiveInactiveReport.reportStatement as ActiveInactiveMemberStatement[]
                      }
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

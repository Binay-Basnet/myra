import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import {
  ReportPeriodType,
  ShareStatement,
  ShareStatementReportSettings,
  ShareTransactionType,
  useGetSavedReportQuery,
  useGetShareStatementQuery,
} from '@coop/cbs/data-access';
import {
  ReportFilter,
  ReportHeader,
  ReportInputs,
  ReportMember,
  ReportOrganization,
  ReportOrganizationHeader,
  ShareReportTable,
} from '@coop/cbs/reports/components';
import { Report } from '@coop/cbs/reports/list';
import { Box, Divider, Loader, NoDataState } from '@coop/shared/ui';

export const ShareStatementReport = () => {
  const methods = useForm<ShareStatementReportSettings>({
    defaultValues: {
      filter: ShareTransactionType.All,
    },
  });

  const memberId = methods.watch('memberId');
  const periodType = methods.watch('periodType');

  const router = useRouter();
  const id = router.query['id'] as string;

  const { data: savedData, isFetching: savedLoading } = useGetSavedReportQuery(
    { reportId: id },
    { enabled: !!id }
  );

  const [filter, setFilter] = useState<ShareStatementReportSettings | null>(null);
  const [hasShownFilter, setHasShownFilter] = useState(false);

  const { data: shareStatementData, isFetching: reportLoading } = useGetShareStatementQuery(
    {
      data: filter as ShareStatementReportSettings,
    },
    { enabled: !!filter }
  );

  useEffect(() => {
    if (savedData) {
      methods.reset({
        memberId: savedData?.report?.getReport?.settings?.memberId,
        filter: savedData?.report?.getReport?.settings?.filter,
        periodType: savedData?.report?.getReport?.settings?.periodType,
      });
      setFilter({
        filter: savedData?.report?.getReport?.settings?.filter,
        memberId: savedData?.report?.getReport?.settings?.memberId as string,
        periodType: savedData?.report?.getReport?.settings?.periodType as ReportPeriodType,
        customPeriod: {
          from: savedData?.report?.getReport?.settings?.customPeriod?.from as string,
          to: savedData?.report?.getReport?.settings?.customPeriod?.to as string,
        },
      });
    }
  }, [savedLoading]);

  const shareStatement = shareStatementData?.report?.shareStatementReport?.statement;

  return (
    <FormProvider {...methods}>
      <Box bg="white" minH="calc(100vh - 110px)" w="100%" display="flex" flexDir="column">
        <ReportHeader
          hasSave={!!memberId && !!periodType}
          paths={[
            { label: 'All Reports', link: '/reports/cbs/share' },
            { label: 'Share Statement', link: '/reports/cbs/share' },
            {
              label:
                router.query['action'] !== 'new'
                  ? String(savedData?.report.getReport?.name)
                  : 'New Report',
              link: '/reports/cbs/share-report/new',
            },
          ]}
        />

        <ReportInputs
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
                shareStatement &&
                'shareStatement' in shareStatement &&
                shareStatement.shareStatement
              ) {
                return (
                  <Box display="flex" flexDir="column" w="100%">
                    <ReportOrganizationHeader reportType={Report.SHARE_STATEMENT} />
                    <ReportOrganization statementDate={filter?.periodType} />
                    <Box px="s32">
                      <Divider />
                    </Box>
                    <ReportMember member={shareStatementData.report.shareStatementReport?.member} />
                    <ShareReportTable
                      shareTotal={shareStatement?.totals}
                      shareReport={shareStatement?.shareStatement as ShareStatement[]}
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

          <ReportFilter setFilter={setFilter} hasShownFilter={hasShownFilter} />
        </Box>
      </Box>
    </FormProvider>
  );
};

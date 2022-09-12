import { ReactElement, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Spinner } from '@chakra-ui/react';

import {
  ReportPeriodType,
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
  ShareReportTable,
} from '@coop/cbs/reports/components';
import { Box, Divider, MainLayout, NoDataState } from '@coop/shared/ui';

interface ReportFilterType {
  memberId: string;
  predefinedPeriod: ReportPeriodType;
  period: {
    from: string;
    to: string;
  };
  type: ShareTransactionType;
}

interface ReportFormInput {
  memberId: string;
  period: ReportPeriodType;
  transaction_type: ShareTransactionType;
}

const NewShareStatementReport = () => {
  const methods = useForm<ReportFormInput>({
    defaultValues: {
      transaction_type: ShareTransactionType.All,
    },
  });

  const router = useRouter();

  const { data: savedData, isFetching: savedLoading } = useGetSavedReportQuery(
    { reportId: router.query.id as string },
    { enabled: !!router.query.id }
  );

  const [filter, setFilter] = useState<ReportFilterType | null>(null);
  const [hasShownFilter, setHasShownFilter] = useState(false);

  const { data: shareStatementData, isFetching: reportLoading } =
    useGetShareStatementQuery(
      {
        data: {
          memberId: filter?.memberId,
          periodType: filter?.predefinedPeriod,
          filter: filter?.type,
        },
      },
      { enabled: !!filter }
    );

  useEffect(() => {
    if (savedData) {
      methods.reset({
        memberId: savedData.report.getReport.settings.memberId,
        transaction_type: savedData.report.getReport.settings.filter,
        period: savedData.report.getReport.settings.periodType,
      });
      setFilter({
        type: savedData.report.getReport.settings.filter,
        memberId: savedData.report.getReport.settings.memberId,
        predefinedPeriod: savedData.report.getReport.settings.periodType,
        period: {
          from: savedData.report.getReport.settings.customPeriod.from,
          to: savedData.report.getReport.settings.customPeriod.to,
        },
      });
    }
  }, [savedLoading]);

  const shareStatement =
    shareStatementData?.report?.shareStatementReport?.statement;

  return (
    <FormProvider {...methods}>
      <Box
        bg="white"
        minH="calc(100vh - 110px)"
        w="100%"
        display="flex"
        flexDir="column"
      >
        <ReportHeader
          filters={filter}
          paths={[
            { label: 'All Reports', link: '/reports/cbs/share-report' },
            { label: 'Share Statement', link: '/reports/cbs/share-report' },
            {
              label:
                router.query['action'] !== 'new'
                  ? savedData?.report.getReport?.name
                  : 'New Report',
              link: '/reports/cbs/share-report/new',
            },
          ]}
        />

        <ReportInputs
          filter={filter}
          setFilter={setFilter}
          hasShownFilter={hasShownFilter}
          setHasShownFilter={setHasShownFilter}
        />

        <Box
          display="flex"
          minH="calc(100vh - 260.5px)"
          w="100%"
          overflowX="auto"
        >
          <Box w="100%">
            {reportLoading ? (
              <Box
                h="200px"
                w="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {' '}
                <Spinner />{' '}
              </Box>
            ) : !shareStatement ||
              !shareStatementData ||
              !(
                'shareStatement' in shareStatement &&
                shareStatement.shareStatement
              ) ? (
              filter ? (
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
                <ReportOrganization filter={filter} />

                <Box px="s32">
                  <Divider />
                </Box>

                <ReportMember
                  member={shareStatementData.report.shareStatementReport.member}
                />

                <ShareReportTable
                  shareTotal={shareStatement.totals}
                  shareReport={shareStatement.shareStatement}
                />
              </Box>
            )}
          </Box>

          <ReportFilter setFilter={setFilter} hasShownFilter={hasShownFilter} />
        </Box>
      </Box>
    </FormProvider>
  );
};

export default NewShareStatementReport;

NewShareStatementReport.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

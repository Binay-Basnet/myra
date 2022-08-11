import { ReactElement, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Spinner } from '@chakra-ui/react';

import {
  ShareTransactionType,
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
import { Box, Divider, MainLayout } from '@coop/shared/ui';

interface ReportFilterType {
  memberId: string;
  period: {
    from: string;
    to: string;
  };
  type: ShareTransactionType;
}

const NewShareStatementReport = () => {
  const methods = useForm();
  const [filter, setFilter] = useState<ReportFilterType | null>(null);
  const [hasShownFilter, setHasShownFilter] = useState(false);

  const { data: shareStatement, isFetching: reportLoading } =
    useGetShareStatementQuery(
      {
        data: {
          memberId: filter?.memberId,
          period: filter?.period,
          filter: filter?.type,
        },
      },
      { enabled: !!filter }
    );

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
          paths={[
            { label: 'All Reports', link: '/reports/cbs/share-report' },
            { label: 'Share Statement', link: '/reports/cbs/share-report' },
            { label: 'New Report', link: '/reports/cbs/share-report/new' },
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
              !shareStatement?.report?.shareStatementReport?.statement
                ?.shareStatement ? (
              filter ? (
                <Box
                  h="200px"
                  w="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  No Data Found
                </Box>
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

                <ReportMember />

                <ShareReportTable
                  shareReport={
                    shareStatement.report.shareStatementReport.statement
                      .shareStatement
                  }
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

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  GeneralLedgerReportEntry,
  ReportPeriodType,
  useGetLedgerReportQuery,
} from '@coop/cbs/data-access';
import {
  LedgerReportInputs,
  LedgerReportTable,
  ReportHeader,
  ReportOrganization,
  ReportOrganizationHeader,
} from '@coop/cbs/reports/components';
import { Report } from '@coop/cbs/reports/list';
import { Box, Divider, Loader, NoDataState } from '@coop/shared/ui';

type GeneralLedgerReportType = {
  ledgerId: string;
  period: ReportPeriodType;
};
export const LedgerReport = () => {
  const methods = useForm<GeneralLedgerReportType>({});

  const [filter, setFilter] = useState<GeneralLedgerReportType | null>(null);

  const { watch } = methods;

  const coaId = watch('ledgerId');
  const periodType = watch('period');

  const [hasShownFilter, setHasShownFilter] = useState(false);

  const { data: ledgerReportData, isFetching: reportLoading } = useGetLedgerReportQuery(
    {
      ledgerId: filter?.ledgerId as string,
      period: filter?.period,
    },
    { enabled: !!filter }
  );
  const ledgerReport = ledgerReportData?.report?.generalLedgerReport?.data;

  return (
    <FormProvider {...methods}>
      <Box bg="white" minH="calc(100vh - 110px)" w="100%" display="flex" flexDir="column">
        <ReportHeader
          hasSave={!!coaId && !!periodType}
          paths={[
            { label: 'Other Reports', link: '/reports/cbs/others' },
            {
              label: 'Ledger Report',
              link: '/reports/cbs/others/statement/new',
            },
          ]}
        />
        <LedgerReportInputs
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

              if (ledgerReport && ledgerReport.length !== 0) {
                return (
                  <Box display="flex" flexDir="column" w="100%">
                    <ReportOrganizationHeader reportType={Report.SAVING_STATEMENT} />
                    <ReportOrganization statementDate={filter?.period} />
                    <Box px="s32">
                      <Divider />
                    </Box>
                    <LedgerReportTable ledgerReport={ledgerReport as GeneralLedgerReportEntry[]} />
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

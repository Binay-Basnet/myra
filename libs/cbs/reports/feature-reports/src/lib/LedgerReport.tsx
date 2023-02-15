import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, GridItem, Text } from '@myra-ui';

import {
  GeneralLedgerFilter,
  GeneralLedgerReportEntry,
  useGetLedgerReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate, RouteToDetailsPage } from '@coop/cbs/utils';
import { FormBranchSelect, FormCOASelect } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

export const LedgerReport = () => {
  const [filters, setFilters] = useState<GeneralLedgerFilter | null>(null);

  const { data, isFetching } = useGetLedgerReportQuery(
    {
      data: {
        ledgerId: filters?.ledgerId,
        period: filters?.period,
      } as GeneralLedgerFilter,
    },
    { enabled: !!filters }
  );
  const ledgerReport = data?.report?.otherReport?.generalLedgerReport?.data;
  const openingBalance = data?.report?.otherReport?.generalLedgerReport?.summary?.openingBalance;
  const closingBalance = data?.report?.otherReport?.generalLedgerReport?.summary?.closingBalance;

  return (
    <Report
      defaultFilters={null}
      data={ledgerReport as GeneralLedgerReportEntry[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.GENERAL_LEDGER_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Other Reports', link: '/reports/cbs/others' },
            {
              label: 'Ledger Report',
              link: '/reports/cbs/others/ledger/new',
            },
          ]}
        />
        <LedgerReportInputs />
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Box display="flex" flexDirection="row" justifyContent="flex-end" p="s12">
            <Box display="flex" flexDirection="column">
              <Text> Opening Balance {amountConverter(openingBalance as string)}</Text>
              <Text> Closing Balance {amountConverter(closingBalance as string)}</Text>
            </Box>
          </Box>
          <Report.Table<GeneralLedgerReportEntry>
            hasSNo={false}
            columns={[
              {
                header: 'S.N',
                accessorFn: (__, index) => index + 1,
              },
              {
                header: 'Date',
                accessorFn: (row) => localizedDate(row?.date),
              },
              {
                header: 'ID ',
                accessorFn: (row) => row?.id,
                cell: (props) => (
                  <RouteToDetailsPage
                    id={props?.row?.original?.id as string}
                    type="transactions"
                    label={props?.row?.original?.id as string}
                  />
                ),
              },
              {
                header: 'Particulars',
                accessorFn: (row) => row?.account,
                meta: {
                  width: '70%',
                },
              },
              {
                header: 'Dr.',
                accessorFn: (row) => row?.debit,
                cell: (props) => amountConverter(props.getValue() as string) || '-',
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Cr. ',
                accessorFn: (row) => row?.credit,
                cell: (props) => amountConverter(props.getValue() as string) || '-',

                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Balance',
                accessorFn: (row) => row?.balance,

                meta: {
                  isNumeric: true,
                },
              },
            ]}
          />
        </Report.Content>
      </Report.Body>
    </Report>
  );
};

const LedgerReportInputs = () => {
  const { watch } = useFormContext();

  const branchId = watch('branchId') as string;

  return (
    <Report.Inputs>
      <GridItem colSpan={1}>
        <FormBranchSelect name="branchId" label="Select Service Center" />
      </GridItem>

      <GridItem colSpan={2}>
        <FormCOASelect branchId={branchId} name="ledgerId" label="Ledger Name" />
      </GridItem>

      <GridItem colSpan={1}>
        <ReportDateRange />
      </GridItem>
    </Report.Inputs>
  );
};

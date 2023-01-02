import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { GridItem } from '@myra-ui';

import {
  GeneralLedgerFilter,
  GeneralLedgerReportEntry,
  useGetLedgerReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
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
          <Report.Table<GeneralLedgerReportEntry>
            hasSNo={false}
            columns={[
              {
                header: 'ID',
                accessorFn: (row) => row?.id,
              },
              {
                header: 'Account',
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
                cell: (props) => amountConverter(props.getValue() as string),

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
        <FormBranchSelect name="branchId" label="Branch" />
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

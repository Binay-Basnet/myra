import { useMemo, useState } from 'react';

import { ExpandedCell, ExpandedHeader, GridItem } from '@myra-ui';

import { LocalizedDateFilter, useGetJournalVoucherSummaryReportQuery } from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate, RouteToDetailsPage } from '@coop/cbs/utils';
import { FormBranchSelect } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

type Filter = {
  branchId: {
    label: string;
    value: string;
  }[];
  period: LocalizedDateFilter;
  coaHead: {
    label: string;
    value: string;
  }[];
};

type JournalVoucherSummaryEntry = {
  voucherId?: string;
  voucherDate?: Record<'local' | 'en' | 'np', string>;
  ledgerId?: string;
  account?: string | null;
  serviceCenter?: string | null;
  debit?: string | null;
  credit?: string | null;
  balance?: string | null;
  balanceType?: string | null;
  notes?: string | null;
};

export const JournalVoucherSummary = () => {
  const [filters, setFilters] = useState<Filter | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;

  const { data, isFetching } = useGetJournalVoucherSummaryReportQuery(
    {
      data: {
        branchId: branchIds as string[],
        period: filters?.period as LocalizedDateFilter,
      },
    },
    { enabled: !!filters }
  );

  const reportData = useMemo(() => {
    const jvList =
      data?.report?.transactionReport?.financial?.journerVoucherReport?.data
        ?.journalVoucherReportList;

    const temp = jvList?.map((jv) => ({
      ...jv,

      children: [
        ...(jv?.nodeData?.map((node) => ({ ...node })) ?? []),
        { voucherId: 'Total', ledgerId: 'test', debit: jv?.totalDebit, credit: jv?.totalCredit },
      ],
    }));

    return temp;
  }, [data]);

  return (
    <Report
      defaultFilters={{}}
      data={reportData as JournalVoucherSummaryEntry[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.TRANSACTION_JOURNAL_VOUCHER_SUMMARY}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Transaction Reports', link: '/cbs/reports/cbs-reports/transactions' },
            {
              label: 'Journal Voucher Summary Report',
              link: '/cbs/reports/cbs-reports/transactions/journal-voucher-summary/new',
            },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={2}>
            <FormBranchSelect
              showUserBranchesOnly
              isMulti
              name="branchId"
              label="Service Center"
              // isDisabled={!!branch}
            />
          </GridItem>

          <GridItem colSpan={2}>
            <ReportDateRange name="period" label="Date" />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<JournalVoucherSummaryEntry>
            columns={[
              {
                header: ({ table }) => <ExpandedHeader table={table} value="Voucher ID" />,
                accessorKey: 'voucherId',
                cell: (props) =>
                  props?.row?.original?.voucherId === 'Total' ? (
                    props?.row?.original?.voucherId
                  ) : (
                    <ExpandedCell
                      row={props.row}
                      value={
                        <RouteToDetailsPage
                          id={props?.row?.original?.voucherId as string}
                          type="transactions"
                          label={props?.row?.original?.voucherId as string}
                        />
                      }
                    />
                  ),
              },
              {
                header: 'Voucher Date',
                accessorKey: 'voucherDate',
                cell: (props) =>
                  props?.row?.original?.voucherDate?.local
                    ? localizedDate(props?.row?.original?.voucherDate)
                    : '',
              },
              {
                header: 'Ledger',
                accessorKey: 'account',
              },
              {
                header: 'Service Center',
                accessorKey: 'serviceCenter',
              },
              {
                header: 'Debit',
                accessorKey: 'debit',
                cell: (props) =>
                  props?.row?.original?.ledgerId
                    ? amountConverter(props?.row?.original?.debit || 0)
                    : '',
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Credit',
                accessorKey: 'credit',
                cell: (props) =>
                  props?.row?.original?.ledgerId
                    ? amountConverter(props?.row?.original?.credit || 0)
                    : '',
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Balance',
                accessorKey: 'balance',
                cell: (props) =>
                  props?.row?.original?.balance
                    ? amountConverter(props?.row?.original?.balance || 0)
                    : '',
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: '',
                accessorKey: 'balanceType',
              },
              {
                header: 'Notes',
                accessorKey: 'notes',
              },
            ]}
          />
        </Report.Content>
      </Report.Body>
    </Report>
  );
};

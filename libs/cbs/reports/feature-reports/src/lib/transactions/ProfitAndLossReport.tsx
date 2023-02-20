import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, Column, GridItem, Text } from '@myra-ui';

import {
  LocalizedDateFilter,
  TrialSheetReportFilter,
  useGetBranchListQuery,
  useGetTrialSheetReportQuery,
} from '@coop/cbs/data-access';
import {
  COATable,
  Report,
  sortCoa,
  TrialBalance,
  TrialSheetReportDataEntry,
} from '@coop/cbs/reports';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormBranchSelect, FormDatePicker, FormRadioGroup } from '@coop/shared/form';
import { amountConverter, useIsCbs } from '@coop/shared/utils';

type TrialSheetReportFilters = Omit<TrialSheetReportFilter, 'filter' | 'branchId'> & {
  branchId: { label: string; value: string }[];
  filter: {
    includeZero: 'include' | 'exclude';
  };
};

export const ProfitAndLossReport = () => {
  const [filters, setFilters] = useState<TrialSheetReportFilters | null>(null);
  const branchIDs =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : [];

  const { isCbs } = useIsCbs();

  const { data, isFetching } = useGetTrialSheetReportQuery(
    {
      data: {
        branchId: branchIDs,
        period: {
          from: filters?.period?.from,
          to: filters?.period?.from,
        } as LocalizedDateFilter,
        filter: {
          includeZero: filters?.filter?.includeZero === 'include',
        },
      },
    },
    { enabled: !!filters }
  );

  const incomeReport = sortCoa(
    (data?.report?.transactionReport?.financial?.trialSheetReport?.data?.income ??
      []) as unknown as TrialSheetReportDataEntry[]
  );
  const expensesReport = sortCoa(
    (data?.report?.transactionReport?.financial?.trialSheetReport?.data?.expenses ??
      []) as unknown as TrialSheetReportDataEntry[]
  );

  return (
    <Report
      defaultFilters={{
        filter: {
          includeZero: 'include',
        },
      }}
      data={incomeReport as TrialSheetReportDataEntry[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.TRANSACTION_PROFIT_AND_LOSS}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            {
              label: 'Transaction Reports',
              link: isCbs ? '/reports/cbs/transactions' : '/accounting/reports/transactions',
            },
            {
              label: 'Profit and Loss',
              link: isCbs
                ? '/reports/cbs/transactions/profile-and-loss/new'
                : '/accounting/reports/transactions/profit-and-loss/new',
            },
          ]}
        />

        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect isMulti name="branchId" label="Service Center" />
          </GridItem>
          <GridItem colSpan={1}>
            <FormDatePicker name="period.from" label="Date" />
          </GridItem>
        </Report.Inputs>
      </Report.Header>
      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />

          {incomeReport?.length !== 0 && (
            <Box display="flex" py="s16" flexDir="column">
              <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                Income
              </Text>
              <COATable
                total={
                  data?.report?.transactionReport?.financial?.trialSheetReport?.data
                    ?.incomeTotal as unknown as TrialBalance
                }
                type="Income"
                data={incomeReport as TrialSheetReportDataEntry[]}
              />
            </Box>
          )}

          {expensesReport?.length !== 0 && (
            <Box display="flex" py="s16" flexDir="column">
              <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                Expenses
              </Text>

              <COATable
                total={
                  data?.report?.transactionReport?.financial?.trialSheetReport?.data
                    ?.expenseTotal as unknown as TrialBalance
                }
                type="Expenses"
                data={expensesReport as TrialSheetReportDataEntry[]}
              />
            </Box>
          )}

          <CoaTotalTable
            totals={[
              data?.report?.transactionReport?.financial?.trialSheetReport?.data?.totalProfitLoss ||
                {},
            ]}
          />
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="Zero Balance">
            <FormRadioGroup
              name="filter.includeZero"
              options={[
                { label: 'Include', value: 'include' },
                { label: 'Exclude', value: 'exclude' },
              ]}
              direction="column"
            />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};

interface ICoaTotalTableProps {
  totals: Record<string, string>[];
}

const CoaTotalTable = ({ totals }: ICoaTotalTableProps) => {
  const { getValues } = useFormContext<TrialSheetReportFilters>();
  const branchIDs = getValues()?.branchId?.map((a) => a.value);

  const { data: branchListQueryData } = useGetBranchListQuery({
    paginate: {
      after: '',
      first: -1,
    },
  });

  const branchList = branchListQueryData?.settings?.general?.branch?.list?.edges;
  const headers =
    branchIDs?.length === branchList?.length
      ? ['Total']
      : [
          ...((branchList
            ?.filter((a) => branchIDs.includes(a?.node?.id || ''))
            ?.map((a) => a.node?.id) || []) as string[]),
          branchIDs.length === 1 ? undefined : 'Total',
        ]?.filter(Boolean);

  const particularData: Record<string, string>[] = [
    {
      particular: 'Total Profit/Loss (Total Income - Total Expenses)',
    },
  ];

  const data = particularData?.map((d, index) => ({
    ...d,
    ...totals[index],
  })) as unknown as TrialBalance[];

  const baseColumn: Column<typeof data[0]>[] = [
    {
      header: 'Particulars',
      accessorKey: 'particular',
      cell: (props) => <Box fontWeight="600">{props.getValue() as string}</Box>,
      meta: {
        width: '80%',
      },
    },
  ];

  const columns: Column<typeof data[0]>[] = [
    ...baseColumn,
    ...headers.map(
      (header) =>
        ({
          header: branchList?.find((b) => b?.node?.id === header)?.node?.name || 'Total',
          columns: [
            {
              header: 'Debit (Dr.)',
              accessorFn: (row) => row?.[header || '']?.Dr,
              cell: (props) =>
                header ? amountConverter(props?.row?.original?.[header]?.Dr || '0.00') : '0.00',
              meta: {
                isNumeric: true,
              },
            },
            {
              header: 'Credit (Cr.)',
              accessorFn: (row) => row?.[header || '']?.Cr,
              cell: (props) =>
                header ? amountConverter(props?.row?.original?.[header]?.Cr || '0.00') : '0.00',
              meta: {
                isNumeric: true,
              },
            },
            {
              header: 'Balance',
              accessorFn: (row) => row?.[header || '']?.Total,

              cell: (props) =>
                header ? amountConverter(props.row.original?.[header]?.Total || '0.00') : '0.00',
              meta: {
                isNumeric: true,
              },
            },
            {
              header: '',
              id: 'cr',
              accessorFn: (row) => (header ? row?.[header]?.Type || '-' : '-'),
              meta: {
                width: '10px',
              },
            },
          ],
        } as Column<typeof data[0]>)
    ),
  ];

  return <Report.Table data={data} columns={columns} tableTitle="Total" />;
};

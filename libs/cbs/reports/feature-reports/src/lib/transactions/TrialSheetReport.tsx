import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Link from 'next/link';

import { Box, Button, Column, ExpandedCell, ExpandedHeader, GridItem, Text } from '@myra-ui';

import {
  LocalizedDateFilter,
  Maybe,
  Scalars,
  TrialSheetReportFilter,
  useGetBranchListQuery,
  useGetTrialSheetReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedText, ROUTES } from '@coop/cbs/utils';
import { arrayToTree } from '@coop/shared/components';
import { FormBranchSelect, FormDatePicker, FormRadioGroup } from '@coop/shared/form';
import { amountConverter, useIsCbs } from '@coop/shared/utils';

type TrialSheetReportFilters = Omit<TrialSheetReportFilter, 'filter' | 'branchId'> & {
  branchId: { label: string; value: string }[];
  filter: {
    includeZero: 'include' | 'exclude';
  };
};

export type TrialBalance = Record<string, { Dr: string; Cr: string; Total: string; Type: string }>;

export type TrialSheetReportDataEntry = {
  balance?: TrialBalance;
  ledgerId?: Maybe<Scalars['String']>;
  ledgerName?: Maybe<Scalars['Localized']>;
  under?: Maybe<Scalars['String']>;
};

export const TrialSheetReport = () => {
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

  const assetsReport = sortCoa(
    (data?.report?.transactionReport?.financial?.trialSheetReport?.data?.assets ??
      []) as unknown as TrialSheetReportDataEntry[]
  );
  const equityAndLiablities = sortCoa(
    (data?.report?.transactionReport?.financial?.trialSheetReport?.data?.equityAndLiablities ??
      []) as unknown as TrialSheetReportDataEntry[]
  );
  const incomeReport = sortCoa(
    (data?.report?.transactionReport?.financial?.trialSheetReport?.data?.income ??
      []) as unknown as TrialSheetReportDataEntry[]
  );
  const expensesReport = sortCoa(
    (data?.report?.transactionReport?.financial?.trialSheetReport?.data?.expenses ??
      []) as unknown as TrialSheetReportDataEntry[]
  );

  const offBalanceSheetReport = sortCoa(
    (data?.report?.transactionReport?.financial?.trialSheetReport?.data?.offBalance ??
      []) as unknown as TrialSheetReportDataEntry[]
  );

  const unMappedCoaHeads = sortCoa(
    (data?.report?.transactionReport?.financial?.trialSheetReport?.data?.orphanEntries ??
      []) as unknown as TrialSheetReportDataEntry[]
  );

  return (
    <Report
      defaultFilters={{
        filter: {
          includeZero: 'include',
        },
      }}
      data={assetsReport as TrialSheetReportDataEntry[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.TRANSACTION_TRIAL_SHEET}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            {
              label: 'Transaction Reports',
              link: isCbs ? '/reports/cbs/transactions' : '/accounting/reports/transactions',
            },
            {
              label: 'Trial Balance',
              link: isCbs
                ? '/reports/cbs/transactions/trial-sheet/new'
                : '/accounting/reports/transactions/trial-sheet/new',
            },
          ]}
        />

        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect isMulti name="branchId" label="Service Center" />
          </GridItem>

          <GridItem colSpan={1}>
            <FormDatePicker name="period.from" label="Date Period" />
          </GridItem>
        </Report.Inputs>
      </Report.Header>
      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />

          {equityAndLiablities?.length !== 0 && (
            <Box display="flex" py="s16" flexDir="column">
              <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                1. Equity and Liabilities
              </Text>
              <COATable
                type="Liabilities"
                total={
                  data?.report?.transactionReport?.financial?.trialSheetReport?.data
                    ?.equityAndLiablitiesTotal as unknown as TrialBalance
                }
                data={equityAndLiablities as TrialSheetReportDataEntry[]}
              />
            </Box>
          )}

          {assetsReport?.length !== 0 && (
            <Box display="flex" py="s16" flexDir="column">
              <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                2. Assets
              </Text>
              <COATable
                total={
                  data?.report?.transactionReport?.financial?.trialSheetReport?.data
                    ?.assetsTotal as unknown as TrialBalance
                }
                type="Assets"
                data={assetsReport as TrialSheetReportDataEntry[]}
              />
            </Box>
          )}

          {expensesReport?.length !== 0 && (
            <Box display="flex" py="s16" flexDir="column">
              <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                3. Expenses
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

          {incomeReport?.length !== 0 && (
            <Box display="flex" py="s16" flexDir="column">
              <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                4. Income
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

          {offBalanceSheetReport?.length !== 0 && (
            <Box display="flex" py="s16" flexDir="column">
              <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                5. Off Balance Sheet
              </Text>
              <COATable
                type="Off Balance"
                total={
                  data?.report?.transactionReport?.financial?.trialSheetReport?.data
                    ?.offBalanceTotal as unknown as TrialBalance
                }
                data={offBalanceSheetReport as TrialSheetReportDataEntry[]}
              />
            </Box>
          )}

          {unMappedCoaHeads?.length !== 0 && (
            <Box display="flex" py="s16" flexDir="column">
              <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                6. Unmapped COA Heads
              </Text>
              <COATable
                total={
                  data?.report?.transactionReport?.financial?.trialSheetReport?.data
                    ?.orphanTotal as unknown as TrialBalance
                }
                type="Unmapped COA Heads"
                data={unMappedCoaHeads as TrialSheetReportDataEntry[]}
              />
            </Box>
          )}

          <CoaTotalTable
            totals={[
              data?.report?.transactionReport?.financial?.trialSheetReport?.data?.totalProfitLoss ||
                {},
              data?.report?.transactionReport?.financial?.trialSheetReport?.data
                ?.totalAssetExpense || {},
              data?.report?.transactionReport?.financial?.trialSheetReport?.data
                ?.totalLiablitiesIncome || {},
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

export const CoaTotalTable = ({ totals }: ICoaTotalTableProps) => {
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
    {
      particular: 'Total Assets + Total Expenses + Dr of Off Balance',
    },
    {
      particular: 'Total Liabilities + Total Income + Cr of Off Balance',
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

interface ICOATableProps {
  data: TrialSheetReportDataEntry[];
  type: string;
  total: TrialBalance | null | undefined;
}

export const COATable = ({ data, type, total }: ICOATableProps) => {
  const { getValues } = useFormContext<TrialSheetReportFilters>();
  const branchIDs = getValues()?.branchId?.map((a) => a.value);

  const { data: branchListQueryData } = useGetBranchListQuery({
    paginate: {
      after: '',
      first: -1,
    },
  });

  if (data?.length === 0 && !branchListQueryData) {
    return null;
  }

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

  const baseColumn: Column<TrialSheetReportDataEntry>[] = [
    {
      header: ({ table }) => <ExpandedHeader table={table} value={type} />,
      accessorKey: 'ledgerName',
      cell: (props) => (
        <ExpandedCell
          row={props.row}
          value={
            !props.row?.getCanExpand() ? (
              <Link
                target="_blank"
                href={`${ROUTES.SETTINGS_GENERAL_COA_DETAILS}?id=${
                  props.row?.original?.ledgerId
                }&branch=${JSON.stringify(branchIDs)}`}
              >
                <Button variant="link" color="primary.500">
                  {props.row.original.ledgerId} {props?.row?.original?.ledgerName ? '-' : ''}{' '}
                  {localizedText(props?.row?.original?.ledgerName)}
                </Button>
              </Link>
            ) : (
              ` ${props.row.original.ledgerId} ${
                props?.row?.original?.ledgerName ? '-' : ''
              } ${localizedText(props?.row?.original?.ledgerName)}`
            )
          }
        />
      ),
      meta: {
        width: '80%',
      },
      footer: () => <>Total {type}</>,
    },
  ];

  const columns: Column<TrialSheetReportDataEntry>[] = [
    ...baseColumn,
    ...headers.map(
      (header) =>
        ({
          header: branchList?.find((b) => b?.node?.id === header)?.node?.name || 'Total',
          accessorKey: 'balance',
          columns: [
            {
              header: 'Debit (Dr.)',
              accessorFn: (row) => row?.balance,
              cell: (props) =>
                amountConverter(props.row?.original?.balance?.[header || '']?.Dr || '0.00'),

              footer: () => amountConverter(total?.[header || '']?.Dr || '0.00'),
              meta: {
                isNumeric: true,
              },
            },
            {
              header: 'Credit (Cr.)',
              accessorFn: (row) => row?.balance,
              cell: (props) =>
                amountConverter(props.row?.original?.balance?.[header || '']?.Cr || '0.00'),
              footer: () => amountConverter(total?.[header || '']?.Cr || '0.00'),
              meta: {
                isNumeric: true,
              },
            },
            {
              header: 'Balance',
              accessorFn: (row) => row?.balance,
              cell: (props) =>
                header
                  ? amountConverter(props.row?.original?.balance?.[header]?.Total || '0.00')
                  : '0.00',
              footer: () => amountConverter(total?.[header || '']?.Total || '0.00'),
              meta: {
                isNumeric: true,
              },
            },
            {
              header: '',
              id: 'cr',
              accessorFn: (row) => (header ? row.balance?.[header]?.Type || '-' : '-'),
              footer: () => total?.[header || '']?.Type || '-',
              meta: {
                width: '10px',
              },
            },
          ],
        } as Column<TrialSheetReportDataEntry>)
    ),
  ];

  const tree = arrayToTree(
    data.map((d) => ({ ...d, id: d?.ledgerId as string })).filter((d) => !!d.id),
    ''
  );

  return (
    <Report.Table<TrialSheetReportDataEntry>
      showFooter
      data={tree}
      columns={columns}
      tableTitle={type}
    />
  );
};

export const sortCoa = (data: TrialSheetReportDataEntry[]) =>
  data?.sort((a, b) =>
    Number(
      a?.ledgerId?.localeCompare(b?.ledgerId as string, undefined, {
        numeric: true,
        sensitivity: 'base',
      })
    )
  );

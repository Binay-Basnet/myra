import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Link from 'next/link';

import { Box, Button, Column, ExpandedCell, ExpandedHeader, Text } from '@myra-ui';

import {
  CharKhataReportFilter,
  CoaHead,
  LocalizedDateFilter,
  Maybe,
  Scalars,
  useGetBranchListQuery,
  useGetCharKhataReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { CharkhataReportInputs } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedText, ROUTES } from '@coop/cbs/utils';
import { arrayToTree } from '@coop/shared/components';
import { FormRadioGroup } from '@coop/shared/form';
import { amountConverter, useIsCbs } from '@coop/shared/utils';

type TrialSheetReportFilters = Omit<CharKhataReportFilter, 'filter' | 'branchId' | 'coaHead'> & {
  branchId: { label: string; value: string }[];
  coaHead: { label: string; value: CoaHead }[];
  filter: {
    includeZero: 'include' | 'exclude';
  };
  coaType: { label: string; value: string }[];
};

type TrialBalance = Record<
  string,
  {
    Dr: string;
    Cr: string;
    Total: string;
    Type: string;
    OpeningBalance: string;
    OpeningBalanceType: string;
    ClosingBalance: string;
    ClosingBalanceType: string;
  }
>;

type TrialSheetReportDataEntry = {
  balance?: TrialBalance;
  ledgerId?: Maybe<Scalars['String']>;
  ledgerName?: Maybe<Scalars['Localized']>;
  under?: Maybe<Scalars['String']>;
};

export const CharKhataReport = () => {
  const [filters, setFilters] = useState<TrialSheetReportFilters | null>(null);

  const { isCbs } = useIsCbs();

  const branchIDs =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : [];

  const coaHeads =
    filters?.coaHead && filters?.coaHead.length !== 0 ? filters?.coaHead?.map((t) => t.value) : [];

  const { data, isFetching } = useGetCharKhataReportQuery(
    {
      data: {
        branchId: branchIDs,
        period: {
          from: filters?.period?.from,
          to: filters?.period?.to,
        } as LocalizedDateFilter,
        coaHead: coaHeads,
        filter: {
          includeZero: filters?.filter?.includeZero === 'include',
        },
      },
    },
    { enabled: !!filters }
  );

  const assetsReport = sortCoa(
    (data?.report?.transactionReport?.financial?.charKhataReport?.data?.assets ??
      []) as unknown as TrialSheetReportDataEntry[]
  );
  const equityAndLiablities = sortCoa(
    (data?.report?.transactionReport?.financial?.charKhataReport?.data?.equityAndLiablities ??
      []) as unknown as TrialSheetReportDataEntry[]
  );
  const incomeReport = sortCoa(
    (data?.report?.transactionReport?.financial?.charKhataReport?.data?.income ??
      []) as unknown as TrialSheetReportDataEntry[]
  );
  const expensesReport = sortCoa(
    (data?.report?.transactionReport?.financial?.charKhataReport?.data?.expenses ??
      []) as unknown as TrialSheetReportDataEntry[]
  );

  const offBalanceSheetReport = sortCoa(
    (data?.report?.transactionReport?.financial?.charKhataReport?.data?.offBalance ??
      []) as unknown as TrialSheetReportDataEntry[]
  );

  const unMappedCoaHeads = sortCoa(
    (data?.report?.transactionReport?.financial?.charKhataReport?.data?.orphanEntries ??
      []) as unknown as TrialSheetReportDataEntry[]
  );

  const dataCheck = assetsReport?.length
    ? assetsReport
    : equityAndLiablities?.length
    ? equityAndLiablities
    : incomeReport?.length
    ? incomeReport
    : expensesReport?.length
    ? expensesReport
    : offBalanceSheetReport?.length
    ? offBalanceSheetReport
    : unMappedCoaHeads;

  return (
    <Report
      defaultFilters={{
        filter: {
          includeZero: 'include',
        },
      }}
      data={dataCheck as TrialSheetReportDataEntry[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.TRANSACTION_CHAR_KHATA_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            {
              label: 'Transaction Reports',
              link: isCbs ? '/reports/cbs/transactions' : '/accounting/reports/transactions',
            },
            {
              label: 'CharKhata Ledger Report',
              link: isCbs
                ? '/reports/cbs/transactions/charkhata/new'
                : '/accounting/reports/transactions/charkhata/new',
            },
          ]}
        />

        <Report.Inputs hideDate>
          <CharkhataReportInputs />
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
                  data?.report?.transactionReport?.financial?.charKhataReport?.data
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
                  data?.report?.transactionReport?.financial?.charKhataReport?.data
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
                  data?.report?.transactionReport?.financial?.charKhataReport?.data
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
                  data?.report?.transactionReport?.financial?.charKhataReport?.data
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
                  data?.report?.transactionReport?.financial?.charKhataReport?.data
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
                  data?.report?.transactionReport?.financial?.charKhataReport?.data
                    ?.orphanTotal as unknown as TrialBalance
                }
                type="Unmapped COA Heads"
                data={unMappedCoaHeads as TrialSheetReportDataEntry[]}
              />
            </Box>
          )}
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

interface ICOATableProps {
  data: TrialSheetReportDataEntry[];
  type: string;
  total: TrialBalance | null | undefined;
}

const COATable = ({ data, type, total }: ICOATableProps) => {
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
              header: 'Opening Balance',
              id: 'opening Balance',
              accessorFn: (row) => row?.balance,
              cell: (props) =>
                amountConverter(
                  props.row?.original?.balance?.[header || '']?.OpeningBalance || '0.00'
                ),

              footer: () => amountConverter(total?.[header || '']?.OpeningBalance || '0.00'),
              meta: {
                isNumeric: true,
              },
            },
            {
              header: '',
              id: 'opening Balance Type',

              accessorFn: (row) => row?.balance,
              cell: (props) =>
                props.row?.original?.balance?.[header || '']?.OpeningBalanceType || '-',

              footer: () => total?.[header || '']?.OpeningBalanceType || '-',

              meta: {
                width: '15px',
                isNumeric: true,
              },
            },
            {
              header: 'Amount (Dr)',
              id: 'Amount(Dr)',

              accessorFn: (row) => row?.balance,
              cell: (props) =>
                amountConverter(props.row?.original?.balance?.[header || '']?.Dr || '0.00'),

              footer: () => amountConverter(total?.[header || '']?.Dr || '0.00'),
              meta: {
                isNumeric: true,
              },
            },
            {
              header: 'Amount (Cr)',
              id: 'Amount(Cr)',

              accessorFn: (row) => row?.balance,
              cell: (props) =>
                amountConverter(props.row?.original?.balance?.[header || '']?.Cr || '0.00'),
              footer: () => amountConverter(total?.[header || '']?.Cr || '0.00'),
              meta: {
                isNumeric: true,
              },
            },
            {
              header: 'Net Balance',
              id: 'Net Balance',
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
              id: 'Net Balance Type',

              accessorFn: (row) => row?.balance,
              cell: (props) => props.row?.original?.balance?.[header || '']?.Type || '-',

              footer: () => total?.[header || '']?.Type || '-',

              meta: {
                width: '15px',
                isNumeric: true,
              },
            },

            {
              header: 'Closing Balance',
              id: 'Closing Balance',

              accessorFn: (row) => row?.balance,
              cell: (props) =>
                header
                  ? amountConverter(
                      props.row?.original?.balance?.[header]?.ClosingBalance || '0.00'
                    )
                  : '0.00',
              footer: () => amountConverter(total?.[header || '']?.ClosingBalance || '0.00'),
              meta: {
                isNumeric: true,
              },
            },
            {
              header: '',
              id: 'Closing Balance Type',

              accessorFn: (row) => row?.balance,
              cell: (props) =>
                props.row?.original?.balance?.[header || '']?.ClosingBalanceType || '-',

              footer: () => total?.[header || '']?.ClosingBalanceType || '-',

              meta: {
                width: '15px',
                isNumeric: true,
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

const sortCoa = (data: TrialSheetReportDataEntry[]) =>
  data?.sort((a, b) =>
    Number(
      a?.ledgerId?.localeCompare(b?.ledgerId as string, undefined, {
        numeric: true,
        sensitivity: 'base',
      })
    )
  );

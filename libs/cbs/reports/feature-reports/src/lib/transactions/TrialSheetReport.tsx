import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, Button, Column, ExpandedCell, ExpandedHeader, GridItem, MultiFooter } from '@myra-ui';

import {
  LocalizedDateFilter,
  Maybe,
  Scalars,
  TrialSheetReportFilter,
  useAppSelector,
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

const COAType = {
  EQUITY_AND_LIABILITIES: 'Equity and Liabilities',
  ASSETS: 'Assets',
  EXPENSES: 'Expenses',
  INCOME: 'Income',
  OFF_BALANCE: 'Off Balance',
  UNMAPPED_COA_HEADS: 'Unmapped COA Heads',
} as const;

export const generateAndSortCOATreeArray = ({
  array,
  type,
  total,
}: {
  array: TrialSheetReportDataEntry[];
  total: Record<string, unknown>;
  type: keyof typeof COAType;
}) => {
  if (!array || !array.length) return [];

  const arrayWithCoaHead = [
    ...array.map((a) => ({
      ...a,
      under: !a?.under ? type : a.under,
    })),
    {
      balance: total as unknown as TrialBalance,
      ledgerId: type,
      ledgerName: { local: COAType[type], en: COAType[type], np: COAType[type] },
      under: '',
    },
  ];

  return sortCoa(arrayWithCoaHead);
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

  const coaReportData = data?.report?.transactionReport?.financial?.trialSheetReport?.data;

  const coaReport = [
    ...generateAndSortCOATreeArray({
      array: (coaReportData?.equityAndLiablities || []) as TrialSheetReportDataEntry[],
      type: 'EQUITY_AND_LIABILITIES',
      total: coaReportData?.equityAndLiablitiesTotal || {},
    }),
    ...generateAndSortCOATreeArray({
      array: (coaReportData?.assets || []) as TrialSheetReportDataEntry[],
      type: 'ASSETS',
      total: coaReportData?.assetsTotal || {},
    }),
    ...generateAndSortCOATreeArray({
      array: (coaReportData?.expenses || []) as TrialSheetReportDataEntry[],
      type: 'EXPENSES',
      total: coaReportData?.expenseTotal || {},
    }),
    ...generateAndSortCOATreeArray({
      array: (coaReportData?.income || []) as TrialSheetReportDataEntry[],
      type: 'INCOME',
      total: coaReportData?.incomeTotal || {},
    }),
    ...generateAndSortCOATreeArray({
      array: (coaReportData?.offBalance || []) as TrialSheetReportDataEntry[],
      type: 'OFF_BALANCE',
      total: coaReportData?.offBalanceTotal || {},
    }),
    ...generateAndSortCOATreeArray({
      array: (coaReportData?.orphanEntries || []) as TrialSheetReportDataEntry[],
      type: 'UNMAPPED_COA_HEADS',
      total: coaReportData?.orphanTotal || {},
    }),
  ];

  return (
    <Report
      defaultFilters={{
        filter: {
          includeZero: 'include',
        },
      }}
      data={coaReport}
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
              link: isCbs
                ? '/cbs/reports/cbs-reports/transactions'
                : '/accounting/reports/accounting-reports/transactions',
            },
            {
              label: 'Trial Balance',
              link: isCbs
                ? '/cbs/reports/cbs-reports/transactions/trial-sheet/new'
                : '/accounting/reports/accounting-reports/transactions/trial-sheet/new',
            },
          ]}
        />

        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect showUserBranchesOnly isMulti name="branchId" label="Service Center" />
          </GridItem>

          <GridItem colSpan={1}>
            <FormDatePicker name="period.from" label="Date" />
          </GridItem>
        </Report.Inputs>
      </Report.Header>
      <Report.Body>
        <Report.Content showSignatures>
          <Report.OrganizationHeader />
          <Report.Organization />

          <COATable
            type="Particulars"
            total={[
              {
                label: 'Total Profit/Loss (Total Income - Total Expenses)',
                value: coaReportData?.totalProfitLoss as unknown as TrialBalance,
              },
              {
                label: 'Total Assets + Total Expenses + Dr of Off Balance',
                value: coaReportData?.totalAssetExpense as unknown as TrialBalance,
              },
              {
                label: 'Total Liabilities + Total Income + Cr of Off Balance',
                value: coaReportData?.totalLiablitiesIncome as unknown as TrialBalance,
              },
            ]}
            data={coaReport}
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

interface ICOATableProps {
  data: TrialSheetReportDataEntry[];
  type: string;
  total: { label: string; value: TrialBalance }[];
  coaRedirect?: boolean;
}

export const COATable = ({ data, type, total, coaRedirect = true }: ICOATableProps) => {
  const { getValues } = useFormContext<TrialSheetReportFilters>();
  const branchIDs = getValues()?.branchId?.map((a) => a.value);

  const datePeriod = getValues()?.period;

  const auth = useAppSelector((state) => state?.auth);

  if (data?.length === 0 && !auth?.availableBranches?.length) {
    return null;
  }

  const branchList = auth?.availableBranches;
  const headers =
    branchIDs?.length === branchList?.length
      ? ['Total']
      : [
          ...((branchList?.filter((a) => branchIDs?.includes(a?.id || ''))?.map((a) => a?.id) ||
            []) as string[]),
          branchIDs?.length === 1 ? undefined : 'Total',
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
              coaRedirect ? (
                <Button
                  variant="link"
                  color="primary.500"
                  onClick={() =>
                    window.open(
                      `${ROUTES.SETTINGS_GENERAL_COA_DETAILS}?id=${
                        props.row?.original?.ledgerId
                      }&branch=${JSON.stringify(branchIDs)}&date=${datePeriod?.from?.en}`,
                      '_blank'
                    )
                  }
                >
                  {props.row.original.ledgerId} {props?.row?.original?.ledgerName ? '-' : ''}{' '}
                  {localizedText(props?.row?.original?.ledgerName)}
                </Button>
              ) : (
                <>
                  {props.row.original.ledgerId} {props?.row?.original?.ledgerName ? '-' : ''}{' '}
                  {localizedText(props?.row?.original?.ledgerName)}
                </>
              )
            ) : props?.row.original.under ? (
              `${props.row.original.ledgerId} ${props?.row?.original?.ledgerName ? '-' : ''}
                ${localizedText(props?.row?.original?.ledgerName)}`
            ) : (
              localizedText(props?.row?.original?.ledgerName)
            )
          }
        />
      ),
      footer: () => <MultiFooter texts={total?.map((t) => t.label)} />,
      meta: {
        width: '80%',
      },
    },
  ];

  const columns: Column<TrialSheetReportDataEntry>[] = [
    ...baseColumn,
    ...headers.map(
      (header) =>
        ({
          header: branchList?.find((b) => b?.id === header)?.name || 'Total',
          accessorKey: 'balance',
          columns: [
            {
              header: 'Debit (Dr.)',
              accessorFn: (row) => row?.balance,
              cell: (props) =>
                amountConverter(props.row?.original?.balance?.[header || '']?.Dr || '0.00'),

              footer: () => (
                <MultiFooter
                  texts={total?.map((t) => amountConverter(t.value?.[header || '']?.Dr || '0.00'))}
                />
              ),

              meta: {
                isNumeric: true,
              },
            },
            {
              header: 'Credit (Cr.)',
              accessorFn: (row) => row?.balance,
              cell: (props) =>
                amountConverter(props.row?.original?.balance?.[header || '']?.Cr || '0.00'),

              footer: () => (
                <MultiFooter
                  texts={total?.map((t) => amountConverter(t.value?.[header || '']?.Cr || '0.00'))}
                />
              ),
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
              footer: () => (
                <MultiFooter
                  texts={total?.map((t) =>
                    amountConverter(t.value?.[header || '']?.Total || '0.00')
                  )}
                />
              ),
              meta: {
                isNumeric: true,
              },
            },
            {
              header: '',
              id: 'cr',
              accessorFn: (row) => (header ? row.balance?.[header]?.Type || '-' : '-'),
              footer: () => (
                <MultiFooter
                  texts={total?.map((t) => t.value?.[header || '']?.Type || '0.00' || '-')}
                />
              ),
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
    <>
      <Report.Table<TrialSheetReportDataEntry>
        data={tree}
        columns={columns}
        tableTitle={type}
        expandFirstLevel
      />
      <CoaTotalTable total={total} />
    </>
  );
};

interface ICoaTotalTableProps {
  total: { label: string; value: TrialBalance }[];
}

export const CoaTotalTable = ({ total }: ICoaTotalTableProps) => {
  const { getValues } = useFormContext<TrialSheetReportFilters>();
  const branchIDs = getValues()?.branchId?.map((a) => a.value);

  const auth = useAppSelector((state) => state?.auth);

  const branchList = auth?.availableBranches;

  const headers =
    branchIDs?.length === branchList?.length
      ? ['Total']
      : [
          ...((branchList?.filter((a) => branchIDs?.includes(a?.id || ''))?.map((a) => a?.id) ||
            []) as string[]),
          branchIDs?.length === 1 ? undefined : 'Total',
        ]?.filter(Boolean);

  const particularData: Record<string, string>[] = total?.map((t) => ({
    particular: t.label,
  }));

  const data = particularData?.map((d, index) => ({
    ...d,
    ...total[index].value,
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
          header: branchList?.find((b) => b?.id === header)?.name || 'Total',
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

  if (total.length === 0) {
    return null;
  }

  return <Report.Table data={data} columns={columns} tableTitle="Total" />;
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

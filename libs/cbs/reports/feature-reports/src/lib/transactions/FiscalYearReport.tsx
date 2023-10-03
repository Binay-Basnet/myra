import { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Button, Column, ExpandedCell, ExpandedHeader, GridItem, MultiFooter } from '@myra-ui';

import {
  LocalizedDateFilter,
  Maybe,
  Scalars,
  TrialSheetReportFilter,
  useAppSelector,
  useGetFiscalYearTrialBalanceQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportCustomDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedText } from '@coop/cbs/utils';
import { arrayToTree } from '@coop/shared/components';
import { FormBranchSelect, FormRadioGroup } from '@coop/shared/form';
import { amountConverter, useIsCbs } from '@coop/shared/utils';

import { CoaTotalTable, generateAndSortCOATreeArray } from './TrialSheetReport';

type TrialSheetReportFilters = Omit<TrialSheetReportFilter, 'filter' | 'branchId'> & {
  branchId: { label: string; value: string }[];
  filter: {
    includeZero: 'include' | 'exclude';
    includeFiscalReversal: 'YES' | 'NO';
    inculdeAdjustment: 'YES' | 'NO';
  };
};

type LedgerBalance = {
  Dr: string;
  Cr: string;
  Total: string;
  Type: string;
  AdjustmentDr: string;
  AdjustmentCr: string;
  AdjustmentTotal: string;
  AdjustmentType: string;
  ClosingCr: string;
  ClosingDr: string;
  ClosingBalance: string;
  ClosingBalanceType: string;
};

type TrialBalance = Record<
  string,
  LedgerBalance & {
    prev: LedgerBalance;
  }
>;

type TrialSheetReportDataEntry = {
  balance?: TrialBalance;
  ledgerId?: Maybe<Scalars['String']>;
  ledgerName?: Maybe<Scalars['Localized']>;
  under?: Maybe<Scalars['String']>;
};

export const FiscalYearReport = () => {
  const [filters, setFilters] = useState<TrialSheetReportFilters | null>(null);
  const branchIDs =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : [];

  const { isCbs } = useIsCbs();

  const { data, isFetching } = useGetFiscalYearTrialBalanceQuery(
    {
      data: {
        period: {
          ...filters?.period,
        } as LocalizedDateFilter,
        branchId: branchIDs,

        filter: {
          includeZero: filters?.filter?.includeZero === 'include',
          includeFiscalReversal: filters?.filter?.includeFiscalReversal === 'YES',
          // inculdeAdjustment: filters?.filter?.inculdeAdjustment === 'YES',
        },
      },
    },
    { enabled: !!filters }
  );

  const coaReportData = data?.report?.transactionReport?.financial?.fiscalTrialSheetReport?.data;

  const prevCoaReportData =
    data?.report?.transactionReport?.financial?.fiscalTrialSheetReport?.prevYearData;

  const modCoaReportData = useMemo(() => {
    const temp = coaReportData;

    coaReportData?.equityAndLiablities?.forEach((item, index) => {
      Object.keys(item?.balance ?? [])?.forEach((bId) => {
        if (temp?.equityAndLiablities?.[index]?.['balance']?.[bId]) {
          temp.equityAndLiablities[index]['balance'][bId]['prev'] =
            prevCoaReportData?.equityAndLiablities?.[index]?.['balance']?.[bId];
        }
      });
    });

    coaReportData?.expenses?.forEach((item, index) => {
      Object.keys(item?.balance ?? [])?.forEach((bId) => {
        temp.expenses[index]['balance'][bId]['prev'] =
          prevCoaReportData?.expenses[index]['balance'][bId];
      });
    });

    coaReportData?.income?.forEach((item, index) => {
      Object.keys(item?.balance ?? [])?.forEach((bId) => {
        temp.income[index]['balance'][bId]['prev'] =
          prevCoaReportData?.income[index]['balance'][bId];
      });
    });

    coaReportData?.assets?.forEach((item, index) => {
      Object.keys(item?.balance ?? [])?.forEach((bId) => {
        temp.assets[index]['balance'][bId]['prev'] =
          prevCoaReportData?.assets[index]['balance'][bId];
      });
    });

    coaReportData?.offBalance?.forEach((item, index) => {
      Object.keys(item?.balance)?.forEach((bId) => {
        temp.offBalance[index]['balance'][bId]['prev'] =
          prevCoaReportData?.offBalance[index]['balance'][bId];
      });
    });

    coaReportData?.orphanEntries?.forEach((item, index) => {
      Object.keys(item?.balance ?? [])?.forEach((bId) => {
        temp.orphanEntries[index]['balance'][bId]['prev'] =
          prevCoaReportData?.orphanEntries[index]['balance'][bId];
      });
    });

    Object.keys(coaReportData?.equityAndLiablitiesTotal ?? {})?.forEach((bId) => {
      if (temp?.equityAndLiablitiesTotal?.[bId]) {
        temp.equityAndLiablitiesTotal[bId]['prev'] =
          prevCoaReportData?.equityAndLiablitiesTotal?.[bId];
      }
    });

    Object.keys(coaReportData?.assetsTotal ?? {})?.forEach((bId) => {
      if (temp?.assetsTotal?.[bId]) {
        temp.assetsTotal[bId]['prev'] = prevCoaReportData?.assetsTotal?.[bId];
      }
    });

    Object.keys(coaReportData?.expenseTotal ?? {})?.forEach((bId) => {
      if (temp?.expenseTotal?.[bId]) {
        temp.expenseTotal[bId]['prev'] = prevCoaReportData?.expenseTotal?.[bId];
      }
    });

    Object.keys(coaReportData?.incomeTotal ?? {})?.forEach((bId) => {
      if (temp?.incomeTotal?.[bId]) {
        temp.incomeTotal[bId]['prev'] = prevCoaReportData?.incomeTotal?.[bId];
      }
    });

    Object.keys(coaReportData?.offBalanceTotal ?? {})?.forEach((bId) => {
      if (temp?.offBalanceTotal?.[bId]) {
        temp.offBalanceTotal[bId]['prev'] = prevCoaReportData?.offBalanceTotal?.[bId];
      }
    });

    Object.keys(coaReportData?.orphanTotal ?? {})?.forEach((bId) => {
      if (temp?.orphanTotal?.[bId]) {
        temp.orphanTotal[bId]['prev'] = prevCoaReportData?.orphanTotal?.[bId];
      }
    });

    return temp;
  }, [coaReportData, prevCoaReportData]);

  const coaReport = [
    ...generateAndSortCOATreeArray({
      array: (modCoaReportData?.equityAndLiablities || []) as TrialSheetReportDataEntry[],
      type: 'EQUITY_AND_LIABILITIES',
      total: modCoaReportData?.equityAndLiablitiesTotal || {},
    }),
    ...generateAndSortCOATreeArray({
      array: (modCoaReportData?.assets || []) as TrialSheetReportDataEntry[],
      type: 'ASSETS',
      total: modCoaReportData?.assetsTotal || {},
    }),
    ...generateAndSortCOATreeArray({
      array: (modCoaReportData?.expenses || []) as TrialSheetReportDataEntry[],
      type: 'EXPENSES',
      total: modCoaReportData?.expenseTotal || {},
    }),
    ...generateAndSortCOATreeArray({
      array: (modCoaReportData?.income || []) as TrialSheetReportDataEntry[],
      type: 'INCOME',
      total: modCoaReportData?.incomeTotal || {},
    }),
    ...generateAndSortCOATreeArray({
      array: (modCoaReportData?.offBalance || []) as TrialSheetReportDataEntry[],
      type: 'OFF_BALANCE',
      total: modCoaReportData?.offBalanceTotal || {},
    }),
    ...generateAndSortCOATreeArray({
      array: (modCoaReportData?.orphanEntries || []) as TrialSheetReportDataEntry[],
      type: 'UNMAPPED_COA_HEADS',
      total: modCoaReportData?.orphanTotal || {},
    }),
  ];

  return (
    <Report
      defaultFilters={{
        filter: {
          includeZero: 'include',
          includeFiscalReversal: 'YES',
          inculdeAdjustment: 'NO',
        },
      }}
      data={coaReport}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.TRANSACTION_FISCAL_YEAR}
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
              label: 'Fiscal Year and Adjustment Trial Balance',
              link: isCbs
                ? '/cbs/reports/cbs-reports/transactions/fiscal-year/new'
                : '/accounting/reports/accounting-reports/transactions/fiscal-year/new',
            },
          ]}
        />

        <Report.Inputs>
          <GridItem colSpan={2}>
            <FormBranchSelect showUserBranchesOnly isMulti name="branchId" label="Service Center" />
          </GridItem>

          <GridItem colSpan={2}>
            <ReportCustomDateRange name="period" label="Date" />
          </GridItem>
        </Report.Inputs>
      </Report.Header>
      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <FiscalYearCOATable
            type="Particulars"
            total={[
              {
                label: 'Total Profit/Loss (Total Income - Total Expenses)',
                value: modCoaReportData?.totalProfitLoss as unknown as TrialBalance,
              },
              {
                label: 'Total Assets + Total Expenses + Dr of Off Balance',
                value: modCoaReportData?.totalAssetExpense as unknown as TrialBalance,
              },
              {
                label: 'Total Liabilities + Total Income + Cr of Off Balance',
                value: modCoaReportData?.totalLiablitiesIncome as unknown as TrialBalance,
              },
            ]}
            data={coaReport as TrialSheetReportDataEntry[]}
            coaRedirect
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
          <Report.Filter title="Include Year End Settlement">
            <FormRadioGroup
              name="filter.includeFiscalReversal"
              options={[
                { label: 'Yes', value: 'YES' },
                { label: 'No', value: 'NO' },
              ]}
              direction="column"
            />
          </Report.Filter>
          {/* <Report.Filter title="Include Adjustments">
            <FormRadioGroup
              name="filter.inculdeAdjustment"
              options={[
                { label: 'Yes', value: 'YES' },
                { label: 'No', value: 'NO' },
              ]}
              direction="column"
            />
          </Report.Filter> */}
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

const FiscalYearCOATable = ({ data, type, total, coaRedirect = true }: ICOATableProps) => {
  const { getValues } = useFormContext<TrialSheetReportFilters>();
  const branchIDs = getValues()?.branchId?.map((a) => a.value);

  const datePeriod = getValues()?.period;

  const auth = useAppSelector((state) => state?.auth);

  if (data?.length === 0 && !auth.availableBranches?.length) {
    return null;
  }

  const branchList = auth.availableBranches;

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
                      `/cbs/reports/cbs-reports/others/adjusted-ledger/new?id=${
                        props.row?.original?.ledgerId
                      }&branch=${JSON.stringify(branchIDs)}&dateFromen=${
                        datePeriod?.from?.en
                      }&dateToen=${datePeriod?.to?.en}&dateFromnp=${
                        datePeriod?.from?.np
                      }&dateTonp=${datePeriod?.to?.np}`,

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
          // accessorKey: 'balance',
          columns: [
            {
              header: 'Previous Year Balance',
              columns: [
                {
                  header: 'Debit (Dr.)',
                  accessorFn: (row) => row?.balance,
                  cell: (props) =>
                    amountConverter(
                      props.row?.original?.balance?.[header || '']?.prev?.ClosingDr || '0.00'
                    ),

                  // footer: () => (
                  //   <MultiFooter
                  //     texts={total?.map((t) =>
                  //       amountConverter(t.value?.[header || '']?.Dr || '0.00')
                  //     )}
                  //   />
                  // ),

                  meta: {
                    isNumeric: true,
                  },
                },
                {
                  header: 'Credit (Cr.)',
                  accessorFn: (row) => row?.balance,
                  cell: (props) =>
                    amountConverter(
                      props.row?.original?.balance?.[header || '']?.prev?.ClosingCr || '0.00'
                    ),

                  // footer: () => (
                  //   <MultiFooter
                  //     texts={total?.map((t) =>
                  //       amountConverter(t.value?.[header || '']?.Cr || '0.00')
                  //     )}
                  //   />
                  // ),
                  meta: {
                    isNumeric: true,
                  },
                },
                {
                  header: 'Balance',
                  accessorFn: (row) => row?.balance,
                  cell: (props) =>
                    header
                      ? amountConverter(
                          props.row?.original?.balance?.[header]?.prev?.ClosingBalance || '0.00'
                        )
                      : '0.00',
                  // footer: () => (
                  //   <MultiFooter
                  //     texts={total?.map((t) =>
                  //       amountConverter(t.value?.[header || '']?.Total || '0.00')
                  //     )}
                  //   />
                  // ),
                  meta: {
                    isNumeric: true,
                  },
                },
                {
                  header: '',
                  id: 'cr',
                  accessorFn: (row) =>
                    header ? row.balance?.[header]?.prev?.ClosingBalanceType || '-' : '-',
                  // footer: () => (
                  //   <MultiFooter
                  //     texts={total?.map((t) => t.value?.[header || '']?.Type || '0.00' || '-')}
                  //   />
                  // ),
                  meta: {
                    width: '10px',
                  },
                },
              ],
            },
            {
              header: 'Unadjusted Trial Balance',
              columns: [
                {
                  header: 'Debit (Dr.)',
                  accessorFn: (row) => row?.balance,
                  cell: (props) =>
                    amountConverter(props.row?.original?.balance?.[header || '']?.Dr || '0.00'),

                  // footer: () => (
                  //   <MultiFooter
                  //     texts={total?.map((t) =>
                  //       amountConverter(t.value?.[header || '']?.Dr || '0.00')
                  //     )}
                  //   />
                  // ),

                  meta: {
                    isNumeric: true,
                  },
                },
                {
                  header: 'Credit (Cr.)',
                  accessorFn: (row) => row?.balance,
                  cell: (props) =>
                    amountConverter(props.row?.original?.balance?.[header || '']?.Cr || '0.00'),

                  // footer: () => (
                  //   <MultiFooter
                  //     texts={total?.map((t) =>
                  //       amountConverter(t.value?.[header || '']?.Cr || '0.00')
                  //     )}
                  //   />
                  // ),
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
                  // footer: () => (
                  //   <MultiFooter
                  //     texts={total?.map((t) =>
                  //       amountConverter(t.value?.[header || '']?.Total || '0.00')
                  //     )}
                  //   />
                  // ),
                  meta: {
                    isNumeric: true,
                  },
                },
                {
                  header: '',
                  id: 'cr',
                  accessorFn: (row) => (header ? row.balance?.[header]?.Type || '-' : '-'),
                  // footer: () => (
                  //   <MultiFooter
                  //     texts={total?.map((t) => t.value?.[header || '']?.Type || '0.00' || '-')}
                  //   />
                  // ),
                  meta: {
                    width: '10px',
                  },
                },
              ],
            },
            {
              header: 'Adjustment',
              columns: [
                {
                  header: 'Debit (Dr.)',
                  accessorFn: (row) => row?.balance,
                  cell: (props) =>
                    amountConverter(
                      props.row?.original?.balance?.[header || '']?.AdjustmentDr || '0.00'
                    ),

                  // footer: () => (
                  //   <MultiFooter
                  //     texts={total?.map((t) =>
                  //       amountConverter(t.value?.[header || '']?.AdjustmentDr || '0.00')
                  //     )}
                  //   />
                  // ),

                  meta: {
                    isNumeric: true,
                  },
                },
                {
                  header: 'Credit (Cr.)',
                  accessorFn: (row) => row?.balance,
                  cell: (props) =>
                    amountConverter(
                      props.row?.original?.balance?.[header || '']?.AdjustmentCr || '0.00'
                    ),

                  // footer: () => (
                  //   <MultiFooter
                  //     texts={total?.map((t) =>
                  //       amountConverter(t.value?.[header || '']?.AdjustmentCr || '0.00')
                  //     )}
                  //   />
                  // ),
                  meta: {
                    isNumeric: true,
                  },
                },
                {
                  header: 'Balance',
                  accessorFn: (row) => row?.balance,
                  cell: (props) =>
                    header
                      ? amountConverter(
                          props.row?.original?.balance?.[header]?.AdjustmentTotal || '0.00'
                        )
                      : '0.00',
                  footer: () => (
                    <MultiFooter
                      texts={total?.map((t) =>
                        amountConverter(t.value?.[header || '']?.AdjustmentTotal || '0.00')
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
                  accessorFn: (row) =>
                    header ? row.balance?.[header]?.AdjustmentType || '-' : '-',
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
            },
            {
              header: 'Adjusted Trial Balance',
              columns: [
                {
                  header: 'Debit (Dr.)',
                  accessorFn: (row) => row?.balance,
                  cell: (props) =>
                    amountConverter(
                      props.row?.original?.balance?.[header || '']?.ClosingDr || '0.00'
                    ),

                  // footer: () => (
                  //   <MultiFooter
                  //     texts={total?.map((t) =>
                  //       amountConverter(t.value?.[header || '']?.Dr || '0.00')
                  //     )}
                  //   />
                  // ),

                  meta: {
                    isNumeric: true,
                  },
                },
                {
                  header: 'Credit (Cr.)',
                  accessorFn: (row) => row?.balance,
                  cell: (props) =>
                    amountConverter(
                      props.row?.original?.balance?.[header || '']?.ClosingCr || '0.00'
                    ),

                  // footer: () => (
                  //   <MultiFooter
                  //     texts={total?.map((t) =>
                  //       amountConverter(t.value?.[header || '']?.Cr || '0.00')
                  //     )}
                  //   />
                  // ),
                  meta: {
                    isNumeric: true,
                  },
                },
                {
                  header: 'Balance',
                  accessorFn: (row) => row?.balance,
                  cell: (props) =>
                    header
                      ? amountConverter(
                          props.row?.original?.balance?.[header]?.ClosingBalance || '0.00'
                        )
                      : '0.00',
                  // footer: () => (
                  //   <MultiFooter
                  //     texts={total?.map((t) =>
                  //       amountConverter(t.value?.[header || '']?.ClosingBalance || '0.00')
                  //     )}
                  //   />
                  // ),
                  meta: {
                    isNumeric: true,
                  },
                },
                {
                  header: '',
                  id: 'cr',
                  accessorFn: (row) =>
                    header ? row.balance?.[header]?.ClosingBalanceType || '-' : '-',
                  // footer: () => (
                  //   <MultiFooter
                  //     texts={total?.map(
                  //       (t) => t.value?.[header || '']?.ClosingBalanceType || '0.00' || '-'
                  //     )}
                  //   />
                  // ),
                  meta: {
                    width: '10px',
                  },
                },
              ],
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

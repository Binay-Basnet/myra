import { useState } from 'react';
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
import { localizedText, ROUTES } from '@coop/cbs/utils';
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

type TrialBalance = Record<
  string,
  {
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
          inculdeAdjustment: filters?.filter?.inculdeAdjustment === 'YES',
        },
      },
    },
    { enabled: !!filters }
  );

  const coaReportData = data?.report?.transactionReport?.financial?.fiscalTrialSheetReport?.data;

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
              link: isCbs ? '/reports/cbs/transactions' : '/accounting/reports/transactions',
            },
            {
              label: 'Fiscal Year and Adjustment Trial Balance',
              link: isCbs
                ? '/reports/cbs/transactions/fiscal-year/new'
                : '/accounting/reports/transactions/fiscal-year/new',
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
            data={coaReport as TrialSheetReportDataEntry[]}
            coaRedirect={false}
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
          <Report.Filter title="Include Adjustments">
            <FormRadioGroup
              name="filter.inculdeAdjustment"
              options={[
                { label: 'Yes', value: 'YES' },
                { label: 'No', value: 'NO' },
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
          // accessorKey: 'balance',
          columns: [
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

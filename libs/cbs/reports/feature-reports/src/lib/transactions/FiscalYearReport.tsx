import { useState } from 'react';

import { GridItem } from '@myra-ui';

import {
  LocalizedDateFilter,
  Maybe,
  Scalars,
  TrialSheetReportFilter,
  useGetFiscalYearTrialBalanceQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportCustomDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormBranchSelect, FormRadioGroup } from '@coop/shared/form';
import { useIsCbs } from '@coop/shared/utils';

import { COATable, generateAndSortCOATreeArray } from './TrialSheetReport';

type TrialSheetReportFilters = Omit<TrialSheetReportFilter, 'filter' | 'branchId'> & {
  branchId: { label: string; value: string }[];
  filter: {
    includeZero: 'include' | 'exclude';
    includeFiscalReversal: 'YES' | 'NO';
    inculdeAdjustment: 'YES' | 'NO';
  };
};

type TrialBalance = Record<string, { Dr: string; Cr: string; Total: string; Type: string }>;

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
          <Report.Filter title="Include Year End Reversal">
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

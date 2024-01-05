import { useState } from 'react';

import { GridItem } from '@myra-ui';

import {
  LocalizedDateFilter,
  TrialSheetReportFilter,
  useGetTrialSheetReportQuery,
} from '@coop/cbs/data-access';
import { Report, TrialSheetReportDataEntry } from '@coop/cbs/reports';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormBranchSelect, FormCBSDatePicker, FormRadioGroup } from '@coop/shared/form';
import { useIsCbs } from '@coop/shared/utils';

import { COATable, generateAndSortCOATreeArray, TrialBalance } from './TrialSheetReport';

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

  const coaReportData = data?.report?.transactionReport?.financial?.trialSheetReport?.data;

  const coaReport = [
    ...generateAndSortCOATreeArray({
      array: (coaReportData?.income || []) as TrialSheetReportDataEntry[],
      type: 'INCOME',
      total: coaReportData?.incomeTotal || {},
    }),
    ...generateAndSortCOATreeArray({
      array: (coaReportData?.expenses || []) as TrialSheetReportDataEntry[],
      type: 'EXPENSES',
      total: coaReportData?.expenseTotal || {},
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
      report={ReportEnum.TRANSACTION_PROFIT_AND_LOSS}
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
              label: 'Profit and Loss',
              link: isCbs
                ? '/cbs/reports/cbs-reports/transactions/profile-and-loss/new'
                : '/accounting/reports/accounting-reports/transactions/profit-and-loss/new',
            },
          ]}
        />

        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect showUserBranchesOnly isMulti name="branchId" label="Service Center" />
          </GridItem>
          <GridItem colSpan={1}>
            <FormCBSDatePicker name="period.from" label="Date" />
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

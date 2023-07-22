import { useState } from 'react';

import { GridItem } from '@myra-ui';

import {
  LocalizedDateFilter,
  TrialSheetReportFilter,
  useGetTrialSheetReportQuery,
} from '@coop/cbs/data-access';
import { Report, TrialSheetReportDataEntry } from '@coop/cbs/reports';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormBranchSelect, FormDatePicker, FormRadioGroup } from '@coop/shared/form';
import { useIsCbs } from '@coop/shared/utils';

import { COATable, generateAndSortCOATreeArray } from './TrialSheetReport';

type TrialSheetReportFilters = Omit<TrialSheetReportFilter, 'filter' | 'branchId'> & {
  branchId: { label: string; value: string }[];
  filter: {
    includeZero: 'include' | 'exclude';
  };
};

export const BalanceSheetReport = () => {
  const [filters, setFilters] = useState<TrialSheetReportFilters | null>(null);
  const { isCbs } = useIsCbs();

  const branchIDs =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : [];

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
        injectProfit: true,
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
      report={ReportEnum.TRANSACTION_BALANCE_SHEET_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            {
              label: 'Transaction Reports',
              link: isCbs ? '/reports/cbs/transactions' : '/accounting/reports/transactions',
            },
            {
              label: 'Balance Sheet',
              link: isCbs
                ? '/reports/cbs/transactions/balance-sheet/new'
                : '/accounting/reports/transactions/balance-sheet/new',
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
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <COATable type="Particulars" total={[]} data={coaReport} />
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

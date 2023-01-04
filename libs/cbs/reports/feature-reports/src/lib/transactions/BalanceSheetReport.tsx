import { useState } from 'react';

import { Box, GridItem, Text } from '@myra-ui';

import {
  LocalizedDateFilter,
  TrialSheetReportDataEntry,
  TrialSheetReportFilter,
  useGetTrialSheetReportQuery,
} from '@coop/cbs/data-access';
import { COATable, Report, sortCoa } from '@coop/cbs/reports';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormBranchSelect, FormDatePicker, FormRadioGroup } from '@coop/shared/form';

type TrialSheetReportFilters = Omit<TrialSheetReportFilter, 'filter' | 'branchId'> & {
  branchId: { label: string; value: string }[];
  filter: {
    includeZero: 'include' | 'exclude';
  };
};

export const BalanceSheetReport = () => {
  const [filters, setFilters] = useState<TrialSheetReportFilters | null>(null);

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

  const assetsReport = sortCoa(
    (data?.report?.transactionReport?.financial?.trialSheetReport?.data?.assets ??
      []) as TrialSheetReportDataEntry[]
  );
  const equityAndLiablities = sortCoa(
    (data?.report?.transactionReport?.financial?.trialSheetReport?.data?.equityAndLiablities ??
      []) as TrialSheetReportDataEntry[]
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
      report={ReportEnum.TRANSACTION_BALANCE_SHEET_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Transaction Reports', link: '/reports/cbs/transactions' },
            { label: 'Balance Sheet', link: '/reports/cbs/transactions/balance-sheet/new' },
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
                Equity and Liabilities
              </Text>
              <COATable
                type="Liabilities"
                total={
                  data?.report?.transactionReport?.financial?.trialSheetReport?.data
                    ?.equityAndLiablitiesTotal
                }
                data={equityAndLiablities as TrialSheetReportDataEntry[]}
              />
            </Box>
          )}

          {assetsReport?.length !== 0 && (
            <Box display="flex" py="s16" flexDir="column">
              <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                Assets
              </Text>
              <COATable
                total={
                  data?.report?.transactionReport?.financial?.trialSheetReport?.data?.assetsTotal
                }
                type="Assets"
                data={assetsReport as TrialSheetReportDataEntry[]}
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

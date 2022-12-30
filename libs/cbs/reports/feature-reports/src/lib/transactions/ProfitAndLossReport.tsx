import { useState } from 'react';

import { Box, GridItem, Text } from '@myra-ui';

import {
  LocalizedDateFilter,
  TrialSheetReportDataEntry,
  TrialSheetReportFilter,
  useGetTrialSheetReportQuery,
} from '@coop/cbs/data-access';
import { COATable, Report, sortCoa } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormBranchSelect, FormRadioGroup } from '@coop/shared/form';

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

  const { data, isFetching } = useGetTrialSheetReportQuery(
    {
      data: {
        branchId: branchIDs,
        period: filters?.period as LocalizedDateFilter,
        filter: {
          includeZero: filters?.filter?.includeZero === 'include',
        },
      },
    },
    { enabled: !!filters }
  );

  const incomeReport = sortCoa(
    (data?.report?.transactionReport?.financial?.trialSheetReport?.data?.income ??
      []) as TrialSheetReportDataEntry[]
  );
  const expensesReport = sortCoa(
    (data?.report?.transactionReport?.financial?.trialSheetReport?.data?.expenses ??
      []) as TrialSheetReportDataEntry[]
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
            { label: 'Transaction Reports', link: '/reports/cbs/transactions' },
            { label: 'Profit and Loss', link: '/reports/cbs/transactions/profile-and-loss/new' },
          ]}
        />

        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect isMulti name="branchId" label="Service Center" />
          </GridItem>
          <GridItem colSpan={1}>
            <ReportDateRange label="Date Period" />
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
                  data?.report?.transactionReport?.financial?.trialSheetReport?.data?.incomeTotal
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
                  data?.report?.transactionReport?.financial?.trialSheetReport?.data?.expenseTotal
                }
                type="Expenses"
                data={expensesReport as TrialSheetReportDataEntry[]}
              />
            </Box>
          )}

          <Box
            display="flex"
            flexDir="column"
            borderRadius="br2"
            border="1px"
            mb="s16"
            mx="s16"
            borderColor="border.element"
          >
            <Box h="40px" display="flex">
              <Box
                display="flex"
                alignItems="center"
                w="80%"
                h="100%"
                px="s12"
                borderRight="1px"
                borderRightColor="border.element"
                fontSize="r1"
                fontWeight={600}
                color="gray.700"
              >
                Total Profit/Loss (Total Income - Total Expenses)
              </Box>
              <Box px="s12" w="20%" display="flex" alignItems="center" justifyContent="end">
                {data?.report?.transactionReport?.financial?.trialSheetReport?.data
                  ?.totalProfitLoss ?? 0}
              </Box>
            </Box>
          </Box>
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

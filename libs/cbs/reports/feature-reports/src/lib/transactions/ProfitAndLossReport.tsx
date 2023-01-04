import { useState } from 'react';

import { Box, GridItem, Text } from '@myra-ui';

import {
  LocalizedDateFilter,
  TrialSheetReportDataEntry,
  TrialSheetReportFilter,
  useGetBranchListQuery,
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

export const ProfitAndLossReport = () => {
  const [filters, setFilters] = useState<TrialSheetReportFilters | null>(null);
  const branchIDs =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : [];

  const { data: branchListQueryData } = useGetBranchListQuery({
    paginate: {
      after: '',
      first: -1,
    },
  });

  const branchList = branchListQueryData?.settings?.general?.branch?.list?.edges;
  const headers = branchIDs?.includes('ALL')
    ? ['Total']
    : [
        ...((branchList
          ?.filter((a) => branchIDs.includes(a?.node?.id || ''))
          ?.map((a) => a.node?.id) || []) as string[]),
        branchIDs.length === 1 ? undefined : 'Total',
      ]?.filter(Boolean) || [];

  const { data, isFetching } = useGetTrialSheetReportQuery(
    {
      data: {
        branchId: branchIDs?.includes('ALL')
          ? (branchList?.map((b) => b?.node?.id as string) as string[])
          : branchIDs,
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
            <FormBranchSelect showAll isMulti name="branchId" label="Service Center" />
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
            borderColor="border.layout"
          >
            <Box h="40px" display="flex">
              <Box
                display="flex"
                alignItems="center"
                w="80%"
                h="100%"
                px="s12"
                borderRight="1px"
                borderRightColor="border.layout"
                fontSize="r1"
                fontWeight={600}
                color="gray.700"
              >
                Total Profit/Loss (Total Income - Total Expenses)
              </Box>
              {headers.map((d, index) => (
                <Box
                  whiteSpace="nowrap"
                  px="s12"
                  display="flex"
                  alignItems="center"
                  justifyContent="end"
                  borderRight={index !== headers.length - 1 ? '1px' : '0'}
                  borderRightColor="border.layout"
                  key={d}
                  w="20%"
                  textAlign="right"
                >
                  {data?.report?.transactionReport?.financial?.trialSheetReport?.data
                    ?.totalProfitLoss?.[d || ''] || '0.00'}
                </Box>
              ))}
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

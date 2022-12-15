import { useState } from 'react';

import { Box, ExpandedCell, ExpandedHeader, GridItem, Text } from '@myra-ui';

import {
  LocalizedDateFilter,
  TrialSheetReportDataEntry,
  TrialSheetReportFilter,
  useGetTrialSheetReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedText } from '@coop/cbs/utils';
import { arrayToTree } from '@coop/shared/components';
import { FormBranchSelect, FormRadioGroup } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

type TrialSheetReportFilters = Omit<TrialSheetReportFilter, 'filter'> & {
  filter: {
    includeZero: 'include' | 'exclude';
  };
};

export const TrialSheetReport = () => {
  const [filters, setFilters] = useState<TrialSheetReportFilters | null>(null);

  const { data, isFetching } = useGetTrialSheetReportQuery(
    {
      data: {
        branchId: filters?.branchId as string,
        period: filters?.period as LocalizedDateFilter,
        filter: {
          includeZero: filters?.filter?.includeZero === 'include',
        },
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
      data={assetsReport as TrialSheetReportDataEntry[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.TRANSACTION_TRIAL_SHEET}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Transaction Reports', link: '/reports/cbs/transactions' },
            { label: 'Trial Balance', link: '/reports/cbs/transactions/trail-sheet/new' },
          ]}
        />

        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect name="branchId" label="Branch" />
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

          {equityAndLiablities?.length !== 0 && (
            <Box display="flex" py="s16" flexDir="column">
              <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                1. Equity and Liabilities
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
                2. Assets
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

          {expensesReport?.length !== 0 && (
            <Box display="flex" py="s16" flexDir="column">
              <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                3. Expenses
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

          {incomeReport?.length !== 0 && (
            <Box display="flex" py="s16" flexDir="column">
              <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                4. Income
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

          <Box
            display="flex"
            flexDir="column"
            borderRadius="br2"
            border="1px"
            mb="s16"
            mx="s16"
            borderColor="border.element"
          >
            <Box h="40px" display="flex" borderBottom="1px" borderBottomColor="border.element">
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
                {amountConverter(
                  data?.report?.transactionReport?.financial?.trialSheetReport?.data
                    ?.totalProfitLoss ?? 0
                )}
              </Box>
            </Box>
            <Box h="40px" display="flex" borderBottom="1px" borderBottomColor="border.element">
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
                Total Assets + Total Expenses
              </Box>
              <Box px="s12" w="20%" display="flex" alignItems="center" justifyContent="end">
                {amountConverter(
                  data?.report?.transactionReport?.financial?.trialSheetReport?.data
                    ?.totalAssetExpense ?? 0
                )}
              </Box>
            </Box>
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
                Total Liabilities + Total Income
              </Box>
              <Box px="s12" w="20%" display="flex" alignItems="center" justifyContent="end">
                {amountConverter(
                  data?.report?.transactionReport?.financial?.trialSheetReport?.data
                    ?.totalLiablitiesIncome ?? 0
                )}
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

interface ICOATableProps {
  data: TrialSheetReportDataEntry[];
  type: string;
  total: string | null | undefined;
}

const COATable = ({ data, type, total }: ICOATableProps) => {
  if (data?.length === 0) {
    return null;
  }

  const tree = arrayToTree(
    data.map((d) => ({ ...d, id: d?.ledgerId as string })).filter((d) => !!d.id),
    ''
  );

  return (
    <Report.Table<TrialSheetReportDataEntry>
      showFooter
      data={tree}
      columns={[
        {
          header: ({ table }) => <ExpandedHeader table={table} value="General Ledger Name" />,
          accessorKey: 'ledgerName',
          cell: (props) => (
            <ExpandedCell
              row={props.row}
              value={` ${props.row.original.ledgerId} - ${localizedText(
                props?.row?.original?.ledgerName
              )}`}
            />
          ),
          footer: () => <>Total {type}</>,
          meta: {
            width: '80%',
          },
        },
        {
          header: 'Balance',
          accessorKey: 'balance',
          cell: (props) => amountConverter(props.getValue() as string),
          footer: () => <>{amountConverter(total ?? 0)}</>,
          meta: {
            isNumeric: true,
          },
        },
      ]}
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

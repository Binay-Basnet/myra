import { useState } from 'react';

import { Box, GridItem, Text } from '@myra-ui';

import {
  FdInvestmentStatementReportData,
  FdInvestmentStatementReportFilter,
  useGetFdInvestmentStatementReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate } from '@coop/cbs/utils';
import { FormBranchSelect, FormInvestmentEntrySelect } from '@coop/shared/form';
import { amountConverter, quantityConverter } from '@coop/shared/utils';

type FDInvestmentStatementFilters = Omit<FdInvestmentStatementReportFilter, 'branchId'> & {
  branchId: {
    label: string;
    value: string;
  }[];
};
export const FDInvestmentStatementReport = () => {
  const [filters, setFilters] = useState<FDInvestmentStatementFilters | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;

  const { data, isFetching } = useGetFdInvestmentStatementReportQuery(
    {
      data: {
        ...filters,
        branchId: branchIds,
      } as FdInvestmentStatementReportFilter,
    },
    { enabled: !!filters }
  );

  const fdInvestmentReport = data?.report?.accountingReport?.fdInvestmentStatementReport?.data;

  const summary = data?.report?.accountingReport?.fdInvestmentStatementReport?.summary;

  return (
    <Report
      defaultFilters={null}
      data={fdInvestmentReport as FdInvestmentStatementReportData[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.ACCOUNTING_FD_INVESTMENT_STATEMENT_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Accounting Reports', link: '/reports/cbs/accounting' },
            {
              label: ReportEnum.ACCOUNTING_FD_INVESTMENT_STATEMENT_REPORT,
              link: '/reports/cbs/accounting/fd-investment-statement/new',
            },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={2}>
            <FormBranchSelect
              showUserBranchesOnly
              isMulti
              name="branchId"
              label="Select Service Center"
            />
          </GridItem>
          <GridItem colSpan={1}>
            <FormInvestmentEntrySelect
              name="accountId"
              label="Select FD Account"
              type="FIXED_DEPOSIT"
            />
          </GridItem>
          <GridItem colSpan={1}>
            <ReportDateRange />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Box display="flex" justifyContent="end" px="s16" pt="s16">
            <Text fontSize="r1" fontWeight="500">
              Opening Balance: {amountConverter(summary?.openingBalance || 0)}
            </Text>
          </Box>
          <Report.Table<FdInvestmentStatementReportData & { index: number }>
            showFooter
            columns={[
              {
                header: 'S.No.',
                accessorKey: 'index',
                footer: () => <Box textAlign="center">Total </Box>,
                meta: {
                  width: '60px',
                  Footer: {
                    colspan: 4,
                  },
                },
              },
              {
                header: 'Date',
                accessorKey: 'date',
                cell: (props) => localizedDate(props?.row?.original?.date),

                meta: {
                  Footer: {
                    display: 'none',
                  },
                  skipExcelFormatting: true,
                },
              },
              {
                header: 'Particulars',
                accessorKey: 'particulars',

                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Cheque No',
                accessorKey: 'chequeNo',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Transaction Type',
                accessorKey: 'transactionType',
                cell: (props) => (
                  <Box textTransform="capitalize">
                    {props?.row?.original?.transactionType?.replace(/_/g, ' ').toLowerCase()}
                  </Box>
                ),
              },

              {
                header: 'Transaction Amount',
                accessorKey: 'transactionAmount',
                cell: (props) => quantityConverter(props?.row?.original?.transactionAmount || '0'),
                footer: () => amountConverter(summary?.fdAmountTotal || 0),
                meta: {
                  isNumeric: true,
                },
              },
            ]}
          />
        </Report.Content>
      </Report.Body>
    </Report>
  );
};

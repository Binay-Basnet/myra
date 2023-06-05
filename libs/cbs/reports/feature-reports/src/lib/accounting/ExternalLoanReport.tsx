import { useState } from 'react';

import { Box, GridItem } from '@myra-ui';

import {
  ExternalLoanReportData,
  ExternalLoanReportFilter,
  useGetAccountingExternalLoanReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate } from '@coop/cbs/utils';
import { FormBranchSelect } from '@coop/shared/form';
import { amountConverter, quantityConverter } from '@coop/shared/utils';

type ExternalLoanFilters = Omit<ExternalLoanReportFilter, 'branchId'> & {
  branchId: {
    label: string;
    value: string;
  }[];
};
export const ExternalLoanReport = () => {
  const [filters, setFilters] = useState<ExternalLoanFilters | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;

  const { data, isFetching } = useGetAccountingExternalLoanReportQuery(
    {
      data: {
        ...filters,
        branchId: branchIds,
      } as ExternalLoanReportFilter,
    },
    { enabled: !!filters }
  );

  const externalLoanReport = data?.report?.accountingReport?.externalLoanReport?.data;

  const summary = data?.report?.accountingReport?.externalLoanReport?.summary;

  return (
    <Report
      defaultFilters={null}
      data={externalLoanReport as ExternalLoanReportData[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.ACCOUNTING_EXTERNAL_LOAN_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Accounting Reports', link: '/reports/cbs/accounting' },
            {
              label: ReportEnum.ACCOUNTING_EXTERNAL_LOAN_REPORT,
              link: '/reports/cbs/accounting/external-loan/new',
            },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect isMulti name="branchId" label="Select Service Center" />
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

          <Report.Table<ExternalLoanReportData & { index: number }>
            showFooter
            columns={[
              {
                header: 'S.No.',
                accessorKey: 'index',
                footer: () => <Box textAlign="center">Total </Box>,
                meta: {
                  width: '60px',
                  Footer: {
                    colspan: 6,
                  },
                },
              },
              {
                header: 'Organization Name',
                accessorKey: 'organizationName',

                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Organization Branch',
                accessorKey: 'organizationBranch',

                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Loan Number',
                accessorKey: 'loanNumber',

                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Mortgage Type',
                accessorKey: 'mortgage',
                cell: (props) => (
                  <Box textTransform="capitalize">
                    {props?.row?.original?.mortgage?.replace(/_/g, ' ').toLowerCase()}
                  </Box>
                ),

                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Loan Approved Date',
                accessorKey: 'date',
                cell: (props) => localizedDate(props?.row?.original?.loanApprovedDate),

                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Loan Amount',
                accessorKey: 'loanAmount',
                cell: (props) => quantityConverter(props?.row?.original?.loanAmount || '0'),
                footer: () => amountConverter(summary?.totalLoanAmount || 0),
                meta: {
                  isNumeric: true,
                },
              },

              {
                header: 'Interest Rate',
                accessorKey: 'interestRate',
                cell: (props) => `${props?.row?.original?.interestRate || '0'}%`,
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Maturity Date',
                accessorKey: 'maturityDate',
                cell: (props) => localizedDate(props?.row?.original?.maturityDate),
              },

              {
                header: 'Principal Paid Principal',
                accessorKey: 'principalPaidAmount',
                cell: (props) =>
                  quantityConverter(props?.row?.original?.principalPaidAmount || '0'),
                footer: () => amountConverter(summary?.totalPrincipalAmount || 0),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Interest Paid Amount',
                accessorKey: 'interestPaidAmount',
                cell: (props) => quantityConverter(props?.row?.original?.interestPaidAmount || '0'),
                footer: () => amountConverter(summary?.totalInterestAmount || 0),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Outstanding Loan Amount',
                accessorKey: 'outstandingLoanAmount',
                cell: (props) =>
                  quantityConverter(props?.row?.original?.outstandingLoanAmount || '0'),
                footer: () => amountConverter(summary?.totalOutstandingLoanAmount || 0),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Fine Paid',
                accessorKey: 'finePaid',
                cell: (props) => quantityConverter(props?.row?.original?.finePaid || '0'),
                footer: () => amountConverter(summary?.totalFinePaid || 0),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Rebate',
                accessorKey: 'rebate',
                cell: (props) => quantityConverter(props?.row?.original?.rebate || '0'),
                footer: () => amountConverter(summary?.totalRebate || 0),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Total Paid',
                accessorKey: 'totalPaid',
                cell: (props) => quantityConverter(props?.row?.original?.totalPaid || '0'),
                footer: () => amountConverter(summary?.totalOfTotalPaid || 0),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Installment Type',
                accessorKey: 'installmentType',
                cell: (props) => (
                  <Box textTransform="capitalize">
                    {props?.row?.original?.installmentType?.replace(/_/g, ' ').toLowerCase()}
                  </Box>
                ),
              },
              {
                header: 'Installment Frequency',
                accessorKey: 'installmentFrequency',
                cell: (props) => (
                  <Box textTransform="capitalize">
                    {props?.row?.original?.installmentFrequency?.replace(/_/g, ' ').toLowerCase()}
                  </Box>
                ),
              },
              {
                header: 'Tenure(Days)',
                accessorKey: 'tenure',
                meta: {
                  isNumeric: true,
                },
              },

              {
                header: 'Remaining Tenure(Days)',
                accessorKey: 'remainingTenure',
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Loan Closed Date',
                accessorKey: 'loanClosedDate',
                cell: (props) => localizedDate(props?.row?.original?.loanClosedDate),
              },
              {
                header: 'Related Branch',
                accessorKey: 'relatedBranch',
              },
            ]}
          />
        </Report.Content>
      </Report.Body>
    </Report>
  );
};

import { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, GridItem } from '@myra-ui';

import {
  ExternalLoanStatementReportData,
  ExternalLoanStatementReportFilter,
  useExternalLoanListQuery,
  useGetAccountingExternalLoanStatementReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate } from '@coop/cbs/utils';
import { FormBranchSelect, FormSelect } from '@coop/shared/form';
import { amountConverter, quantityConverter } from '@coop/shared/utils';

type ExternalLoanStatementFilters = Omit<ExternalLoanStatementReportFilter, 'branchId'> & {
  branchId: {
    label: string;
    value: string;
  }[];
};
export const ExternalLoanStatementReport = () => {
  const [filters, setFilters] = useState<ExternalLoanStatementFilters | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;

  const { data, isFetching } = useGetAccountingExternalLoanStatementReportQuery(
    {
      data: {
        ...filters,
        branchId: branchIds,
      } as ExternalLoanStatementReportFilter,
    },
    { enabled: !!filters }
  );

  const externalLoanReport = data?.report?.accountingReport?.externalLoanStatementReport?.data;

  const summary = data?.report?.accountingReport?.externalLoanStatementReport?.summary;

  return (
    <Report
      defaultFilters={null}
      data={externalLoanReport as ExternalLoanStatementReportData[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.ACCOUNTING_EXTERNAL_LOAN_STATEMENT_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Accounting Reports', link: '/reports/cbs/accounting' },
            {
              label: ReportEnum.ACCOUNTING_EXTERNAL_LOAN_STATEMENT_REPORT,
              link: '/reports/cbs/accounting/external-loan-statement/new',
            },
          ]}
        />
        <ExternalLoanStatementReportInputs />
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<ExternalLoanStatementReportData & { index: number }>
            showFooter
            columns={[
              {
                header: 'S.No.',
                accessorKey: 'index',
                footer: () => <Box textAlign="center">Total </Box>,
                meta: {
                  width: '60px',
                  Footer: {
                    colspan: 5,
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
                header: 'Transaction Id',
                accessorKey: 'transactionId',
                // cell: (props) => (
                //   <RouteToDetailsPage
                //     id={props?.row?.original?.transactionId as string}
                //     type="transactions"
                //     label={props?.row?.original?.transactionId as string}
                //   />
                // ),

                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Received Principal',
                accessorKey: 'receivedPrincipal',
                cell: (props) => quantityConverter(props?.row?.original?.receivedPrincipal || '0'),
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Paid Principal',
                accessorKey: 'paidPrincipal',
                cell: (props) => quantityConverter(props?.row?.original?.paidPrincipal || '0'),
                footer: () => amountConverter(summary?.paidPrincipalTotal || 0),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Interested Paid',
                accessorKey: 'paidInterest',
                cell: (props) => quantityConverter(props?.row?.original?.paidInterest || '0'),
                footer: () => amountConverter(summary?.paidInterestTotal || 0),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Fine Paid',
                accessorKey: 'paidFine',
                cell: (props) => quantityConverter(props?.row?.original?.paidFine || '0'),
                footer: () => amountConverter(summary?.paidFineTotal || 0),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Discount',
                accessorKey: 'discount',
                cell: (props) => quantityConverter(props?.row?.original?.discount || '0'),
                footer: () => amountConverter(summary?.discountTotal || 0),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Remaining Principal',
                accessorKey: 'remainingPrincipal',
                cell: (props) => quantityConverter(props?.row?.original?.remainingPrincipal || '0'),
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

const ExternalLoanStatementReportInputs = () => {
  const { watch } = useFormContext<ExternalLoanStatementFilters>();

  const { data: loanList } = useExternalLoanListQuery({
    pagination: {
      after: '',
      first: -1,
    },
    filter: {
      orConditions: [
        {
          andConditions: [
            {
              column: 'branchId',
              value: watch('branchId')?.map((branch) => branch.value) || [],
              comparator: 'IN',
            },
          ],
        },
      ],
    },
  });
  const loanListData = loanList?.accounting?.externalLoan?.loan?.list?.edges;
  const loanListSearchOptions = useMemo(
    () =>
      loanListData?.map((account) => ({
        label: account?.node?.loanName as string,
        value: account?.node?.id as string,
      })),
    [loanListData]
  );

  return (
    <Report.Inputs>
      <GridItem colSpan={2}>
        <FormBranchSelect isMulti name="branchId" label="Select Service Center" />
      </GridItem>
      <GridItem colSpan={1}>
        <FormSelect name="loanId" label="Select External Loan" options={loanListSearchOptions} />
      </GridItem>
      <GridItem colSpan={1}>
        <ReportDateRange />
      </GridItem>
    </Report.Inputs>
  );
};

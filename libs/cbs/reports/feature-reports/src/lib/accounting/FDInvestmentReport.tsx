import { useState } from 'react';

import { Box, GridItem } from '@myra-ui';

import {
  ExternalLoanReportData,
  FdInvestmentReportData,
  FdInvestmentReportFilter,
  useGetFdInvestmentReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate } from '@coop/cbs/utils';
import { FormBranchSelect } from '@coop/shared/form';
import { quantityConverter } from '@coop/shared/utils';

type ExternalLoanFilters = Omit<FdInvestmentReportFilter, 'branchId'> & {
  branchId: {
    label: string;
    value: string;
  }[];
};
export const FDInvestmentReport = () => {
  const [filters, setFilters] = useState<ExternalLoanFilters | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;

  const { data, isFetching } = useGetFdInvestmentReportQuery(
    {
      data: {
        ...filters,
        branchId: branchIds,
      } as FdInvestmentReportFilter,
    },
    { enabled: !!filters }
  );

  const fdInvestmentReport = data?.report?.accountingReport?.fdInvestmentReport?.data;

  return (
    <Report
      defaultFilters={null}
      data={fdInvestmentReport as ExternalLoanReportData[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.ACCOUNTING_FD_INVESTMENT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Accounting Reports', link: '/reports/cbs/accounting' },
            {
              label: ReportEnum.ACCOUNTING_FD_INVESTMENT,
              link: '/reports/cbs/accounting/fd-investment/new',
            },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect
              showUserBranchesOnly
              isMulti
              name="branchId"
              label="Select Service Center"
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

          <Report.Table<FdInvestmentReportData & { index: number }>
            columns={[
              {
                header: 'S.No.',
                accessorKey: 'index',
              },
              {
                header: 'Organization Name',
                accessorKey: 'organizationName',
              },
              {
                header: 'Organization Branch',
                accessorKey: 'organizationBranch',
              },
              {
                header: 'FD Account Name',
                accessorKey: 'fdAccountName',
              },
              {
                header: 'Nominee Bank Account No',
                accessorKey: 'nomineeBankAccountNo',
              },
              {
                header: 'FD Opening Date',
                accessorKey: 'fdOpeningDate',
                cell: (props) => localizedDate(props?.row?.original?.fdOpeningDate),
                meta: {
                  skipExcelFormatting: true,
                },
              },
              {
                header: 'Maturity Date',
                accessorKey: 'maturityDate',
                cell: (props) => localizedDate(props?.row?.original?.maturityDate),
                meta: {
                  skipExcelFormatting: true,
                },
              },
              {
                header: 'FD Type',
                accessorKey: 'fdType',
                cell: (props) => (
                  <Box textTransform="capitalize">
                    {props?.row?.original?.fdType?.replace(/_/g, ' ').toLowerCase()}
                  </Box>
                ),
              },

              {
                header: 'FD Amount',
                accessorKey: 'interestRate',
                cell: (props) => quantityConverter(props?.row?.original?.fdAmount || '0'),
                meta: {
                  isNumeric: true,
                },
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
            ]}
          />
        </Report.Content>
      </Report.Body>
    </Report>
  );
};

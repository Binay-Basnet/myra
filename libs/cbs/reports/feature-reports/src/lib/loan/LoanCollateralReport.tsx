import { useState } from 'react';

import { GridItem } from '@myra-ui/components';
import { ExpandedCell, ExpandedHeader } from '@myra-ui/table';

import {
  LoanCollateralFilter,
  LocalizedDateFilter,
  useGetLoanCollateralReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormBranchSelect } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

type LoanCollateralData = Partial<{
  loanAccountNo: string;
  loanAccountType: string;
  loanDisbursedAmount: string;
  memberId: string;
  memberName: string;
  remainingPrincipal: string;

  collateralDescription?: string;
  collateralType: string;
  dvMinAmount: string;
  fmvMaxAmount: string;
  ownerName: string;
  valuationMethod: string;
  valuatorName: string;

  children: LoanCollateralData[];
}>;

type ReportFilter = Omit<LoanCollateralFilter, 'branchId'> & {
  branchId: { label: string; value: string }[];
};

export const LoanCollateralReport = () => {
  const [filters, setFilters] = useState<ReportFilter | null>(null);

  const branchIDs =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : [];

  const { data, isFetching } = useGetLoanCollateralReportQuery(
    {
      data: {
        ...filters,
        period: filters?.period as LocalizedDateFilter,
        branchId: branchIDs as string[],
      },
    },
    { enabled: !!filters }
  );

  const loanCollateralReport = data?.report?.loanReport?.loanCollateralReport?.data?.map((d) => ({
    ...d,
    children: d?.collateralInformation,
  })) as LoanCollateralData[];

  return (
    <Report
      data={loanCollateralReport as LoanCollateralData[]}
      isLoading={isFetching}
      report={ReportEnum.LOAN_COLLATERAL_REPORT}
      filters={filters}
      defaultFilters={null}
      setFilters={setFilters}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            {
              label: 'Loan Reports',
              link: '/reports/cbs/loan',
            },
            {
              label: 'Loan Collateral Report',
              link: '/reports/cbs/transactions/day-book/new',
            },
          ]}
        />

        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect isMulti name="branchId" label="Service Center" />
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

          <Report.Table<LoanCollateralData>
            columns={[
              {
                header: 'Member Loan Information',
                columns: [
                  {
                    header: ({ table }) => <ExpandedHeader table={table} value="Member Id" />,

                    accessorKey: 'memberId',
                    cell: (props) => (
                      <ExpandedCell row={props.row} value={props.getValue() as string} />
                    ),
                  },
                  {
                    header: 'Member Name',
                    accessorKey: 'memberName',
                  },
                  {
                    header: 'Loan Account No.',
                    accessorKey: 'loanAccountNo',
                  },
                  {
                    header: 'Loan Disbursed Amount',
                    accessorKey: 'loanDisbursedAmount',
                    cell: (row) =>
                      row.getValue() ? amountConverter(row.getValue() as string) : '',
                    meta: {
                      isNumeric: true,
                    },
                  },
                  {
                    header: 'Remaining Principal',
                    accessorKey: 'remainingPrincipal',
                    cell: (row) =>
                      row.getValue() ? amountConverter(row.getValue() as string) : '',
                    meta: {
                      isNumeric: true,
                    },
                  },
                ],
              },
              {
                header: 'Collateral Information',
                columns: [
                  {
                    header: 'Collateral Type',
                    accessorKey: 'collateralType',
                  },

                  {
                    header: 'Owner Name',
                    accessorKey: 'ownerName',
                  },
                  {
                    header: 'FMV (Maximum Amount)',
                    accessorKey: 'fmvMaxAmount',
                    cell: (row) =>
                      row.getValue() ? amountConverter(row.getValue() as string) : '',
                    meta: {
                      isNumeric: true,
                    },
                  },
                  {
                    header: 'DV (Minimum Amount)',
                    accessorKey: 'dvMinAmount',
                    cell: (row) =>
                      row.getValue() ? amountConverter(row.getValue() as string) : '',
                    meta: {
                      isNumeric: true,
                    },
                  },
                  {
                    header: 'Valuation Method',
                    accessorKey: 'valuationMethod',
                  },
                  {
                    header: 'Valuator Name',
                    accessorKey: 'valuatorName',
                  },
                  {
                    header: 'Collateral Description',
                    accessorKey: 'collateralDescription',
                  },
                ],
              },
            ]}
          />
        </Report.Content>
      </Report.Body>
    </Report>
  );
};

import { useState } from 'react';

import { Box } from '@myra-ui';
import { Chips, GridItem } from '@myra-ui/components';
import { ExpandedCell, ExpandedHeader } from '@myra-ui/table';

import {
  GuaranteeStatus,
  LocalizedDateFilter,
  useGetLoanCollateralReportQuery,
  useGetLoanProductTypeQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { RouteToDetailsPage } from '@coop/cbs/utils';
import { FormBranchSelect, FormSelect } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

type LoanCollateralData = {
  loanAccountNo: string;
  loanAccountType: string;
  loanDisbursedAmount: string;
  memberId: string;
  memberCode: string;
  memberName: string;
  remainingPrincipal: string;

  collateralDescription?: string;
  collateralType: string;
  dvMinAmount: string;
  fmvMaxAmount: string;
  ownerName: string;
  valuationMethod: string;
  valuatorName: string;
  valuationAmount: string;
  status: string;

  children: LoanCollateralData[];
};

type ReportFilter = {
  branchId: { label: string; value: string }[];
  filter?: {
    loanType: { label: string; value: string }[];
    // collateralType: [String!];
    status: GuaranteeStatus;
  };
  period: LocalizedDateFilter;
};

export const LoanCollateralReport = () => {
  const [filters, setFilters] = useState<ReportFilter | null>(null);

  const branchIDs =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : [];

  const loanTypeIds =
    filters?.filter?.loanType && filters?.filter?.loanType.length !== 0
      ? filters?.filter?.loanType?.map((t) => t.value)
      : [];

  const { data, isFetching } = useGetLoanCollateralReportQuery(
    {
      data: {
        filter: {
          ...filters?.filter,
          loanType: loanTypeIds,
        },
        period: filters?.period as LocalizedDateFilter,
        branchId: branchIDs as string[],
      },
    },
    { enabled: !!filters }
  );
  const { data: loanProductTypeData } = useGetLoanProductTypeQuery();
  const loanTypes = loanProductTypeData?.settings?.general?.loan?.productType?.productTypes;

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
              link: '/reports/cbs/loan/loan-collateral/new',
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
                      <ExpandedCell
                        row={props.row}
                        value={
                          <RouteToDetailsPage
                            id={props?.row?.original?.memberId as string}
                            type="member"
                            label={props?.row?.original?.memberCode as string}
                          />
                        }
                      />
                    ),
                  },
                  {
                    header: 'Member Name',
                    accessorKey: 'memberName',
                  },
                  {
                    header: 'Loan Account No.',
                    accessorKey: 'loanAccountNo',
                    cell: (props) => (
                      <RouteToDetailsPage
                        id={props?.row?.original?.loanAccountNo as string}
                        type="loan"
                        label={props?.row?.original?.loanAccountNo}
                      />
                    ),
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
                    header: 'Valuation Amount',
                    accessorKey: 'valuationAmount',
                    cell: (row) =>
                      row.getValue() ? amountConverter(row.getValue() as string) : '',
                    meta: {
                      isNumeric: true,
                    },
                  },
                  {
                    header: 'Valuator Name',
                    accessorKey: 'valuatorName',
                  },
                  {
                    header: 'Status',
                    accessorKey: 'status',
                    cell: (row) => {
                      const dataVal = row?.getValue() as string;
                      return (
                        <Box>
                          {dataVal === 'ACTIVE' && (
                            <Chips
                              label="Active"
                              theme="success"
                              size="md"
                              type="label"
                              variant="outline"
                            />
                          )}
                          {dataVal === 'RELEASED' && (
                            <Chips
                              label="Released"
                              theme="info"
                              size="md"
                              type="label"
                              variant="outline"
                            />
                          )}
                        </Box>
                      );
                    },
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
        <Report.Filters>
          <Report.Filter title="Loan Type">
            <FormSelect
              name="filter.loanType"
              isMulti
              options={loanTypes?.map((product) => ({
                label: product?.productType as string,
                value: product?.id as string,
              }))}
            />{' '}
          </Report.Filter>
          <Report.Filter title="Collateral Status">
            <FormSelect
              name="filter.status"
              options={[
                {
                  label: 'Active',
                  value: GuaranteeStatus?.Active,
                },
                {
                  label: ' Released',
                  value: GuaranteeStatus?.Released,
                },
              ]}
            />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};

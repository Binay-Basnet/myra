import { useMemo, useState } from 'react';

import { GridItem } from '@myra-ui/components';

import {
  LoanDisbursementReportData,
  LoanDisbursementReportFilter,
  useGetLoanDisbursmentReportQuery,
  useGetLoanProductListQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate, RouteToDetailsPage } from '@coop/cbs/utils';
import { FormAmountFilter, FormBranchSelect, FormSelect } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

type ReportFilter = Omit<LoanDisbursementReportFilter, 'branchId' | 'loanProductId'> & {
  branchId: { label: string; value: string }[];
  loanProductId: { label: string; value: string }[];
};

export const LoanDisburesementReport = () => {
  const [filters, setFilters] = useState<ReportFilter | null>(null);

  const branchIDs =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : [];

  const loanProductsIds =
    filters?.loanProductId && filters?.loanProductId?.length !== 0
      ? filters?.loanProductId?.map((t) => t.value)
      : [];

  const { data, isFetching } = useGetLoanDisbursmentReportQuery(
    {
      data: {
        ...filters,
        branchId: branchIDs as string[],
        loanProductId: loanProductsIds,
      } as LoanDisbursementReportFilter,
    },
    { enabled: !!filters }
  );

  const loanReport = data?.report?.loanReport?.loanDisbursementReport?.data;

  const { data: loanProducts } = useGetLoanProductListQuery(
    {
      paginate: {
        after: '',
        first: -1,
      },
    },
    {
      staleTime: 0,
    }
  );

  const rowData = useMemo(
    () => loanProducts?.settings?.general?.loanProducts?.list?.edges ?? [],
    [loanProducts]
  );
  const productOptions = rowData?.map((item) => ({
    label: item?.node?.productName as string,
    value: item?.node?.id as string,
  }));

  return (
    <Report
      data={loanReport as LoanDisbursementReportData[]}
      isLoading={isFetching}
      report={ReportEnum.LOAN_DISBURSEMENT_REPORT}
      filters={filters}
      defaultFilters={null}
      setFilters={setFilters}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            {
              label: 'Loan Reports',
              link: '/cbs/reports/cbs-reports/loan',
            },
            {
              label: ReportEnum.LOAN_DISBURSEMENT_REPORT,
              link: '/cbs/reports/cbs-reports/loan/disbursement/new',
            },
          ]}
        />

        <Report.Inputs hideDate>
          <GridItem colSpan={1}>
            <FormBranchSelect showUserBranchesOnly isMulti name="branchId" label="Service Center" />
          </GridItem>
          <FormSelect
            name="loanProductId"
            label="Select Products"
            isMulti
            options={productOptions}
          />
          <GridItem colSpan={2}>
            <ReportDateRange />{' '}
          </GridItem>
        </Report.Inputs>
      </Report.Header>
      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<LoanDisbursementReportData & { index: number }>
            columns={[
              {
                header: 'S.No.',
                accessorKey: 'index',
                meta: {
                  width: '60px',
                },
              },
              {
                header: 'Member No',
                accessorKey: 'memberId',
                cell: (props) => (
                  <RouteToDetailsPage
                    id={props?.row?.original?.memberId as string}
                    type="member"
                    label={props?.row?.original?.memberCode as string}
                  />
                ),
              },
              {
                header: 'Member Name',
                accessorKey: 'memberName',
              },
              {
                header: 'Loan Account ID',
                accessorKey: 'loanAccountId',
                cell: (props) => (
                  <RouteToDetailsPage
                    id={props?.row?.original?.loanAccountId as string}
                    type="loan"
                    label={props?.row?.original?.loanAccountId as string}
                  />
                ),
              },
              {
                header: 'Product Name',
                accessorKey: 'productName',
              },
              {
                header: 'Disburse Date',
                accessorKey: 'disbursedDate',
                cell: (props) => localizedDate(props?.row?.original?.disbursedDate),
              },
              {
                header: 'Approved Amount',
                accessorKey: 'totalSactionedLoanAmount',
                cell: (props) =>
                  amountConverter(props?.row?.original?.totalSactionedLoanAmount || '0'),
              },
              {
                header: 'Interest Rate',
                accessorKey: 'interestRate',
              },
              {
                header: 'Nominee Account',
                accessorKey: 'nomineeAccount',
              },
              {
                header: 'Disbursed Amount',
                accessorKey: 'loanDisbursedAmount',
                cell: (props) => amountConverter(props?.row?.original?.loanDisbursedAmount || '0'),
              },
            ]}
          />
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="Amount Wise">
            <FormAmountFilter name="filter.amountRange" />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};

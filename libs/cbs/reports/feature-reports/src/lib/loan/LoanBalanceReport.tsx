import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';

import { Box, GridItem } from '@myra-ui';

import {
  LoanBalanceFilterData,
  LoanBalanceReport as LoanBalanceReportType,
  useGetLoanBalanceReportQuery,
  useGetLoanProductsFromSubTypeQuery,
  useGetLoanProductTypeQuery,
  useGetMultipleSubProductsQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormAmountFilter, FormBranchSelect, FormCheckboxGroup } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

export const LoanBalanceReport = () => {
  const [filters, setFilters] = useState<LoanBalanceFilterData | null>(null);

  const { data, isFetching } = useGetLoanBalanceReportQuery(
    {
      data: filters as LoanBalanceFilterData,
    },
    { enabled: !!filters }
  );

  const loanReport = data?.report?.loanReport?.loanBalanceReport?.data;
  const outstandingTotal = data?.report?.loanReport?.loanBalanceReport?.totalOutstandingBalance;
  const totalRemainingBalance = data?.report?.loanReport?.loanBalanceReport?.totalRemainingBalance;

  return (
    <Report
      defaultFilters={null}
      data={loanReport as LoanBalanceReportType[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.LOAN_BALANCE_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Other Reports', link: '/reports/cbs/others' },
            { label: 'Loan Balance Report', link: '/reports/cbs/others/loan-balance/new' },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect name="branchId" label="Select Branch" />
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
          <Report.Table<LoanBalanceReportType & { index: number }>
            showFooter
            columns={[
              {
                header: 'S.No.',
                accessorKey: 'index',
                footer: () => <Box textAlign="right">Total Balance</Box>,
                meta: {
                  width: '60px',
                  Footer: {
                    colspan: 6,
                  },
                },
              },
              {
                header: 'Loan Account Number',
                accessorKey: 'loanAccountId',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Member Id',
                accessorKey: 'memberId',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },

              {
                header: 'Member Name',
                accessorFn: (row) => row?.memberName?.local,
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },

              {
                header: 'Product Name',
                accessorKey: 'productName',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },

              {
                header: 'Product Code',
                accessorKey: 'productCode',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                  isNumeric: true,
                },
              },
              {
                header: 'Outstanding Balance',
                accessorKey: 'outstandingBalance',
                cell: (props) => amountConverter(props.getValue() as string),

                footer: () => amountConverter(outstandingTotal || 0),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Remaining Balance',
                accessorKey: 'remainingBalance',
                cell: (props) => amountConverter(props.getValue() as string),
                footer: () => amountConverter(totalRemainingBalance || 0),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Remaining Interest',
                accessorKey: 'remainingInterest',
                cell: (props) => amountConverter((props.getValue() || 0) as string),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Last Payment Date',
                accessorKey: 'lastPaymentDate',
                cell: ({ cell }) => dayjs(cell.row.original.lastPaymentDate).format('YYYY-MM-DD'),
                meta: {
                  isNumeric: true,
                },
              },
            ]}
          />
        </Report.Content>

        <Report.Filters>
          <ReportFilter />
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};

const ReportFilter = () => {
  const { watch } = useFormContext<LoanBalanceFilterData>();
  const productTypeIds = watch('filter.productTypes');
  const productSubTypeIds = watch('filter.productSubTypes');

  const { data: loanProductTypeData } = useGetLoanProductTypeQuery();
  const { data: loanSubProductTypeData } = useGetMultipleSubProductsQuery({
    productTypeIds: productTypeIds || [],
  });
  const { data: loanProductData } = useGetLoanProductsFromSubTypeQuery({
    subTypeIds: productSubTypeIds || [],
  });

  const loanProductType = loanProductTypeData?.settings?.general?.loan?.productType?.productTypes;
  const loanSubProductType =
    loanSubProductTypeData?.settings?.general?.loan?.productType?.multipleProductSubTypes;
  const loanProduct = loanProductData?.settings?.general?.loan?.productType?.loanProducts;

  return (
    <>
      <Report.Filter title="Product Type">
        <FormCheckboxGroup
          name="filter.productTypes"
          list={loanProductType?.map((product) => ({
            label: product?.productType as string,
            value: product?.id as string,
          }))}
          orientation="column"
        />
      </Report.Filter>

      {loanSubProductType && loanSubProductType?.length !== 0 && (
        <Report.Filter title="Product Sub Type">
          <FormCheckboxGroup
            name="filter.productSubTypes"
            list={loanSubProductType?.map((product) => ({
              label: product?.productSubType as string,
              value: product?.id as string,
            }))}
            orientation="column"
          />
        </Report.Filter>
      )}

      {loanProduct && loanProduct?.length !== 0 && (
        <Report.Filter title="Product Name">
          <FormCheckboxGroup
            name="filter.productNameIds"
            list={loanProduct?.map((product) => ({
              label: product?.productName as string,
              value: product?.id as string,
            }))}
            orientation="column"
          />
        </Report.Filter>
      )}

      <Report.Filter title="Outstanding Balance">
        <FormAmountFilter name="filter.outstandingBalance" />
      </Report.Filter>
    </>
  );
};

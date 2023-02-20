import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, GridItem } from '@myra-ui';

import {
  LoanBalanceFilterData,
  LoanBalanceReport as LoanBalanceReportType,
  LocalizedDateFilter,
  useGetLoanBalanceReportQuery,
  useGetLoanProductsFromSubTypeQuery,
  useGetLoanProductTypeQuery,
  useGetMultipleSubProductsQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate, RedirectButton, ROUTES } from '@coop/cbs/utils';
import {
  FormAmountFilter,
  FormBranchSelect,
  FormCheckboxGroup,
  FormDatePicker,
} from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

type LoanBalanceReportFilters = Omit<LoanBalanceFilterData, 'branchId'> & {
  branchId: {
    label: string;
    value: string;
  }[];
};

export const LoanBalanceReport = () => {
  const [filters, setFilters] = useState<LoanBalanceReportFilters | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;

  const { data, isFetching } = useGetLoanBalanceReportQuery(
    {
      data: {
        ...filters,
        branchId: branchIds,
        period: {
          from: filters?.period?.from,
          to: filters?.period?.from,
        } as LocalizedDateFilter,
      } as LoanBalanceFilterData,
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
            { label: 'Loan Reports', link: '/reports/cbs/loan' },
            { label: 'Loan Balance Report', link: '/reports/cbs/loan/loan-balance/new' },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect isMulti name="branchId" label="Select Service Center" />
          </GridItem>
          <GridItem colSpan={1}>
            <FormDatePicker name="period.from" label="Date" />
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
                    colspan: 7,
                  },
                },
              },
              {
                header: 'Loan Account Number',
                accessorKey: 'loanAccountId',
                cell: (props) => (
                  <RedirectButton
                    label={props?.row?.original?.loanAccountId}
                    link={`${ROUTES.CBS_LOAN_ACCOUNT_DETAILS}?id=${props?.row?.original?.loanAccountId}`}
                  />
                ),
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Member Id',
                accessorKey: 'memberId',
                cell: (props) => (
                  <RedirectButton
                    label={props?.row?.original?.memberCode}
                    link={`${ROUTES.CBS_MEMBER_DETAILS}?id=${props?.row?.original?.memberId}`}
                  />
                ),
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
                header: 'Branch',
                accessorFn: (row) => row?.branchName,
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
                cell: (props) => (
                  <RedirectButton
                    label={props?.row?.original?.productCode}
                    link={`${ROUTES.CBS_LOAN_PRODUCTS_DETAILS}?id=${props?.row?.original?.productId}`}
                  />
                ),
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
                accessorFn: (row) => localizedDate(row?.lastPaymentDate),
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

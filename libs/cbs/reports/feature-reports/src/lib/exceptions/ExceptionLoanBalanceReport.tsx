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
import { localizedDate, RouteToDetailsPage } from '@coop/cbs/utils';
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

export const ExceptionLoanBalanceReport = () => {
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
  const totalRemainingCRBalance =
    data?.report?.loanReport?.loanBalanceReport?.totalRemainingCrBalance;
  const totalRemainingDRBalance =
    data?.report?.loanReport?.loanBalanceReport?.totalRemainingDrBalance;
  const totalRemainingInterest =
    data?.report?.loanReport?.loanBalanceReport?.totalRemainingInterest;
  const totalRemainingInterestType =
    data?.report?.loanReport?.loanBalanceReport?.totalRemainingInterestType;

  return (
    <Report
      defaultFilters={null}
      data={loanReport as LoanBalanceReportType[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.EXCEPTION_LOAN_BALANCE}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Exception Reports', link: '/reports/cbs/exceptions' },
            {
              label: 'Loan Balance Exception Report',
              link: '/reports/cbs/exceptions/loan-balance/new',
            },
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
                    colspan: 8,
                  },
                },
              },
              {
                header: 'Loan Account Number',
                accessorKey: 'loanAccountId',
                cell: (props) => (
                  <RouteToDetailsPage
                    id={props?.row?.original?.loanAccountId as string}
                    type="loan"
                    label={props?.row?.original?.loanAccountId as string}
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
                  <RouteToDetailsPage
                    id={props?.row?.original?.memberId as string}
                    type="member"
                    label={props?.row?.original?.memberCode as string}
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
                  <RouteToDetailsPage
                    id={props?.row?.original?.productId as string}
                    type="loan-product"
                    label={props?.row?.original?.productCode as string}
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
                header: 'Loan Type',
                accessorKey: 'loanType',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Disbursed Balance',
                accessorKey: 'disbursedBalance',
                cell: (props) => amountConverter(props.getValue() as string),

                footer: () => amountConverter(outstandingTotal || 0),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Remaining Balance',
                accessorKey: 'remainingCrBalance',
                columns: [
                  {
                    header: 'Debit (Dr.)',
                    accessorFn: (row) => row?.remainingDrBalance,
                    cell: (props) =>
                      amountConverter(props.row?.original?.remainingDrBalance || '0.00'),
                    footer: () => amountConverter(totalRemainingDRBalance || 0),

                    meta: {
                      isNumeric: true,
                    },
                  },
                  {
                    header: 'Credit (Cr.)',
                    accessorFn: (row) => row?.remainingCrBalance,
                    cell: (props) =>
                      amountConverter(props.row?.original?.remainingCrBalance || '0.00'),
                    footer: () => amountConverter(totalRemainingCRBalance || 0),

                    meta: {
                      isNumeric: true,
                    },
                  },
                ],
              },
              {
                header: 'Interest Rate ',
                accessorKey: 'interestRate',
                cell: (props) => (props?.getValue() ? props?.getValue() : 0),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Remaining Interest',
                accessorKey: 'remainingInterest',
                cell: (props) => amountConverter((props.getValue() || 0) as string),
                footer: () => amountConverter(totalRemainingInterest || 0),

                meta: {
                  isNumeric: true,
                },
              },
              {
                header: '',
                accessorKey: 'remainingInterestType',
                footer: () => totalRemainingInterestType || '-',

                meta: {
                  width: '15px',
                  isNumeric: true,
                },
              },
              {
                header: 'Loan End Date',

                accessorFn: (row) => localizedDate(row?.loanEndDate),
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

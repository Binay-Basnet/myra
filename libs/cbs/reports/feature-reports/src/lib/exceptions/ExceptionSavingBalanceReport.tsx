import { useState } from 'react';

import { Box, GridItem } from '@myra-ui';

import {
  KymMemberTypesEnum,
  LocalizedDateFilter,
  MinMaxFilter,
  MinorWiseFilter,
  NatureOfDepositProduct,
  SavingsBalanceFilterData,
  SavingsBalanceReport,
  SavingsBalanceReportResult,
  useGetSavingsBalanceReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate, RouteToDetailsPage } from '@coop/cbs/utils';
import {
  FormAmountFilter,
  FormBranchSelect,
  FormCheckboxGroup,
  FormDatePicker,
  FormMemberSelect,
  FormRadioGroup,
} from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

const minorOptions = [
  {
    label: 'All',
    value: MinorWiseFilter?.All,
  },
  {
    label: 'Minor Product',
    value: MinorWiseFilter?.MinorProduct,
  },
  {
    label: 'Not Minor Product',
    value: MinorWiseFilter?.NotMinorProduct,
  },
];

type Filter = {
  branchId: { label: string; value: string }[];
  period: LocalizedDateFilter;
  filter: {
    memberIds?: string[];
    minorWise?: MinorWiseFilter;
    productTypes?: NatureOfDepositProduct[];
    memberType?: KymMemberTypesEnum[];
    amount?: MinMaxFilter;
  };
};
export const ExceptionSavingBalanceReport = () => {
  const [filters, setFilters] = useState<Filter | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;

  const { data, isFetching } = useGetSavingsBalanceReportQuery(
    {
      data: {
        ...filters,
        branchId: branchIds,
        period: {
          from: filters?.period?.from,
          to: filters?.period?.from,
        } as LocalizedDateFilter,
      } as SavingsBalanceFilterData,
    },
    { enabled: !!filters }
  );

  const savingBalanceData = data?.report?.otherReport?.savingsBalanceReport?.data;
  const summary = data?.report?.otherReport?.savingsBalanceReport?.summary;
  const totalCRBalance = data?.report?.otherReport?.savingsBalanceReport?.totalCrBalance;
  const totalDRBalance = data?.report?.otherReport?.savingsBalanceReport?.totalDrBalance;
  const totalInterest = data?.report?.otherReport?.savingsBalanceReport?.totalInterest;
  const totalInterestType = data?.report?.otherReport?.savingsBalanceReport?.interestType;

  return (
    <Report
      defaultFilters={{}}
      data={savingBalanceData as SavingsBalanceReportResult[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.EXCEPTION_SAVING_BALANCE}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Exception Reports', link: '/reports/cbs/exceptions' },
            {
              label: 'Saving Balance Exception Report',
              link: '/reports/cbs/exceptions/saving-balance/new',
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
          <Report.Table<SavingsBalanceReport & { index: number }>
            showFooter
            columns={[
              {
                header: 'S.No.',
                footer: () => <Box textAlign="right"> Total</Box>,
                accessorKey: 'index',
                meta: {
                  width: '60px',
                  Footer: {
                    colspan: 9,
                  },
                },
              },
              {
                header: 'Account Number',
                accessorKey: 'accountId',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Member COde',
                accessorKey: 'memberCode',
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
                header: 'Account Holder Name',
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
                },
              },
              {
                header: 'Account Open Date',
                accessorKey: 'accountOpeningDate',
                cell: (props: { getValue: () => unknown }) =>
                  String(props?.getValue())?.split(' ')[0],
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'End Date',
                accessorFn: (row) => localizedDate(row?.endDate),
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Member Type',
                accessorKey: 'memberType',
                cell: (props) => (
                  <Box textTransform="capitalize">
                    {' '}
                    {props?.row?.original?.memberType?.toLowerCase()?.replace(/_/g, ' ')}
                  </Box>
                ),
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Balance Amount',
                accessorKey: 'crBalance',
                columns: [
                  {
                    header: 'Debit (Dr.)',
                    accessorFn: (row) => row?.drBalance,
                    cell: (props) => amountConverter(props.row?.original?.drBalance || '0.00'),
                    footer: () => amountConverter((totalDRBalance || 0) as string),

                    meta: {
                      isNumeric: true,
                    },
                  },
                  {
                    header: 'Credit (Cr.)',
                    accessorFn: (row) => row?.crBalance,
                    cell: (props) => amountConverter(props.row?.original?.crBalance || '0.00'),
                    footer: () => amountConverter((totalCRBalance || 0) as string),

                    meta: {
                      isNumeric: true,
                    },
                  },
                ],
              },

              {
                header: 'Current Interest Rate',
                accessorKey: 'currentInterestRate',
                cell: (props) => props.getValue() || 0,

                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Current Interest Amount',
                accessorKey: 'currentInterest',
                cell: (props) => amountConverter((props.getValue() || 0) as string),
                footer: () => amountConverter((totalInterest || 0) as string),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: '',
                accessorKey: 'currentInterestType',

                footer: () => totalInterestType,
                meta: {
                  width: '15px',
                  isNumeric: true,
                },
              },
            ]}
          />

          <Box
            display="flex"
            flexDir="column"
            borderRadius="br2"
            border="1px"
            mb="s16"
            mx="s16"
            borderColor="border.element"
          >
            <Box h="40px" display="flex" borderBottom="1px" borderBottomColor="border.element">
              <Box
                display="flex"
                alignItems="center"
                w="80%"
                h="100%"
                px="s12"
                borderRight="1px"
                borderRightColor="border.element"
                fontSize="r1"
                fontWeight={600}
                color="gray.700"
              >
                Total Individual Account
              </Box>
              <Box px="s12" w="20%" display="flex" alignItems="center" justifyContent="end">
                {summary?.totalIndividualAccount}
              </Box>
            </Box>
            <Box h="40px" display="flex" borderBottom="1px" borderBottomColor="border.element">
              <Box
                display="flex"
                alignItems="center"
                w="80%"
                h="100%"
                px="s12"
                borderRight="1px"
                borderRightColor="border.element"
                fontSize="r1"
                fontWeight={600}
                color="gray.700"
              >
                Total Minor Account
              </Box>
              <Box px="s12" w="20%" display="flex" alignItems="center" justifyContent="end">
                {summary?.totalMinorAccount}
              </Box>
            </Box>
            <Box h="40px" display="flex">
              <Box
                display="flex"
                alignItems="center"
                w="80%"
                h="100%"
                px="s12"
                borderRight="1px"
                borderRightColor="border.element"
                fontSize="r1"
                fontWeight={600}
                color="gray.700"
              >
                Total Other Account
              </Box>
              <Box px="s12" w="20%" display="flex" alignItems="center" justifyContent="end">
                {summary?.totalOtherAccount}{' '}
              </Box>
            </Box>
          </Box>
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="Member Wise">
            <FormMemberSelect name="filter.memberIds" />
          </Report.Filter>
          <Report.Filter title="Minor Wise">
            <FormRadioGroup name="filter.minorWise" options={minorOptions} orientation="vertical" />
          </Report.Filter>
          <Report.Filter title="Product Wise">
            <FormCheckboxGroup
              name="filter.productTypes"
              list={[
                { label: 'Recurring Saving', value: NatureOfDepositProduct?.RecurringSaving },
                { label: 'Saving', value: NatureOfDepositProduct?.Saving },
                { label: 'Current', value: NatureOfDepositProduct?.Current },
                { label: 'Term Saving', value: NatureOfDepositProduct?.TermSavingOrFd },
              ]}
              orientation="column"
            />
          </Report.Filter>
          <Report.Filter title="MemberType">
            <FormCheckboxGroup
              name="filter.memberType"
              list={[
                { label: 'Individual', value: KymMemberTypesEnum?.Individual },
                { label: 'Institution', value: KymMemberTypesEnum?.Institution },
                { label: 'Cooperative', value: KymMemberTypesEnum?.Cooperative },
                { label: 'Cooperative Union', value: KymMemberTypesEnum?.Cooperative },
              ]}
              orientation="column"
            />
          </Report.Filter>

          <Report.Filter title="Amount Range">
            <FormAmountFilter name="filter.amount" />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};

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
import { RouteToDetailsPage } from '@coop/cbs/utils';
import {
  FormAmountFilter,
  FormBranchSelect,
  FormCheckboxGroup,
  FormDatePicker,
  FormMemberSelect,
  FormRadioGroup,
} from '@coop/shared/form';
import { debitCreditConverter } from '@coop/shared/utils';

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
export const SavingBalanceReport = () => {
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
  const totalBalance = data?.report?.otherReport?.savingsBalanceReport?.totalBalance;
  const totalBalanceType = data?.report?.otherReport?.savingsBalanceReport?.balanceType;

  return (
    <Report
      defaultFilters={{}}
      data={savingBalanceData as SavingsBalanceReportResult[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.SAVING_BALANCE_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Report Group', link: '/reports/cbs/others' },
            { label: 'Saving Balance Report', link: '/reports/cbs/others/saving-balance/new' },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect isMulti name="branchId" label="Select Service Center" />
          </GridItem>
          <GridItem colSpan={1}>
            <FormDatePicker name="period.from" label="Date Period" />
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
                    colspan: 8,
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
                accessorKey: 'balance',
                cell: (props) =>
                  debitCreditConverter(
                    props.getValue() as string,
                    props?.row?.original?.balanceType as string
                  ),
                footer: () =>
                  debitCreditConverter(totalBalance as string, totalBalanceType as string),
                meta: {
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

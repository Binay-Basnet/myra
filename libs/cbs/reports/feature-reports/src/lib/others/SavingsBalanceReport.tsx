import { useState } from 'react';

import { Box, GridItem } from '@myra-ui';

import {
  FormFieldSearchTerm,
  KymMemberTypesEnum,
  LocalizedDateFilter,
  MinMaxFilter,
  MinorWiseFilter,
  NatureOfDepositProduct,
  SavingsBalanceFilterData,
  SavingsBalanceReport,
  SavingsBalanceReportResult,
  useGetDepositProductSettingsListQuery,
  useGetIndividualKymOptionsQuery,
  useGetSavingsBalanceReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate, localizedText, RouteToDetailsPage } from '@coop/cbs/utils';
import {
  FormAmountFilter,
  FormBranchSelect,
  FormCBSDatePicker,
  FormCheckboxGroup,
  FormInput,
  FormMemberSelect,
  FormRadioGroup,
  FormSelect,
} from '@coop/shared/form';
import { amountConverter, useTranslation } from '@coop/shared/utils';

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
    age?: number;
    gender?: string[];
    productId?: string[];
  };
};
export const SavingBalanceReport = () => {
  const { t } = useTranslation();

  const [filters, setFilters] = useState<Filter | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((b) => b.value)
      : null;
  const genderIds = filters?.filter?.gender ?? null;

  const productIds =
    filters?.filter?.productId && filters?.filter?.productId?.length !== 0
      ? filters?.filter?.productId?.map((p) => (p as unknown as { value: string }).value)
      : null;

  const { data: genderFields } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.Gender,
  });

  const genderOptions = genderFields?.form?.options?.predefined?.data?.map((g) => ({
    label: localizedText(g?.name) as string,
    value: g?.id as string,
  }));
  const { data, isFetching } = useGetSavingsBalanceReportQuery(
    {
      data: {
        filter: {
          ...filters?.filter,
          gender: genderIds,
          productId: productIds,
        },
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

  const { data: savingProductsListData } = useGetDepositProductSettingsListQuery({
    paginate: {
      after: '',
      first: -1,
    },
  });

  const productOptions =
    savingProductsListData?.settings?.general?.depositProduct?.list?.edges?.map((item) => ({
      label: item?.node?.productName as string,
      value: item?.node?.id as string,
    }));

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
            { label: t['reportsSidebarSavingsReports'], link: '/cbs/reports/cbs-reports/savings' },
            {
              label: t['reportsSavingBalanceIndividualReport'],
              link: '/cbs/reports/cbs-reports/savings/saving-balance/new',
            },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect
              showUserBranchesOnly
              isMulti
              name="branchId"
              label={t['serviceCenter']}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <FormCBSDatePicker
              name="period.from"
              label={t['reportsSavingSavingBalanceReportDate']}
              setInitialDate
            />
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
                header: t['sn'],
                footer: () => (
                  <Box textAlign="right">{t['reportsSavingSavingBalanceReportTotal']}</Box>
                ),
                accessorKey: 'index',
                meta: {
                  width: '60px',
                  Footer: {
                    colspan: 9,
                  },
                },
              },
              {
                header: t['reportsSavingSavingBalanceReportAccountNumber'],
                accessorKey: 'accountId',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: t['reportsSavingSavingBalanceReportMemberCode'],
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
                header: t['reportsSavingSavingBalanceReportAccountHolderName'],
                accessorFn: (row) => row?.memberName?.local,
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: t['reportsSavingSavingBalanceReportProductName'],
                accessorKey: 'productName',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: t['reportsSavingSavingBalanceReportProductCode'],
                accessorKey: 'productCode',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: t['reportsSavingSavingBalanceReportAccountOpenDate'],
                accessorFn: (row) => localizedDate(row?.accountOpeningDate),

                meta: {
                  Footer: {
                    display: 'none',
                  },
                  skipExcelFormatting: true,
                },
              },
              {
                header: t['reportsSavingSavingBalanceReportEndDate'],
                accessorFn: (row) => localizedDate(row?.endDate),
                meta: {
                  Footer: {
                    display: 'none',
                  },
                  skipExcelFormatting: true,
                },
              },
              {
                header: t['reportsSavingSavingBalanceReportMemberType'],
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
                header: t['reportsSavingSavingBalanceReportBalanceAmount'],
                accessorKey: 'crBalance',
                columns: [
                  {
                    header: t['reportsSavingSavingBalanceReportBalanceAmountDebit'],
                    accessorFn: (row) => row?.drBalance,
                    cell: (props) => amountConverter(props.row?.original?.drBalance || '0.00'),
                    footer: () => amountConverter((totalDRBalance || 0) as string),

                    meta: {
                      isNumeric: true,
                    },
                  },
                  {
                    header: t['reportsSavingSavingBalanceReportBalanceAmountCredit'],
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
                header: t['reportsSavingSavingBalanceReportCurrentInterestRate'],
                accessorKey: 'currentInterestRate',
                cell: (props) => props.getValue() || 0,

                meta: {
                  isNumeric: true,
                },
              },
              {
                header: t['reportsSavingSavingBalanceReportCurrentInterestAmount'],
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
                {t['reportsSavingSavingBalanceReportTotalIndividualAccount']}
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
                {t['reportsSavingSavingBalanceReportTotalMinorAccount']}
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
                {t['reportsSavingSavingBalanceReportTotalOtherAccount']}
              </Box>
              <Box px="s12" w="20%" display="flex" alignItems="center" justifyContent="end">
                {summary?.totalOtherAccount}{' '}
              </Box>
            </Box>
          </Box>
        </Report.Content>
        <Report.Filters>
          <Report.Filter title={t['reportsSavingSavingBalanceReportFilterMemberWise']}>
            <FormMemberSelect name="filter.memberIds" />
          </Report.Filter>
          <Report.Filter title={t['reportsSavingSavingBalanceReportFilterMinorWise']}>
            <FormRadioGroup name="filter.minorWise" options={minorOptions} orientation="vertical" />
          </Report.Filter>
          <Report.Filter title={t['reportsSavingSavingBalanceReportFilterProductWise']}>
            <FormSelect
              name="filter.productId"
              label={t['reportsSavingSavingBalanceReportFilterProductName']}
              isMulti
              options={productOptions}
            />
          </Report.Filter>
          <Report.Filter title={t['reportsSavingSavingBalanceReportFilterGender']}>
            <FormCheckboxGroup name="filter.gender" list={genderOptions} orientation="column" />
          </Report.Filter>
          <Report.Filter title={t['reportsSavingSavingBalanceReportFilterAge']}>
            <FormInput name="filter.age" textAlign="right" color="gray.700" type="number" />
          </Report.Filter>
          <Report.Filter title={t['reportsSavingSavingBalanceReportFilterMemberType']}>
            <FormCheckboxGroup
              name="filter.memberType"
              list={[
                {
                  label: t['reportsMemberSavingBalanceReportFilterMemberTypeIndividual'],
                  value: KymMemberTypesEnum?.Individual,
                },
                {
                  label: t['reportsMemberSavingBalanceReportFilterMemberTypeInstitution'],
                  value: KymMemberTypesEnum?.Institution,
                },
                {
                  label: t['reportsMemberSavingBalanceReportFilterMemberTypeCooperative'],
                  value: KymMemberTypesEnum?.Cooperative,
                },
                {
                  label: t['reportsMemberSavingBalanceReportFilterMemberTypeCooperativeUnion'],
                  value: KymMemberTypesEnum?.Cooperative,
                },
              ]}
              orientation="column"
            />
          </Report.Filter>

          <Report.Filter title={t['reportsSavingSavingBalanceReportFilterAmountRange']}>
            <FormAmountFilter name="filter.amount" />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};

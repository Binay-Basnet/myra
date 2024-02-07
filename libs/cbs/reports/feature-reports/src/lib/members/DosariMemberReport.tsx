import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { omit } from 'lodash';

import { GridItem } from '@myra-ui';

import {
  DosariReportData,
  DosariReportInput,
  LoanAgingPaymentMode,
  LoanAgingStatementReport,
  LoanBalanceFilterData,
  useGetCommitteeListQuery,
  useGetDosariReportQuery,
  useGetLoanProductTypeQuery,
  useGetMultipleSubProductsQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormAmountFilter, FormCheckboxGroup, FormSelect } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type DosariLoanReportFilters = Omit<DosariReportInput, 'committeeId'> & {
  committeeId: {
    label: string;
    value: string;
  }[];
};

type ReportData = LoanAgingStatementReport & {
  designation?: string;
  fullName?: string;
  phoneNumber?: string;
  type?: string;
};

export const DosariMemberReport = () => {
  const { t } = useTranslation();

  const [filters, setFilters] = useState<DosariLoanReportFilters | null>(null);
  const { data: committeeListData } = useGetCommitteeListQuery();

  const committeeIds =
    filters?.committeeId && filters?.committeeId.length !== 0
      ? filters?.committeeId?.map((b) => b.value)
      : null;

  const { data, isFetching } = useGetDosariReportQuery(
    {
      data: {
        ...filters,
        committeeId: committeeIds,
      } as DosariReportInput,
    },
    { enabled: !!filters }
  );

  const loanReport = data?.report?.loanReport?.dosariLoanReport?.data;
  const committeeList = committeeListData?.settings?.general?.organization?.committee?.map((c) => ({
    label: c?.name as string,
    value: c?.id as string,
  }));

  const reportData = loanReport?.reduce((loan, curr) => {
    loan.push(
      ...(curr?.loanAgingStatementData?.report?.map((report, index) => ({
        ...report,
        ...(index === 0 ? omit(curr, 'loanAgingStatementData') : {}),
      })) as ReportData[])
    );

    return loan;
  }, [] as ReportData[]);

  return (
    <Report
      defaultFilters={null}
      data={reportData as DosariReportData[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.DOSARI_MEMBER_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: t['reportsSidebarMemberReports'], link: '/cbs/reports/cbs-reports/members' },
            {
              label: t['reportsDosariMemberReport'],
              link: '/cbs/reports/cbs-reports/members/dosari-members/new',
            },
          ]}
        />
        <Report.Inputs hideDate>
          <GridItem colSpan={3}>
            <FormSelect
              isMulti
              name="committeeId"
              options={committeeList}
              label={t['reportsMemberDosariMemberReportSelectCommittee']}
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
          <Report.Table<ReportData>
            columns={[
              {
                header: t['reportsMemberDosariMemberReportType'],
                accessorKey: 'type',
                accessorFn: (row) => row.type,
              },
              {
                header: t['reportsMemberDosariMemberReportFullName'],
                accessorKey: 'fullName',
                accessorFn: (row) => row.fullName,
              },
              {
                header: t['reportsMemberDosariMemberReportDesignation'],
                accessorKey: 'designation',
                accessorFn: (row) => row.designation,
              },
              {
                header: t['reportsMemberDosariMemberReportPhoneNo'],
                accessorFn: (row) => row.phoneNumber,
                meta: {
                  skipExcelFormatting: true,
                },
              },

              {
                header: t['reportsMemberDosariMemberReportMemberId'],
                accessorKey: 'memberNo',

                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: t['reportsMemberDosariMemberReportMemberName'],
                accessorKey: 'name',
                meta: {
                  Footer: {
                    display: 'none',
                  },
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
  const { t } = useTranslation();

  const { watch } = useFormContext<LoanBalanceFilterData>();
  const productTypeIds = watch('filter.productTypes');

  const { data: loanProductTypeData } = useGetLoanProductTypeQuery();
  const { data: loanSubProductTypeData } = useGetMultipleSubProductsQuery({
    productTypeIds: productTypeIds || [],
  });

  const loanProductType = loanProductTypeData?.settings?.general?.loan?.productType?.productTypes;
  const loanSubProductType =
    loanSubProductTypeData?.settings?.general?.loan?.productType?.multipleProductSubTypes;

  return (
    <>
      {' '}
      <Report.Filter title={t['reportsMemberDosariMemberReportFilterNatureOfTransactions']}>
        <FormCheckboxGroup
          name="filter.natureOfTransactions"
          list={[
            {
              label: t['reportsMemberDosariMemberReportFilterNatureOfTransactionsAll'],
              value: LoanAgingPaymentMode.All,
            },
            {
              label: t['reportsMemberDosariMemberReportFilterNatureOfTransactionsMonthly'],
              value: LoanAgingPaymentMode.Monthly,
            },
            {
              label: t['reportsMemberDosariMemberReportFilterNatureOfTransactionsQuaterly'],
              value: LoanAgingPaymentMode.Quarterly,
            },

            {
              label: t['reportsMemberDosariMemberReportFilterNatureOfTransactionsHalfYearly'],
              value: LoanAgingPaymentMode.HalfYearly,
            },
            {
              label: t['reportsMemberDosariMemberReportFilterNatureOfTransactionsYearly'],
              value: LoanAgingPaymentMode.Yearly,
            },
          ]}
          orientation="column"
        />
      </Report.Filter>
      <Report.Filter title={t['reportsMemberDosariMemberReportFilterProductType']}>
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
        <Report.Filter title={t['reportsMemberDosariMemberReportFilterProductSubType']}>
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
      <Report.Filter title={t['reportsMemberDosariMemberReportFilterDisbursePrincipal']}>
        <FormAmountFilter name="filter.disbursePrincipal" />
      </Report.Filter>
      <Report.Filter title={t['reportsMemberDosariMemberReportFilterRemainingPrincipal']}>
        <FormAmountFilter name="filter.remainingPrincipal" />
      </Report.Filter>
    </>
  );
};

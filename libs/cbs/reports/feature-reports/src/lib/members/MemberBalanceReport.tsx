import { useState } from 'react';

import { Box, GridItem } from '@myra-ui';

import {
  KymMemberTypesEnum,
  MemberBalanceFilter,
  MemberBalanceReportData,
  useGetMemberWiseBalanceReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate, RouteToDetailsPage } from '@coop/cbs/utils';
import {
  FormAmountFilter,
  FormBranchSelect,
  FormDatePicker,
  FormRadioGroup,
} from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

type MemberWiseBalanceFilters = Omit<MemberBalanceFilter, 'branchId'> & {
  branchId: {
    label: string;
    value: string;
  }[];
};

export const MemberBalanceReport = () => {
  const [filters, setFilters] = useState<MemberWiseBalanceFilters | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;

  const { data: memberBalanceReportData, isFetching } = useGetMemberWiseBalanceReportQuery(
    {
      data: {
        ...filters,

        period: { from: filters?.period.from, to: filters?.period.from },
        branchId: branchIds,
      } as MemberBalanceFilter,
    },
    { enabled: !!filters }
  );
  const memberBalanceReport =
    memberBalanceReportData?.report?.memberReport?.memberBalanceReport?.data;

  const memberBalanceReportSummary =
    memberBalanceReportData?.report?.memberReport?.memberBalanceReport?.summary;

  return (
    <Report
      defaultFilters={null}
      data={memberBalanceReport as MemberBalanceReportData[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.MEMBER_WISE_BALANCE_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Member Reports', link: '/reports/cbs/members' },
            { label: 'Member Wise Balance Report', link: '/reports/cbs/members/balance/new' },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect showUserBranchesOnly isMulti name="branchId" label="Service Center" />
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
          <Box display="flex" flexDir="column" gap="s32">
            <Report.Table<MemberBalanceReportData>
              columns={[
                {
                  header: 'Member Code',
                  accessorKey: 'memberCode',
                  footer: () => <Box textAlign="right">Total Balance</Box>,
                  cell: (props) => (
                    <RouteToDetailsPage
                      id={props?.row?.original?.memberId as string}
                      type="member"
                      label={props?.row?.original?.memberCode as string}
                    />
                  ),
                  meta: {
                    Footer: {
                      colspan: 5,
                    },
                  },
                },
                {
                  header: 'Member Name',
                  accessorKey: 'memberName',
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
                      {props.row.original.memberType?.toLowerCase()?.replace(/_/g, ' ')}
                    </Box>
                  ),
                  meta: {
                    Footer: {
                      display: 'none',
                    },
                  },
                },
                {
                  header: 'Membership Date',
                  accessorFn: (row) => row?.membershipDate,
                  cell: ({ row }) => localizedDate(row.original?.membershipDate),
                  meta: {
                    Footer: {
                      display: 'none',
                    },
                    skipExcelFormatting: true,
                  },
                },
                {
                  header: 'Member Service Center',
                  accessorFn: (row) => row?.branchName,
                  meta: {
                    Footer: {
                      display: 'none',
                    },
                  },
                },
                {
                  header: 'Saving Balance',
                  accessorKey: 'totalSavingCrBalance',
                  id: 'SavingBalanceHeader',
                  columns: [
                    {
                      header: 'Debit (Dr.)',
                      accessorKey: 'totalSavingDrBalance',

                      accessorFn: (row) => row?.totalSavingDrBalance,
                      cell: (props) =>
                        amountConverter(props.row?.original?.totalSavingDrBalance || '0.00'),
                      footer: () =>
                        amountConverter(memberBalanceReportSummary?.totalSavingDrBalance || 0),

                      meta: {
                        isNumeric: true,
                      },
                    },
                    {
                      header: 'Credit (Cr.)',
                      accessorFn: (row) => row?.totalSavingCrBalance,
                      accessorKey: 'totalSavingCrBalance',

                      cell: (props) =>
                        amountConverter(props.row?.original?.totalSavingCrBalance || '0.00'),
                      footer: () =>
                        amountConverter(memberBalanceReportSummary?.totalSavingCrBalance || 0),

                      meta: {
                        isNumeric: true,
                      },
                    },
                  ],
                },
                {
                  header: 'Loan Balance',
                  accessorFn: (row) => row?.totalLoanCrBalance,
                  accessorKey: 'totalLoanDrBalance',
                  id: 'loanBalanceHeader',

                  columns: [
                    {
                      header: 'Debit (Dr.)',
                      accessorFn: (row) => row?.totalLoanDrBalance,
                      accessorKey: 'totalLoanDrBalance',

                      cell: (props) =>
                        amountConverter(props.row?.original?.totalLoanDrBalance || '0.00'),
                      footer: () =>
                        amountConverter(memberBalanceReportSummary?.totalLoanDrBalance || 0),

                      meta: {
                        isNumeric: true,
                      },
                    },
                    {
                      header: 'Credit (Cr.)',
                      accessorFn: (row) => row?.totalLoanCrBalance,
                      accessorKey: 'totalLoanCrBalance',

                      cell: (props) =>
                        amountConverter(props.row?.original?.totalLoanCrBalance || '0.00'),
                      footer: () =>
                        amountConverter(memberBalanceReportSummary?.totalLoanCrBalance || 0),

                      meta: {
                        isNumeric: true,
                      },
                    },
                  ],
                },
                {
                  header: 'Share Balance',
                  accessorKey: 'totalShareDrBalance',
                  id: 'ShareBalanceHeader',

                  columns: [
                    {
                      header: 'Debit (Dr.)',
                      accessorKey: 'totalShareDrBalance',
                      accessorFn: (row) => row?.totalShareDrBalance,
                      cell: (props) =>
                        amountConverter(props.row?.original?.totalShareDrBalance || '0.00'),
                      footer: () =>
                        amountConverter(memberBalanceReportSummary?.totalShareDrBalance || 0),

                      meta: {
                        isNumeric: true,
                      },
                    },
                    {
                      header: 'Credit (Cr.)',
                      accessorKey: 'totalShareCrBalance',

                      accessorFn: (row) => row?.totalShareCrBalance,
                      cell: (props) =>
                        amountConverter(props.row?.original?.totalShareCrBalance || '0.00'),
                      footer: () =>
                        amountConverter(memberBalanceReportSummary?.totalShareCrBalance || 0),

                      meta: {
                        isNumeric: true,
                      },
                    },
                  ],
                },
              ]}
              showFooter
            />
          </Box>
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="Member Type">
            <FormRadioGroup
              name="filter.memberType"
              options={[
                {
                  label: 'Individual',
                  value: KymMemberTypesEnum.Individual,
                },
                {
                  label: 'Institution',
                  value: KymMemberTypesEnum.Institution,
                },
                {
                  label: 'Cooperative',
                  value: KymMemberTypesEnum.Cooperative,
                },
                {
                  label: 'Cooperative Union',
                  value: KymMemberTypesEnum.CooperativeUnion,
                },
              ]}
            />
          </Report.Filter>
          <Report.Filter title="Total Share Balance">
            <FormAmountFilter name="filter.shareBalance" />
          </Report.Filter>
          <Report.Filter title="Total Saving Balance">
            <FormAmountFilter name="filter.savingBalance" />
          </Report.Filter>
          <Report.Filter title="Total Loan Balance">
            <FormAmountFilter name="filter.loanBalance" />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};

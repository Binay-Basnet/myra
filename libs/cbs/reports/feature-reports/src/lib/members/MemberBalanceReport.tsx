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
import {
  FormAmountFilter,
  FormBranchSelect,
  FormDatePicker,
  FormRadioGroup,
} from '@coop/shared/form';
import { amountConverter, debitCreditConverter } from '@coop/shared/utils';

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
            <FormBranchSelect isMulti name="branchId" label="Service Center" />
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
          <Box display="flex" flexDir="column" gap="s32">
            <Report.Table<MemberBalanceReportData>
              columns={[
                {
                  header: 'Member Code',
                  accessorKey: 'memberCode',
                  footer: () => <Box textAlign="right">Total Balance</Box>,
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
                  meta: {
                    Footer: {
                      display: 'none',
                    },
                  },
                },
                {
                  header: 'Membership Date',
                  accessorFn: (row) => row?.membershipDate,
                  meta: {
                    Footer: {
                      display: 'none',
                    },
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
                  header: 'Total Saving Balance',
                  accessorFn: (row) =>
                    debitCreditConverter(
                      row.totalSavingBalance || '0.00',
                      row.totalSavingBalanceType || ''
                    ),
                  footer: () =>
                    debitCreditConverter(
                      memberBalanceReportSummary?.totalSavingBalance || '0.00',
                      memberBalanceReportSummary?.totalSavingBalanceType || ''
                    ),
                },
                {
                  header: 'Total Loan',
                  accessorFn: (row) => amountConverter(row.totalLoan || '0.00'),
                  footer: () => amountConverter(memberBalanceReportSummary?.totalLoan || '0.00'),
                },
                {
                  header: 'Total Share Balance',
                  accessorFn: (row) => amountConverter(row.totalShareBalance || '0.00'),
                  footer: () =>
                    amountConverter(memberBalanceReportSummary?.totalShareBalance || '0.00'),
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

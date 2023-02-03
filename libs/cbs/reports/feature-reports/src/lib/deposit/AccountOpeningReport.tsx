import { useState } from 'react';

import { GridItem } from '@myra-ui';

import {
  AccountOpeningReport,
  AccountOpeningReportInput,
  useGetAccountOpeningReportQuery,
  useGetSettingsUserListDataQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate, RouteToDetailsPage } from '@coop/cbs/utils';
import { FormBranchSelect, FormSelect } from '@coop/shared/form';

type AccountOpeningReportFilters = Omit<AccountOpeningReportInput, 'branchId'> & {
  branchId: { label: string; value: string }[];
};

export const AccountOpenReport = () => {
  const [filters, setFilters] = useState<AccountOpeningReportFilters | null>(null);
  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;

  const { data: userListData } = useGetSettingsUserListDataQuery({
    // filter: { role: [Roles.Agent] },
    paginate: { after: '', first: -1 },
  });

  const { data, isFetching } = useGetAccountOpeningReportQuery(
    {
      data: { ...filters, branchId: branchIds } as AccountOpeningReportInput,
    },
    { enabled: !!filters }
  );

  const accountOpeningReport = data?.report?.depositReport?.accountOpeningReport?.data;
  const userList = userListData?.settings?.myraUser?.list?.edges;

  return (
    <Report
      defaultFilters={{}}
      data={accountOpeningReport as AccountOpeningReport[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.ACCOUNT_OPENING_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Saving Reports', link: '/reports/cbs/savings' },
            { label: 'Opened Account Report', link: '/reports/cbs/savings/account-opening/new' },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect isMulti name="branchId" label="Select Service Center" />
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
          <Report.Table<AccountOpeningReport>
            hasSNo={false}
            columns={[
              {
                header: 'Service Center',
                accessorKey: 'branchName',
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
                header: 'Account Number',
                accessorKey: 'accountNumber',
                cell: (props) => (
                  <RouteToDetailsPage
                    id={props?.row?.original?.accountNumber as string}
                    type="savings"
                    label={props?.row?.original?.accountNumber as string}
                  />
                ),
              },
              {
                header: 'Account Name',
                accessorKey: 'accountName',
                meta: {
                  width: '70%',
                },
              },
              {
                header: 'Account Opening Date',
                accessorFn: (row) => localizedDate(row?.openingDate),
              },
              {
                header: 'Account Opened By User',
                accessorKey: 'openedBy',
              },
            ]}
          />
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="User Wise">
            <FormSelect
              label="Account Opened By User"
              options={userList?.map((user) => ({
                label: user.node?.name as string,
                value: user.node?.id as string,
              }))}
              name="user"
            />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};

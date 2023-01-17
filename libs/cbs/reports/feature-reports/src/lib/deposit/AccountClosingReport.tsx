import { useState } from 'react';

import { GridItem } from '@myra-ui';

import {
  AccountClosingReport,
  AccountClosingReportInput,
  useGetAccountClosingReportQuery,
  useGetSettingsUserListDataQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate, RouteToDetailsPage } from '@coop/cbs/utils';
import { FormBranchSelect, FormSelect } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

export const AccountCloseReport = () => {
  const [filters, setFilters] = useState<AccountClosingReportInput | null>(null);
  const { data: userListData } = useGetSettingsUserListDataQuery({
    // filter: { role: [Roles.Agent] },
    paginate: { after: '', first: -1 },
  });

  const { data, isFetching } = useGetAccountClosingReportQuery(
    {
      data: filters as AccountClosingReportInput,
    },
    { enabled: !!filters }
  );

  const accountClosingReport = data?.report?.depositReport?.accountClosingReport?.data;
  const userList = userListData?.settings?.myraUser?.list?.edges;

  return (
    <Report
      defaultFilters={{}}
      data={accountClosingReport as AccountClosingReport[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.ACCOUNT_CLOSING_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Saving Reports', link: '/reports/cbs/savings' },
            { label: 'Account Closing Report', link: '/reports/cbs/savings/account-closing/new' },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect name="branchId" label="Select Service Center" />
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
          <Report.Table<AccountClosingReport>
            hasSNo={false}
            columns={[
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
                    type="account-close"
                    label={props?.row?.original?.accountNumber as string}
                  />
                ),
              },
              {
                header: 'Account Name',
                accessorKey: 'accountName',
                meta: {
                  width: '50%',
                },
              },
              {
                header: 'Account Opening Date',
                accessorFn: (row) => localizedDate(row?.openingDate),
              },
              {
                header: 'Account Closing Date',
                accessorFn: (row) => localizedDate(row?.closingDate),
              },
              {
                header: 'Closed Balance',
                accessorKey: 'closedBalance',
                cell: (props) => amountConverter(props.getValue() as string),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Account Closed By User',
                accessorKey: 'closedBy',
              },
            ]}
          />
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="User Wise">
            <FormSelect
              label="Account Closed By User"
              options={userList?.map((user) => ({
                label: user.node?.name as string,
                value: user.node?.id as string,
              }))}
              name="filter.user"
            />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};

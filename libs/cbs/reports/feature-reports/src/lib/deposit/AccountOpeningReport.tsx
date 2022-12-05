import { useState } from 'react';
import { GridItem } from '@myra-ui';
import dayjs from 'dayjs';

import {
  AccountOpeningReport,
  AccountOpeningReportInput,
  useGetAccountOpeningReportQuery,
  useGetSettingsUserListDataQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormBranchSelect, FormSelect } from '@coop/shared/form';

export const AccountOpenReport = () => {
  const [filters, setFilters] = useState<AccountOpeningReportInput | null>(null);
  const { data: userListData } = useGetSettingsUserListDataQuery({
    // filter: { role: [Roles.Agent] },
    paginate: { after: '', first: -1 },
  });

  const { data, isFetching } = useGetAccountOpeningReportQuery(
    {
      data: filters as AccountOpeningReportInput,
    },
    { enabled: !!filters }
  );
  const accountOpeningReport = data?.report?.accountOpeningReport?.data;
  const userList = userListData?.settings?.myraUser?.list?.edges;

  return (
    <Report
      defaultFilters={null}
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
            { label: 'Account Opening Report', link: '/reports/cbs/savings/account-opening/new' },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect name="branchId" label="Select Branch" />
          </GridItem>
          <GridItem colSpan={1}>
            <ReportDateRange />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization statementDate={filters?.period?.periodType} />
          <Report.Table<AccountOpeningReport>
            hasSNo={false}
            columns={[
              {
                header: 'Member Id',
                accessorKey: 'memberId',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Account Number',
                accessorKey: 'accountNumber',
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
                accessorKey: 'openingDate',
                cell: ({ cell }) => dayjs(cell.row.original.openingDate?.en).format('YYYY-MM-DD'),
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

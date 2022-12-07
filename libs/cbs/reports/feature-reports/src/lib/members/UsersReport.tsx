import { useState } from 'react';
import dayjs from 'dayjs';

import { GridItem } from '@myra-ui';

import { PeriodInput, RolesFilter, useGetUserReportQuery, UserReport } from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormBranchSelect, FormRadioGroup, FormSelect } from '@coop/shared/form';

type UserReportFilter = {
  branchId?: string;
  filter?: {
    isCoreEmployee?: 'yes' | 'no';
    role?: { label: string; value: RolesFilter }[];
  };
  period: PeriodInput;
};

export const UsersReport = () => {
  const [filters, setFilters] = useState<UserReportFilter | null>(null);

  const roleIDs =
    filters?.filter?.role && filters?.filter?.role?.length !== 0
      ? filters?.filter?.role?.map((r) => r.value)
      : null;

  const { data, isFetching } = useGetUserReportQuery(
    {
      data: {
        period: filters?.period as PeriodInput,
        branchId: filters?.branchId,
        filter: {
          isCoreEmployee: filters?.filter?.isCoreEmployee === 'yes',
          role: roleIDs?.length === 0 ? null : roleIDs,
        },
      },
    },
    { enabled: !!filters }
  );
  const userReport = data?.report?.userReport?.data;

  return (
    <Report
      defaultFilters={{
        filter: {
          isCoreEmployee: 'no',
          role: [],
        },
      }}
      data={userReport as UserReport[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.USER_LIST_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Others Reports', link: '/reports/cbs/others' },
            { label: 'User List Report', link: '/reports/cbs/others/users/new' },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect name="branchId" label="Branch" />
          </GridItem>
          <GridItem colSpan={1}>
            <ReportDateRange label="Date Period" />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization statementDate={filters?.period?.periodType} />
          <Report.Table<UserReport & { index: number }>
            columns={[
              {
                header: 'S.No.',
                accessorKey: 'index',
                meta: {
                  width: '60px',
                  Footer: {
                    colspan: 4,
                  },
                },
              },
              {
                header: 'Is Core Employee',
                accessorKey: 'isCoreEmployee',
                cell: ({ getValue }) => (getValue() ? 'Yes' : 'No'),
              },
              {
                header: 'Employee Name',
                accessorKey: 'employeeName',
              },
              {
                header: 'Username',
                accessorKey: 'username',
              },
              {
                header: 'Username Code',
                accessorKey: 'usernameCode',
              },
              {
                header: 'Access For Group',
                accessorKey: 'accessForGroup',
                cell: ({ getValue }) => (getValue() ? 'Yes' : 'No'),
              },
              {
                header: 'Access For Branch',
                accessorKey: 'accessForBranch',
                cell: ({ getValue }) => (getValue() ? 'Yes' : 'No'),
              },
              {
                header: 'Roles',
                accessorKey: 'role',
              },
              {
                header: 'User Created Date',
                accessorKey: 'createdDate',
                cell: ({ cell }) =>
                  dayjs(cell.row.original.createdDate?.local).format('YYYY-MM-DD'),
              },
              {
                header: 'User Created By',
                accessorKey: 'createdBy',
              },
              {
                header: 'Remarks',
                accessorKey: 'remarks',
              },
            ]}
          />
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="Core Employee">
            <FormRadioGroup
              name="filter.isCoreEmployee"
              options={[
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ]}
              direction="column"
            />
          </Report.Filter>
          <Report.Filter title="Role Wise">
            <FormSelect
              name="filter.role"
              isMulti
              options={[
                { label: 'Agent', value: RolesFilter.Agent },
                { label: 'Branch Manager', value: RolesFilter.BranchManager },
                { label: 'Head Teller', value: RolesFilter.HeadTeller },
                { label: 'Teller', value: RolesFilter.Teller },
                { label: 'Superadmin', value: RolesFilter.Superadmin },
              ]}
            />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};

import { useState } from 'react';
import dayjs from 'dayjs';

import {
  ActiveInactiveMemberReportData,
  ActiveInactiveMemberStatement,
  MemberStatus,
  MemberType,
  useGetActiveInactiveMemberReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormBranchSelect, FormRadioGroup } from '@coop/shared/form';
import { GridItem } from '@coop/shared/ui';

export const MemberActiveInactiveReport = () => {
  const [filters, setFilters] = useState<ActiveInactiveMemberReportData | null>(null);

  const { data: memberActiveInactiveReportData, isInitialLoading } =
    useGetActiveInactiveMemberReportQuery(
      {
        data: filters as ActiveInactiveMemberReportData,
      },
      { enabled: !!filters }
    );
  const memberActiveInactiveReport =
    memberActiveInactiveReportData?.report?.activeInactiveMemberReport?.statement;

  const report =
    memberActiveInactiveReport &&
    'reportStatement' in memberActiveInactiveReport &&
    memberActiveInactiveReport.reportStatement;

  return (
    <Report
      defaultFilters={{
        filter: {
          memberType: MemberType.All,
          status: MemberStatus.All,
        },
      }}
      data={report as ActiveInactiveMemberStatement[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isInitialLoading}
      report={ReportEnum.MEMBER_ACTIVATIONS}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Member Reports', link: '/reports/cbs/savings' },
            { label: 'Active/Inactive Member', link: '/reports/cbs/members/activations/new' },
          ]}
        />
        <Report.Inputs
          defaultFilters={{
            filter: {
              memberType: MemberType.All,
              status: MemberStatus.All,
            },
          }}
          setFilters={setFilters}
        >
          <GridItem colSpan={3}>
            <FormBranchSelect name="branchId" label="Branch" />
          </GridItem>
          <GridItem colSpan={1}>
            <ReportDateRange label="Member Registration Date Period" />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization statementDate={filters?.period?.periodType} />
          <Report.Table<ActiveInactiveMemberStatement & { index: number }>
            showFooter
            columns={[
              {
                header: 'S.No.',
                accessorKey: 'index',
                meta: {
                  width: '60px',
                },
              },
              {
                header: 'Member ID',
                accessorKey: 'memberId',
              },
              {
                header: 'Member Name',
                accessorFn: (row) => row?.memberName,
              },
              {
                header: 'District',
                accessorFn: (row) => row?.district,
              },
              {
                header: 'Ward No',
                accessorFn: (row) => row?.wardNo,
              },
              {
                header: 'Address',
                accessorFn: (row) => row?.address,
              },
              {
                header: 'DOB',
                accessorFn: (row) => row?.dob?.local,
                cell: (props) => dayjs(props.getValue() as string).format('YYYY-MM-DD'),
              },
              {
                header: 'Age',
                accessorFn: (row) => row?.age,
              },
              {
                header: 'Contact No.',
                accessorFn: (row) => row?.gender,
              },
              {
                header: 'PAN No.',
                accessorFn: (row) => row?.pan,
              },
              {
                header: 'Occupation',
                accessorFn: (row) => row?.occupation,
              },
              {
                header: 'Member Registration Date',
                accessorFn: (row) => row?.memberRegistrationDate?.local,
                cell: (props) => dayjs(props.getValue() as string).format('YYYY-MM-DD'),
              },
              {
                header: 'Status',
                accessorFn: (row) => row?.status,
                cell: (props) => (props.getValue() ? 'Active' : 'Inactive'),
              },
            ]}
          />
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="Status">
            <FormRadioGroup
              name="filter.status"
              options={[
                {
                  label: 'All',
                  value: MemberStatus.All,
                },
                {
                  label: 'Active',
                  value: MemberStatus.Active,
                },
                {
                  label: 'Inactive',
                  value: MemberStatus.Inactive,
                },
              ]}
            />
          </Report.Filter>
          <Report.Filter title="Member Type">
            <FormRadioGroup
              name="filter.memberType"
              options={[
                { label: 'All', value: MemberType.All },
                { label: 'Individual', value: MemberType.Individual },
                { label: 'Institution', value: MemberType.Institution },
                { label: 'Cooperative', value: MemberType.Cooperative },
                { label: 'Cooperative Union', value: MemberType.CooperativeUnion },
              ]}
            />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};

import { useState } from 'react';
import { Box, GridItem, Text } from '@myra-ui';
import dayjs from 'dayjs';

import {
  ActiveInactiveMemberReportData,
  ActiveInactiveMemberReportSummary,
  ActiveInactiveMemberStatement,
  MemberStatus,
  MemberType,
  useGetActiveInactiveMemberReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormBranchSelect, FormRadioGroup } from '@coop/shared/form';

export const MemberActiveInactiveReport = () => {
  const [filters, setFilters] = useState<ActiveInactiveMemberReportData | null>(null);

  const { data: memberActiveInactiveReportData, isFetching } =
    useGetActiveInactiveMemberReportQuery(
      {
        data: filters as ActiveInactiveMemberReportData,
      },
      { enabled: !!filters }
    );
  const memberActiveInactiveReport =
    memberActiveInactiveReportData?.report?.activeInactiveMemberReport?.statement;

  const report = (memberActiveInactiveReport &&
    'reportStatement' in memberActiveInactiveReport &&
    memberActiveInactiveReport.reportStatement) as ActiveInactiveMemberStatement[];
  const summary = (memberActiveInactiveReport &&
    'reportStatement' in memberActiveInactiveReport &&
    memberActiveInactiveReport.summary) as ActiveInactiveMemberReportSummary;

  const individualReport = report?.filter((r) => r.memberType === 'INDIVIDUAL');
  const otherReport = report?.filter((r) => r.memberType !== 'INDIVIDUAL');

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
      isLoading={isFetching}
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
          <Box display="flex" flexDir="column" gap="s32">
            {individualReport?.length !== 0 ? (
              <Box pt="s16">
                <Text px="s16" fontSize="r2" color="gray.800" fontWeight={500}>
                  Individual
                </Text>
                <Report.Table<ActiveInactiveMemberStatement & { index: number }>
                  data={individualReport?.map((r, index) => ({ ...r, index: index + 1 }))}
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
                      cell: (props) => (props.getValue() === 'APPROVED' ? 'Active' : 'Inactive'),
                    },
                  ]}
                />
              </Box>
            ) : null}

            {otherReport?.length !== 0 ? (
              <Box pt="s16">
                <Text px="s16" fontSize="r2" color="gray.800" fontWeight={500}>
                  Institutional, Cooperative, Cooperative Union
                </Text>
                <Report.Table<ActiveInactiveMemberStatement & { index: number }>
                  data={otherReport?.map((r, index) => ({ ...r, index: index + 1 }))}
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
                      cell: (props) => (props.getValue() === 'APPROVED' ? 'Active' : 'Inactive'),
                    },
                  ]}
                />
              </Box>
            ) : null}
          </Box>
          <Box>
            <Text fontSize="r2" px="s16" pb="s16" color="gray.800" fontWeight={500}>
              Active/Inactive Summary
            </Text>
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
                  Active Total
                </Box>
                <Box px="s12" w="20%" display="flex" alignItems="center" justifyContent="end">
                  {summary?.activeTotal || 0}
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
                  Inactive Total
                </Box>
                <Box px="s12" w="20%" display="flex" alignItems="center" justifyContent="end">
                  {summary?.inactiveTotal || 0}
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
                  Total Member
                </Box>
                <Box px="s12" w="20%" display="flex" alignItems="center" justifyContent="end">
                  {summary?.totalMember || 0}
                </Box>
              </Box>
            </Box>
          </Box>
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

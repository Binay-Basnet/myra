import { useState } from 'react';

import { Box, GridItem, Text } from '@myra-ui';

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
import { localizedDate, RouteToDetailsPage } from '@coop/cbs/utils';
import { FormBranchSelect, FormRadioGroup } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type MemberActiveInactiveReportFilters = Omit<ActiveInactiveMemberReportData, 'branchId'> & {
  branchId: {
    label: string;
    value: string;
  }[];
};

export const MemberActiveInactiveReport = () => {
  const { t } = useTranslation();

  const [filters, setFilters] = useState<MemberActiveInactiveReportFilters | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((b) => b.value)
      : null;

  const { data: memberActiveInactiveReportData, isFetching } =
    useGetActiveInactiveMemberReportQuery(
      {
        data: { ...filters, branchId: branchIds } as ActiveInactiveMemberReportData,
      },
      { enabled: !!filters }
    );
  const memberActiveInactiveReport =
    memberActiveInactiveReportData?.report?.memberReport?.activeInactiveMemberReport?.statement;

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
            { label: t['reportsSidebarMemberReports'], link: '/cbs/reports/cbs-reports/members' },
            {
              label: t['reportsActiveInactiveReport'],
              link: '/cbs/reports/cbs-reports/members/activations/new',
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
            <ReportDateRange label={t['reportsMemberActiveInactiveReportMemberRegdDatePeriod']} />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Box display="flex" flexDir="column" gap="s32">
            {individualReport?.length !== 0 ? (
              <Box pt="s16">
                <Text px="s16" fontSize="r2" color="gray.800" fontWeight={500}>
                  {t['reportsMemberActiveInactiveReportIndividual']}
                </Text>
                <Report.Table<ActiveInactiveMemberStatement & { index: number }>
                  data={individualReport?.map((r, index) => ({ ...r, index: index + 1 }))}
                  columns={[
                    {
                      header: t['sn'],
                      accessorKey: 'index',
                      meta: {
                        width: '60px',
                      },
                    },
                    {
                      header: t['serviceCenter'],
                      accessorKey: 'branchName',
                    },
                    {
                      header: t['reportsMemberActiveInactiveReportIndMemberID'],
                      accessorKey: 'memberId',
                      cell: (props) => (
                        <RouteToDetailsPage
                          id={props?.row?.original?.memberId as string}
                          type="member"
                          label={props?.row?.original?.memberCode as string}
                        />
                      ),
                    },
                    {
                      header: t['reportsMemberActiveInactiveReportIndMemberName'],
                      accessorFn: (row) => row?.memberName,
                    },
                    {
                      header: t['reportsMemberActiveInactiveReportIndDistrict'],
                      accessorFn: (row) => row?.district,
                    },
                    {
                      header: t['reportsMemberActiveInactiveReportIndWardNo'],
                      accessorFn: (row) => row?.wardNo,
                    },
                    {
                      header: t['reportsMemberActiveInactiveReportIndAddress'],
                      accessorFn: (row) => row?.address,
                    },
                    {
                      header: t['reportsMemberActiveInactiveReportIndDOB'],
                      accessorFn: (row) => localizedDate(row?.dob),
                      meta: {
                        skipExcelFormatting: true,
                      },
                    },
                    {
                      header: t['reportsMemberActiveInactiveReportIndAge'],
                      accessorFn: (row) => row?.age,
                    },
                    {
                      header: t['reportsMemberActiveInactiveReportIndGender'],
                      accessorFn: (row) => row?.gender,
                    },
                    {
                      header: t['reportsMemberActiveInactiveReportIndPANNo'],
                      accessorFn: (row) => row?.pan,
                      meta: {
                        skipExcelFormatting: true,
                      },
                    },
                    {
                      header: t['reportsMemberActiveInactiveReportIndOccupation'],
                      accessorFn: (row) => row?.occupation,
                    },
                    {
                      header: t['reportsMemberActiveInactiveReportIndMemberRegistrationDate'],
                      accessorFn: (row) => localizedDate(row?.memberRegistrationDate),
                      meta: {
                        skipExcelFormatting: true,
                      },
                    },
                    {
                      header: t['reportsMemberActiveInactiveReportIndStatus'],
                      accessorFn: (row) => row?.status,
                      cell: (props) => (props.getValue() === 'APPROVED' ? 'Active' : 'Inactive'),
                    },
                  ]}
                  tableTitle={t['reportsMemberActiveInactiveReportIndTableTitle']}
                />
              </Box>
            ) : null}

            {otherReport?.length !== 0 ? (
              <Box pt="s16">
                <Text px="s16" fontSize="r2" color="gray.800" fontWeight={500}>
                  {t['reportsMemberActiveInactiveReportInstCoopCoopUnion']}
                </Text>
                <Report.Table<ActiveInactiveMemberStatement & { index: number }>
                  data={otherReport?.map((r, index) => ({ ...r, index: index + 1 }))}
                  columns={[
                    {
                      header: t['sn'],
                      accessorKey: 'index',
                      meta: {
                        width: '60px',
                      },
                    },
                    {
                      header: t['serviceCenter'],
                      accessorKey: 'branchName',
                    },
                    {
                      header: t['reportsMemberActiveInactiveReportInstCoopCoopUnionMemberID'],
                      accessorKey: 'memberId',
                      cell: (props) => (
                        <RouteToDetailsPage
                          id={props?.row?.original?.memberId as string}
                          type="member"
                          label={props?.row?.original?.memberCode as string}
                        />
                      ),
                    },
                    {
                      header: t['reportsMemberActiveInactiveReportInstCoopCoopUnionMemberName'],
                      accessorFn: (row) => row?.memberName,
                    },
                    {
                      header: t['reportsMemberActiveInactiveReportInstCoopCoopUnionDistrict'],
                      accessorFn: (row) => row?.district,
                    },
                    {
                      header: t['reportsMemberActiveInactiveReportInstCoopCoopUnionWardNo'],
                      accessorFn: (row) => row?.wardNo,
                    },
                    {
                      header: t['reportsMemberActiveInactiveReportInstCoopCoopUnionAddress'],
                      accessorFn: (row) => row?.address,
                    },
                    {
                      header: t['reportsMemberActiveInactiveReportInstCoopCoopUnionDOE'],
                      accessorFn: (row) => localizedDate(row?.dob),
                      meta: {
                        skipExcelFormatting: true,
                      },
                    },
                    {
                      header: t['reportsMemberActiveInactiveReportInstCoopCoopUnionAge'],
                      accessorFn: (row) => row?.age,
                    },
                    {
                      header: t['reportsMemberActiveInactiveReportInstCoopCoopUnionMemberType'],
                      accessorFn: (row) => row?.gender?.toLowerCase()?.replace('_', ' '),
                      cell: (props) => (
                        <Box textTransform="capitalize">{props.getValue() as string}</Box>
                      ),
                    },
                    {
                      header: t['reportsMemberActiveInactiveReportInstCoopCoopUnionPanNo'],
                      accessorFn: (row) => row?.pan,
                      meta: {
                        skipExcelFormatting: true,
                      },
                    },
                    {
                      header: t['reportsMemberActiveInactiveReportInstCoopCoopUnionNature'],
                      accessorFn: (row) => row?.occupation,
                    },
                    {
                      header:
                        t[
                          'reportsMemberActiveInactiveReportInstCoopCoopUnionMemberRegistrationDate'
                        ],
                      accessorFn: (row) => localizedDate(row?.memberRegistrationDate),
                      meta: {
                        skipExcelFormatting: true,
                      },
                    },
                    {
                      header: t['reportsMemberActiveInactiveReportInstCoopCoopUnionStatus'],
                      accessorFn: (row) => row?.status,
                      cell: (props) =>
                        props.getValue() === 'APPROVED'
                          ? t['reportsMemberActiveInactiveReportInstCoopCoopUnionStatusActive']
                          : t['reportsMemberActiveInactiveReportInstCoopCoopUnionStatusInactive'],
                    },
                  ]}
                  tableTitle={t['reportsMemberActiveInactiveReportInstCoopCoopUnionTableTitle']}
                />
              </Box>
            ) : null}
          </Box>
          <Box>
            <Text fontSize="r2" px="s16" pb="s16" color="gray.800" fontWeight={500}>
              {t['reportsMemberActiveInactiveReportActiveInactiveSummary']}
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
                  {t['reportsMemberActiveInactiveReportActiveTotal']}
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
                  {t['reportsMemberActiveInactiveReportInactiveTotal']}
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
                  {t['reportsMemberActiveInactiveReportTotalMember']}
                </Box>
                <Box px="s12" w="20%" display="flex" alignItems="center" justifyContent="end">
                  {summary?.totalMember || 0}
                </Box>
              </Box>
            </Box>
          </Box>
        </Report.Content>
        <Report.Filters>
          <Report.Filter title={t['reportsMemberActiveInactiveReportFilterStatus']}>
            <FormRadioGroup
              name="filter.status"
              options={[
                {
                  label: t['reportsMemberActiveInactiveReportFilterStatusAll'],
                  value: MemberStatus.All,
                },
                {
                  label: t['reportsMemberActiveInactiveReportFilterStatusActive'],
                  value: MemberStatus.Active,
                },
                {
                  label: t['reportsMemberActiveInactiveReportFilterStatusInactive'],
                  value: MemberStatus.Inactive,
                },
              ]}
            />
          </Report.Filter>
          <Report.Filter title={t['reportsMemberActiveInactiveReportFilterMemberType']}>
            <FormRadioGroup
              name="filter.memberType"
              options={[
                {
                  label: t['reportsMemberActiveInactiveReportFilterMemberTypeAll'],
                  value: MemberType.All,
                },
                {
                  label: t['reportsMemberActiveInactiveReportFilterMemberTypeIndividual'],
                  value: MemberType.Individual,
                },
                {
                  label: t['reportsMemberActiveInactiveReportFilterMemberTypeInstitution'],
                  value: MemberType.Institution,
                },
                {
                  label: t['reportsMemberActiveInactiveReportFilterMemberTypeCooperative'],
                  value: MemberType.Cooperative,
                },
                {
                  label: t['reportsMemberActiveInactiveReportFilterMemberTypeCooperativeUnion'],
                  value: MemberType.CooperativeUnion,
                },
              ]}
            />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};

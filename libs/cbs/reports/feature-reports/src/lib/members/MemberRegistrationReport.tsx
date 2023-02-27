import { useState } from 'react';

import { Box, GridItem, Text } from '@myra-ui';

import {
  Address,
  LocalizedDateFilter,
  MemberIndividualData,
  MemberOtherData,
  MemberRegistrationReportData,
  MemberType,
  useGetMemberRegistrationReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { formatAddress, localizedDate, RouteToDetailsPage } from '@coop/cbs/utils';
import { FormBranchSelect, FormCheckboxGroup } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

type Filter = Omit<MemberRegistrationReportData, 'branchId'> & {
  branchId: {
    label: string;
    value: string;
  }[];
  filter?: {
    gender?: string[];
    memberType?: MemberType[];
    institutionType?: string;
    occupation?: string[];
  };
  period: LocalizedDateFilter;
};

export const MemberRegisterReport = () => {
  const [filters, setFilters] = useState<Filter | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;
  const memberTypes =
    filters?.filter?.memberType && filters?.filter?.memberType.length !== 0
      ? filters?.filter?.memberType?.map((m) => m)
      : null;
  const { data: memberRegistrationReportData, isFetching } = useGetMemberRegistrationReportQuery(
    {
      data: {
        period: filters?.period as LocalizedDateFilter,
        branchId: branchIds,
        filter: {
          ...filters?.filter,
          memberType: memberTypes,
        },
      },
    },
    { enabled: !!filters }
  );

  const individualReport = memberRegistrationReportData?.report?.memberReport
    ?.memberRegistrationReport?.data?.individual as MemberIndividualData[];
  const otherReport = memberRegistrationReportData?.report?.memberReport?.memberRegistrationReport
    ?.data?.other as MemberOtherData[];

  return (
    <Report
      defaultFilters={{}}
      data={individualReport ?? otherReport}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.MEMBER_REGISTER_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Member Reports', link: '/reports/cbs/members' },
            { label: 'Member Register', link: '/reports/cbs/members/register/new' },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect isMulti name="branchId" label="Select Service Center" />
          </GridItem>
          <GridItem colSpan={1}>
            <ReportDateRange label="Member Registration Date Period" />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Box display="flex" flexDir="column" gap="s32">
            {individualReport && individualReport?.length !== 0 ? (
              <Box pt="s16">
                <Text px="s16" fontSize="r2" color="gray.800" fontWeight={500}>
                  Individual
                </Text>
                <Report.Table<MemberIndividualData & { index: number }>
                  data={individualReport?.map((r, index) => ({ ...r, index: index + 1 }))}
                  columns={[
                    {
                      header: 'Member ID',
                      accessorKey: 'memberCode',
                      cell: (props) => (
                        <RouteToDetailsPage
                          id={props?.row?.original?.memberId as string}
                          type="member"
                          label={props?.row?.original?.memberCode as string}
                        />
                      ),
                    },
                    {
                      header: 'Member Name',
                      accessorFn: (row) => row?.name,
                    },
                    {
                      header: 'Address',
                      accessorKey: 'address',
                      cell: (props) => formatAddress(props.getValue() as Address),
                    },

                    {
                      header: 'DOB',
                      accessorFn: (row) => localizedDate(row?.dob),
                    },
                    {
                      header: 'GrandFather Name',
                      accessorFn: (row) => row?.grandFatherName,
                    },

                    {
                      header: "Father's Name",
                      accessorFn: (row) => row?.fatherName,
                    },

                    {
                      header: 'Profession',
                      accessorKey: 'profession',
                    },
                    {
                      header: 'Share Information',
                      columns: [
                        {
                          header: 'Per Share Kitta',
                          accessorFn: (row) => row?.shareInfo?.perShareAmount,
                          cell: (props) => amountConverter(props.getValue() as string),
                        },
                        {
                          header: 'Share Purchase Kitta',
                          accessorFn: (row) => row?.shareInfo?.kitta,
                        },
                        {
                          header: 'Total Amount',
                          accessorFn: (row) => row?.shareInfo?.amount,
                          cell: (props) => amountConverter(props.getValue() as string),
                        },
                      ],
                    },
                    {
                      header: 'FingerPrint',
                      accessorKey: 'fingerPrint',
                      cell: (props) => (props?.getValue() ? 'Yes' : 'No'),
                    },

                    {
                      header: 'Photo',
                      accessorKey: 'photo',
                      cell: (props) => (props?.getValue() ? 'Yes' : 'No'),
                    },

                    {
                      header: 'Contact Number',
                      accessorKey: 'contactNo',
                    },
                    {
                      header: 'Email',
                      accessorKey: 'email',
                    },
                    {
                      header: 'Other',
                      accessorKey: 'other',
                    },
                  ]}
                  tableTitle="Individual"
                />
              </Box>
            ) : null}

            {otherReport && otherReport?.length !== 0 ? (
              <Box pt="s16">
                <Text px="s16" fontSize="r2" color="gray.800" fontWeight={500}>
                  Institutional, Cooperative, Cooperative Union
                </Text>
                <Report.Table<MemberOtherData & { index: number }>
                  data={otherReport?.map((r, index) => ({ ...r, index: index + 1 }))}
                  columns={[
                    {
                      header: 'Member ID',
                      accessorKey: 'memberCode',
                      cell: (props) => (
                        <RouteToDetailsPage
                          id={props?.row?.original?.memberId as string}
                          type="member"
                          label={props?.row?.original?.memberCode as string}
                        />
                      ),
                    },
                    {
                      header: 'Member Name',
                      accessorFn: (row) => row?.name,
                    },
                    {
                      header: 'Address',
                      accessorKey: 'address',
                      cell: (props) => formatAddress(props.getValue() as Address),
                    },

                    {
                      header: 'DOE',
                      accessorFn: (row) => localizedDate(row?.doe),
                    },
                    {
                      header: 'Type of Institution',
                      accessorKey: 'typeOfInstitution',
                      cell: (props) => (
                        <Box textTransform="capitalize">
                          {' '}
                          {props?.row?.original?.typeOfInstitution
                            ?.toLowerCase()
                            ?.replace(/_/g, ' ')}
                        </Box>
                      ),
                    },

                    {
                      header: 'Working Area',
                      accessorKey: 'workingArea',
                    },

                    {
                      header: 'Total Member',
                      accessorKey: 'totalMember',
                    },

                    {
                      header: 'Balance Sheet',
                      accessorKey: 'balanceSheet',
                      cell: (props) => amountConverter(props.getValue() as string),
                    },
                    {
                      header: 'Share Information',
                      columns: [
                        {
                          header: 'Per Amount Kitta',
                          accessorFn: (row) => row?.shareInfo?.perShareAmount,
                          cell: (props) => amountConverter(props.getValue() as string),
                        },
                        {
                          header: 'Share Purchase Kitta',
                          accessorFn: (row) => row?.shareInfo?.kitta,
                        },
                        {
                          header: 'Total Amount',
                          accessorFn: (row) => row?.shareInfo?.amount,
                        },
                      ],
                    },
                    {
                      header: 'Authorized Person Name',
                      accessorKey: 'authPersonName',
                    },
                    {
                      header: 'Post',
                      accessorKey: 'post',
                    },
                    {
                      header: 'Stamp',
                      accessorKey: 'stamp',
                      cell: (props) => (props?.getValue() ? 'Yes' : 'No'),
                    },

                    {
                      header: 'Contact Number',
                      accessorKey: 'contactNo',
                    },
                    {
                      header: 'Email',
                      accessorKey: 'email',
                    },
                    {
                      header: 'Other',
                      accessorKey: 'other',
                    },
                  ]}
                  tableTitle="Other"
                />
              </Box>
            ) : null}
          </Box>
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="Member Type">
            <FormCheckboxGroup
              name="filter.memberType"
              orientation="column"
              list={[
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

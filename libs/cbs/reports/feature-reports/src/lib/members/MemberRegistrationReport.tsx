import { useState } from 'react';
import { Box, GridItem, Text } from '@myra-ui';
import dayjs from 'dayjs';

import {
  Address,
  MemberIndividualData,
  MemberOtherData,
  MemberType,
  PeriodInput,
  useGetMemberRegistrationReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { formatAddress } from '@coop/cbs/utils';
import { FormCheckboxGroup } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

type Filter = {
  filter?: {
    gender?: string[];
    memberType?: MemberType[];
    institutionType?: string;
    occupation?: string[];
  };
  period: PeriodInput;
};

export const MemberRegisterReport = () => {
  const [filters, setFilters] = useState<Filter | null>(null);
  const memberTypes =
    filters?.filter?.memberType && filters?.filter?.memberType.length !== 0
      ? filters?.filter?.memberType?.map((m) => m)
      : null;
  const { data: memberRegistrationReportData, isFetching } = useGetMemberRegistrationReportQuery(
    {
      data: {
        period: filters?.period as PeriodInput,
        filter: {
          ...filters?.filter,
          memberType: memberTypes,
        },
      },
    },
    { enabled: !!filters }
  );

  const individualReport = memberRegistrationReportData?.report?.memberRegistrationReport?.data
    ?.individual as MemberIndividualData[];
  const otherReport = memberRegistrationReportData?.report?.memberRegistrationReport?.data
    ?.other as MemberOtherData[];

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
            { label: 'Member Reports', link: '/reports/cbs/savings' },
            { label: 'Member Register', link: '/reports/cbs/members/register/new' },
          ]}
        />
        <Report.Inputs>
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
                      accessorFn: (row) => row?.dob?.local,
                      cell: (props) => dayjs(props.getValue() as string).format('YYYY-MM-DD'),
                    },
                    {
                      header: 'GrandFather Name',
                      accessorFn: (row) => row?.grandFatherName,
                    },

                    {
                      header: "Father's Name",
                      accessorFn: (row) => row?.grandFatherName,
                    },

                    {
                      header: 'Profession',
                      accessorKey: 'profession',
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
                          accessorFn: (row) => row?.shareInfo?.perShareAmount,
                        },
                      ],
                    },
                    {
                      header: 'FingerPrint',
                      accessorKey: 'fingerPrint',
                    },

                    {
                      header: 'Photo',
                      accessorKey: 'photo',
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
                      accessorFn: (row) => row?.doe?.local,
                      cell: (props) => dayjs(props.getValue() as string).format('YYYY-MM-DD'),
                    },
                    {
                      header: 'Type of Institute',
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
                          accessorFn: (row) => row?.shareInfo?.perShareAmount,
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

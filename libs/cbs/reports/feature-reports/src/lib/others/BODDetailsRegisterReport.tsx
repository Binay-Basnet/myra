import { useState } from 'react';

import { Box, GridItem, Text } from '@myra-ui';

import {
  Committee,
  CommitteeMember,
  CommitteeRegisterReportFilterData,
  useGetBodRegisterReportQuery,
  useGetCommitteeListQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { formatAddress, localizedText, RouteToDetailsPage } from '@coop/cbs/utils';
import { FormSelect } from '@coop/shared/form';

type CommitteeFilters = Omit<CommitteeRegisterReportFilterData, 'committeeId'> & {
  committeeId: { label: string; value: string }[];
};

export const BODDetailsRegisterReport = () => {
  const [filters, setFilters] = useState<CommitteeFilters | null>(null);

  const { data: committeeListData } = useGetCommitteeListQuery();

  const committeeOptions = committeeListData?.settings?.general?.organization?.committee?.map(
    (data) => ({
      label: data?.name as string,
      value: data?.id as string,
    })
  );

  const committeIds =
    filters?.committeeId && filters?.committeeId.length !== 0
      ? filters?.committeeId?.map((t) => t.value)
      : null;
  const { data: committeeReportData, isFetching } = useGetBodRegisterReportQuery(
    {
      data: { ...filters, committeeId: committeIds } as CommitteeRegisterReportFilterData,
    },
    { enabled: !!filters }
  );
  const committeeReport =
    committeeReportData?.report?.committeeQuery?.committeeRegisterReport?.committee;

  return (
    <Report
      defaultFilters={null}
      data={committeeReport as Committee[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.OTHERS_COMMITTEE_REGISTER}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Other Report', link: '/reports/cbs/others' },
            {
              label: 'Committee Registered Details Report',
              link: '/reports/cbs/others/committee-register/new',
            },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormSelect
              isMulti
              label="Select Committee"
              name="committeeId"
              options={committeeOptions}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <ReportDateRange label="Select Period" />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Box display="flex" flexDirection="column" gap="s32" pt="s16">
            {committeeReport?.map((classify) => (
              <Box display="flex" flexDirection="column" gap="0">
                <Text fontSize="r2" fontWeight="500" px="s16">
                  {classify?.name}
                </Text>
                <CommitteeTable
                  data={classify?.member as CommitteeMember[]}
                  header={classify?.name as string}
                />
              </Box>
            ))}
          </Box>
        </Report.Content>
      </Report.Body>
    </Report>
  );
};

interface IMemberTableProps {
  data: CommitteeMember[] | null;
  header: string;
}

const CommitteeTable = ({ data, header }: IMemberTableProps) => {
  if (data?.length === 0) {
    return null;
  }

  return (
    <Report.Table<CommitteeMember>
      data={data}
      columns={[
        {
          header: 'Member Id',
          accessorKey: 'member.code',
          cell: (props) => (
            <RouteToDetailsPage
              id={props?.row?.original?.member?.id as string}
              type="member"
              label={props?.row?.original?.member?.code}
            />
          ),
        },
        {
          header: 'Member Name',
          accessorKey: 'member.name',
          accessorFn: (row) => localizedText(row?.member?.name),
        },
        {
          header: 'Post',
          accessorKey: 'position',
        },
        {
          header: 'Address',
          accessorKey: 'member.address',
          accessorFn: (row) => formatAddress(row?.member?.address),
        },

        {
          header: 'Grandfather Name',
          accessorKey: 'familyMember',
          cell: (props) => props.row.original.familyMember?.grandFatherName,
        },
        {
          header: 'Father Name',
          id: "Father's Name",
          accessorKey: 'familyMember',
          cell: (props) => props.row.original.familyMember?.fatherName,
        },

        {
          header: 'Spouse Name',
          accessorKey: 'familyMember',
          cell: (props) => props.row.original.familyMember?.spouseName,
        },
        {
          header: 'Profession',
          accessorKey: 'occupation',
        },
        {
          header: 'Elected Date.',
          accessorKey: 'joinedAt',
        },
        {
          header: 'Valid Upto',
          accessorKey: 'joinedAt',
        },
        {
          header: 'Contact Number',
          accessorKey: 'member.contact',
        },
      ]}
      tableTitle={header}
    />
  );
};

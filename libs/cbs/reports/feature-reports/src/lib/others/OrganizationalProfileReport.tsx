import { useState } from 'react';

import { Box, Text } from '@myra-ui';

import {
  Committee,
  CommitteeMember,
  CommitteeRegisterReportFilterData,
  useGetOrganizationalProfileReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { OrganizationProfileData } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { formatAddress, localizedText } from '@coop/cbs/utils';

type CommitteeFilters = Omit<CommitteeRegisterReportFilterData, 'committeeId'> & {
  committeeId: { label: string; value: string }[];
};

export const OrganizationalProfileReport = () => {
  const [filters, setFilters] = useState<CommitteeFilters | null>(null);

  const { data: committeeReportData, isFetching } = useGetOrganizationalProfileReportQuery(
    {},
    { enabled: !!filters }
  );
  const committeeReport =
    committeeReportData?.report?.committeeQuery?.organizationProfileReport?.committee;

  const organization =
    committeeReportData?.report?.committeeQuery?.organizationProfileReport?.organization;

  return (
    <Report
      defaultFilters={null}
      data={committeeReport as Committee[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.OTHERS_ORGANIZATIONAL_PROFILE}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Other Report', link: '/reports/cbs/others' },
            {
              label: 'Organization Profile Report',
              link: '/reports/cbs/others/organizational-profile/new',
            },
          ]}
        />
        <Report.Inputs hideDate />
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <OrganizationProfileData organization={organization} />
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
          header: 'Contact Number',
          accessorKey: 'member.contact',
        },
      ]}
      tableTitle={header}
    />
  );
};

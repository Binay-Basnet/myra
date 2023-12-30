import { useMemo } from 'react';

import { Box, Column, DetailPageQuickLinks, Table, Text } from '@myra-ui';

import { CenterOverview } from '@coop/cbs/data-access';
import { formatTableAddress, ROUTES } from '@coop/cbs/utils';
import {
  DetailsKeyValueCard,
  DetailsKeyValueCards,
  DetailsPageHeaderBox,
} from '@coop/shared/components';

export const Overview = (props: { data: CenterOverview }) => {
  const { data } = props;

  const links = [{ title: 'New Group', link: ROUTES?.CBS_MICRO_FINANCE_GROUP_ADD }];

  const allowedBranches = data?.allowedBranchDetail || [];

  const allowedBranchedColumns = useMemo<Column<typeof allowedBranches[0]>[]>(
    () => [
      {
        header: 'Group Code',
        accessorFn: (row) => row?.branchCode,
      },
      {
        header: 'Group Name',
        accessorFn: (row) => row?.name,
      },
    ],
    []
  );

  return (
    <>
      <DetailsPageHeaderBox title="Overview" />
      <Box px="s24">
        {' '}
        <DetailPageQuickLinks links={links} />
      </Box>

      <DetailsKeyValueCards
        keyValueList={[
          { label: 'Total Members', value: data?.totalMembers },
          { label: 'Total Groups', value: data?.totalGroups },
          { label: 'Total Amount', value: data?.toalLoan },
          { label: 'Total Deposit Amount', value: data?.totalSaving },
        ]}
      />
      <DetailsKeyValueCard
        title="General Information"
        keyValueList={[
          { label: 'Center Name', value: data?.centerName },
          { label: 'Center ID', value: data?.centerId },
          { label: 'Total Members', value: data?.totalMembers },
        ]}
      />
      <DetailsKeyValueCard
        title="Central Coordinator"
        keyValueList={[
          { label: 'Member Id', value: data?.centerCoordinator?.id },
          { label: 'Name', value: data?.centerCoordinator?.name },
          { label: 'Phone No', value: data?.centerCoordinator?.contactNo },
          { label: 'Email', value: data?.centerCoordinator?.email },
          { label: 'Address', value: formatTableAddress(data?.address) },
          { label: 'Center Coordinator Branch', value: data?.centerCoordinatorBranch?.name },
        ]}
      />
      <Box m="s24" p="s12" bg="white" borderRadius={5}>
        <Text fontSize="r1" fontWeight="semibold">
          Allowed Branches List
        </Text>
        <Table
          data={allowedBranches}
          columns={allowedBranchedColumns}
          variant="report"
          size="report"
          isStatic
        />
      </Box>
    </>
  );
};

export default Overview;

import { useMemo } from 'react';

import { Box, Column, Table, Text } from '@myra-ui';

import { CenterOverview } from '@coop/cbs/data-access';
import { DetailsPageHeaderBox } from '@coop/shared/components';

export const Group = (props: { data: CenterOverview }) => {
  const { data } = props;
  const groupList = data?.groupList || [];
  const groupColumns = useMemo<Column<typeof groupList[0]>[]>(
    () => [
      {
        header: 'MF Group ID',
        accessorFn: (_, index) => index + 1,
        meta: {
          width: '5%',
        },
      },
      {
        header: 'Created Date',
        accessorFn: (row) => row?.createdDate?.local,
      },
      {
        header: 'MF Group Name',
        accessorFn: (row) => row?.groupName,
      },
      {
        header: 'MF Group Coordinator Name',
        accessorFn: (row) => row?.groupCoordinator?.name,
      },
      {
        header: 'Total Members',
        accessorFn: (row) => row?.totalMember,
      },
    ],
    []
  );
  return (
    <>
      <DetailsPageHeaderBox title="MF Group" />
      <Box m="s24" p="s12" bg="white" borderRadius={5}>
        <Text fontSize="r1" fontWeight="semibold">
          MF Group List
        </Text>
        <Table data={groupList} columns={groupColumns} variant="report" size="report" isStatic />
      </Box>
    </>
  );
};

export default Group;

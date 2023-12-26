import { useRouter } from 'next/router';

import { Box, DetailPageHeader, DetailPageTabs, Divider, Scrollable, Text } from '@myra-ui';

import { Member, useGroupDetailsQuery } from '@coop/cbs/data-access';

import GroupMembers from './components/GroupMembers';
import Meetings from './components/Meetings';
import Overview from './components/Overview';

export const GroupDetails = () => {
  const router = useRouter();
  const tabQuery = router.query['tab'] as string;

  const { data } = useGroupDetailsQuery(
    { groupId: router?.query?.['id'] as string },
    { enabled: !!router?.query?.['id'] }
  );
  const groupDetailsData = data?.microFinance?.group?.groupDetails;

  return (
    <>
      <Box position="sticky" top="0" zIndex={10}>
        <DetailPageHeader
          title="Microfinance Group Details"
          member={{
            name: groupDetailsData?.overview?.groupName as string,
          }}
        />
      </Box>
      <Box display="flex">
        <Box
          w="320px"
          h="100%"
          sx={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
          borderRight="1px"
          borderRightColor="border.layout"
        >
          <Box p="s16">
            <Text fontSize="r1" fontWeight="semibold" color="primary.500">
              {groupDetailsData?.overview?.groupName}
            </Text>
            <Text fontSize="s3">{groupDetailsData?.overview?.groupId}</Text>
            <Text fontSize="s3" color="gray.600">
              {groupDetailsData?.overview?.totalMember} members
            </Text>
          </Box>
          <Divider />
          <DetailPageTabs tabs={['Overview', 'Group Members', 'Meetings']} />
        </Box>

        <Scrollable detailPage>
          <Box display="flex" flexDir="column" gap="s16" bg="background.500" minH="100vh">
            {(tabQuery === 'overview' || tabQuery === 'undefined' || !tabQuery) && (
              <Overview data={groupDetailsData?.overview} />
            )}
            {tabQuery === 'group members' && (
              <GroupMembers
                data={groupDetailsData?.groupMembers as Member[]}
                allowableServiceCenters={groupDetailsData?.allowableServiceCenters}
              />
            )}
            {tabQuery === 'meetings' && <Meetings data={groupDetailsData?.meetings} />}
          </Box>
        </Scrollable>
      </Box>
    </>
  );
};

export default GroupDetails;

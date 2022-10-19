import Image from 'next/image';
import { useRouter } from 'next/router';

import { useGetMemberDetailsOverviewQuery } from '@coop/cbs/data-access';
import { Box, DetailPageTabs, Text } from '@coop/shared/ui';

export const MemberDetailsSidebar = () => {
  const router = useRouter();
  const memberDetails = useGetMemberDetailsOverviewQuery({
    id: router.query['id'] as string,
  });

  const memberInfo = memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation;
  return (
    <>
      <Box
        borderBottom="1px"
        borderBottomColor="border.layout"
        display="flex"
        flexDirection="column"
        gap="s16"
        p="s16"
      >
        {' '}
        <Box position="relative" h="284px">
          <Image src={memberInfo?.profilePic ?? ''} layout="fill" alt="logo" />
        </Box>
        <Box display="flex" flexDirection="column" gap="s8">
          <Text fontSize="l1" fontWeight="600">
            {' '}
            jhj
          </Text>
          <Text fontSize="r1" fontWeight="600">
            {' '}
            {memberInfo?.memberCode}{' '}
          </Text>
          <Text fontSize="r1" fontWeight="600">
            {' '}
            Member Since : {memberInfo?.memberJoined}
          </Text>
        </Box>
      </Box>

      <DetailPageTabs
        tabs={[
          'Overview',
          'Accounts',
          'Share',
          'Reports',
          'Bio',
          'Transactions',
          'Activity',
          'Cheque',
          'Documents',
          'Tasks',
        ]}
      />
    </>
  );
};

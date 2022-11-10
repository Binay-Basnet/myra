import { useRouter } from 'next/router';
import { Avatar } from '@chakra-ui/react';

import { useGetMemberDetailsOverviewQuery } from '@coop/cbs/data-access';
import { Box, DetailPageTabs, Text } from '@coop/shared/ui';

export const MemberDetailsSidebar = () => {
  const router = useRouter();
  const memberDetails = useGetMemberDetailsOverviewQuery({
    id: router.query['id'] as string,
  });

  const memberInfo = memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation;

  return (
    <Box bg="white">
      <Box
        borderBottom="1px"
        borderBottomColor="border.layout"
        display="flex"
        flexDirection="column"
        gap="s16"
        p="s16"
      >
        <Avatar
          h="284px"
          w="284px"
          borderRadius="br2"
          src={memberInfo?.profilePic ?? ''}
          name={memberInfo?.memberName as string}
        />

        <Box display="flex" flexDirection="column" gap="s8">
          <Text fontSize="l1" fontWeight="600">
            {' '}
            {memberInfo?.memberName}
          </Text>
          {memberInfo?.memberCode && (
            <Text fontSize="r1" fontWeight="600">
              {' '}
              {memberInfo?.memberCode}{' '}
            </Text>
          )}
          <Text fontSize="r1" fontWeight="600">
            {' '}
            Member Since : {memberInfo?.memberJoined}
          </Text>
        </Box>
      </Box>

      <DetailPageTabs
        tabs={[
          'Overview',
          'Saving Accounts',
          'Share',
          'Reports',
          'Loan',
          'Bio',
          'Transactions',
          'Activity',
          'Cheque',
          'Documents',
          'Tasks',
        ]}
      />
    </Box>
  );
};

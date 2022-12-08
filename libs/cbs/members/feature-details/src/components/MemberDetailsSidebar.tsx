import { IoCopyOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { Avatar } from '@chakra-ui/react';

import { Box, DetailPageTabs, Icon, Tags, Text } from '@myra-ui';

import { useGetMemberDetailsOverviewQuery } from '@coop/cbs/data-access';
import { copyToClipboard } from '@coop/shared/utils';

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
          h="288px"
          w="288px"
          borderRadius="br2"
          src={memberInfo?.profilePic ?? ''}
          name={memberInfo?.memberName as string}
        />
        <Box display="flex" flexDirection="column" gap="s8">
          <Box display="flex" alignItems="center" gap="s8">
            <Text fontSize="l1" fontWeight="600">
              {' '}
              {memberInfo?.memberName}
            </Text>
            {memberInfo?.isStaff && (
              <Tags label="staff" type="chip" bg="info.0" labelColor="info.500" />
            )}
          </Box>
          {memberInfo?.memberCode && (
            <Box display="flex" alignItems="center" gap="s4">
              <Text fontSize="r1" fontWeight="600">
                {' '}
                {memberInfo?.memberCode}{' '}
              </Text>
              <Icon
                _hover={{ cursor: 'pointer' }}
                size="sm"
                as={IoCopyOutline}
                onClick={() => copyToClipboard(memberInfo?.memberCode as string)}
              />
            </Box>
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
          // 'Activity',
          'Withdraw Slip',
          // 'Documents',
          'Tasks',
        ]}
      />
    </Box>
  );
};

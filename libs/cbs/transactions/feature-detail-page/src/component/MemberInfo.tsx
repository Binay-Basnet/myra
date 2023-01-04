import { IoArrowForwardOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { Avatar, Box, Icon, Text } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';

type MemberInfoProps = {
  memberId?: string | undefined | null;
  memberCode?: string | undefined | null;
  name: string | undefined | null;
  profilePic: string;
  sourceAccount: string | undefined | null;
  destinationName: string | undefined | null;
  destinationAccount: string | undefined | null;
  detailPage?: 'deposit' | 'withdraw' | 'accountTransfer' | 'agentTransaction' | 'loanRepayment';
};

export const MemberInfo = ({
  name,
  memberId,
  memberCode,
  profilePic,
  detailPage,
  sourceAccount,
  destinationName,
  destinationAccount,
}: MemberInfoProps) => {
  const router = useRouter();
  return (
    <Box borderBottom="1px" borderBottomColor="border.layout">
      <Box py="s4" w="100%" px="s16" display="flex" alignItems="center" gap="s8">
        {detailPage !== 'accountTransfer' && (
          <Box
            gap="s8"
            display="flex"
            _hover={{
              cursor: 'pointer',
            }}
            onClick={() => router.push(`${ROUTES.CBS_MEMBER_DETAILS}?id=${memberId}`)}
          >
            <Avatar src={profilePic} size="md" name="test" />
            <Box display="flex" flexDir="column">
              <Text fontSize="r1" fontWeight="Medium" color="primary.500">
                {name}
              </Text>
              <Text fontSize="s3" fontWeight="Regular" color="gray.800">
                {memberCode}
              </Text>
            </Box>
          </Box>
        )}
        {detailPage === 'accountTransfer' && (
          <Box display="flex" alignItems="center" gap="s12">
            <Box>
              <Text fontSize="s3" fontWeight="Medium" color="neutralColorLight.Gray-80">
                {name}
              </Text>
              <Text fontSize="s3" fontWeight="Regular" color="neutralColorLight.Gray-70">
                {sourceAccount}
              </Text>
            </Box>
            <Icon color="success.400" as={IoArrowForwardOutline} />
            <Box>
              <Text fontSize="s3" fontWeight="Medium" color="neutralColorLight.Gray-80">
                {destinationName}
              </Text>
              <Text fontSize="s3" fontWeight="Regular" color="neutralColorLight.Gray-70">
                {destinationAccount}
              </Text>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

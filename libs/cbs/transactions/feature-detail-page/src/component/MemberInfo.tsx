import { IoArrowForwardOutline } from 'react-icons/io5';

import { Avatar, Box, Icon, Text } from '@myra-ui';

import { RedirectButton, ROUTES } from '@coop/cbs/utils';

type MemberInfoProps = {
  memberId?: string | undefined | null;
  memberCode?: string | undefined | null;
  name: string | undefined | null;
  profilePic: string;
  sourceAccount: string | undefined | null;
  destinationName: string | undefined | null;
  destinationAccount: string | undefined | null;
  recipientMemberId?: string | undefined | null;
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
  recipientMemberId,
}: MemberInfoProps) => (
  <Box borderBottom="1px" borderBottomColor="border.layout">
    <Box py="s12" w="100%" px="s16" display="flex" alignItems="center" gap="s8">
      {detailPage !== 'accountTransfer' && (
        <Box gap="s8" display="flex">
          <Avatar src={profilePic} size="md" name="test" />
          <Box display="flex" flexDir="column" justifyContent="center">
            <RedirectButton label={name} link={`${ROUTES.CBS_MEMBER_DETAILS}?id=${memberId}`} />

            <Text fontSize="s3" fontWeight="Regular" color="gray.800">
              {memberCode}
            </Text>
          </Box>
        </Box>
      )}
      {detailPage === 'accountTransfer' && (
        <Box display="flex" alignItems="center" gap="s12">
          <Box>
            <RedirectButton label={name} link={`${ROUTES.CBS_MEMBER_DETAILS}?id=${memberId}`} />
            <Text fontSize="s3" fontWeight="Regular" color="neutralColorLight.Gray-70">
              {sourceAccount}
            </Text>
          </Box>
          <Icon color="success.400" as={IoArrowForwardOutline} />
          <Box>
            <RedirectButton
              label={destinationName}
              link={`${ROUTES.CBS_MEMBER_DETAILS}?id=${recipientMemberId}`}
            />

            <Text fontSize="s3" fontWeight="Regular" color="neutralColorLight.Gray-70">
              {destinationAccount}
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  </Box>
);

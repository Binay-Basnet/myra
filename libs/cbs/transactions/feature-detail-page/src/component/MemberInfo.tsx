import { IoArrowForwardOutline } from 'react-icons/io5';

import { Avatar, Box, Icon, MemberHoverCard, Text } from '@myra-ui';

import { Member } from '@coop/cbs/data-access';
import { localizedText, RedirectButton, ROUTES } from '@coop/cbs/utils';

type MemberInfoProps = {
  memberId?: string | undefined | null;
  memberCode?: string | undefined | null;
  name: string | undefined | null;
  profilePic: string;
  sourceAccount: string | undefined | null;
  sourceAccountId?: string | null | undefined;
  destinationName: string | undefined | null;
  destinationAccount: string | undefined | null;
  destinationAccountId?: string | null | undefined;
  recipientMemberId?: string | undefined | null;
  senderMember?: Member | null | undefined;
  reciepentMember?: Member | null | undefined;
  detailPage?:
    | 'deposit'
    | 'withdraw'
    | 'accountTransfer'
    | 'agentTransaction'
    | 'loanRepayment'
    | 'allTxn';
};

export const MemberInfo = ({
  name,
  memberId,
  memberCode,
  profilePic,
  detailPage,
  sourceAccount,
  sourceAccountId,
  destinationName,
  destinationAccount,
  destinationAccountId,
  recipientMemberId,
  senderMember,
  reciepentMember,
}: MemberInfoProps) => (
  <Box borderBottom="1px" borderBottomColor="border.layout">
    <Box py="s12" w="100%" px="s16" display="flex" alignItems="center" gap="s8">
      {detailPage !== 'accountTransfer' && (
        <Box gap="s8" display="flex" alignItems="center">
          <Avatar src={profilePic} size="sm" name="test" />
          <Box display="flex" flexDir="column">
            <RedirectButton label={name} link={`${ROUTES.CBS_MEMBER_DETAILS}?id=${memberId}`} />
            <Text fontSize="s3" fontWeight="Regular" color="gray.800">
              {memberCode}
            </Text>
          </Box>
        </Box>
      )}
      {detailPage === 'accountTransfer' && (
        <Box display="flex" alignItems="center" gap="s12">
          <Box display="flex" flexDirection="column">
            <Text fontSize="s3" fontWeight="Regular" color="gray.700">
              Sender
            </Text>

            <MemberHoverCard
              trigger={
                <Text fontSize="s3" fontWeight={500} color="gray.800">
                  {name}
                </Text>
              }
              memberDetails={{
                id: memberId as string,
                name: localizedText(senderMember?.name) as string,
                age: '',
                gender: '',
                maritalStatus: '',
                profilePicUrl: senderMember?.profilePicUrl ?? '',
              }}
              accountDetails={{ id: sourceAccountId as string, name: sourceAccount as string }}
            />
          </Box>
          <Icon color="success.400" as={IoArrowForwardOutline} />

          <Box display="flex" flexDirection="column">
            <Text fontSize="s3" fontWeight="Regular" color="gray.700">
              Reciever
            </Text>
            <MemberHoverCard
              trigger={
                <Text fontSize="s3" fontWeight={500} color="gray.800">
                  {destinationName}
                </Text>
              }
              memberDetails={{
                id: recipientMemberId as string,
                name: localizedText(reciepentMember?.name) as string,
                age: '',
                gender: '',
                maritalStatus: '',
                profilePicUrl: reciepentMember?.profilePicUrl ?? '',
              }}
              accountDetails={{
                id: destinationAccountId as string,
                name: destinationAccount as string,
              }}
            />
          </Box>

          {/* <Box display="flex" flexDirection="column">
            <Text fontSize="s3" fontWeight="Regular" color="gray.700">
              Reciever
            </Text>
            <RedirectButton
              label={destinationName}
              link={`${ROUTES.CBS_MEMBER_DETAILS}?id=${recipientMemberId}`}
            />
          </Box> */}
        </Box>
      )}
    </Box>
  </Box>
);

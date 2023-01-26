import { ReactNode, useMemo } from 'react';

import { HoverCard } from '@myra-ui/components';
import { Avatar, Box, Button, Text } from '@myra-ui/foundations';

import { ROUTES } from '@coop/cbs/utils';

/* eslint-disable-next-line */
export interface MemberHoverCardProps {
  memberDetails: {
    id: string;
    name: string;
    age: string;
    gender: string;
    maritalStatus: string;
    profilePicUrl: string;
  };
  accountDetails: {
    id: string;
    name: string;
  };
  trigger: ReactNode;
}

export const MemberHoverCard = ({
  memberDetails,
  accountDetails,
  trigger,
}: MemberHoverCardProps) => {
  const memberMeta = useMemo(() => {
    const temp = [];

    if (memberDetails?.gender) {
      temp.push(memberDetails?.gender);
    }
    if (memberDetails?.age) {
      temp.push(memberDetails?.age);
    }
    if (memberDetails?.maritalStatus) {
      temp.push(memberDetails?.maritalStatus);
    }

    return temp;
  }, [memberDetails]);

  return (
    <HoverCard>
      <HoverCard.Trigger>{trigger}</HoverCard.Trigger>
      <HoverCard.Content>
        <HoverCard.Header>
          <Box p="s16" display="flex" flexDirection="column" gap="s8">
            <Box display="flex" gap="s8">
              <Avatar name={memberDetails?.name} size="lg" src={memberDetails?.profilePicUrl} />
              <Box>
                <Text fontSize="r1" fontWeight="500" color="primary.500">
                  {memberDetails?.name ?? '-'}
                </Text>
                <Text fontSize="s3" fontWeight="400" color="gray.800">
                  {memberDetails?.id ?? '-'}
                </Text>
                <Text fontSize="s3" fontWeight="400" color="gray.800">
                  {memberMeta.join(' | ')}
                </Text>
              </Box>
            </Box>
          </Box>
        </HoverCard.Header>
        <HoverCard.Body>
          <Box p="s16" display="flex" flexDirection="column">
            <Text fontSize="r1" fontWeight={400} color="gray.700">
              Account
            </Text>
            <Text fontSize="r1" fontWeight={500} color="gray.800">
              {accountDetails?.name}
            </Text>
          </Box>
        </HoverCard.Body>
        <HoverCard.Footer>
          <Box p="s16" display="flex" gap="s8">
            <Button link={`${ROUTES.CBS_MEMBER_DETAILS}?id=${memberDetails?.id}`} hasLink>
              View Profile
            </Button>

            <Button
              variant="outline"
              shade="neutral"
              link={`${ROUTES.CBS_ACCOUNT_SAVING_DETAILS}?id=${accountDetails?.id}`}
              hasLink
            >
              View Account
            </Button>
          </Box>
        </HoverCard.Footer>
      </HoverCard.Content>
    </HoverCard>
  );
};

export default MemberHoverCard;

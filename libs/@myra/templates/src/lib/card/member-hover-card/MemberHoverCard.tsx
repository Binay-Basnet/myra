import { ReactNode, useMemo } from 'react';

import { Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@myra-ui/components';
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
    <Popover placement="bottom-start" gutter={3} trigger="hover">
      <PopoverTrigger>
        <Box cursor="pointer">{trigger}</Box>
      </PopoverTrigger>
      <Box zIndex={10}>
        <PopoverContent bg="white" boxShadow="E2" borderRadius="br2" w="350px">
          <PopoverBody p={0}>
            <Box>
              <Box p="s16" display="flex" flexDirection="column" gap="s8">
                <Box display="flex" gap="s8">
                  <Avatar
                    name={memberDetails?.name}
                    size="lg"
                    src={memberDetails?.profilePicUrl}
                    // onClick={() =>
                    //   handleModalOpen(memberDetails?.avatar as string, memberDetails?.name ?? 'Member')
                    // }
                    // cursor="pointer"
                  />
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

              <Box
                p="s16"
                borderTop="1px"
                borderColor="border.layout"
                display="flex"
                flexDirection="column"
              >
                <Text fontSize="r1" fontWeight={400} color="gray.700">
                  Account
                </Text>
                <Text fontSize="r1" fontWeight={500} color="gray.800">
                  {accountDetails?.name}
                </Text>
              </Box>

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
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Box>
    </Popover>
  );
};

export default MemberHoverCard;

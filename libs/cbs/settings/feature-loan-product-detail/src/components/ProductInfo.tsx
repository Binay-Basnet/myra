import { IoCopyOutline } from 'react-icons/io5';

import { Box, Icon, Text } from '@myra-ui';

// type MemberInfoProps = {
//   memberId?: string | undefined | null;
//   name: string | undefined | null;
//   profilePic: string;
//   sourceAccount: string | undefined | null;
//   destinationName: string | undefined | null;
//   destinationAccount: string | undefined | null;
//   detailPage?: 'deposit' | 'withdraw' | 'accountTransfer' | 'agentTransaction' | 'loanRepayment';
// };

export const ProductInfo = () => (
  <Box
    h="100px"
    w="100%"
    p="s16"
    display="flex"
    flexDirection="column"
    alignItems="start"
    gap="s4"
    borderBottom="1px"
    borderBottomColor="border.layout"
  >
    <Text fontSize="r2" fontWeight="SemiBold" color="gray.800" lineHeight="150%">
      Gold Saving Account
    </Text>

    <Box display="flex" gap="s10">
      <Text fontSize="r1" fontWeight="Regular" color="gray.800" lineHeight="17px">
        CGSA-3025
      </Text>
      <Icon size="sm" as={IoCopyOutline} />
    </Box>

    <Text fontSize="r1" fontWeight="Regular" color="gray.700" lineHeight="150%">
      Current Product
    </Text>
  </Box>
);

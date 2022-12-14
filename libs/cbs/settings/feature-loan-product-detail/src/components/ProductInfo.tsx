import { IoCopyOutline } from 'react-icons/io5';

import { Box, Icon, Text } from '@myra-ui';

import { useLoanProductDepositHook } from '../hooks/useLoanProductDepositHook';

export const ProductInfo = () => {
  const { sidebarData } = useLoanProductDepositHook();

  return (
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
        {sidebarData?.productName ?? '-'}
      </Text>

      <Box display="flex" gap="s10">
        <Text fontSize="r1" fontWeight="Regular" color="gray.800" lineHeight="17px">
          {sidebarData?.productCode?.prefix}-{sidebarData?.productCode?.initialNo}
        </Text>
        <Icon size="sm" as={IoCopyOutline} />
      </Box>

      <Text fontSize="r1" fontWeight="Regular" color="gray.700" lineHeight="150%">
        {sidebarData?.productType ?? '-'}
      </Text>
    </Box>
  );
};

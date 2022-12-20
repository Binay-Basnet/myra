import { Box, Chips, Text } from '@myra-ui';

import { amountConverter } from '@coop/shared/utils';

type SidebarType = {
  sidebarData: {
    id: string | null | undefined;
    date: string | null | undefined;
    status: string | null | undefined;
    amount: string | null | undefined;
  };
};

export const Summary = ({ sidebarData }: SidebarType) => (
  <Box
    h="100px"
    w="100%"
    p="s16"
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    borderBottom="1px"
    borderBottomColor="border.layout"
  >
    <Box display="flex" flexDirection="column" gap="s10">
      <Text fontSize="r1" fontWeight="Regular" color="gray.600" lineHeight="17px">
        #{sidebarData?.id ?? '-'}
      </Text>
      <Text fontSize="s3" fontWeight="Medium" color="gray.800" lineHeight="16px">
        {sidebarData?.date}
      </Text>
    </Box>

    <Box display="flex" flexDirection="column" gap="s10">
      <Box display="flex" justifyContent="flex-end">
        <Chips
          variant="solid"
          theme="success"
          size="md"
          type="label"
          label={sidebarData?.status ?? ''}
        />
      </Box>
      <Text fontSize="r1" fontWeight="SemiBold" color="gray.700" lineHeight="150%">
        {amountConverter(sidebarData?.amount as string) ?? 'N/A'}
      </Text>
    </Box>
  </Box>
);

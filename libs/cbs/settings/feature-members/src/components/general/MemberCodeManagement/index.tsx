import { Box, Text, VStack } from '@myra-ui';

import { useTranslation } from '@coop/shared/utils';

import McmTable from './McmTable';

export const MemberCodeManagement = () => {
  const { t } = useTranslation();

  return (
    <VStack
      width="100%"
      border="1px"
      spacing="0"
      alignItems="start"
      borderColor="border.layout"
      borderRadius="br2"
      pb="180px"
    >
      <Box
        borderBottom="1px"
        borderColor="border.layout"
        w="100%"
        display="flex"
        alignItems="center"
        px="s12"
        height="s60"
      >
        <Box display="flex" flexDir="column" gap="s4">
          <Text fontSize="r1" color="gray.800" fontWeight="SemiBold" lineHeight="16.25px">
            {t['memberSettingsMemberCodeManagement']}
          </Text>

          <Text fontSize="s2" color="gray.600" fontWeight="Regular" lineHeight="16.25px">
            {t['memberSettingsConfigure']}
          </Text>
        </Box>
      </Box>
      <Box w="100%">
        <McmTable />
      </Box>
    </VStack>
  );
};

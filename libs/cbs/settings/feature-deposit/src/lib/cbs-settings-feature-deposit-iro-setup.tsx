import { Box, Text } from '@coop/shared/ui';

/* eslint-disable-next-line */
export interface CbsSettingsFeatureDepositIROSetupProps {}

export function CbsSettingsFeatureDepositIROSetup(
  props: CbsSettingsFeatureDepositIROSetupProps
) {
  return (
    <Box display={'flex'} flexDirection="row" h="fit-content">
      <Box flex={1} p="s16">
        <Box
          borderBottom={'1px'}
          borderBottomColor="border.layout"
          py="s8"
          w="100%"
        >
          <Text
            fontSize="r2"
            fontWeight="600"
            color="neutralColorLight.Gray-80"
          >
            IRO
          </Text>
          <Text pt={'s2'} fontSize="r1" fontWeight="400" color="gray.400">
            Setup your IRO account here
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

export default CbsSettingsFeatureDepositIROSetup;

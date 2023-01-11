import { Box, Text } from '@myra-ui';

import { SettingsCard } from '@coop/cbs/settings/ui-components';
import { FormNumberInput } from '@coop/shared/form';

export const WithdrawSlipElementCustomization = () => (
  <SettingsCard
    title="Withdraw Slip"
    subtitle="It allows for precise positioning of printable elements. Anchor Point for all Element is Top-Left Corner."
  >
    <Box display="flex" flexDirection="column" gap="s24">
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" gap="s4" fontSize="r1" color="gray.800">
          <Text fontWeight={400}>Position of BLOCK 1</Text>
          <Text fontWeight={500}>(Branch)</Text>
        </Box>

        <Box display="flex" gap="s16">
          <FormNumberInput name="blockOne.top" label="Top (mm)" />
          <FormNumberInput name="blockOne.left" label="Left (mm)" />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" gap="s4" fontSize="r1" color="gray.800">
          <Text fontWeight={400}>Position of BLOCK 2</Text>
          <Text fontWeight={500}>(Member Name, Acc No., Acc. Name)</Text>
        </Box>

        <Box display="flex" gap="s16">
          <FormNumberInput name="blockTwo.top" label="Top (mm)" />
          <FormNumberInput name="blockTwo.left" label="Left (mm)" />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" gap="s4" fontSize="r1" color="gray.800">
          <Text fontWeight={400}>Position of BLOCK 3</Text>
          <Text fontWeight={500}>(Slip Number)</Text>
        </Box>

        <Box display="flex" gap="s16">
          <FormNumberInput name="blockThree.top" label="Bottom (mm)" />
          <FormNumberInput name="blockThree.left" label="Left (mm)" />
        </Box>
      </Box>
    </Box>
  </SettingsCard>
);

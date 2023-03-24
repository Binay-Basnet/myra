import { Box, Text } from '@myra-ui';

import { EodList } from '../component';

/* eslint-disable-next-line */
export interface EodHistoryProps {}

export const EodHistory = () => (
  <Box display="flex" flexDirection="column" gap="s32" p="s16">
    <Box py="s10" borderBottom="1px" color="border.layout">
      <Text fontSize="r2" fontWeight={600} color="gray.800">
        History
      </Text>
      <Text fontSize="r1" fontWeight={400} color="gray.600">
        All list of Day End History to view additional information for each day end process:
      </Text>
    </Box>

    <EodList />
  </Box>
);

export default EodHistory;

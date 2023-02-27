import { Box, FormHeader } from '@myra-ui';

import { AccessLogList } from '../component';

/* eslint-disable-next-line */
export interface CbsSettingsFeatureAccessLogProps {}

export const CbsSettingsFeatureAccessLog = () => (
  <Box w="100%" display="flex" flexDirection="column">
    <FormHeader title="Access Log" />
    <Box p="s16">
      <AccessLogList />
    </Box>
  </Box>
);

export default CbsSettingsFeatureAccessLog;

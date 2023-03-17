import { Box } from '@myra-ui';

import { EodExceptions, TxnDate } from '../component';

/* eslint-disable-next-line */
export interface CbsSettingsFeatureEodProps {}

export const CbsSettingsFeatureEod = () => (
  <Box display="flex" flexDirection="column">
    <TxnDate />
    <EodExceptions />
  </Box>
);

export default CbsSettingsFeatureEod;

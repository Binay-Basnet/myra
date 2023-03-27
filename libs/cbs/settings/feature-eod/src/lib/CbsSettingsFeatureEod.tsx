import { Box } from '@myra-ui';

import { EodActions, EodExceptions, TxnDate } from '../component';

/* eslint-disable-next-line */
export interface CbsSettingsFeatureEodProps {}

export const CbsSettingsFeatureEod = () => (
  <Box display="flex" flexDirection="column">
    <TxnDate />
    <EodExceptions />
    <EodActions />
  </Box>
);

export default CbsSettingsFeatureEod;

import * as process from 'process';

import { Box, Button } from '@myra-ui';

import {
  DashboardCharts,
  DashboardTable,
  MyBranch,
  MyCoop,
  MyDay,
  QuickLinksComponent,
} from '../component';

/* eslint-disable-next-line */
export interface CbsFeatureDashboardProps {}

export const CbsFeatureDashboard = () => (
  <Box
    // minWidth="container.sm"
    maxW="container.lg"
    width="100%"
    display="flex"
    flexDirection="column"
    gap="s24"
    p="0"
    pb="55px"
  >
    {process.env['NX_APP_ENV'] === 'dev' ? (
      <Button
        shade="danger"
        onClick={() => {
          throw new Error('hahah you have been pranked');
        }}
      >
        {' '}
        CRASH UI{' '}
      </Button>
    ) : null}
    <QuickLinksComponent />
    <Box display="flex" flexDir="column" gap="s16">
      <MyDay />
      <DashboardTable />
    </Box>
    <MyBranch />
    <Box display="flex" flexDir="column" gap="s16">
      <MyCoop />
      <DashboardCharts />
    </Box>
  </Box>
);

export default CbsFeatureDashboard;

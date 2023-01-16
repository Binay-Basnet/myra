import { Box } from '@myra-ui';

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
